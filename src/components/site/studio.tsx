import Image from "next/image";
import { BadgeCheck, Star, Sparkles, HeartHandshake } from "lucide-react";

import { salon } from "@/lib/salon";
import type { Locale, Localized } from "@/lib/i18n";
import { Reveal } from "@/components/site/reveal";
import { Amenities, amenitiesTitle } from "@/components/site/amenities";

export const highlights: { icon: typeof BadgeCheck; title: Localized; text: Localized }[] = [
  {
    icon: BadgeCheck,
    title: { es: "Estilista certificado", en: "Certified stylist" },
    text: {
      es: "Formación y técnica Pivot Point, referente internacional en estilismo.",
      en: "Pivot Point training and technique, an international benchmark in hairstyling.",
    },
  },
  {
    icon: Sparkles,
    title: { es: "Productos premium", en: "Premium products" },
    text: {
      es: "Trabajamos con líneas profesionales para cuidar y proteger tu cabello.",
      en: "We work with professional lines to care for and protect your hair.",
    },
  },
  {
    icon: HeartHandshake,
    title: { es: "Atención personalizada", en: "Personal attention" },
    text: {
      es: "Valoramos tu tipo de cabello y tus metas antes de cada servicio.",
      en: "We assess your hair type and your goals before every service.",
    },
  },
];

const copy = {
  es: {
    photoAlt:
      "Joaquín Alonzo Gaytán, estilista certificado Pivot Point, peinando a una clienta en el salón",
    reviews: `${salon.rating} · ${salon.reviews} reseñas`,
    eyebrow: "El Estudio",
    title: "Joaquín Alonzo Gaytán, estilista certificado Pivot Point",
    text: `Un espacio dedicado a tu mejor versión. En ${salon.name} cada cita es una experiencia. Joaquín combina técnica certificada, productos profesionales y un trato cálido para que salgas sintiéndote increíble. Desde un cambio de color radical hasta un corte que va contigo, cuidamos cada detalle.`,
  },
  en: {
    photoAlt:
      "Joaquín Alonzo Gaytán, Pivot Point certified stylist, styling a client's hair at the salon",
    reviews: `${salon.rating} · ${salon.reviews} reviews`,
    eyebrow: "The Studio",
    title: "Joaquín Alonzo Gaytán, Pivot Point certified stylist",
    text: `A space devoted to the best version of you. At ${salon.name}, every appointment is an experience. Joaquín combines certified technique, professional products and a warm welcome so you leave feeling amazing. From a bold color change to a cut that suits you, we take care of every detail.`,
  },
} satisfies Record<Locale, unknown>;

export function Studio({ lang }: { lang: Locale }) {
  const t = copy[lang];
  return (
    <section id="estudio" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        {/* Visual side. Light text over the darkened photo in both themes. */}
        <Reveal className="order-last lg:order-first">
          <div
            data-theme="dark"
            className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl border border-gold/20"
          >
            <Image
              src="/joaquin.webp"
              alt={t.photoAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 28rem"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-7 text-center">
              <div>
                <p className="font-display text-3xl font-medium text-gold-gradient">
                  {salon.stylist}
                </p>
                <p className="mt-1 text-xs font-light tracking-[0.25em] text-foreground/80 uppercase">
                  {salon.title[lang]} · {salon.certification}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-gold/30 bg-background/60 px-4 py-1.5 backdrop-blur-sm">
                <Star className="size-4 fill-gold text-gold" />
                <span className="text-sm text-foreground">{t.reviews}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text side */}
        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] text-gold uppercase">
              <span className="h-px w-8 bg-gold-gradient" />
              {t.eyebrow}
            </p>
            <h2 className="font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl text-balance">
              {t.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty">
              {t.text}
            </p>
          </Reveal>

          <div className="mt-10">
            <Highlights lang={lang} />
          </div>

          <Reveal className="mt-10">
            <h3 className="text-xs font-medium tracking-[0.3em] text-gold uppercase">
              {amenitiesTitle[lang]}
            </h3>
            <Amenities lang={lang} className="mt-4" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Certified stylist · Premium products · Personal attention. */
export function Highlights({ lang }: { lang: Locale }) {
  return (
    <div className="flex flex-col gap-5">
      {highlights.map((h, i) => (
        <Reveal key={h.title.es} delay={i * 80} className="flex gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/5 text-gold">
            <h.icon className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-medium text-foreground">{h.title[lang]}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {h.text[lang]}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
