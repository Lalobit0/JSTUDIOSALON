"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Delegated click tracking for conversion actions:
 * - WhatsApp links (wa.me) -> "whatsapp_click"
 * - Phone links (tel:)      -> "call_click"
 * Reports the section id so we know which CTA drove the action.
 */
export function ConversionTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const link = el?.closest<HTMLAnchorElement>(
        'a[href*="wa.me"], a[href^="tel:"]',
      );
      if (!link) return;

      const section = link.closest("section")?.id || "global";
      const event = link.href.includes("wa.me")
        ? "whatsapp_click"
        : "call_click";
      track(event, { section });
    };

    document.addEventListener("click", handler, { capture: true });
    return () =>
      document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
}
