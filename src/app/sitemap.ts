import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/salon";

/*
 * lastModified is the date the page content last changed (not the build
 * date). Update it when editing a page's text, photos or prices.
 */
const pages: { path: string; lastModified: string; priority: number }[] = [
  { path: "/", lastModified: "2026-09-29", priority: 1 },
  { path: "/novias-y-xv-anos", lastModified: "2026-09-29", priority: 0.9 },
  { path: "/balayage-y-color", lastModified: "2026-09-29", priority: 0.9 },
  { path: "/aviso-de-privacidad", lastModified: "2026-09-29", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: p.path === "/" ? siteUrl : `${siteUrl}${p.path}`,
    lastModified: new Date(p.lastModified),
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
