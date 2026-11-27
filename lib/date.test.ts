import { formatDuration, formatMonth } from "./date";

describe("formatMonth", () => {
  it("formats a YYYY-MM month per language", () => {
    expect(formatMonth("2024-08", "en")).toBe("Aug 2024");
    expect(formatMonth("2024-08", "tr")).toBe("Ağu 2024");
    expect(formatMonth("2024-03", "de")).toBe("März 2024");
  });
});

describe("formatDuration", () => {
  it("counts both months inclusively", () => {
    expect(formatDuration("2020-01", "2020-12", "en")).toBe("1 yr");
    expect(formatDuration("2020-01", "2021-06", "en")).toBe("1 yr 6 mo");
    expect(formatDuration("2020-01", "2020-03", "en")).toBe("3 mo");
  });

  it("uses plural forms", () => {
    expect(formatDuration("2018-01", "2020-02", "en")).toBe("2 yrs 2 mo");
    expect(formatDuration("2018-01", "2020-02", "de")).toBe("2 Jahre 2 Monate");
    expect(formatDuration("2020-01", "2021-01", "de")).toBe("1 Jahr 1 Monat");
    expect(formatDuration("2018-01", "2020-02", "tr")).toBe("2 yıl 2 ay");
  });

  it("runs until now when there is no end date", () => {
    expect(formatDuration("2024-08", undefined, "en", new Date(2026, 10, 27))).toBe("2 yrs 4 mo");
  });
});
