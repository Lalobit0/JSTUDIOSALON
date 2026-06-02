"use client";

import * as React from "react";
import { Menu, X, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/site/brand-icons";
import { cn } from "@/lib/utils";
import { salon, whatsappBookingLink } from "@/lib/salon";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#galeria", label: "Galería" },
  { href: "#novias", label: "Novias y Eventos" },
  { href: "#promos", label: "Promociones" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#inicio" aria-label="Ir al inicio">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-light tracking-wide text-foreground/80 transition-colors hover:text-gold"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-gradient transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <a href={whatsappBookingLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              Agendar cita
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-md text-gold transition-colors hover:bg-foreground/5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out md:hidden",
          open ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-light tracking-wide text-foreground/85 transition-colors hover:bg-foreground/5 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="mt-2 w-full">
            <a href={whatsappBookingLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              Agendar por WhatsApp
            </a>
          </Button>

          <div className="mt-3 flex items-center justify-center gap-3 border-t border-border pt-4">
            <span className="text-xs font-light tracking-wide text-muted-foreground">
              Síguenos
            </span>
            <a
              href={salon.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Joaquín Studio Salon"
              className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={salon.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Joaquín Studio Salon"
              className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              <TikTokIcon className="size-5" />
            </a>
            <a
              href={salon.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Joaquín Studio Salon"
              className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
