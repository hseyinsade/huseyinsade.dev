import { fetchAvailability, saveMessage, SUPABASE_KEY, SUPABASE_URL } from "./supabase";

const fetchMock = () => vi.mocked(globalThis.fetch);
const reply = (body: unknown, status = 200) => fetchMock().mockResolvedValue(new Response(JSON.stringify(body), { status }));

describe("saveMessage", () => {
  const msg = { name: "Ada", email: "ada@x.io", message: "Hi", lang: "tr" as const };

  it("inserts into messages with the publishable key", async () => {
    fetchMock().mockResolvedValue(new Response(null, { status: 201 }));
    await expect(saveMessage(msg)).resolves.toBe(true);
    const [url, init] = fetchMock().mock.calls[0];
    expect(url).toBe(`${SUPABASE_URL}/rest/v1/messages`);
    expect(init?.method).toBe("POST");
    expect(init?.headers).toMatchObject({ apikey: SUPABASE_KEY, Prefer: "return=minimal" });
    expect(JSON.parse(init?.body as string)).toEqual(msg);
  });

  it("reports a rejected insert", async () => {
    reply({ message: "violates check constraint" }, 400);
    await expect(saveMessage(msg)).resolves.toBe(false);
  });
});

describe("fetchAvailability", () => {
  it("reads the single status row", async () => {
    reply([{ available: false }]);
    await expect(fetchAvailability()).resolves.toBe(false);
    expect(fetchMock().mock.calls[0][0]).toBe(`${SUPABASE_URL}/rest/v1/site_status?id=eq.1&select=available`);
  });

  it.each([
    ["no row", () => reply([])],
    ["an error", () => reply({ message: "nope" }, 401)],
    ["a network failure", () => fetchMock().mockRejectedValue(new TypeError("offline"))],
  ])("returns null on %s", async (_, setup) => {
    setup();
    await expect(fetchAvailability()).resolves.toBeNull();
  });
});
