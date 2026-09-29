import Image from "next/image";

import { brands } from "@/lib/salon";
import { SectionHeading } from "@/components/site/section-heading";
import { Marquee } from "@/components/site/marquee";

// Repeat enough times to fill wide screens, then duplicate the whole run so the
// marquee loops seamlessly at -50%.
const run = [...brands, ...brands, ...brands, ...brands];

export function Brands() {
  return (
    <section id="productos" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <SectionHeading
          eyebrow="Calidad profesional"
          title="Marcas profesionales que usamos en cada servicio"
          description="Productos profesionales para cuidar, reparar y proteger tu cabello en cada servicio."
        />
      </div>

      <Marquee label="marcas" className="mt-12" trackClassName="marquee-track-brands items-center">
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
                alt={`Logo de ${brand.name}`}
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
