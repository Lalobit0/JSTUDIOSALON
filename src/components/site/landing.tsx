import Link from "next/link";
import { ChevronRight, MapPin, Clock, MessageCircle } from "lucide-react";

import { salon } from "@/lib/salon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { Stars } from "@/components/site/stars";

/** Building blocks shared by the service pages (novias, color). */

export function LandingHero({
  crumb,
  eyebrow,
  title,
  description,
  cta,
}: {
  crumb: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: { href: string; label: string };
}) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden px-5 pt-32 pb-20 text-center sm:px-8 sm:pt-40 sm:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 radial-glow" />
      <div className="relative mx-auto max-w-3xl">
        <nav aria-label="Ruta de navegación" className="mb-8 text-sm text-muted-foreground">
          <ol className="flex items-center justify-center gap-1.5">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-gold">
                Inicio
              </Link>
            </li>
            <li aria-current="page" className="flex items-center gap-1.5 text-foreground">
              <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
              {crumb}
            </li>
          </ol>
        </nav>

        <p className="mb-5 text-xs font-medium tracking-[0.3em] text-gold uppercase">
          {eyebrow}
        </p>
        <h1 className="font-display text-[2.4rem] font-medium leading-[1.05] tracking-tight text-foreground text-balance sm:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>

        <p className="mt-7 inline-flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <Stars value={salon.rating} />
          <span className="text-foreground">{salon.rating}</span>
          <span>· {salon.reviews} reseñas en Google</span>
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={cta.href} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              {cta.label}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#precios">Ver precios</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Closing block: CTA plus address and hours, so nobody has to go back home. */
export function LandingVisit({
  id,
  cta,
}: {
  id: string;
  cta: { href: string; label: string };
}) {
  return (
    <section id={id} className="relative px-5 py-24 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="font-display text-4xl font-medium text-foreground text-balance sm:text-5xl">
          Te esperamos en El Pípila, Tijuana
        </h2>
        <ul className="mt-8 flex flex-col gap-3 text-muted-foreground">
          <li className="flex items-start justify-center gap-2">
            <MapPin className="mt-1 size-4 shrink-0 text-gold" />
            {salon.address.line1}, {salon.address.line2}
          </li>
          <li className="flex items-start justify-center gap-2">
            <Clock className="mt-1 size-4 shrink-0 text-gold" />
            <span>
              {salon.hours.weekdays} · {salon.hours.sunday}
              <span className="block text-sm text-gold">{salon.hours.note}</span>
            </span>
          </li>
        </ul>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={cta.href} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              {cta.label}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href={salon.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="directions"
            >
              Cómo llegar
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
