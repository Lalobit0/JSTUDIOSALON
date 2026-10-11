import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { RootDocument } from "@/components/site/root-document";
import { whatsappBookingLink } from "@/lib/salon";
import { routes } from "@/lib/i18n";
import { siteMetadata } from "@/lib/seo";

/*
 * 404 for any unknown URL, in Spanish with an English line (the URL alone
 * does not say which language the visitor reads). It renders its own
 * <html> because the site has two root layouts. Next.js adds `noindex`.
 */
export const metadata: Metadata = {
  ...siteMetadata("es"),
  title: { absolute: "Página no encontrada · Page not found | Joaquín Studio Salon" },
};

export default function GlobalNotFound() {
  return (
    <RootDocument lang="es">
      <Navbar lang="es" route="home" />
      <main className="relative flex flex-1 flex-col items-center justify-center px-5 pt-36 pb-24 text-center sm:px-8">
        <div className="pointer-events-none absolute inset-0 radial-glow" />
        <p className="relative font-display text-8xl font-medium text-gold-gradient">
          404
        </p>
        <h1 className="relative mt-4 font-display text-4xl font-medium text-foreground text-balance sm:text-5xl">
          No encontramos esta página
        </h1>
        <p className="relative mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          Puede que el enlace haya cambiado. Vuelve al inicio para ver
          servicios y precios, o escríbenos para agendar tu cita.
        </p>
        <p lang="en" className="relative mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Page not found. Visit the{" "}
          <a
            href={routes.home.en}
            hrefLang="en"
            className="text-gold underline underline-offset-4"
          >
            English site
          </a>{" "}
          for services and prices.
        </p>
        <div className="relative mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={whatsappBookingLink.es} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              Agendar por WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={routes.home.es}>Ir al inicio</Link>
          </Button>
        </div>
      </main>
      <Footer lang="es" />
    </RootDocument>
  );
}
