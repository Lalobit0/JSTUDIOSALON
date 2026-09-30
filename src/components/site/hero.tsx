import Image from "next/image";
import { MessageCircle, MapPin, ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Stars } from "@/components/site/stars";
import { salon, whatsappBookingLink } from "@/lib/salon";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-16 text-center sm:px-8"
    >
      {/* Real work photo, darkened for legibility. Decorative: the copy below
          describes the service. Shown at 40% opacity, so a lower quality and
          an 828px cap cost nothing visible and keep LCP down on phones. */}
      <Image
        src="/hero.webp"
        alt=""
        fill
        priority
        quality={50}
        sizes="(max-width: 828px) 100vw, 828px"
        className="object-cover object-top opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0.16_0.012_70/0.85),oklch(0.16_0.012_70/0.7)_45%,oklch(0.16_0.012_70/0.95))]" />

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
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-foreground/5 px-4 py-1.5 text-xs font-normal tracking-[0.18em] text-gold uppercase sm:tracking-[0.25em]">
          <MapPin className="size-3.5 shrink-0" />
          {/* The brand is already in the header on phones; keep one line. */}
          <span className="hidden sm:inline">{salon.name} · </span>
          El Pípila, Tijuana
        </p>

        <h1 className="font-display text-[2.35rem] font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          <span className="block text-foreground">Balayage, color y cortes</span>
          <span className="block text-gold-gradient">profesionales en Tijuana</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-lg font-light leading-relaxed text-muted-foreground text-balance">
          Con <span className="text-foreground">{salon.stylist}</span>,
          estilista certificado {salon.certification}. Precios desde $200,
          productos Olaplex y atención solo con cita.
        </p>

        {/* Google rating */}
        <p className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <Stars value={salon.rating} />
          <span className="text-foreground">{salon.rating}</span>
          <span>· {salon.reviews} reseñas en Google</span>
        </p>

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
            <a href="#precios">Ver precios</a>
          </Button>
        </div>
      </div>

      <a
        href="#servicios"
        aria-label="Desplazarse a servicios"
        className="absolute bottom-6 left-1/2 z-10 flex size-11 -translate-x-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-gold"
      >
        <ArrowDown className="size-5 animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}
