import { act, render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";
import { observers } from "@/test/setup";

describe("Reveal", () => {
  it("becomes visible once it scrolls into view", () => {
    render(<Reveal>content</Reveal>);
    const el = screen.getByText("content");
    expect(el).toHaveClass("reveal");
    expect(el).not.toHaveClass("visible");

    act(() => observers.at(-1)!.trigger(el, true));
    expect(el).toHaveClass("visible");
  });

  it("renders the requested element and stagger class", () => {
    render(
      <ul>
        <Reveal as="li" delay={2}>
          item
        </Reveal>
      </ul>,
    );
    const li = screen.getByText("item");
    expect(li.tagName).toBe("LI");
    expect(li).toHaveClass("delay2");
  });
});
