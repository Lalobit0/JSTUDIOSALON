"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

import { trackEvent } from "@/lib/analytics";

const SOCIAL_HOSTS: Record<string, string> = {
  "instagram.com": "instagram",
  "facebook.com": "facebook",
  "tiktok.com": "tiktok",
};

/** Where the link lives: section id, or header/footer/global. */
function locate(el: Element) {
  const section = el.closest("section[id]")?.id;
  if (section) return section;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  return "global";
}

/**
 * Delegated conversion tracking, sent to Vercel Web Analytics (WhatsApp and
 * calls only) and to the GTM dataLayer (all events):
 * - wa.me links        -> click_whatsapp   (key event)
 * - tel: links         -> click_phone      (key event)
 * - data-track links   -> click_directions / click_reviews
 * - social profiles    -> click_social
 * - FAQ <details> open -> faq_open
 * - [data-track-view="pricing"] visible -> view_pricing (once per page)
 */
export function ConversionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.href;
      const cta_location = locate(link);
      const cta_text = (link.textContent?.trim() || link.getAttribute("aria-label") || "").slice(0, 80);

      if (href.includes("wa.me")) {
        track("whatsapp_click", { section: cta_location });
        trackEvent("click_whatsapp", { cta_location, cta_text });
        return;
      }
      if (href.startsWith("tel:")) {
        track("call_click", { section: cta_location });
        trackEvent("click_phone", { cta_location, cta_text });
        return;
      }
      const tracked = link.dataset.track;
      if (tracked === "directions" || tracked === "reviews") {
        trackEvent(`click_${tracked}`, { cta_location });
        return;
      }
      const network = Object.entries(SOCIAL_HOSTS).find(([host]) =>
        link.hostname.endsWith(host),
      )?.[1];
      if (network) trackEvent("click_social", { network, cta_location });
    };

    // `toggle` does not bubble, so listen in the capture phase.
    const onToggle = (e: Event) => {
      const details = e.target as HTMLDetailsElement;
      if (details.tagName !== "DETAILS" || !details.open) return;
      const question = details.querySelector("summary")?.textContent?.trim();
      trackEvent("faq_open", { question: question?.slice(0, 100) });
    };

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("toggle", onToggle, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("toggle", onToggle, { capture: true });
    };
  }, []);

  // Re-armed on every client-side navigation.
  useEffect(() => {
    const target = document.querySelector('[data-track-view="pricing"]');
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        trackEvent("view_pricing", { cta_location: target.id || "pricing" });
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
