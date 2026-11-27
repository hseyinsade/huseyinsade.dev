import { describeElement, readableClass } from "./selector";

describe("readableClass", () => {
  it.each([
    ["i8YaKq_title", "title"],
    ["hero-module-scss-module__YiQCz__title", "title"],
    ["hero_title__YiQCz", "title"],
    ["bg-grid", "bg-grid"],
  ])("%s → %s", (input, expected) => {
    expect(readableClass(input)).toBe(expected);
  });
});

describe("describeElement", () => {
  it("builds a DevTools-style selector with at most two classes", () => {
    const el = document.createElement("section");
    el.id = "work";
    el.className = "i8YaKq_section reveal extra";
    expect(describeElement(el)).toBe("section#work.section.reveal");
  });

  it("handles SVG elements (className is not a string)", () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    expect(describeElement(svg)).toBe("svg");
  });
});
