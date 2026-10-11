import { ArrowRight } from "lucide-react";

import { gallery, localizeGallery, salon } from "@/lib/salon";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { InstagramIcon } from "@/components/site/brand-icons";
import { GalleryGrid } from "@/components/site/gallery-grid";

const copy = {
  es: {
    eyebrow: "Portafolio",
    title: "Galería: balayage, color y peinados hechos en el salón",
    description:
      "Nuestro trabajo habla por sí solo: fotos reales de clientas. Toca una foto para verla en grande.",
    more: "Mira más transformaciones en nuestro Instagram.",
  },
  en: {
    eyebrow: "Portfolio",
    title: "Gallery: balayage, color and styles done at the salon",
    description:
      "Our work speaks for itself: real photos of our clients. Tap a photo to see it full size.",
    more: "See more transformations on our Instagram.",
  },
} satisfies Record<Locale, unknown>;

export function Gallery({ lang }: { lang: Locale }) {
  const t = copy[lang];
  return (
    <section id="galeria" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <GalleryGrid items={localizeGallery(gallery, lang)} lang={lang} />

        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">{t.more}</p>
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
