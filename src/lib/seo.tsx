import type { Metadata, Viewport } from "next";

import { salon, siteUrl } from "@/lib/salon";
import { htmlLang, ogLocale, routes, type Locale, type RouteKey } from "@/lib/i18n";
import { themeColors } from "@/lib/theme";

/** Absolute URL of a path ("/" stays without a trailing slash). */
export const absoluteUrl = (path: string) =>
  path === "/" ? siteUrl : `${siteUrl}${path}`;

/**
 * Per-page metadata. Next.js replaces (does not merge) nested `openGraph` and
 * `twitter` objects, so every page builds them in full here. Each page points
 * to its version in the other language (hreflang); Spanish is the default.
 */
export function pageMetadata({
  title,
  description,
  route,
  lang,
}: {
  title: string;
  description: string;
  route: RouteKey;
  lang: Locale;
}): Metadata {
  const url = absoluteUrl(routes[route][lang]);
  const other: Locale = lang === "es" ? "en" : "es";
  const image = { url: "/og.jpg", width: 1200, height: 630, alt: salon.name };
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        [htmlLang.es]: absoluteUrl(routes[route].es),
        [htmlLang.en]: absoluteUrl(routes[route].en),
        "x-default": absoluteUrl(routes[route].es),
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: [ogLocale[other]],
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

/**
 * Defaults for each language's root layout. Every page sets its own title,
 * description and canonical on top of these.
 */
export function siteMetadata(lang: Locale): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: { default: salon.name, template: `%s | ${salon.name}` },
    applicationName: salon.name,
    authors: [{ name: salon.stylist }],
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      siteName: salon.name,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: salon.name }],
    },
    twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  };
}

export const siteViewport: Viewport = {
  themeColor: themeColors.dark,
  width: "device-width",
  initialScale: 1,
};
