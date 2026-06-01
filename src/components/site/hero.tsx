import { Star, MessageCircle, MapPin, ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { salon, whatsappBookingLink } from "@/lib/salon";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-16 text-center sm:px-8"
    >
      {/* Ambient background layers */}
      <div className="pointer-events-none absolute inset-0 radial-glow" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.9 0.09 92) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.66_0.13_70/0.25),transparent_60%)] blur-2xl" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-foreground/5 px-4 py-1.5 text-xs font-light tracking-[0.25em] text-gold uppercase">
          <Star className="size-3.5 fill-gold text-gold" />
          {salon.certification} · {salon.title}
        </p>

        <h1 className="font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          <span className="block text-foreground">Joaquín</span>
          <span className="block text-gold-gradient">Studio Salon</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-lg font-light leading-relaxed text-muted-foreground text-balance">
          {salon.tagline} De la mano de{" "}
          <span className="text-foreground">{salon.stylist}</span>, estilista
          certificado Pivot Point.
        </p>

        {/* Rating + location strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-gold text-gold"
                  style={{ opacity: i < Math.round(salon.rating) ? 1 : 0.3 }}
                />
              ))}
            </span>
            <span className="text-foreground">{salon.rating}</span>
            <span>· {salon.reviews} reseñas en Google</span>
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-gold" />
            El Pípila, Tijuana B.C.
          </span>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a
              href={whatsappBookingLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle />
              Agendar por WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#precios">Ver lista de precios</a>
          </Button>
        </div>
      </div>

      <a
        href="#servicios"
        aria-label="Desplazarse a servicios"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-gold"
      >
        <ArrowDown className="size-5 animate-bounce" />
      </a>
    </section>
  );
}
