import { render } from "@testing-library/react";
import { BAR_COUNT, Waveform } from "./Waveform";

it("renders decorative bars without inline styles", () => {
  const { container } = render(<Waveform />);
  const wave = container.firstElementChild!;
  expect(wave).toHaveAttribute("aria-hidden", "true");
  expect(wave.children).toHaveLength(BAR_COUNT);
  expect(container.querySelector("[style]")).toBeNull();
});
