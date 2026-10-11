import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { PriceCards } from "@/components/site/pricing";
import { Faqs } from "@/components/site/faq";
import { EventCards } from "@/components/site/events";
import { LandingHero, LandingVisit } from "@/components/site/landing";
import {
  faqsFor,
  galleryFor,
  localizeGallery,
  pricesFor,
  whatsappEventLink,
} from "@/lib/salon";
import { routes, type Locale } from "@/lib/i18n";
import { JsonLd, absoluteUrl, breadcrumbs, pageMetadata, salonId } from "@/lib/seo";

const copy = {
  es: {
    metaTitle: "Maquillaje y Peinado de Novia y XV en Tijuana | Joaquín Studio",
    metaDescription:
      "Maquillaje y peinado de novia y XV años en Tijuana, en el salón o a domicilio. Prueba previa y cotización a la medida por WhatsApp. Aparta tu fecha.",
    title: "Maquillaje y peinado para novias y XV años en Tijuana",
    home: "Inicio",
    crumb: "Novias y XV años",
    serviceType: "Maquillaje y peinado para eventos",
    eyebrow: "Tu día especial",
    description:
      "Para los momentos que se recuerdan toda la vida. Maquillaje, peinado y asesoría de imagen con la técnica de un estilista certificado Pivot Point, en el salón o a domicilio.",
    cta: "Cotizar mi evento",
    servicesEyebrow: "Qué incluye",
    servicesTitle: "Novias, XV años, graduaciones y eventos",
    galleryEyebrow: "Portafolio",
    galleryTitle: "Maquillaje y peinados hechos en el salón",
    galleryDescription: "Fotos reales de nuestro trabajo. Toca una foto para verla en grande.",
    pricesEyebrow: "Precios",
    pricesTitle: "Precios de maquillaje y peinado",
    pricesDescription:
      "Cada evento se cotiza a la medida según tu look y el número de personas. Estos son los precios de referencia de nuestra lista.",
    priceCard: "Maquillaje y peinado",
    stepsEyebrow: "Cómo reservar",
    stepsTitle: "Cómo apartar tu fecha",
    steps: [
      "Escríbenos por WhatsApp con el tipo de evento, la fecha, el número de personas y si será en el salón o a domicilio.",
      "Te compartimos una cotización a la medida según tu look y el número de personas.",
      "Aparta tu fecha con anticipación: las temporadas se llenan rápido.",
    ],
    faqTitle: "Preguntas frecuentes sobre eventos",
  },
  en: {
    metaTitle: "Bridal & Quinceañera Makeup and Hair in Tijuana | Joaquín Studio",
    metaDescription:
      "Bridal and quinceañera makeup and hair in Tijuana, at the salon or on location. Trial beforehand and a custom quote on WhatsApp. Book your date.",
    title: "Makeup and hair for brides and quinceañeras in Tijuana",
    home: "Home",
    crumb: "Bridal & quinceañera",
    serviceType: "Event makeup and hairstyling",
    eyebrow: "Your special day",
    description:
      "For the moments you remember for a lifetime. Makeup, hair and image consulting with the technique of a Pivot Point certified stylist, at the salon or on location.",
    cta: "Get an event quote",
    servicesEyebrow: "What's included",
    servicesTitle: "Brides, quinceañeras, graduations and events",
    galleryEyebrow: "Portfolio",
    galleryTitle: "Makeup and hairstyles done at the salon",
    galleryDescription: "Real photos of our work. Tap a photo to see it full size.",
    pricesEyebrow: "Prices",
    pricesTitle: "Makeup and hairstyling prices",
    pricesDescription:
      "Every event gets a custom quote based on your look and the number of people. These are the reference prices from our list, in Mexican pesos (MXN).",
    priceCard: "Makeup and hair",
    stepsEyebrow: "How to book",
    stepsTitle: "How to reserve your date",
    steps: [
      "Message us on WhatsApp with the type of event, the date, the number of people and whether it will be at the salon or on location.",
      "We'll send you a custom quote based on your look and the number of people.",
      "Reserve your date early: the seasons fill up fast.",
    ],
    faqTitle: "Frequently asked questions about events",
  },
} satisfies Record<Locale, unknown>;

export const bridalMetadata = (lang: Locale) =>
  pageMetadata({
    title: copy[lang].metaTitle,
    description: copy[lang].metaDescription,
    route: "bridal",
    lang,
  });

const photos = galleryFor([
  "maquillaje-profesional-evento",
  "peinado-maquillaje-evento",
  "corte-ondas-castano",
  "alaciado-cabello-rubio",
]);

const priceItems = pricesFor([
  "Maquillaje",
  "Peinado con chongo",
  "Peinado rizos",
  "Alaciado express",
  "Depilación de ceja",
]);

const questions = faqsFor([
  "¿Hacen maquillaje y peinado para novias, XV años y eventos?",
  "¿Necesito cita o atienden por orden de llegada?",
  "¿Dónde están ubicados?",
]);

export function BridalPage({ lang }: { lang: Locale }) {
  const t = copy[lang];
  const path = routes.bridal[lang];
  const cta = { href: whatsappEventLink[lang], label: t.cta };
  const structuredData = [
    breadcrumbs([
      { name: t.home, path: routes.home[lang] },
      { name: t.crumb, path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: t.title,
      serviceType: t.serviceType,
      url: absoluteUrl(path),
      inLanguage: lang === "es" ? "es-MX" : "en",
      provider: { "@id": salonId },
      areaServed: { "@type": "City", name: "Tijuana" },
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <Navbar lang={lang} route="bridal" />
      <main className="flex-1">
        <LandingHero
          lang={lang}
          route="bridal"
          crumb={t.crumb}
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
          cta={cta}
        />

        <section id="servicios-evento" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow={t.servicesEyebrow} title={t.servicesTitle} />
            <EventCards lang={lang} className="mt-14" />
          </div>
        </section>

        <section id="galeria-evento" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow={t.galleryEyebrow}
              title={t.galleryTitle}
              description={t.galleryDescription}
            />
            <GalleryGrid items={localizeGallery(photos, lang)} lang={lang} />
          </div>
        </section>

        <section id="precios" data-track-view="pricing" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow={t.pricesEyebrow}
              title={t.pricesTitle}
              description={t.pricesDescription}
            />
            <PriceCards
              categories={[
                { title: { es: copy.es.priceCard, en: copy.en.priceCard }, items: priceItems },
              ]}
              lang={lang}
              className="mt-12"
            />
          </div>
        </section>

        <section id="como-apartar" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow={t.stepsEyebrow} title={t.stepsTitle} />
            <ol className="mt-12 flex flex-col gap-5">
              {t.steps.map((step, i) => (
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

        <Faqs lang={lang} items={questions} title={t.faqTitle} withSchema={false} />

        <LandingVisit lang={lang} id="contacto" cta={cta} />
      </main>
      <Footer lang={lang} />
      <WhatsAppFloat lang={lang} />
    </>
  );
}
