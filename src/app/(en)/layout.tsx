import { RootDocument } from "@/components/site/root-document";
import { siteMetadata, siteViewport } from "@/lib/seo";

// English site: everything under /en.
export const metadata = siteMetadata("en");
export const viewport = siteViewport;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
