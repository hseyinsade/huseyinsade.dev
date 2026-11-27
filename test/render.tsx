import { render } from "@testing-library/react";
import { Providers } from "@/components/providers";
import type { Lang } from "@/lib/content";

/** Renders inside the site context, as on a real page. */
export function renderWithSite(ui: React.ReactElement, { lang = "en" as Lang } = {}) {
  return render(<Providers lang={lang}>{ui}</Providers>);
}
