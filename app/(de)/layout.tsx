import { metadataFor, RootShell } from "@/components/root-shell";

export { viewport } from "@/components/root-shell";
export const metadata = metadataFor("de");

export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="de">{children}</RootShell>;
}
