import { MapPin, Clock, Phone, MessageCircle, Navigation } from "lucide-react";

import { salon, whatsappBookingLink } from "@/lib/salon";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/site/brand-icons";

const copy = {
  es: {
    eyebrow: "Visítanos",
    title: "Te esperamos en El Pípila, Tijuana",
    description:
      "Agenda tu cita con anticipación por WhatsApp para asegurar tu horario.",
    address: "Dirección",
    hours: "Horario",
    call: "Llámanos",
    book: "Agendar mi cita",
    directions: "Cómo llegar",
    map: `Ubicación de ${salon.name}`,
    profile: (network: string) => `${network} de ${salon.name}`,
    hl: "es",
  },
  en: {
    eyebrow: "Visit us",
    title: "See you in El Pípila, Tijuana",
    description:
      "Book ahead on WhatsApp to secure your time slot.",
    address: "Address",
    hours: "Hours",
    call: "Call us",
    book: "Book my appointment",
    directions: "Get directions",
    map: `${salon.name} location`,
    profile: (network: string) => `${salon.name} on ${network}`,
    hl: "en",
  },
} satisfies Record<Locale, unknown>;

const socials = [
  { href: salon.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: salon.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: salon.social.tiktok, label: "TikTok", Icon: TikTokIcon },
];

export function Contact({ lang }: { lang: Locale }) {
  const t = copy[lang];
  const mapSrc = `https://www.google.com/maps?q=${salon.coordinates.lat},${salon.coordinates.lng}&z=16&hl=${t.hl}&output=embed`;
  return (
    <section id="contacto" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Info column */}
          <Reveal className="flex flex-col gap-4">
            <ContactRow icon={MapPin} label={t.address}>
              {salon.address.line1}
              <br />
              {salon.address.line2}
            </ContactRow>

            <ContactRow icon={Clock} label={t.hours}>
              {salon.hours.weekdays[lang]}
              <br />
              {salon.hours.sunday[lang]}
              <span className="mt-1 block text-sm text-gold">
                {salon.hours.note[lang]}
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
                  {t.call}
                </p>
                <p className="mt-1 text-foreground transition-colors group-hover:text-gold">
                  {salon.phone.display[lang]}
                </p>
              </a>

              <a
                href={whatsappBookingLink[lang]}
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
                  {salon.whatsapp.display[lang]}
                </p>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.profile(label)}
                  className="flex size-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <Icon className="size-5" />
                </a>
              ))}
              <span className="text-sm text-muted-foreground">
                {salon.social.instagramHandle}
              </span>
            </div>

            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <Button asChild size="lg">
                <a
                  href={whatsappBookingLink[lang]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle />
                  {t.book}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={salon.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="directions"
                >
                  <Navigation />
                  {t.directions}
                </a>
              </Button>
            </div>
          </Reveal>

          {/* Map column */}
          <Reveal delay={120}>
            <div className="h-full min-h-80 overflow-hidden rounded-2xl border border-gold/20">
              <iframe
                title={t.map}
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
