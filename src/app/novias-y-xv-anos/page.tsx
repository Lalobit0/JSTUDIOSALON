import { Crown, Sparkles, Camera, type LucideIcon } from "lucide-react";

import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { PriceCards } from "@/components/site/pricing";
import { Faqs } from "@/components/site/faq";
import { LandingHero, LandingVisit } from "@/components/site/landing";
import {
  eventServices,
  faqsFor,
  galleryFor,
  pricesFor,
  siteUrl,
  whatsappEventLink,
  type EventService,
} from "@/lib/salon";
import { JsonLd, breadcrumbs, pageMetadata, salonId } from "@/lib/seo";

const path = "/novias-y-xv-anos";
const title = "Maquillaje y peinado para novias y XV años en Tijuana";

export const metadata = pageMetadata({
  title: "Maquillaje y Peinado de Novia y XV en Tijuana | Joaquín Studio",
  description:
    "Maquillaje y peinado de novia y XV años en Tijuana, en el salón o a domicilio. Prueba previa y cotización a la medida por WhatsApp. Aparta tu fecha.",
  path,
});

const cta = { href: whatsappEventLink, label: "Cotizar mi evento" };

const icons: Record<EventService["icon"], LucideIcon> = {
  crown: Crown,
  sparkles: Sparkles,
  camera: Camera,
};

const photos = galleryFor([
  "maquillaje-profesional-evento",
  "peinado-maquillaje-evento",
  "corte-ondas-castano",
  "alaciado-cabello-rubio",
]);

const prices = [
  {
    title: "Maquillaje y peinado",
    items: pricesFor([
      "Maquillaje",
      "Peinado con chongo",
      "Peinado rizos",
      "Alaciado express",
      "Depilación de ceja",
    ]),
  },
];

const questions = faqsFor([
  "¿Hacen maquillaje y peinado para novias, XV años y eventos?",
  "¿Necesito cita o atienden por orden de llegada?",
  "¿Dónde están ubicados?",
]);

const steps = [
  "Escríbenos por WhatsApp con el tipo de evento, la fecha, el número de personas y si será en el salón o a domicilio.",
  "Te compartimos una cotización a la medida según tu look y el número de personas.",
  "Aparta tu fecha con anticipación: las temporadas se llenan rápido.",
];

const structuredData = [
  breadcrumbs([
    { name: "Inicio", path: "/" },
    { name: "Novias y XV años", path },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: "Maquillaje y peinado para eventos",
    url: `${siteUrl}${path}`,
    provider: { "@id": salonId },
    areaServed: { "@type": "City", name: "Tijuana" },
  },
];

export default function NoviasPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Navbar />
      <main className="flex-1">
        <LandingHero
          crumb="Novias y XV años"
          eyebrow="Tu día especial"
          title={title}
          description="Para los momentos que se recuerdan toda la vida. Maquillaje, peinado y asesoría de imagen con la técnica de un estilista certificado Pivot Point, en el salón o a domicilio."
          cta={cta}
        />

        <section id="servicios-evento" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Qué incluye"
              title="Novias, XV años, graduaciones y eventos"
            />
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {eventServices.map((service, i) => {
                const Icon = icons[service.icon];
                return (
                  <Reveal
                    key={service.title}
                    delay={i * 90}
                    className="flex flex-col items-center rounded-2xl border border-gold/20 bg-card/50 p-8 text-center"
                  >
                    <span className="flex size-14 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-medium text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="galeria-evento" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Portafolio"
              title="Maquillaje y peinados hechos en el salón"
              description="Fotos reales de nuestro trabajo. Toca una foto para verla en grande."
            />
            <GalleryGrid items={photos} />
          </div>
        </section>

        <section id="precios" data-track-view="pricing" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Precios"
              title="Precios de maquillaje y peinado"
              description="Cada evento se cotiza a la medida según tu look y el número de personas. Estos son los precios de referencia de nuestra lista."
            />
            <PriceCards categories={prices} className="mt-12" />
          </div>
        </section>

        <section id="como-apartar" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="Cómo reservar" title="Cómo apartar tu fecha" />
            <ol className="mt-12 flex flex-col gap-5">
              {steps.map((step, i) => (
                <Reveal
                  as="li"
                  key={step}
                  delay={i * 80}
                  className="flex gap-4 rounded-xl border border-border bg-card/60 p-5"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-lg text-gold">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed text-foreground/90">{step}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <Faqs items={questions} title="Preguntas frecuentes sobre eventos" withSchema={false} />

        <LandingVisit id="contacto" cta={cta} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
