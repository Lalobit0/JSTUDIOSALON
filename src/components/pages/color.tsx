import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { SectionHeading } from "@/components/site/section-heading";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { PriceCards } from "@/components/site/pricing";
import { Faqs } from "@/components/site/faq";
import { Highlights } from "@/components/site/studio";
import { LandingHero, LandingVisit } from "@/components/site/landing";
import {
  brands,
  faqsFor,
  galleryFor,
  localizeGallery,
  priceList,
  whatsappColorLink,
} from "@/lib/salon";
import { routes, type Locale } from "@/lib/i18n";
import { JsonLd, absoluteUrl, breadcrumbs, pageMetadata, salonId } from "@/lib/seo";

const brandNames = brands.map((b) => b.name).join(", ");

const copy = {
  es: {
    metaTitle: "Balayage y Corrección de Color en Tijuana | Joaquín Studio",
    metaDescription:
      "Balayage desde $4,500, babylights y corrección de color en El Pípila, Tijuana. Mira fotos reales del salón y cotiza tu color por WhatsApp.",
    title: "Balayage y corrección de color en Tijuana",
    home: "Inicio",
    crumb: "Balayage y color",
    serviceType: "Coloración de cabello",
    eyebrow: "Color & Balayage",
    description:
      "Balayage, rayitos, mechas universales y babylights con técnicas Pivot Point para un color luminoso y natural. También rescatamos colores no deseados y unificamos tonos sin maltratar tu cabello.",
    cta: "Cotizar mi color",
    galleryEyebrow: "Portafolio",
    galleryTitle: "Balayage, mechas y color hechos en el salón",
    galleryDescription: "Fotos reales de clientas. Toca una foto para verla en grande.",
    pricesEyebrow: "Precios",
    pricesTitle: "Precios de balayage, mechas y tratamientos",
    pricesDescription:
      "Precios en pesos mexicanos para cabello corto. El cabello largo o de mayor densidad se cotiza durante tu valoración.",
    careEyebrow: "Cuidado del cabello",
    careTitle: "Color que cuida tu cabello",
    careDescription: `Productos profesionales para cuidar, reparar y proteger tu cabello en cada servicio: ${brandNames}.`,
    faqTitle: "Preguntas frecuentes sobre color",
  },
  en: {
    metaTitle: "Balayage & Color Correction in Tijuana | Joaquín Studio",
    metaDescription:
      "Balayage from $4,500 MXN, babylights and color correction in El Pípila, Tijuana, Mexico. See real salon photos and get a color quote on WhatsApp.",
    title: "Balayage and color correction in Tijuana",
    home: "Home",
    crumb: "Balayage and color",
    serviceType: "Hair coloring",
    eyebrow: "Color & Balayage",
    description:
      "Balayage, highlights, foils and babylights with Pivot Point techniques for bright, natural-looking color. We also fix unwanted color and even out tones without damaging your hair.",
    cta: "Get a color quote",
    galleryEyebrow: "Portfolio",
    galleryTitle: "Balayage, highlights and color done at the salon",
    galleryDescription: "Real photos of our clients. Tap a photo to see it full size.",
    pricesEyebrow: "Prices",
    pricesTitle: "Balayage, highlights and treatment prices",
    pricesDescription:
      "Prices in Mexican pesos (MXN) for short hair. Long or thicker hair is quoted during your consultation.",
    careEyebrow: "Hair care",
    careTitle: "Color that cares for your hair",
    careDescription: `Professional products to care for, repair and protect your hair in every service: ${brandNames}.`,
    faqTitle: "Frequently asked questions about color",
  },
} satisfies Record<Locale, unknown>;

export const colorMetadata = (lang: Locale) =>
  pageMetadata({
    title: copy[lang].metaTitle,
    description: copy[lang].metaDescription,
    route: "color",
    lang,
  });

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

const prices = priceList.filter((c) => c.id === "color" || c.id === "treatments");

const questions = faqsFor([
  "¿Cuánto cuesta mi servicio?",
  "¿Atienden cabello largo?",
  "¿Qué productos utilizan?",
]);

export function ColorPage({ lang }: { lang: Locale }) {
  const t = copy[lang];
  const path = routes.color[lang];
  const cta = { href: whatsappColorLink[lang], label: t.cta };
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
      <Navbar lang={lang} route="color" />
      <main className="flex-1">
        <LandingHero
          lang={lang}
          route="color"
          crumb={t.crumb}
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
          cta={cta}
        />

        <section id="galeria-color" className="px-5 py-20 sm:px-8">
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
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow={t.pricesEyebrow}
              title={t.pricesTitle}
              description={t.pricesDescription}
            />
            <PriceCards categories={prices} lang={lang} className="mt-12 md:grid-cols-2" />
          </div>
        </section>

        <section id="cuidado" className="px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow={t.careEyebrow}
              title={t.careTitle}
              description={t.careDescription}
            />
            <div className="mt-12">
              <Highlights lang={lang} />
            </div>
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
