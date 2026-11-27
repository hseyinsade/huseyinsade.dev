import { render, screen } from "@testing-library/react";
import type { Job } from "@/lib/content";
import { JobItem } from "./JobItem";

const job: Job = {
  company: "Atmosware",
  note: { en: "Turkcell Group", tr: "Turkcell Grubu", de: "Turkcell-Gruppe" },
  role: { en: "Frontend Developer", tr: "Frontend Developer", de: "Frontend Developer" },
  start: "2024-08",
  location: "Istanbul, TR",
  summary: { en: "Summary", tr: "Özet", de: "Zusammenfassung" },
  highlights: { en: ["Did A", "Did B"], tr: ["A yaptım", "B yaptım"], de: ["A", "B"] },
  tags: ["React"],
};

const renderJob = (props: Partial<React.ComponentProps<typeof JobItem>> = {}) =>
  render(
    <ol>
      <JobItem job={job} lang="tr" presentLabel="Halen" {...props} />
    </ol>,
  );

describe("JobItem", () => {
  it("shows company, note, localized location and highlights", () => {
    renderJob();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("AtmoswareTurkcell Grubu");
    expect(screen.getByText(/İstanbul, TR/)).toBeInTheDocument();
    expect(screen.getByText("A yaptım")).toBeInTheDocument();
    expect(screen.getByText("Özet")).toBeInTheDocument();
  });

  it("marks an ongoing job as current", () => {
    const { container } = renderJob();
    expect(screen.getByText(/— Halen/)).toBeInTheDocument();
    expect(container.querySelector(".marker")).toHaveClass("current");
  });

  it("shows a finished job's end date", () => {
    const { container } = renderJob({ job: { ...job, start: "2020-01", end: "2021-06" }, lang: "en" });
    expect(screen.getByText("Jan 2020 — Jun 2021")).toBeInTheDocument();
    expect(screen.getByText("1 yr 6 mo")).toBeInTheDocument();
    expect(container.querySelector(".marker")).not.toHaveClass("current");
  });

  it("fades the timeline under the last job", () => {
    const { container } = renderJob({ last: true });
    expect(container.querySelector(".content")).toHaveClass("last");
  });
});
