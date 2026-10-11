import { routes, section, type Localized } from "@/lib/i18n";

type NavLink = { href: string; label: string };

/** Site navigation. Absolute "/#…" hrefs so links also work from subpages. */
export const navLinks: Localized<NavLink[]> = {
  es: [
    { href: section("es", "servicios"), label: "Servicios" },
    { href: section("es", "precios"), label: "Precios" },
    { href: routes.bridal.es, label: "Novias y XV" },
    { href: section("es", "galeria"), label: "Galería" },
    { href: section("es", "promos"), label: "Promociones" },
    { href: section("es", "contacto"), label: "Contacto" },
  ],
  en: [
    { href: section("en", "servicios"), label: "Services" },
    { href: section("en", "precios"), label: "Prices" },
    { href: routes.bridal.en, label: "Bridal & XV" },
    { href: section("en", "galeria"), label: "Gallery" },
    { href: section("en", "promos"), label: "Promos" },
    { href: section("en", "contacto"), label: "Contact" },
  ],
};
