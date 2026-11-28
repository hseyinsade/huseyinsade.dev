import { screen, waitFor } from "@testing-library/react";
import { renderWithSite } from "@/test/render";
import { Hero } from "./Hero";

const status = (body: unknown, ok = true) =>
  vi.mocked(globalThis.fetch).mockResolvedValue(new Response(JSON.stringify(body), { status: ok ? 200 : 500 }));

describe("Hero", () => {
  it("shows the open badge from Supabase", async () => {
    status([{ available: true }]);
    renderWithSite(<Hero />, { lang: "tr" });
    expect(await screen.findByText("Yeni projelere açığım")).toBeInTheDocument();
  });

  it("shows the busy badge", async () => {
    status([{ available: false }]);
    renderWithSite(<Hero />, { lang: "de" });
    expect(await screen.findByText("Derzeit keine neuen Projekte")).toBeInTheDocument();
  });

  it("shows no badge when the status can't be read", async () => {
    status({ message: "down" }, false);
    renderWithSite(<Hero />);
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
    expect(document.querySelector("[data-available]")).toBeNull();
  });
});
