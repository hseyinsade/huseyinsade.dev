import { screen } from "@testing-library/react";
import { renderWithSite } from "@/test/render";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("shows email, phone and a mail form in the page language", () => {
    renderWithSite(<Contact />, { lang: "tr" });
    expect(screen.getByRole("link", { name: "info@huseyinsade.dev" })).toHaveAttribute("href", "mailto:info@huseyinsade.dev");
    expect(screen.getByRole("link", { name: /Telefon/ })).toHaveAttribute("href", "tel:+905550670436");
    expect(screen.getByRole("link", { name: /Telefon/ })).not.toHaveAttribute("target");
    expect(screen.getByLabelText("Mesajın")).toBeRequired();
    expect(screen.getByRole("button", { name: /Gönder/ })).toHaveAttribute("type", "submit");
  });

  it("opens social profiles in a new tab", () => {
    renderWithSite(<Contact />);
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("rel", "noreferrer");
  });
});
