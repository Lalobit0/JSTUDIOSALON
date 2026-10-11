import { Banknote, CalendarCheck, Languages, MessageCircle, type LucideIcon } from "lucide-react";

import { salon, whatsappBookingLink } from "@/lib/salon";
import { htmlLang, routes, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

type Item = { icon: LucideIcon; title: string; text: string };

const copy = {
  es: {
    eyebrow: "¿Vienes de Estados Unidos?",
    title: "Clientes de ambos lados de la frontera confían en nosotros",
    items: [
      { icon: Banknote, title: "Formas de pago", text: salon.payments.es },
      {
        icon: Languages,
        title: "Idiomas",
        text: "Te atendemos en español e inglés básico. Este sitio también está en inglés.",
      },
      {
        icon: CalendarCheck,
        title: "Solo con cita",
        text: "Agenda por WhatsApp y te atendemos a tu hora, sin esperas.",
      },
    ] satisfies Item[],
    book: "Agendar por WhatsApp",
    other: "View this site in English",
  },
  en: {
    eyebrow: "Visiting from the U.S.?",
    title: "Trusted by clients from both sides of the border",
    items: [
      {
        icon: Banknote,
        title: "Payment",
        text: `${salon.payments.en} Prices are in Mexican pesos (MXN).`,
      },
      {
        icon: Languages,
        title: "Language",
        text: "We speak basic English. Our WhatsApp messages include a Spanish version, so booking is easy.",
      },
      {
        icon: CalendarCheck,
        title: "By appointment only",
        text: "Book on WhatsApp and we'll see you at your time, with no waiting.",
      },
    ] satisfies Item[],
    book: "Book on WhatsApp",
    other: "Ver el sitio en español",
  },
} satisfies Record<Locale, unknown>;

/**
 * Trust line for clients who cross the border, plus what they need to know
 * before visiting (payment in USD, language, appointments).
 */
export function CrossBorder({ lang }: { lang: Locale }) {
  const t = copy[lang];
  const other: Locale = lang === "es" ? "en" : "es";
  return (
    <section id="frontera" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-28">
      <div className="pointer-events-none absolute inset-0 radial-glow" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {t.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 90}
              className="flex flex-col rounded-2xl border border-gold/20 bg-card/60 p-7 backdrop-blur-sm"
            >
              <span className="flex size-11 items-center justify-center rounded-lg border border-gold/30 bg-gold/5 text-gold">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <a href={whatsappBookingLink[lang]} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              {t.book}
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a
              href={routes.home[other]}
              hrefLang={htmlLang[other]}
              lang={htmlLang[other]}
              data-track="language"
            >
              <Languages />
              {t.other}
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
