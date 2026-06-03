import Image from "next/image";

import { brands } from "@/lib/salon";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

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
          title="Trabajamos con marcas premium"
          description="Productos profesionales para cuidar, reparar y proteger tu cabello en cada servicio."
        />
      </div>

      <Reveal className="marquee-viewport relative mt-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track marquee-track-brands items-center">
          {[...run, ...run].map((brand, i) => (
            <div key={`${brand.name}-${i}`} className="group shrink-0 px-8 sm:px-12">
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
        </div>
      </Reveal>
    </section>
  );
}
