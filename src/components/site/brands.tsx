import Image from "next/image";

import { brands } from "@/lib/salon";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export function Brands() {
  return (
    <section id="productos" className="relative px-5 py-20 sm:px-8 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-5xl text-center">
        <SectionHeading
          eyebrow="Calidad profesional"
          title="Trabajamos con marcas premium"
          description="Productos profesionales para cuidar, reparar y proteger tu cabello en cada servicio."
        />

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-16">
          {brands.map((brand) => (
            <div key={brand.name} className="group">
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={`Logo de ${brand.name}`}
                  width={150}
                  height={56}
                  className="h-12 w-auto object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              ) : (
                <span className="font-display text-2xl font-medium tracking-[0.12em] text-foreground/70 uppercase transition-colors duration-300 group-hover:text-gold sm:text-3xl">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
