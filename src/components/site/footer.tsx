import { MapPin, Phone } from "lucide-react";

import { salon } from "@/lib/salon";
import { Logo } from "@/components/site/logo";
import { FacebookIcon, InstagramIcon } from "@/components/site/brand-icons";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
            {salon.title} {salon.certification}. Color, cortes y tratamientos
            profesionales en Tijuana, B.C.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:gap-16">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">
              Navegación
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm font-light text-muted-foreground">
              <li>
                <a href="#servicios" className="transition-colors hover:text-gold">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#precios" className="transition-colors hover:text-gold">
                  Precios
                </a>
              </li>
              <li>
                <a href="#estudio" className="transition-colors hover:text-gold">
                  El Estudio
                </a>
              </li>
              <li>
                <a href="#contacto" className="transition-colors hover:text-gold">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">
              Contacto
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm font-light text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {salon.address.line1}, {salon.address.line2}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${salon.phone.tel}`}
                  className="flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Phone className="size-4 text-gold" />
                  {salon.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-3 pt-1">
                <a
                  href={salon.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-colors hover:text-gold"
                >
                  <FacebookIcon className="size-5" />
                </a>
                <a
                  href={salon.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-colors hover:text-gold"
                >
                  <InstagramIcon className="size-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-border/60 pt-6">
        <p className="text-center text-xs font-light text-muted-foreground">
          © {new Date().getFullYear()} {salon.name}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
