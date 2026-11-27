import { metadataFor, RootShell } from "@/components/templates/RootShell";

export { viewport } from "@/components/templates/RootShell";
export const metadata = metadataFor("de");

export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="de">{children}</RootShell>;
}
