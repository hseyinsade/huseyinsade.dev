import { metadataFor, RootShell } from "@/components/templates/RootShell";

export { viewport } from "@/components/templates/RootShell";
export const metadata = metadataFor("tr");

export default function TurkishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="tr">{children}</RootShell>;
}
