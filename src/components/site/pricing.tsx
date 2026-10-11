import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import {
  formatPrice,
  priceList,
  whatsappBookingLink,
  type PriceItem,
} from "@/lib/salon";
import { routes, type Locale, type Localized, type RouteKey } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

const copy = {
  es: {
    eyebrow: "Lista de precios",
    title: "Precios de balayage, tintes, cortes y tratamientos",
    description:
      "Tarifas claras en pesos mexicanos para cabello corto. El cabello largo o de mayor densidad se cotiza durante tu valoración.",
    question:
      "¿Dudas sobre tu servicio o cabello largo? Escríbenos y te damos una cotización sin compromiso.",
    cta: "Cotizar y agendar",
    photos: "Ver fotos de balayage y color",
  },
  en: {
    eyebrow: "Price list",
    title: "Prices for balayage, color, haircuts and treatments",
    description:
      "Clear prices in Mexican pesos (MXN) for short hair. Long or thicker hair is quoted during your consultation.",
    question:
      "Questions about your service or long hair? Message us for a no-obligation quote.",
    cta: "Get a quote and book",
    photos: "See balayage and color photos",
  },
} satisfies Record<Locale, unknown>;

/** A price card: localized title, items and an optional page with photos. */
export type PriceCard = { title: Localized; items: readonly PriceItem[]; page?: RouteKey };

export function PriceCards({
  categories,
  lang,
  className,
  linkCategories = false,
}: {
  categories: readonly PriceCard[];
  lang: Locale;
  className?: string;
  linkCategories?: boolean;
}) {
  return (
    <div className={cn("grid gap-6", className)}>
      {categories.map((category, ci) => {
        const page = linkCategories ? category.page : undefined;
        return (
          <Reveal
            key={category.title.es}
            delay={ci * 90}
            className="flex flex-col rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm"
          >
            <h3 className="font-display text-2xl font-medium text-gold-gradient">
              {category.title[lang]}
            </h3>
            <span className="mt-4 mb-2 h-px w-full bg-border" />
            <ul className="flex flex-col">
              {category.items.map((item) => (
                <li
                  key={item.name.es}
                  className="flex items-baseline justify-between gap-4 border-b border-border/60 py-3 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-foreground">{item.name[lang]}</p>
                    {item.note && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.note[lang]}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 whitespace-nowrap font-display text-base font-medium text-gold">
                    {formatPrice(item.price, lang)}
                  </span>
                </li>
              ))}
            </ul>
            {page && (
              <Link
                href={routes[page][lang]}
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-gold transition-colors hover:text-gold-bright"
              >
                {copy[lang].photos}
                <ArrowRight className="size-4" />
              </Link>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}

export function Pricing({ lang }: { lang: Locale }) {
  const t = copy[lang];
  return (
    <section
      id="precios"
      data-track-view="pricing"
      className="relative px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* faint divider glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <PriceCards
          categories={priceList}
          lang={lang}
          linkCategories
          className="mt-16 lg:grid-cols-3"
        />

        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">{t.question}</p>
          <Button asChild size="lg">
            <a
              href={whatsappBookingLink[lang]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle />
              {t.cta}
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
