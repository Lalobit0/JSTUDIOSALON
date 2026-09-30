import { ChevronDown } from "lucide-react";

import { faqs, type Faq } from "@/lib/salon";
import { JsonLd } from "@/lib/seo";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

/**
 * FAQ accordion. The FAQPage schema is only emitted once (home page) so the
 * same questions are not marked up on several URLs.
 */
export function Faqs({
  items = faqs,
  title = "Preguntas frecuentes sobre citas y precios",
  withSchema = true,
}: {
  items?: readonly Faq[];
  title?: string;
  withSchema?: boolean;
}) {
  return (
    <section id="faq" className="relative px-5 py-24 sm:px-8 sm:py-32">
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title={title}
        />

        <Reveal className="mt-12 divide-y divide-border/70 border-y border-border/70">
          {items.map((faq) => (
            <details key={faq.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-display text-lg font-medium text-foreground transition-colors group-open:text-gold">
                  {faq.q}
                </span>
                <ChevronDown className="size-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
