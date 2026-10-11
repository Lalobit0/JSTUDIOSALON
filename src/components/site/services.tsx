import Link from "next/link";
import {
  Sparkles,
  Palette,
  Scissors,
  Droplets,
  Brush,
  Crown,
  ArrowRight,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

import { featuredServices, whatsappBookingLink, type Service } from "@/lib/salon";
import { routes, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const icons: Record<Service["icon"], LucideIcon> = {
  sparkles: Sparkles,
  palette: Palette,
  scissors: Scissors,
  droplets: Droplets,
  brush: Brush,
  crown: Crown,
};

const copy = {
  es: {
    eyebrow: "Lo que hacemos",
    title: "Servicios de salón de belleza en Tijuana",
    description:
      "Técnica Pivot Point, productos de salón y atención personalizada para realzar tu cabello.",
    more: "Ver fotos y precios",
    moreOf: (s: string) => ` de ${s}`,
    book: "Agendar por WhatsApp",
    prices: "Ver precios",
  },
  en: {
    eyebrow: "What we do",
    title: "Hair salon services in Tijuana",
    description:
      "Pivot Point technique, salon-grade products and personal attention to bring out the best in your hair.",
    more: "See photos and prices",
    moreOf: (s: string) => ` for ${s}`,
    book: "Book on WhatsApp",
    prices: "See prices",
  },
} satisfies Record<Locale, unknown>;

export function Services({ lang }: { lang: Locale }) {
  const t = copy[lang];
  return (
    <section id="servicios" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, i) => {
            const Icon = icons[service.icon];
            const title = service.title[lang];
            return (
              <Reveal
                key={title}
                delay={(i % 3) * 90}
                className="group relative flex flex-col bg-background p-8 transition-colors duration-300 hover:bg-card"
              >
                <span className="flex size-12 items-center justify-center rounded-lg border border-gold/30 bg-gold/5 text-gold transition-all duration-300 group-hover:border-gold/60 group-hover:bg-gold/10">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description[lang]}
                </p>
                {service.page && (
                  <Link
                    href={routes[service.page][lang]}
                    className="mt-4 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-gold transition-colors hover:text-gold-bright"
                  >
                    {t.more}
                    <span className="sr-only">{t.moreOf(title)}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                )}
                <span className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gold-gradient transition-transform duration-300 group-hover:scale-x-100" />
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={whatsappBookingLink[lang]} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              {t.book}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#precios">{t.prices}</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
