import { MessageCircle } from "lucide-react";

import { priceList, whatsappBookingLink } from "@/lib/salon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export function Pricing() {
  return (
    <section
      id="precios"
      className="relative px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* faint divider glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Lista de precios"
          title="Tarifas claras, resultados de salón"
          description="Precios en pesos mexicanos para cabello corto. El cabello largo o de mayor densidad se cotiza durante tu valoración."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {priceList.map((category, ci) => (
            <Reveal
              key={category.title}
              delay={ci * 90}
              className="flex flex-col rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm"
            >
              <h3 className="font-display text-2xl font-medium text-gold-gradient">
                {category.title}
              </h3>
              <span className="mt-4 mb-2 h-px w-full bg-border" />
              <ul className="flex flex-col">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4 border-b border-border/60 py-3 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm text-foreground">{item.name}</p>
                      {item.note && (
                        <p className="mt-0.5 text-xs font-light text-muted-foreground">
                          {item.note}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 whitespace-nowrap font-display text-base font-medium text-gold">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-light text-muted-foreground">
            ¿Dudas sobre tu servicio o cabello largo? Escríbenos y te damos una
            cotización sin compromiso.
          </p>
          <Button asChild size="lg">
            <a
              href={whatsappBookingLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle />
              Cotizar y agendar
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
