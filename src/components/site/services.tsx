import {
  Sparkles,
  Palette,
  Scissors,
  Droplets,
  Brush,
  Crown,
  type LucideIcon,
} from "lucide-react";

import { featuredServices, type Service } from "@/lib/salon";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const icons: Record<Service["icon"], LucideIcon> = {
  sparkles: Sparkles,
  palette: Palette,
  scissors: Scissors,
  droplets: Droplets,
  brush: Brush,
  crown: Crown,
};

export function Services() {
  return (
    <section id="servicios" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Lo que hacemos"
          title="Servicios de estilismo profesional"
          description="Técnica Pivot Point, productos de salón y atención personalizada para realzar tu cabello."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal
                key={service.title}
                delay={(i % 3) * 90}
                className="group relative bg-background p-8 transition-colors duration-300 hover:bg-card"
              >
                <span className="flex size-12 items-center justify-center rounded-lg border border-gold/30 bg-gold/5 text-gold transition-all duration-300 group-hover:border-gold/60 group-hover:bg-gold/10">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <span className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gold-gradient transition-transform duration-300 group-hover:scale-x-100" />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
