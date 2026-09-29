import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { PriceCards } from "@/components/site/pricing";
import { Faqs } from "@/components/site/faq";
import { highlights } from "@/components/site/studio";
import { LandingHero, LandingVisit } from "@/components/site/landing";
import {
  brands,
  faqsFor,
  galleryFor,
  priceList,
  siteUrl,
  whatsappColorLink,
} from "@/lib/salon";
import { JsonLd, breadcrumbs, pageMetadata, salonId } from "@/lib/seo";

const path = "/balayage-y-color";
const title = "Balayage y corrección de color en Tijuana";

export const metadata = pageMetadata({
  title: "Balayage y Corrección de Color en Tijuana | Joaquín Studio",
  description:
    "Balayage desde $4,500, babylights y corrección de color en El Pípila, Tijuana. Mira fotos reales del salón y cotiza tu color por WhatsApp.",
  path,
});

const cta = { href: whatsappColorLink, label: "Cotizar mi color" };

const photos = galleryFor([
  "balayage-caramelo-cabello-castano",
  "balayage-degradado-castano",
  "balayage-rubio-ondas",
  "balayage-rubio-movimiento",
  "rayitos-mechas-cabello-largo",
  "mechas-platinadas-cabello-largo",
  "color-plata-money-piece",
  "rubio-platinado-laciado",
]);

const prices = priceList.filter((c) =>
  ["Color & Mechas", "Tratamientos Especializados"].includes(c.title),
);

const questions = faqsFor([
  "¿Cuánto cuesta mi servicio?",
  "¿Atienden cabello largo?",
  "¿Qué productos utilizan?",
]);

const structuredData = [
  breadcrumbs([
    { name: "Inicio", path: "/" },
    { name: "Balayage y color", path },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: "Coloración de cabello",
    url: `${siteUrl}${path}`,
    provider: { "@id": salonId },
    areaServed: { "@type": "City", name: "Tijuana" },
  },
];

export default function ColorPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Navbar />
      <main className="flex-1">
        <LandingHero
          crumb="Balayage y color"
          eyebrow="Color & Balayage"
          title={title}
          description="Balayage, rayitos, mechas universales y babylights con técnicas Pivot Point para un color luminoso y natural. También rescatamos colores no deseados y unificamos tonos sin maltratar tu cabello."
          cta={cta}
        />

        <section id="galeria-color" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Portafolio"
              title="Balayage, mechas y color hechos en el salón"
              description="Fotos reales de clientas. Toca una foto para verla en grande."
            />
            <GalleryGrid items={photos} />
          </div>
        </section>

        <section id="precios" data-track-view="pricing" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="Precios"
              title="Precios de balayage, mechas y tratamientos"
              description="Precios en pesos mexicanos para cabello corto. El cabello largo o de mayor densidad se cotiza durante tu valoración."
            />
            <PriceCards categories={prices} className="mt-12 md:grid-cols-2" />
          </div>
        </section>

        <section id="cuidado" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Cuidado del cabello"
              title="Color que cuida tu cabello"
              description={`Productos profesionales para cuidar, reparar y proteger tu cabello en cada servicio: ${brands.map((b) => b.name).join(", ")}.`}
            />
            <div className="mt-12 flex flex-col gap-5">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 80} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/5 text-gold">
                    <h.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-foreground">{h.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {h.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Faqs items={questions} title="Preguntas frecuentes sobre color" withSchema={false} />

        <LandingVisit id="contacto" cta={cta} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
