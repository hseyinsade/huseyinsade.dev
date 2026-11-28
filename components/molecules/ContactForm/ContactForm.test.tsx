import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

const w = window as Window & { dataLayer?: unknown[] };

const labels = {
  name: "Name",
  email: "Your email",
  message: "Message",
  send: "Send message",
  sending: "Sending…",
  sent: "Thanks!",
  error: "Something went wrong.",
};

const fill = async () => {
  await userEvent.type(screen.getByLabelText("Name"), "  Ada ");
  await userEvent.type(screen.getByLabelText("Your email"), "ada@x.io");
  await userEvent.type(screen.getByLabelText("Message"), "Hi there");
  await userEvent.click(screen.getByRole("button", { name: /Send message/ }));
};

beforeEach(() => {
  w.dataLayer = [];
});

describe("ContactForm", () => {
  it("labels every field and requires them", () => {
    render(<ContactForm labels={labels} onSend={vi.fn()} />);
    for (const name of ["Name", "Your email", "Message"]) expect(screen.getByLabelText(name)).toBeRequired();
    expect(screen.getByLabelText("Your email")).toHaveAttribute("type", "email");
  });

  it("sends the trimmed message and confirms it", async () => {
    const onSend = vi.fn().mockResolvedValue(true);
    render(<ContactForm labels={labels} onSend={onSend} />);
    await fill();
    expect(onSend).toHaveBeenCalledWith({ name: "Ada", email: "ada@x.io", message: "Hi there" });
    expect(await screen.findByRole("status")).toHaveTextContent("Thanks!");
    expect(screen.getByLabelText("Message")).toHaveValue("");
    expect(w.dataLayer).toContainEqual({ event: "contact_form_submit" });
  });

  it("keeps the message and shows an error when sending fails", async () => {
    render(<ContactForm labels={labels} onSend={vi.fn().mockResolvedValue(false)} />);
    await fill();
    expect(await screen.findByText("Something went wrong.")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toHaveValue("Hi there");
    expect(w.dataLayer).toContainEqual({ event: "contact_form_error" });
  });

  it("shows an error when sending throws", async () => {
    render(<ContactForm labels={labels} onSend={vi.fn().mockRejectedValue(new TypeError("offline"))} />);
    await fill();
    expect(await screen.findByText("Something went wrong.")).toBeInTheDocument();
  });

  it("disables the button while sending", async () => {
    let resolve!: (ok: boolean) => void;
    render(<ContactForm labels={labels} onSend={() => new Promise((r) => (resolve = r))} />);
    await fill();
    expect(screen.getByRole("button", { name: /Sending…/ })).toBeDisabled();
    resolve(true);
    expect(await screen.findByText("Thanks!")).toBeInTheDocument();
  });

  it("ignores bots that fill the hidden field", async () => {
    const onSend = vi.fn();
    const { container } = render(<ContactForm labels={labels} onSend={onSend} />);
    (container.querySelector('[name="botcheck"]') as HTMLInputElement).checked = true;
    await fill();
    expect(onSend).not.toHaveBeenCalled();
  });

  it("does not send an incomplete form", async () => {
    const onSend = vi.fn();
    render(<ContactForm labels={labels} onSend={onSend} />);
    await userEvent.click(screen.getByRole("button", { name: /Send message/ }));
    expect(onSend).not.toHaveBeenCalled();
  });
});
