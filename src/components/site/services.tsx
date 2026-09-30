import Link from "next/link";
import {
  Sparkles,
  Palette,
  Scissors,
  Droplets,
  Brush,
  Crown,
  ArrowRight,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

import { featuredServices, whatsappBookingLink, type Service } from "@/lib/salon";
import { Button } from "@/components/ui/button";
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
          title="Servicios de salón de belleza en Tijuana"
          description="Técnica Pivot Point, productos de salón y atención personalizada para realzar tu cabello."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal
                key={service.title}
                delay={(i % 3) * 90}
                className="group relative flex flex-col bg-background p-8 transition-colors duration-300 hover:bg-card"
              >
                <span className="flex size-12 items-center justify-center rounded-lg border border-gold/30 bg-gold/5 text-gold transition-all duration-300 group-hover:border-gold/60 group-hover:bg-gold/10">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                {service.href && (
                  <Link
                    href={service.href}
                    className="mt-4 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium text-gold transition-colors hover:text-gold-bright"
                  >
                    Ver fotos y precios
                    <span className="sr-only"> de {service.title}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                )}
                <span className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gold-gradient transition-transform duration-300 group-hover:scale-x-100" />
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={whatsappBookingLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              Agendar por WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#precios">Ver precios</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
