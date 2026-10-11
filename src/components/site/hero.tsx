import Image from "next/image";
import { MessageCircle, MapPin, ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Stars } from "@/components/site/stars";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { salon, whatsappBookingLink } from "@/lib/salon";
import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    titleTop: "Balayage, color y cortes",
    titleBottom: "profesionales en Tijuana",
    intro: (
      <>
        Con <span className="text-foreground">{salon.stylist}</span>, estilista
        certificado {salon.certification}. Precios desde $200, productos Olaplex
        y atención solo con cita.
      </>
    ),
    reviews: `· ${salon.reviews} reseñas en Google`,
    book: "Agendar por WhatsApp",
    prices: "Ver precios",
    scroll: "Desplazarse a servicios",
  },
  en: {
    titleTop: "Professional balayage, color",
    titleBottom: "and haircuts in Tijuana",
    intro: (
      <>
        With <span className="text-foreground">{salon.stylist}</span>, a{" "}
        {salon.certification} certified stylist. Prices from $200 MXN, Olaplex
        products and appointment-only service.
      </>
    ),
    reviews: `· ${salon.reviews} Google reviews`,
    book: "Book on WhatsApp",
    prices: "See prices",
    scroll: "Scroll to services",
  },
} satisfies Record<Locale, unknown>;

export function Hero({ lang }: { lang: Locale }) {
  const t = copy[lang];
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-16 text-center sm:px-8"
    >
      {/* Real work photo, washed with the page background for legibility.
          Decorative: the copy below describes the service. Shown at 40%
          opacity, so a lower quality and an 828px cap cost nothing visible
          and keep LCP down on phones. */}
      <Image
        src="/hero.webp"
        alt=""
        fill
        priority
        quality={50}
        sizes="(max-width: 828px) 100vw, 828px"
        // In light mode the photo becomes a soft, warm texture.
        className="object-cover object-top opacity-40 light:opacity-30 light:grayscale light:sepia-[0.35]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 via-45% to-background/95" />

      {/* Ambient background layers */}
      <div className="pointer-events-none absolute inset-0 radial-glow" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(var(--gold-bright) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.66_0.13_70/0.25),transparent_60%)] blur-2xl" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <LanguageSwitcher lang={lang} route="home" className="mb-6 flex justify-center" />

        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-foreground/5 px-4 py-1.5 text-xs font-normal tracking-[0.18em] text-gold uppercase sm:tracking-[0.25em]">
          <MapPin className="size-3.5 shrink-0" />
          {/* The brand is already in the header on phones; keep one line. */}
          <span className="hidden sm:inline">{salon.name} · </span>
          El Pípila, Tijuana
        </p>

        <h1 className="font-display text-[2.35rem] font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          <span className="block text-foreground">{t.titleTop}</span>
          <span className="block text-gold-gradient">{t.titleBottom}</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-lg font-light leading-relaxed text-muted-foreground text-balance">
          {t.intro}
        </p>

        {/* Google rating */}
        <p className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <Stars value={salon.rating} />
          <span className="text-foreground">{salon.rating}</span>
          <span>{t.reviews}</span>
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a
              href={whatsappBookingLink[lang]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle />
              {t.book}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#precios">{t.prices}</a>
          </Button>
        </div>
      </div>

      <a
        href="#servicios"
        aria-label={t.scroll}
        className="absolute bottom-6 left-1/2 z-10 flex size-11 -translate-x-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-gold"
      >
        <ArrowDown className="size-5 animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}
