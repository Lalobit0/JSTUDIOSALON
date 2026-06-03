import { ChevronDown } from "lucide-react";

import { faqs } from "@/lib/salon";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Faqs() {
  return (
    <section id="faq" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resolvemos tus dudas"
        />

        <Reveal className="mt-12 divide-y divide-border/70 border-y border-border/70">
          {faqs.map((faq) => (
            <details key={faq.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-display text-lg font-medium text-foreground transition-colors group-open:text-gold">
                  {faq.q}
                </span>
                <ChevronDown className="size-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-sm font-light leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
