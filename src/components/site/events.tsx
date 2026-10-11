import Link from "next/link";
import {
  Crown,
  Sparkles,
  Camera,
  MessageCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import { eventServices, whatsappEventLink, type EventService } from "@/lib/salon";
import { routes, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export const eventIcons: Record<EventService["icon"], LucideIcon> = {
  crown: Crown,
  sparkles: Sparkles,
  camera: Camera,
};

const copy = {
  es: {
    eyebrow: "Tu día especial",
    title: "Maquillaje y peinado para novias, XV años y eventos",
    description:
      "Para los momentos que se recuerdan toda la vida. Maquillaje, peinado y asesoría de imagen con la técnica de un estilista certificado Pivot Point.",
    note: "Cada evento se cotiza a la medida según tu look y el número de personas. Aparta tu fecha con anticipación — las temporadas se llenan rápido.",
    quote: "Cotizar mi evento",
    more: "Ver novias y XV años",
  },
  en: {
    eyebrow: "Your special day",
    title: "Makeup and hair for brides, quinceañeras and events",
    description:
      "For the moments you remember for a lifetime. Makeup, hair and image consulting with the technique of a Pivot Point certified stylist.",
    note: "Every event gets a custom quote based on your look and the number of people. Book your date early: the seasons fill up fast.",
    quote: "Get an event quote",
    more: "See bridal & quinceañera",
  },
} satisfies Record<Locale, unknown>;

export function Events({ lang }: { lang: Locale }) {
  const t = copy[lang];
  return (
    <section id="novias" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      {/* Warm spotlight to set the section apart */}
      <div className="pointer-events-none absolute inset-0 radial-glow" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.66_0.13_70/0.15),transparent_60%)] blur-2xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <EventCards lang={lang} className="mt-16" />

        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-sm text-muted-foreground">{t.note}</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={whatsappEventLink[lang]} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                {t.quote}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={routes.bridal[lang]}>
                {t.more}
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Brides · Quinceañeras · Events cards, shared with the bridal page. */
export function EventCards({ lang, className }: { lang: Locale; className?: string }) {
  return (
    <div className={`grid gap-6 md:grid-cols-3 ${className ?? ""}`}>
      {eventServices.map((service, i) => {
        const Icon = eventIcons[service.icon];
        return (
          <Reveal
            key={service.icon}
            delay={i * 90}
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gold/20 bg-card/50 p-8 text-center backdrop-blur-sm transition-colors duration-300 hover:border-gold/45"
          >
            <span className="flex size-14 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold transition-transform duration-300 group-hover:scale-110">
              <Icon className="size-6" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-medium text-foreground">
              {service.title[lang]}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {service.description[lang]}
            </p>
          </Reveal>
        );
      })}
    </div>
  );
}
