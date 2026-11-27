import { metadataFor, RootShell } from "@/components/root-shell";

export { viewport } from "@/components/root-shell";
export const metadata = metadataFor("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
