import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  localStorage.clear();
  observers.length = 0;
});

/** jsdom has no IntersectionObserver. This fake lets a test decide when an element "enters" the screen. */
class FakeIntersectionObserver {
  elements = new Set<Element>();
  constructor(
    private callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit,
  ) {
    observers.push(this);
  }
  observe = (el: Element) => void this.elements.add(el);
  unobserve = (el: Element) => void this.elements.delete(el);
  disconnect = () => this.elements.clear();
  takeRecords = () => [];
  trigger(target: Element, isIntersecting: boolean) {
    this.callback([{ target, isIntersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }
}
export const observers: FakeIntersectionObserver[] = [];
vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);

vi.stubGlobal(
  "matchMedia",
  (query: string) =>
    ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }) as unknown as MediaQueryList,
);

Object.defineProperty(navigator, "clipboard", {
  configurable: true,
  value: { writeText: () => Promise.resolve() },
});
