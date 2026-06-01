import { BadgeCheck, Star, Sparkles, HeartHandshake } from "lucide-react";

import { salon } from "@/lib/salon";
import { Reveal } from "@/components/site/reveal";
import { Logo } from "@/components/site/logo";

const highlights = [
  {
    icon: BadgeCheck,
    title: "Estilista certificado",
    text: "Formación y técnica Pivot Point, referente internacional en estilismo.",
  },
  {
    icon: Sparkles,
    title: "Productos premium",
    text: "Trabajamos con líneas profesionales para cuidar y proteger tu cabello.",
  },
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    text: "Valoramos tu tipo de cabello y tus metas antes de cada servicio.",
  },
];

export function Studio() {
  return (
    <section id="estudio" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        {/* Visual side */}
        <Reveal className="order-last lg:order-first">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-card to-background">
            <div className="pointer-events-none absolute inset-0 radial-glow" />
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-[radial-gradient(circle,oklch(0.66_0.13_70/0.3),transparent_60%)] blur-2xl" />
            <div className="relative flex h-full flex-col items-center justify-center gap-8 p-10 text-center">
              <Logo withText={false} className="[&_svg]:size-28" />
              <div>
                <p className="font-display text-3xl font-medium text-gold-gradient">
                  {salon.stylist}
                </p>
                <p className="mt-2 text-sm font-light tracking-[0.25em] text-muted-foreground uppercase">
                  {salon.title} · {salon.certification}
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-gold/30 bg-background/50 px-5 py-2 backdrop-blur-sm">
                <Star className="size-4 fill-gold text-gold" />
                <span className="text-sm text-foreground">
                  {salon.rating} · {salon.reviews} reseñas
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text side */}
        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] text-gold uppercase">
              <span className="h-px w-8 bg-gold-gradient" />
              El Estudio
            </p>
            <h2 className="font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl text-balance">
              Un espacio dedicado a tu mejor versión
            </h2>
            <p className="mt-5 text-base font-light leading-relaxed text-muted-foreground text-pretty">
              En {salon.name} cada cita es una experiencia. Joaquín combina
              técnica certificada, productos profesionales y un trato cálido
              para que salgas sintiéndote increíble. Desde un cambio de color
              radical hasta un corte que va contigo, cuidamos cada detalle.
            </p>
          </Reveal>

          <div className="mt-10 flex flex-col gap-5">
            {highlights.map((h, i) => (
              <Reveal
                key={h.title}
                delay={i * 80}
                className="flex gap-4"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/5 text-gold">
                  <h.icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-medium text-foreground">
                    {h.title}
                  </h3>
                  <p className="mt-1 text-sm font-light leading-relaxed text-muted-foreground">
                    {h.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
