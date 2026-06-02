import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { gallery, salon } from "@/lib/salon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { InstagramIcon } from "@/components/site/brand-icons";

export function Gallery() {
  return (
    <section id="galeria" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Portafolio"
          title="Nuestro trabajo habla por sí solo"
          description="Color, balayage, rayitos, alaciado, rizos y maquillaje hechos en el salón."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {gallery.map((item, i) => (
            <Reveal
              key={item.src}
              delay={(i % 4) * 70}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-light text-muted-foreground">
            Mira más transformaciones en nuestro Instagram.
          </p>
          <Button asChild variant="outline" size="lg">
            <a
              href={salon.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
              {salon.social.instagramHandle}
              <ArrowRight />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
