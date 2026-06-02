/**
 * Single source of truth for Joaquín Studio Salon business data.
 * Transcribed from the salon's price board and business card.
 */

export const salon = {
  name: "Joaquín Studio Salon",
  stylist: "Joaquín Alonzo Gaytán",
  title: "Estilista Certificado",
  certification: "Pivot Point",
  tagline: "Color, estilo y cuidado profesional del cabello en Tijuana.",
  rating: 4.6,
  reviews: 34,
  hours: "Lun a Sáb · cierra a las 6:00 p.m.",
  address: {
    line1: "Camino Federal #8059, C. Campeche",
    line2: "El Pípila, 22206, Tijuana, B.C.",
    full: "Camino Federal 8059, Campeche, El Pípila, 22206 Tijuana, B.C.",
  },
  phone: { display: "664 865 3576", tel: "+526648653576" },
  whatsapp: {
    display: "664 536 9855",
    // Mexican mobile numbers on WhatsApp use country code 52 + 10 digits.
    link: "https://wa.me/526645369855",
  },
  social: {
    facebook: "https://www.facebook.com/HairStudioSalonn/",
    instagram: "https://www.instagram.com/joaquin_studio_salon/",
    tiktok: "https://www.tiktok.com/@joaquinalonzo895",
    instagramHandle: "@joaquin_studio_salon",
  },
  mapsQuery:
    "Camino Federal 8059, Campeche, El Pípila, 22206 Tijuana, B.C.",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Joaquin+Studio+Salon+El+Pipila+Tijuana",
} as const;

export const whatsappBookingLink = (() => {
  const message =
    "¡Hola Joaquín! Me gustaría agendar una cita en Joaquín Studio Salon. ¿Qué disponibilidad tienen?";
  return `${salon.whatsapp.link}?text=${encodeURIComponent(message)}`;
})();

export type Service = {
  title: string;
  description: string;
  /** lucide icon name resolved in the component */
  icon: "sparkles" | "palette" | "scissors" | "droplets" | "brush" | "crown";
};

export const featuredServices: Service[] = [
  {
    title: "Color & Balayage",
    description:
      "Balayage, rayitos, mechas universales y babylights con técnicas Pivot Point para un color luminoso y natural.",
    icon: "palette",
  },
  {
    title: "Corrección de Color",
    description:
      "Rescatamos colores no deseados y unificamos tonos sin maltratar tu cabello.",
    icon: "sparkles",
  },
  {
    title: "Cortes & Peinados",
    description:
      "Cortes de dama, caballero y niños, peinados de evento, recogidos y ondas.",
    icon: "scissors",
  },
  {
    title: "Tratamientos Capilares",
    description:
      "Olaplex, keratina, botox capilar y Vereplex Pro para reparar y nutrir.",
    icon: "droplets",
  },
  {
    title: "Maquillaje & Eventos",
    description:
      "Maquillaje profesional y peinado para bodas, XV años y ocasiones especiales.",
    icon: "brush",
  },
  {
    title: "Cambio de Look",
    description:
      "Asesoría de imagen completa: color, corte y estilo pensados para ti.",
    icon: "crown",
  },
];

export type PriceItem = { name: string; price: string; note?: string };
export type PriceCategory = { title: string; items: PriceItem[] };

/** Prices in MXN. "Desde" = a partir de. Tarifas para cabello corto;
 *  cabello largo se cotiza en sitio. */
export const priceList: PriceCategory[] = [
  {
    title: "Color & Mechas",
    items: [
      { name: "Cambio de look", price: "Desde $2,500" },
      { name: "Corrección de color", price: "Desde $4,500" },
      { name: "Balayage", price: "Desde $3,800" },
      { name: "Rayitos", price: "Desde $3,800" },
      { name: "Mechas universales", price: "Desde $2,500" },
      { name: "Babylights", price: "Desde $4,500" },
      { name: "Tintes", price: "Desde $1,800" },
      { name: "Permanente", price: "Desde $1,800" },
    ],
  },
  {
    title: "Cortes & Estilo",
    items: [
      { name: "Corte de dama", price: "$700" },
      { name: "Corte de caballero", price: "$250" },
      { name: "Corte de niño / niña", price: "$200" },
      { name: "Arreglo de barba", price: "$200" },
      { name: "Peinado con chongo", price: "Desde $1,300" },
      { name: "Peinado rizos", price: "$900" },
      { name: "Maquillaje", price: "Desde $1,300" },
      {
        name: "Alaciado express",
        price: "$500",
        note: "Cabello largo $700",
      },
      {
        name: "Depilación de ceja",
        price: "$200",
        note: "Navaja $200 · Cera $300",
      },
      { name: "Extensiones de cabello", price: "Cotización" },
    ],
  },
  {
    title: "Tratamientos Especializados",
    items: [
      { name: "Aplicación Olaplex", price: "Desde $1,000" },
      { name: "Vereplex Pro", price: "Desde $800" },
      { name: "Botox capilar", price: "Desde $1,800" },
      { name: "Tratamiento de keratina", price: "Desde $2,000" },
    ],
  },
];

export type Testimonial = {
  name: string;
  quote: string;
  /** 1–5; defaults to 5 when omitted */
  rating?: number;
};

/**
 * Reseñas reales de clientes. Mantener solo testimonios verídicos
 * (p. ej. copiados de Google). NO inventar reseñas.
 * La sección muestra la calificación agregada aunque este arreglo esté vacío.
 */
export const testimonials: Testimonial[] = [];

