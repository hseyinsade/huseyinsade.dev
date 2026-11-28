import { emailMessage, formEndpoint, sendContact } from "./contact";
import * as supabase from "./supabase";

const msg = { name: "Ada", email: "ada@x.io", message: "Hi there" };
const opts = { to: "me@site.dev", subject: "Hello", lang: "en" as const };
const fetchMock = () => vi.mocked(globalThis.fetch);
const formReply = (body: unknown, status = 200) => fetchMock().mockResolvedValue(new Response(JSON.stringify(body), { status }));

describe("emailMessage", () => {
  it("posts to FormSubmit with subject and reply-to", async () => {
    formReply({ success: "true" });
    await expect(emailMessage("me@site.dev", "Hello", msg)).resolves.toBe(true);
    const [url, init] = fetchMock().mock.calls[0];
    expect(url).toBe(formEndpoint("me@site.dev"));
    expect(url).toBe("https://formsubmit.co/ajax/me@site.dev");
    expect(JSON.parse(init?.body as string)).toMatchObject({ ...msg, _subject: "Hello — Ada", _replyto: "ada@x.io" });
  });

  it("fails while the form still needs activation", async () => {
    formReply({ success: "false", message: "This form needs Activation." });
    await expect(emailMessage("me@site.dev", "Hello", msg)).resolves.toBe(false);
  });
});

describe("sendContact", () => {
  it("saves to Supabase with the language and emails it", async () => {
    const save = vi.spyOn(supabase, "saveMessage").mockResolvedValue(true);
    formReply({ success: true });
    await expect(sendContact(msg, opts)).resolves.toBe(true);
    expect(save).toHaveBeenCalledWith({ ...msg, lang: "en" });
    expect(fetchMock()).toHaveBeenCalledWith(formEndpoint("me@site.dev"), expect.anything());
  });

  it("counts as sent if only Supabase works", async () => {
    vi.spyOn(supabase, "saveMessage").mockResolvedValue(true);
    fetchMock().mockRejectedValue(new TypeError("offline"));
    await expect(sendContact(msg, opts)).resolves.toBe(true);
  });

  it("counts as sent if only the email works", async () => {
    vi.spyOn(supabase, "saveMessage").mockRejectedValue(new TypeError("offline"));
    formReply({ success: true });
    await expect(sendContact(msg, opts)).resolves.toBe(true);
  });

  it("fails when both fail", async () => {
    vi.spyOn(supabase, "saveMessage").mockResolvedValue(false);
    formReply({ success: false }, 500);
    await expect(sendContact(msg, opts)).resolves.toBe(false);
  });
});
