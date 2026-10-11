import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { Events } from "@/components/site/events";
import { Gallery } from "@/components/site/gallery";
import { Studio } from "@/components/site/studio";
import { Training } from "@/components/site/training";
import { Brands } from "@/components/site/brands";
import { Testimonials } from "@/components/site/testimonials";
import { CrossBorder } from "@/components/site/cross-border";
import { Promos } from "@/components/site/promos";
import { Pricing } from "@/components/site/pricing";
import { Faqs } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { amenities, salon, priceList, siteUrl } from "@/lib/salon";
import { htmlLang, locales, type Locale } from "@/lib/i18n";
import { JsonLd, pageMetadata, salonId } from "@/lib/seo";

const copy = {
  es: {
    title: "Salón de Belleza en Tijuana: Balayage y Color | Joaquín Studio",
    description:
      "Balayage, corrección de color, cortes y keratina en El Pípila, Tijuana. Maquillaje para novias y XV. Precios desde $200. Agenda tu cita por WhatsApp.",
    jobTitle: "Estilista",
    knowsAbout: [
      "Corte de cabello",
      "Colorimetría",
      "Balayage y técnicas de mechas",
      "Barbería",
      "Tratamientos capilares",
    ],
  },
  en: {
    title: "Hair Salon in Tijuana: Balayage & Color | Joaquín Studio",
    description:
      "Balayage, color correction, haircuts and keratin in El Pípila, Tijuana, Mexico. Bridal and quinceañera makeup. We accept US dollars. Book on WhatsApp.",
    jobTitle: "Hairstylist",
    knowsAbout: [
      "Haircutting",
      "Hair color theory",
      "Balayage and highlighting techniques",
      "Barbering",
      "Hair treatments",
    ],
  },
} satisfies Record<Locale, unknown>;

export const homeMetadata = (lang: Locale) =>
  pageMetadata({ ...copy[lang], route: "home", lang });

/*
 * Structured data for the business. No aggregateRating: Google ignores
 * ratings a business publishes about itself, and a hand-written value can
 * drift from the real Google profile. Both languages describe the same
 * entities (same @id), each in its own language.
 */
function structuredData(lang: Locale) {
  const t = copy[lang];
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: salon.name,
      inLanguage: locales.map((l) => htmlLang[l]),
      publisher: { "@id": salonId },
    },
    {
      "@context": "https://schema.org",
      "@type": "HairSalon",
      "@id": salonId,
      name: salon.name,
      url: `${siteUrl}/`,
      description: t.description,
      logo: `${siteUrl}/logo.png`,
      image: [`${siteUrl}/og.jpg`, `${siteUrl}/joaquin.webp`],
      telephone: salon.phone.tel,
      priceRange: "$$",
      currenciesAccepted: "MXN, USD",
      paymentAccepted: "Cash, Card, Bank transfer",
      address: {
        "@type": "PostalAddress",
        streetAddress: `${salon.address.line1}, El Pípila`,
        addressLocality: "Tijuana",
        addressRegion: "Baja California",
        postalCode: "22206",
        addressCountry: "MX",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: salon.coordinates.lat,
        longitude: salon.coordinates.lng,
      },
      hasMap: salon.googleMapsUrl,
      amenityFeature: amenities.map((a) => ({
        "@type": "LocationFeatureSpecification",
        name: a.label[lang],
        value: true,
      })),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "11:00",
          closes: "15:00",
        },
      ],
      sameAs: [
        salon.social.facebook,
        salon.social.instagram,
        salon.social.tiktok,
      ],
      employee: { "@id": `${siteUrl}/#joaquin` },
      makesOffer: priceList.flatMap((c) =>
        c.items.map((i) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: i.name[lang] },
        })),
      ),
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${siteUrl}/#joaquin`,
      name: "Joaquín Victorio Alonzo Gaytán",
      alternateName: salon.stylist,
      jobTitle: t.jobTitle,
      worksFor: { "@id": salonId },
      knowsAbout: t.knowsAbout,
    },
  ];
}

export function HomePage({ lang }: { lang: Locale }) {
  return (
    <>
      <JsonLd data={structuredData(lang)} />
      <Navbar lang={lang} route="home" />
      <main className="flex-1">
        <Hero lang={lang} />
        <Services lang={lang} />
        <Gallery lang={lang} />
        <Testimonials lang={lang} />
        <CrossBorder lang={lang} />
        <Events lang={lang} />
        <Pricing lang={lang} />
        <Promos lang={lang} />
        <Studio lang={lang} />
        <Training lang={lang} />
        <Brands lang={lang} />
        <Faqs lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <WhatsAppFloat lang={lang} />
    </>
  );
}
