import { ArrowRight } from "lucide-react";

import { gallery, salon } from "@/lib/salon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { InstagramIcon } from "@/components/site/brand-icons";
import { GalleryGrid } from "@/components/site/gallery-grid";

export function Gallery() {
  return (
    <section id="galeria" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Portafolio"
          title="Nuestro trabajo habla por sí solo"
          description="Color, balayage, rayitos, alaciado, rizos y maquillaje hechos en el salón. Toca una foto para verla en grande."
        />

        <GalleryGrid items={gallery} />

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
