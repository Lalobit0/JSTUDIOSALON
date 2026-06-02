import { Gift, Users, MessageCircle, type LucideIcon } from "lucide-react";

import { promos, whatsappLink } from "@/lib/salon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const badgeIcons: Record<string, LucideIcon> = {
  "Clientes nuevos": Gift,
  Referidos: Users,
};

export function Promos() {
  return (
    <section id="promos" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Promociones"
          title="Más razones para visitarnos"
          description="Beneficios para clientes nuevos y para quienes nos recomiendan."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {promos.map((promo, i) => {
            const Icon = badgeIcons[promo.badge] ?? Gift;
            return (
              <Reveal
                key={promo.title}
                delay={i * 100}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gold/25 bg-card/60 p-8 backdrop-blur-sm sm:p-10"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-[radial-gradient(circle,oklch(0.66_0.13_70/0.18),transparent_65%)] opacity-70 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium tracking-wide text-gold uppercase">
                  <Icon className="size-3.5" />
                  {promo.badge}
                </span>
                <h3 className="relative mt-5 font-display text-3xl font-medium text-gold-gradient">
                  {promo.title}
                </h3>
                <p className="relative mt-3 flex-1 text-sm font-light leading-relaxed text-muted-foreground">
                  {promo.description}
                </p>
                <Button asChild className="relative mt-7 w-fit">
                  <a
                    href={whatsappLink(promo.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle />
                    {promo.cta}
                  </a>
                </Button>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-8">
          <p className="text-center text-xs font-light text-muted-foreground">
            Promociones no acumulables. Aplican condiciones; consulta los detalles
            al agendar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
