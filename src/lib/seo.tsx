import type { Metadata } from "next";

import { salon, siteUrl } from "@/lib/salon";

/**
 * Per-page metadata. Next.js replaces (does not merge) nested `openGraph` and
 * `twitter` objects, so every page builds them in full here.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const image = { url: "/og.jpg", width: 1200, height: 630, alt: salon.name };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_MX",
      siteName: salon.name,
      url,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

/** JSON-LD <script>; `data` must be plain serializable schema.org objects. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const salonId = `${siteUrl}/#salon`;

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? `${siteUrl}/` : `${siteUrl}${item.path}`,
    })),
  };
}
