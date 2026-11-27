import { metadataFor, RootShell } from "@/components/root-shell";

export { viewport } from "@/components/root-shell";
export const metadata = metadataFor("tr");

export default function TurkishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="tr">{children}</RootShell>;
}
