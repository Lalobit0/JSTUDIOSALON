import type { MetadataRoute } from "next";

import { htmlLang, locales, routes, type RouteKey } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

/*
 * lastModified is the date the page content last changed (not the build
 * date). Update it when editing a page's text, photos or prices. Each page
 * is listed in both languages, pointing to each other (hreflang).
 */
const pages: { route: RouteKey; lastModified: string; priority: number }[] = [
  { route: "home", lastModified: "2026-10-18", priority: 1 },
  { route: "bridal", lastModified: "2026-10-18", priority: 0.9 },
  { route: "color", lastModified: "2026-10-18", priority: 0.9 },
  { route: "privacy", lastModified: "2026-10-11", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((p) =>
    locales.map((lang) => ({
      url: absoluteUrl(routes[p.route][lang]),
      lastModified: new Date(p.lastModified),
      changeFrequency: "monthly" as const,
      priority: p.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [htmlLang[l], absoluteUrl(routes[p.route][l])]),
        ),
      },
    })),
  );
}
