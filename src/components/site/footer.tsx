import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";

import { salon } from "@/lib/salon";
import { navLinks } from "@/lib/nav";
import { gtmId } from "@/lib/analytics";
import { Logo } from "@/components/site/logo";
import { ConsentPreferencesButton } from "@/components/site/consent-banner";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/site/brand-icons";

const socials = [
  { href: salon.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: salon.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: salon.social.tiktok, label: "TikTok", Icon: TikTokIcon },
];

// 44px-tall rows so every footer link is easy to tap.
const linkClass =
  "inline-flex min-h-11 items-center transition-colors hover:text-gold";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Salón de belleza en El Pípila, Tijuana. {salon.title}{" "}
            {salon.certification}: color, cortes, tratamientos y maquillaje
            para eventos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-12">
          <nav aria-label="Pie de página">
            <p className="text-xs tracking-[0.2em] text-gold uppercase">
              Navegación
            </p>
            <ul className="mt-3 flex flex-col text-sm text-muted-foreground">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/balayage-y-color" className={linkClass}>
                  Balayage y color
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">
              Contacto
            </p>
            <ul className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
              <li className="flex items-start gap-2 py-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {salon.address.line1}, {salon.address.line2}
                </span>
              </li>
              <li className="flex items-start gap-2 py-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {salon.hours.weekdays}
                  <br />
                  {salon.hours.sunday}
                </span>
              </li>
              <li>
                <a href={`tel:${salon.phone.tel}`} className={`${linkClass} gap-2`}>
                  <Phone className="size-4 text-gold" />
                  {salon.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-1 pt-1">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} de ${salon.name}`}
                    className="flex size-11 items-center justify-center rounded-lg transition-colors hover:text-gold"
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">
              Legal
            </p>
            <ul className="mt-3 flex flex-col text-sm text-muted-foreground">
              <li>
                <Link href="/aviso-de-privacidad" className={linkClass}>
                  Aviso de privacidad
                </Link>
              </li>
              {gtmId && (
                <li>
                  <ConsentPreferencesButton className={`${linkClass} cursor-pointer`} />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-border/60 pt-6">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {salon.name}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
