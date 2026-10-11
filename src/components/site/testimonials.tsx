import { Quote, ExternalLink } from "lucide-react";

import { salon, testimonials } from "@/lib/salon";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Marquee } from "@/components/site/marquee";
import { Stars } from "@/components/site/stars";

const copy = {
  es: {
    eyebrow: "Reseñas",
    title: "Reseñas de clientes en Google",
    description:
      "Lo que dicen nuestros clientes, con la calificación de la comunidad de Google.",
    basedOn: "Basado en",
    reviews: `${salon.reviews} reseñas`,
    onGoogle: "en Google",
    cta: "Ver reseñas en Google",
    region: "reseñas",
    pause: "Pausar reseñas",
    resume: "Reanudar reseñas",
    translated: "",
  },
  en: {
    eyebrow: "Reviews",
    title: "Client reviews on Google",
    description:
      "What our clients say, with the rating from the Google community. Reviews were written in Spanish; we show an English translation and the original.",
    basedOn: "Based on",
    reviews: `${salon.reviews} reviews`,
    onGoogle: "on Google",
    cta: "See reviews on Google",
    region: "reviews",
    pause: "Pause reviews",
    resume: "Resume reviews",
    translated: "Original in Spanish:",
  },
} satisfies Record<Locale, unknown>;

export function Testimonials({ lang }: { lang: Locale }) {
  const t = copy[lang];
  return (
    <section id="resenas" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        {/* Aggregate rating — verified social proof */}
        <Reveal className="mx-auto mt-14 max-w-md">
          <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-card/60 p-10 text-center backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 radial-glow" />
            <div className="relative">
              <p className="font-display text-7xl font-medium text-gold-gradient">
                {salon.rating.toFixed(1)}
              </p>
              <Stars value={salon.rating} className="mt-3 justify-center" />
              <p className="mt-4 text-sm text-muted-foreground">
                {t.basedOn}{" "}
                <span className="text-foreground">{t.reviews}</span>{" "}
                {t.onGoogle}
              </p>
              <Button asChild variant="outline" size="sm" className="mt-7">
                <a
                  href={salon.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="reviews"
                >
                  <ExternalLink />
                  {t.cta}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Animated, full-bleed marquee of real reviews */}
      {testimonials.length > 0 && (
        <Marquee
          label={t.region}
          pauseLabel={t.pause}
          resumeLabel={t.resume}
          className="mt-14"
          trackClassName="gap-5"
        >
          {[...testimonials, ...testimonials].map((r, i) => (
            <article
              key={`${r.name}-${i}`}
              aria-hidden={i >= testimonials.length}
              className="flex w-[19rem] shrink-0 flex-col rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm sm:w-[22rem]"
            >
              <Quote className="size-6 text-gold/50" />
              {lang === "es" ? (
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                  “{r.quote}”
                </p>
              ) : (
                <div className="mt-4 flex-1">
                  <p className="text-sm leading-relaxed text-foreground/90">
                    “{r.translation}”
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {t.translated}{" "}
                    <span lang="es-MX" className="italic">
                      “{r.quote}”
                    </span>
                  </p>
                </div>
              )}
              <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                <span className="text-sm font-medium text-foreground">
                  {r.name}
                </span>
                <Stars value={r.rating ?? 5} />
              </div>
            </article>
          ))}
        </Marquee>
      )}
    </section>
  );
}
