import { ChevronDown } from "lucide-react";

import { faqs, type Faq } from "@/lib/salon";
import type { Locale } from "@/lib/i18n";
import { JsonLd } from "@/lib/seo";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const copy = {
  es: { eyebrow: "Preguntas frecuentes", title: "Preguntas frecuentes sobre citas y precios" },
  en: { eyebrow: "FAQ", title: "Frequently asked questions about appointments and prices" },
} satisfies Record<Locale, unknown>;

/**
 * FAQ accordion. The FAQPage schema is only emitted on the home page of each
 * language so the same questions are not marked up on several URLs.
 */
export function Faqs({
  lang,
  items = faqs,
  title,
  withSchema = true,
}: {
  lang: Locale;
  items?: readonly Faq[];
  title?: string;
  withSchema?: boolean;
}) {
  const t = copy[lang];
  return (
    <section id="faq" className="relative px-5 py-24 sm:px-8 sm:py-32">
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: lang === "es" ? "es-MX" : "en",
            mainEntity: items.map((f) => ({
              "@type": "Question",
              name: f.q[lang],
              acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
            })),
          }}
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow={t.eyebrow} title={title ?? t.title} />

        <Reveal className="mt-12 divide-y divide-border/70 border-y border-border/70">
          {items.map((faq) => (
            <details key={faq.q.es} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-display text-lg font-medium text-foreground transition-colors group-open:text-gold">
                  {faq.q[lang]}
                </span>
                <ChevronDown className="size-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.a[lang]}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
