import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { Events } from "@/components/site/events";
import { Gallery } from "@/components/site/gallery";
import { Studio } from "@/components/site/studio";
import { Brands } from "@/components/site/brands";
import { Testimonials } from "@/components/site/testimonials";
import { Promos } from "@/components/site/promos";
import { Pricing } from "@/components/site/pricing";
import { Faqs } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { salon, priceList, siteUrl } from "@/lib/salon";
import { JsonLd, pageMetadata, salonId } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Salón de Belleza en Tijuana: Balayage y Color | Joaquín Studio",
  description:
    "Balayage, corrección de color, cortes y keratina en El Pípila, Tijuana. Maquillaje para novias y XV. Precios desde $200. Agenda tu cita por WhatsApp.",
  path: "/",
});

/*
 * Structured data for the business. No aggregateRating: Google ignores
 * ratings a business publishes about itself, and a hand-written value can
 * drift from the real Google profile.
 */
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: salon.name,
    inLanguage: "es-MX",
    publisher: { "@id": salonId },
  },
  {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": salonId,
    name: salon.name,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/logo.png`,
    image: [`${siteUrl}/og.jpg`, `${siteUrl}/joaquin.webp`],
    telephone: salon.phone.tel,
    priceRange: "$$",
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
    makesOffer: priceList.flatMap((c) =>
      c.items.map((i) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: i.name },
      })),
    ),
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Gallery />
        <Testimonials />
        <Events />
        <Pricing />
        <Promos />
        <Studio />
        <Brands />
        <Faqs />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
