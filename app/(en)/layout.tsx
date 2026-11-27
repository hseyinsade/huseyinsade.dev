import { metadataFor, RootShell } from "@/components/templates/RootShell";

export { viewport } from "@/components/templates/RootShell";
export const metadata = metadataFor("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
