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
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { salon, priceList } from "@/lib/salon";

/** Structured data so Google can render a rich local-business result. */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: salon.name,
    "@id": "https://joaquinstudiosalon.vercel.app",
    url: "https://joaquinstudiosalon.vercel.app",
    telephone: salon.phone.tel,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: salon.address.line1,
      addressLocality: "Tijuana",
      addressRegion: "B.C.",
      postalCode: "22206",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.4845,
      longitude: -116.9719,
    },
    openingHoursSpecification: {
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: salon.rating,
      reviewCount: salon.reviews,
    },
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
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Gallery />
        <Events />
        <Studio />
        <Brands />
        <Testimonials />
        <Promos />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
