import { Quote, ExternalLink } from "lucide-react";

import { salon, testimonials } from "@/lib/salon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Marquee } from "@/components/site/marquee";
import { Stars } from "@/components/site/stars";

export function Testimonials() {
  return (
    <section id="resenas" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Reseñas"
          title="Reseñas de clientes en Google"
          description="Lo que dicen nuestros clientes, con la calificación de la comunidad de Google."
        />

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
                Basado en{" "}
                <span className="text-foreground">{salon.reviews} reseñas</span>{" "}
                en Google
              </p>
              <Button asChild variant="outline" size="sm" className="mt-7">
                <a
                  href={salon.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="reviews"
                >
                  <ExternalLink />
                  Ver reseñas en Google
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Animated, full-bleed marquee of real reviews */}
      {testimonials.length > 0 && (
        <Marquee label="reseñas" className="mt-14" trackClassName="gap-5">
          {[...testimonials, ...testimonials].map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              aria-hidden={i >= testimonials.length}
              className="flex w-[19rem] shrink-0 flex-col rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm sm:w-[22rem]"
            >
              <Quote className="size-6 text-gold/50" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                “{t.quote}”
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                <span className="text-sm font-medium text-foreground">
                  {t.name}
                </span>
                <Stars value={t.rating ?? 5} />
              </div>
            </article>
          ))}
        </Marquee>
      )}
    </section>
  );
}
