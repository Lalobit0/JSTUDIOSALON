import { Cake, Gift, Users, MessageCircle, type LucideIcon } from "lucide-react";

import { promos, type Promo } from "@/lib/salon";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

const badgeIcons: Record<Promo["icon"], LucideIcon> = {
  gift: Gift,
  users: Users,
  cake: Cake,
};

const copy = {
  es: {
    eyebrow: "Promociones",
    title: "Promociones vigentes",
    description:
      "Más razones para visitarnos: beneficios para clientes nuevos, para quienes nos recomiendan y en tu cumpleaños.",
    terms:
      "Promociones no acumulables. Aplican condiciones; consulta los detalles al agendar.",
  },
  en: {
    eyebrow: "Promotions",
    title: "Current promotions",
    description:
      "More reasons to visit: perks for new clients, for those who recommend us and on your birthday.",
    terms:
      "Promotions cannot be combined. Conditions apply; ask for details when you book.",
  },
} satisfies Record<Locale, unknown>;

export function Promos({ lang }: { lang: Locale }) {
  const t = copy[lang];
  return (
    <section id="promos" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promos.map((promo, i) => {
            const Icon = badgeIcons[promo.icon];
            // With an odd count, the last card fills the row on 2-column screens.
            const lastOdd = i === promos.length - 1 && promos.length % 2 === 1;
            return (
              <Reveal
                key={promo.icon}
                delay={i * 100}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-3xl border border-gold/25 bg-card/60 p-8 backdrop-blur-sm sm:p-10",
                  lastOdd && "md:col-span-2 lg:col-span-1",
                )}
              >
                <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-[radial-gradient(circle,oklch(0.66_0.13_70/0.18),transparent_65%)] opacity-70 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium tracking-wide text-gold uppercase">
                  <Icon className="size-3.5" />
                  {promo.badge[lang]}
                </span>
                <h3 className="relative mt-5 font-display text-3xl font-medium text-gold-gradient">
                  {promo.title[lang]}
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {promo.description[lang]}
                </p>
                <Button asChild className="relative mt-7 w-fit">
                  <a
                    href={promo.whatsapp[lang]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle />
                    {promo.cta[lang]}
                  </a>
                </Button>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8">
          <p className="text-center text-xs text-muted-foreground">{t.terms}</p>
        </Reveal>
      </div>
    </section>
  );
}
