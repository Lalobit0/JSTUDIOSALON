import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { whatsappBookingLink } from "@/lib/salon";

// Next.js adds `noindex` to the 404 response on its own.
export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
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
        <div className="relative mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={whatsappBookingLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              Agendar por WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">Ir al inicio</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
