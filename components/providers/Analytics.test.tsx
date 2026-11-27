import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { observers } from "@/test/setup";
import { renderWithSite } from "@/test/render";
import { Analytics } from "./Analytics";

type W = Window & { dataLayer?: Record<string, unknown>[] };
const w = window as W;

beforeEach(() => {
  w.dataLayer = [];
});

describe("Analytics", () => {
  it("sends clicks on [data-track] elements with label, link and language", async () => {
    renderWithSite(
      <>
        <a href="https://fizy.com" data-track="project_click" data-track-label="fizy">
          <span>fizy</span>
        </a>
        <a href="#work" data-track="nav_click" data-track-label="work">
          Work
        </a>
        <Analytics />
      </>,
      { lang: "tr" },
    );

    await userEvent.click(screen.getByText("fizy")); // click on a child still counts
    await userEvent.click(screen.getByText("Work"));
    expect(w.dataLayer).toEqual([
      { event: "project_click", label: "fizy", link_url: "https://fizy.com", page_language: "tr" },
      { event: "nav_click", label: "work", link_url: undefined, page_language: "tr" }, // in-page anchors carry no URL
    ]);
  });

  it("reports each section once when it reaches the middle of the screen", () => {
    document.body.innerHTML = '<main><section id="work"></section><section id="stack"></section></main>';
    renderWithSite(<Analytics />);
    const io = observers.at(-1)!;
    expect(io.options?.rootMargin).toBe("-50% 0px -50% 0px");

    const work = document.getElementById("work")!;
    act(() => {
      io.trigger(work, true);
      io.trigger(work, false);
      io.trigger(work, true);
    });
    expect(w.dataLayer).toEqual([{ event: "section_view", section: "work", page_language: "en" }]);
  });
});
