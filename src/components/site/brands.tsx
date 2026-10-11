import Image from "next/image";

import { brands } from "@/lib/salon";
import type { Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/site/section-heading";
import { Marquee } from "@/components/site/marquee";

// Repeat enough times to fill wide screens, then duplicate the whole run so the
// marquee loops seamlessly at -50%.
const run = [...brands, ...brands, ...brands, ...brands];

const copy = {
  es: {
    eyebrow: "Calidad profesional",
    title: "Marcas profesionales que usamos en cada servicio",
    description:
      "Productos profesionales para cuidar, reparar y proteger tu cabello en cada servicio.",
    region: "marcas",
    pause: "Pausar marcas",
    resume: "Reanudar marcas",
    logo: (name: string) => `Logo de ${name}`,
  },
  en: {
    eyebrow: "Professional quality",
    title: "Professional brands we use in every service",
    description:
      "Professional products to care for, repair and protect your hair in every service.",
    region: "brands",
    pause: "Pause brands",
    resume: "Resume brands",
    logo: (name: string) => `${name} logo`,
  },
} satisfies Record<Locale, unknown>;

export function Brands({ lang }: { lang: Locale }) {
  const t = copy[lang];
  return (
    <section id="productos" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      </div>

      <Marquee
        label={t.region}
        pauseLabel={t.pause}
        resumeLabel={t.resume}
        className="mt-12"
        trackClassName="marquee-track-brands items-center"
      >
        {[...run, ...run].map((brand, i) => (
          // Only the first run is exposed to assistive tech; the rest are
          // visual repeats for the loop.
          <div
            key={`${brand.name}-${i}`}
            aria-hidden={i >= brands.length}
            className="group shrink-0 px-8 sm:px-12"
          >
            {brand.logo ? (
              <Image
                src={brand.logo}
                alt={t.logo(brand.name)}
                width={150}
                height={56}
                className="h-10 w-auto object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            ) : (
              <span className="font-display text-2xl font-medium tracking-[0.12em] text-foreground/55 uppercase transition-colors duration-300 group-hover:text-gold sm:text-3xl">
                {brand.name}
              </span>
            )}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
