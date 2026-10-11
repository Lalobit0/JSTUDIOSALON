import { RootDocument } from "@/components/site/root-document";
import { siteMetadata, siteViewport } from "@/lib/seo";

// Spanish site: every page outside /en.
export const metadata = siteMetadata("es");
export const viewport = siteViewport;

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="es">{children}</RootDocument>;
}
