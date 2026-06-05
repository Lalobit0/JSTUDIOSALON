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
  hours: {
    weekdays: "Lunes a sábado: 10:00 a.m. – 6:00 p.m.",
    sunday: "Domingo: 11:00 a.m. – 3:00 p.m.",
    note: "Atención únicamente con cita previa.",
  },
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
  // 32°29'31.2"N 116°52'30.0"W
  coordinates: { lat: 32.492, lng: -116.875 },
  mapsQuery:
    "Camino Federal 8059, Campeche, El Pípila, 22206 Tijuana, B.C.",
  googleMapsUrl: "https://maps.app.goo.gl/kMdqwCBMybu1oQmm9",
} as const;

export const whatsappBookingLink = (() => {
  const message =
    "¡Hola Joaquín! Me gustaría agendar una cita en Joaquín Studio Salon. ¿Qué disponibilidad tienen?";
  return `${salon.whatsapp.link}?text=${encodeURIComponent(message)}`;
})();

/** Build a WhatsApp link with a custom prefilled message. */
export function whatsappLink(message: string) {
  return `${salon.whatsapp.link}?text=${encodeURIComponent(message)}`;
}

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
      { name: "Cambio de look", price: "Por confirmar" },
      { name: "Corrección de color", price: "Desde $2,500" },
      { name: "Balayage", price: "Desde $4,500" },
      { name: "Rayitos", price: "Desde $3,800" },
      { name: "Mechas universales", price: "Desde $3,800" },
      { name: "Babylights", price: "Desde $4,500" },
      { name: "Tintes", price: "Desde $2,500" },
      { name: "Permanente", price: "Desde $1,800" },
    ],
  },
  {
    title: "Cortes & Estilo",
    items: [
      { name: "Corte de dama", price: "$700" },
      { name: "Corte de caballero", price: "Desde $250" },
      { name: "Corte de niño", price: "$200" },
      { name: "Corte de niña", price: "$300", note: "No incluye alaciado" },
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
 * Reseñas reales de clientes (Google). Texto con limpieza mínima de
 * ortografía/acentos, sin alterar palabras ni sentido. NO inventar reseñas.
 * La sección también muestra la calificación agregada (4.6 · 34 reseñas).
 */
export const testimonials: Testimonial[] = [
  {
    name: "melani Laz",
    quote:
      "Muy buen estilista, súper bueno en tintes. Cuida demasiado a sus clientas y clientes. Lo recomiendo ampliamente, ¡Joaquín es el mejor!",
    rating: 5,
  },
  {
    name: "Frosty Orange",
    quote: "Me encantó, muy amable y su trabajo muy profesional.",
    rating: 5,
  },
  {
    name: "Sánchez Ochoa",
    quote: "El servicio excelente, son muy profesionales.",
    rating: 5,
  },
  {
    name: "Manuela Ramírez",
    quote: "Trato excelente y muy profesional.",
    rating: 5,
  },
];

/* ----------------------------------------------------------------------------
 * Novias · XV Años · Eventos  (servicio de mayor margen)
 * -------------------------------------------------------------------------- */

export type EventService = {
  title: string;
  description: string;
  icon: "crown" | "sparkles" | "camera";
};

export const eventServices: EventService[] = [
  {
    title: "Novias",
    description:
      "Maquillaje y peinado de novia con prueba previa. Look impecable que dura todo el día, en el salón o a domicilio.",
    icon: "crown",
  },
  {
    title: "XV Años",
    description:
      "El gran día de la quinceañera: maquillaje, peinado, alaciado y asesoría de imagen para que brille en cada foto.",
    icon: "sparkles",
  },
  {
    title: "Eventos y Graduaciones",
    description:
      "Bodas, graduaciones y sesiones de fotos. Peinado y maquillaje profesional para ti y tu grupo.",
    icon: "camera",
  },
];

/* ----------------------------------------------------------------------------
 * Promociones
 * IMPORTANTE: estos son compromisos del negocio. Joaquín debe confirmar/ajustar
 * los porcentajes y condiciones antes de difundir. Edítalos aquí libremente.
 * -------------------------------------------------------------------------- */

export type Promo = {
  badge: string;
  title: string;
  description: string;
  cta: string;
  /** mensaje que se pre-llena en WhatsApp al tocar el botón */
  whatsappMessage: string;
};

export const promos: Promo[] = [
  {
    badge: "Clientes nuevos",
    title: "15% en tu primera visita",
    description:
      "¿Es tu primera vez en Joaquín Studio Salon? Llévate un 15% de descuento en tu primer servicio.",
    cta: "Quiero mi descuento",
    whatsappMessage:
      "¡Hola Joaquín! Soy cliente nueva/o y quiero aprovechar el 15% de descuento en mi primera visita. ¿Me ayudas a agendar?",
  },
  {
    badge: "Referidos",
    title: "Trae una amiga",
    description:
      "Recomienda el salón: tu amiga recibe 15% en su primer servicio y tú $150 de descuento en tu siguiente cita.",
    cta: "Recomendar a una amiga",
    whatsappMessage:
      "¡Hola Joaquín! Quiero recomendar a una amiga para la promo de referidos. ¿Cómo funciona?",
  },
];


/* ----------------------------------------------------------------------------
 * Galería / portafolio (fotos reales del salón, optimizadas en /public)
 * -------------------------------------------------------------------------- */

export type GalleryItem = { src: string; alt: string };

export const gallery: GalleryItem[] = [
  { src: "/gallery/g01.webp", alt: "Rayitos y mechas en cabello largo" },
  { src: "/gallery/g02.webp", alt: "Balayage en tonos caramelo sobre cabello castaño" },
  { src: "/gallery/g03.webp", alt: "Alaciado profesional en cabello rubio" },
  { src: "/gallery/g04.webp", alt: "Color plata con money piece" },
  { src: "/gallery/g05.webp", alt: "Cabello rubio platinado laciado" },
  { src: "/gallery/g06.webp", alt: "Mechas platinadas en cabello largo" },
  { src: "/gallery/g07.webp", alt: "Balayage degradado en cabello castaño" },
  { src: "/gallery/g08.webp", alt: "Color y alaciado en cabello castaño" },
  { src: "/gallery/g09.webp", alt: "Balayage rubio con ondas" },
  { src: "/gallery/g10.webp", alt: "Corte y ondas en cabello castaño" },
  { src: "/gallery/g11.webp", alt: "Permanente con rizos definidos" },
  { src: "/gallery/g12.webp", alt: "Balayage rubio con movimiento" },
  { src: "/gallery/g13.webp", alt: "Maquillaje profesional para evento" },
  { src: "/gallery/g14.webp", alt: "Peinado y maquillaje para evento" },
];

/* ----------------------------------------------------------------------------
 * Marcas / productos profesionales con los que se trabaja.
 * `logo` es opcional: si se sube un PNG/SVG a /public/brands/ se muestra la
 * imagen; si no, se muestra el nombre como wordmark.
 * -------------------------------------------------------------------------- */

export type Brand = { name: string; logo?: string };

export const brands: Brand[] = [
  { name: "Olaplex" },
  { name: "Tec Italy" },
  { name: "Neurone" },
  { name: "Verenize" },
];

/* ----------------------------------------------------------------------------
 * Preguntas frecuentes
 * -------------------------------------------------------------------------- */

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "¿Necesito cita o atienden por orden de llegada?",
    a: "Todo el trabajo es con cita previa para darte una atención personalizada y sin esperas. Agenda fácil por WhatsApp.",
  },
  {
    q: "¿Atienden cabello largo?",
    a: "¡Claro! Los precios de la lista son para cabello corto; el cabello largo o muy denso se cotiza en sitio durante tu valoración.",
  },
  {
    q: "¿Hacen maquillaje y peinado para novias, XV años y eventos?",
    a: "Sí. Ofrecemos maquillaje, peinado, alaciado y asesoría de imagen para novias, quinceañeras, graduaciones y eventos. Reserva tu fecha con anticipación.",
  },
  {
    q: "¿Qué productos utilizan?",
    a: "Trabajamos con marcas profesionales como Olaplex y Tec Italy para cuidar, proteger y dar el mejor acabado a tu cabello.",
  },
  {
    q: "¿Cuánto cuesta mi servicio?",
    a: "Puedes ver la lista de precios en esta página. Para servicios de color o cabello largo te damos una cotización exacta por WhatsApp, sin compromiso.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: "En Camino Federal #8059, C. Campeche, El Pípila, Tijuana B.C. Encuentra el mapa en la sección de contacto.",
  },
];
