import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithSite } from "@/test/render";
import { InspectToggle } from "@/components/molecules/InspectToggle";
import { useSite } from "@/components/providers";
import { Inspector } from "./Inspector";

function Harness() {
  const { inspect, setInspect } = useSite();
  return (
    <>
      <InspectToggle on={inspect} label="Inspect" onToggle={() => setInspect((v) => !v)} />
      <a href="#x" id="target" className="abcde_title">
        target
      </a>
      <Inspector />
    </>
  );
}

describe("Inspector", () => {
  it("toggles with the I key and closes with Escape", async () => {
    const user = userEvent.setup();
    renderWithSite(<Harness />);
    expect(screen.queryByText(/Hover/i)).toBeNull();

    await user.keyboard("i");
    expect(screen.getByRole("button", { name: /Inspect/ })).toHaveAttribute("aria-pressed", "true");

    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: /Inspect/ })).toHaveAttribute("aria-pressed", "false");
  });

  it("ignores the I key while typing in a field", async () => {
    const user = userEvent.setup();
    renderWithSite(
      <>
        <input aria-label="field" />
        <Harness />
      </>,
    );
    await user.type(screen.getByRole("textbox", { name: "field" }), "i");
    expect(screen.getByRole("button", { name: /Inspect/ })).toHaveAttribute("aria-pressed", "false");
  });

  it("labels the hovered element and positions the outline through CSS variables", async () => {
    const user = userEvent.setup();
    renderWithSite(<Harness />);
    const target = document.getElementById("target")!;
    target.getBoundingClientRect = () => ({ left: 40, top: 100, width: 120, height: 24 }) as DOMRect;
    document.elementFromPoint = () => target;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => (cb(0), 0));

    await user.keyboard("i");
    act(() => void window.dispatchEvent(new MouseEvent("mousemove", { clientX: 50, clientY: 110 })));

    expect(screen.getByText("a#target.title")).toBeInTheDocument();
    expect(screen.getByText("120 × 24")).toBeInTheDocument();
    const highlight = screen.getByText("a#target.title").closest(".highlight") as HTMLElement;
    expect(highlight.style.getPropertyValue("--x")).toBe("40px");
    expect(highlight.style.getPropertyValue("--y")).toBe("100px");
    expect(highlight.style.getPropertyValue("--label-y")).toBe("72px");
  });

  it("blocks page clicks while inspecting", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn((e: Event) => e.defaultPrevented);
    renderWithSite(<Harness />);
    await user.keyboard("i");
    document.getElementById("target")!.addEventListener("click", onClick);
    await user.click(document.getElementById("target")!);
    expect(onClick).not.toHaveBeenCalled();
  });
});
