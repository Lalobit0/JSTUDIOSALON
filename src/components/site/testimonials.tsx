import { Star, Quote, ExternalLink } from "lucide-react";

import { salon, testimonials } from "@/lib/salon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

function Stars({ value = 5, className = "" }: { value?: number; className?: string }) {
  return (
    <span className={`flex ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-4 fill-gold text-gold"
          style={{ opacity: i < Math.round(value) ? 1 : 0.25 }}
        />
      ))}
    </span>
  );
}

export function Testimonials() {
  return (
    <section id="resenas" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Reseñas"
          title="Lo que dicen nuestros clientes"
          description="Calificación verificada por la comunidad de Google."
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
              <p className="mt-4 text-sm font-light text-muted-foreground">
                Basado en{" "}
                <span className="text-foreground">{salon.reviews} reseñas</span>{" "}
                en Google
              </p>
              <Button asChild variant="outline" size="sm" className="mt-7">
                <a
                  href={salon.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink />
                  Ver reseñas en Google
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Individual testimonials (only renders when real reviews exist) */}
        {testimonials.length > 0 && (
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                delay={(i % 3) * 90}
                className="flex flex-col rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm"
              >
                <Quote className="size-6 text-gold/50" />
                <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-foreground/90">
                  “{t.quote}”
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                  <span className="text-sm font-medium text-foreground">
                    {t.name}
                  </span>
                  <Stars value={t.rating ?? 5} />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
