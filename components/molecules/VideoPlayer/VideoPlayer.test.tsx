import { render } from "@testing-library/react";
import { VideoPlayer } from "./VideoPlayer";

it("is hidden from assistive tech", () => {
  const { container } = render(<VideoPlayer />);
  expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
});
