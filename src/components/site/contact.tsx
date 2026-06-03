import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";

import { salon, whatsappBookingLink } from "@/lib/salon";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/site/brand-icons";

const mapSrc = `https://www.google.com/maps?q=${salon.coordinates.lat},${salon.coordinates.lng}&z=16&output=embed`;

export function Contact() {
  return (
    <section id="contacto" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Visítanos"
          title="Te esperamos en El Pípila, Tijuana"
          description="Agenda tu cita con anticipación por WhatsApp para asegurar tu horario."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Info column */}
          <Reveal className="flex flex-col gap-4">
            <ContactRow icon={MapPin} label="Dirección">
              {salon.address.line1}
              <br />
              {salon.address.line2}
            </ContactRow>

            <ContactRow icon={Clock} label="Horario">
              {salon.hours.weekdays}
              <br />
              {salon.hours.sunday}
              <span className="mt-1 block text-sm font-light text-gold">
                {salon.hours.note}
              </span>
            </ContactRow>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${salon.phone.tel}`}
                className="group rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-gold/40"
              >
                <span className="flex size-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/5 text-gold">
                  <Phone className="size-4" />
                </span>
                <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
                  Llámanos
                </p>
                <p className="mt-1 text-foreground transition-colors group-hover:text-gold">
                  {salon.phone.display}
                </p>
              </a>

              <a
                href={whatsappBookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-gold/40"
              >
                <span className="flex size-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/5 text-gold">
                  <MessageCircle className="size-4" />
                </span>
                <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
                  WhatsApp
                </p>
                <p className="mt-1 text-foreground transition-colors group-hover:text-gold">
                  {salon.whatsapp.display}
                </p>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={salon.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Joaquín Studio Salon"
                className="flex size-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href={salon.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Joaquín Studio Salon"
                className="flex size-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={salon.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Joaquín Studio Salon"
                className="flex size-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
              >
                <TikTokIcon className="size-5" />
              </a>
              <span className="text-sm font-light text-muted-foreground">
                {salon.social.instagramHandle}
              </span>
            </div>

            <Button asChild size="lg" className="mt-2">
              <a
                href={whatsappBookingLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle />
                Agendar mi cita
              </a>
            </Button>
          </Reveal>

          {/* Map column */}
          <Reveal delay={120}>
            <div className="h-full min-h-80 overflow-hidden rounded-2xl border border-gold/20">
              <iframe
                title={`Ubicación de ${salon.name}`}
                src={mapSrc}
                className="h-full min-h-80 w-full grayscale-[0.3] contrast-110"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card/60 p-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/5 text-gold">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        <p className="mt-1 leading-relaxed text-foreground">{children}</p>
      </div>
    </div>
  );
}
