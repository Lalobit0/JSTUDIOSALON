/**
 * Single source of truth for Joaquín Studio Salon business data.
 * Transcribed from the salon's price board and business card.
 *
 * Los textos visibles van en español e inglés ({ es, en }). Al cambiar uno,
 * actualizar también el otro. Los precios y datos de contacto son únicos.
 */

import type { Locale, Localized, RouteKey } from "@/lib/i18n";

export const siteUrl = "https://joaquinstudiosalon.com";

export const salon = {
  name: "Joaquín Studio Salon",
  stylist: "Joaquín Alonzo Gaytán",
  title: { es: "Estilista Certificado", en: "Certified Stylist" },
  certification: "Pivot Point",
  /**
   * Calificación del perfil de Google. Se escribe a mano: revisarla una vez al
   * mes contra el perfil y actualizar ambos números.
   */
  rating: 4.6,
  reviews: 34,
  hours: {
    weekdays: {
      es: "Lunes a sábado: 10:00 a.m. – 6:00 p.m.",
      en: "Monday to Saturday: 10:00 a.m. – 6:00 p.m.",
    },
    sunday: {
      es: "Domingo: 11:00 a.m. – 3:00 p.m.",
      en: "Sunday: 11:00 a.m. – 3:00 p.m.",
    },
    note: {
      es: "Atención únicamente con cita previa.",
      en: "By appointment only.",
    },
  },
  address: {
    line1: "Camino Federal #8059, C. Campeche",
    line2: "El Pípila, 22206, Tijuana, B.C.",
    full: "Camino Federal 8059, Campeche, El Pípila, 22206 Tijuana, B.C.",
  },
  // Visitors calling from the U.S. need the +52 country code.
  phone: {
    display: { es: "664 865 3576", en: "+52 664 865 3576" },
    tel: "+526648653576",
  },
  whatsapp: {
    display: { es: "664 536 9855", en: "+52 664 536 9855" },
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
  googleMapsUrl: "https://maps.app.goo.gl/kMdqwCBMybu1oQmm9",
  /** Abre directo la ventana "Escribir reseña" del perfil de Google. */
  googleReviewUrl: "https://g.page/r/CX94ZwOuWsclEBM/review",
  /** Formas de pago confirmadas por el negocio. */
  payments: {
    es: "Efectivo en pesos o dólares, tarjeta y transferencia.",
    en: "Cash in Mexican pesos or US dollars, card and bank transfer.",
  },
} as const;

/** Build a WhatsApp link with a custom prefilled message. */
export function whatsappLink(message: string) {
  return `${salon.whatsapp.link}?text=${encodeURIComponent(message)}`;
}

/*
 * Mensajes precargados. Piden desde el primer mensaje los datos que hacen
 * falta para agendar o cotizar, sin agregar un formulario. En inglés cada
 * mensaje lleva también el español, porque en el salón se habla inglés básico.
 */
const lines = (...l: string[]) => whatsappLink(l.join("\n"));

export const whatsappBookingLink: Localized = {
  es: lines(
    "¡Hola Joaquín! Vi su página y me gustaría agendar una cita en Joaquín Studio Salon.",
    "• Servicio: ",
    "• Día y horario que me acomoda: ",
  ),
  en: lines(
    "Hi Joaquín! I found your website and I'd like to book an appointment at Joaquín Studio Salon.",
    "(¡Hola! Vi su página y me gustaría agendar una cita.)",
    "• Service / Servicio: ",
    "• Preferred day and time / Día y horario: ",
  ),
};

export const whatsappEventLink: Localized = {
  es: lines(
    "¡Hola Joaquín! Quiero cotizar maquillaje y peinado para un evento.",
    "• Tipo de evento (novia / XV años / graduación / otro): ",
    "• Fecha: ",
    "• Número de personas: ",
    "• Lugar (en el salón / a domicilio en…): ",
    "¿Tienes disponibilidad?",
  ),
  en: lines(
    "Hi Joaquín! I'd like a quote for event makeup and hair.",
    "(¡Hola! Quiero cotizar maquillaje y peinado para un evento.)",
    "• Event (bride / quinceañera / graduation / other) / Evento: ",
    "• Date / Fecha: ",
    "• Number of people / Personas: ",
    "• Location (salon / on location in…) / Lugar: ",
    "Are you available? / ¿Tienes disponibilidad?",
  ),
};

export const whatsappColorLink: Localized = {
  es: lines(
    "¡Hola Joaquín! Quiero cotizar un servicio de color.",
    "• Servicio (balayage / babylights / rayitos / corrección de color / tinte): ",
    "• Largo de mi cabello (corto / medio / largo): ",
    "¿Qué disponibilidad tienen?",
  ),
  en: lines(
    "Hi Joaquín! I'd like a quote for a color service.",
    "(¡Hola! Quiero cotizar un servicio de color.)",
    "• Service (balayage / babylights / highlights / color correction / all-over color) / Servicio: ",
    "• Hair length (short / medium / long) / Largo del cabello: ",
    "What availability do you have? / ¿Qué disponibilidad tienen?",
  ),
};

export type Service = {
  title: Localized;
  description: Localized;
  /** lucide icon name resolved in the component */
  icon: "sparkles" | "palette" | "scissors" | "droplets" | "brush" | "crown";
  /** Dedicated page for the service, when one exists */
  page?: RouteKey;
};

export const featuredServices: Service[] = [
  {
    title: { es: "Color & Balayage", en: "Color & Balayage" },
    description: {
      es: "Balayage, rayitos, mechas universales y babylights con técnicas Pivot Point para un color luminoso y natural.",
      en: "Balayage, highlights, foils and babylights with Pivot Point techniques for bright, natural-looking color.",
    },
    icon: "palette",
    page: "color",
  },
  {
    title: { es: "Corrección de Color", en: "Color Correction" },
    description: {
      es: "Rescatamos colores no deseados y unificamos tonos sin maltratar tu cabello.",
      en: "We fix unwanted color and even out tones without damaging your hair.",
    },
    icon: "sparkles",
    page: "color",
  },
  {
    title: { es: "Cortes & Peinados", en: "Cuts & Styling" },
    description: {
      es: "Cortes de dama, caballero y niños, peinados de evento, recogidos y ondas.",
      en: "Haircuts for women, men and kids, event styling, updos and waves.",
    },
    icon: "scissors",
  },
  {
    title: { es: "Tratamientos Capilares", en: "Hair Treatments" },
    description: {
      es: "Olaplex, keratina, botox capilar y Vereplex Pro para reparar y nutrir.",
      en: "Olaplex, keratin, hair botox and Vereplex Pro to repair and nourish.",
    },
    icon: "droplets",
  },
  {
    title: { es: "Maquillaje & Eventos", en: "Makeup & Events" },
    description: {
      es: "Maquillaje profesional y peinado para bodas, XV años y ocasiones especiales.",
      en: "Professional makeup and hair for weddings, quinceañeras and special occasions.",
    },
    icon: "brush",
    page: "bridal",
  },
  {
    title: { es: "Cambio de Look", en: "Makeover" },
    description: {
      es: "Asesoría de imagen completa: color, corte y estilo pensados para ti.",
      en: "A complete image consultation: color, cut and style designed for you.",
    },
    icon: "crown",
  },
];

/** Price in Mexican pesos; `from` = "desde". "quote" = se cotiza. */
export type Price = { amount: number; from?: boolean } | "quote";

export type PriceItem = { name: Localized; price: Price; note?: Localized };
export type PriceCategory = {
  id: "color" | "cuts" | "treatments";
  title: Localized;
  items: PriceItem[];
  /** Page with photos of this category */
  page?: RouteKey;
};

/** "Desde $2,500" / "From $2,500 MXN". English adds MXN so nobody reads USD. */
export function formatPrice(price: Price, lang: Locale) {
  if (price === "quote") return lang === "es" ? "Cotización" : "Quote";
  const amount = `$${price.amount.toLocaleString("en-US")}${lang === "en" ? " MXN" : ""}`;
  if (!price.from) return amount;
  return lang === "es" ? `Desde ${amount}` : `From ${amount}`;
}

const from = (amount: number): Price => ({ amount, from: true });
const fixed = (amount: number): Price => ({ amount });

/** Prices in MXN. Tarifas para cabello corto; cabello largo se cotiza en sitio. */
export const priceList: PriceCategory[] = [
  {
    id: "color",
    title: { es: "Color & Mechas", en: "Color & Highlights" },
    page: "color",
    items: [
      { name: { es: "Cambio de look", en: "Makeover" }, price: "quote" },
      { name: { es: "Corrección de color", en: "Color correction" }, price: from(2500) },
      { name: { es: "Balayage", en: "Balayage" }, price: from(4500) },
      { name: { es: "Rayitos", en: "Highlights" }, price: from(3800) },
      { name: { es: "Mechas universales", en: "Classic foils" }, price: from(3800) },
      { name: { es: "Babylights", en: "Babylights" }, price: from(4500) },
      { name: { es: "Tintes", en: "All-over color" }, price: from(2500) },
      { name: { es: "Permanente", en: "Perm" }, price: from(1800) },
    ],
  },
  {
    id: "cuts",
    title: { es: "Cortes & Estilo", en: "Cuts & Styling" },
    items: [
      { name: { es: "Corte de dama", en: "Women's haircut" }, price: fixed(700) },
      { name: { es: "Corte de caballero", en: "Men's haircut" }, price: from(250) },
      { name: { es: "Corte de niño", en: "Boys' haircut" }, price: fixed(200) },
      {
        name: { es: "Corte de niña", en: "Girls' haircut" },
        price: fixed(300),
        note: { es: "No incluye alaciado", en: "Straightening not included" },
      },
      { name: { es: "Arreglo de barba", en: "Beard trim" }, price: fixed(200) },
      { name: { es: "Peinado con chongo", en: "Updo" }, price: from(1300) },
      { name: { es: "Peinado rizos", en: "Curls" }, price: fixed(900) },
      { name: { es: "Maquillaje", en: "Makeup" }, price: from(1300) },
      {
        name: { es: "Alaciado express", en: "Express straightening" },
        price: fixed(500),
        note: { es: "Cabello largo $700", en: "Long hair $700 MXN" },
      },
      {
        name: { es: "Depilación de ceja", en: "Eyebrow shaping" },
        price: fixed(200),
        note: { es: "Navaja $200 · Cera $300", en: "Razor $200 · Wax $300 MXN" },
      },
      { name: { es: "Extensiones de cabello", en: "Hair extensions" }, price: "quote" },
    ],
  },
  {
    id: "treatments",
    title: { es: "Tratamientos Especializados", en: "Specialized Treatments" },
    items: [
      { name: { es: "Aplicación Olaplex", en: "Olaplex treatment" }, price: from(1000) },
      { name: { es: "Vereplex Pro", en: "Vereplex Pro" }, price: from(800) },
      { name: { es: "Botox capilar", en: "Hair botox" }, price: from(1800) },
      { name: { es: "Tratamiento de keratina", en: "Keratin treatment" }, price: from(2000) },
    ],
  },
];

export type Testimonial = {
  name: string;
  /** Original text, in Spanish */
  quote: string;
  /** English translation, labeled as such on the page */
  translation: string;
  /** 1–5; defaults to 5 when omitted */
  rating?: number;
};

/**
 * Reseñas reales de clientes (Google). Texto con limpieza mínima de
 * ortografía/acentos, sin alterar palabras ni sentido. NO inventar reseñas.
 * La versión en inglés muestra la traducción y el texto original.
 */
export const testimonials: Testimonial[] = [
  {
    name: "melani Laz",
    quote:
      "Muy buen estilista, súper bueno en tintes. Cuida demasiado a sus clientas y clientes. Lo recomiendo ampliamente, ¡Joaquín es el mejor!",
    translation:
      "Very good stylist, super good with hair color. He takes great care of his clients. I highly recommend him. Joaquín is the best!",
    rating: 5,
  },
  {
    name: "Frosty Orange",
    quote: "Me encantó, muy amable y su trabajo muy profesional.",
    translation: "I loved it. Very kind, and his work is very professional.",
    rating: 5,
  },
  {
    name: "Sánchez Ochoa",
    quote: "El servicio excelente, son muy profesionales.",
    translation: "Excellent service, they are very professional.",
    rating: 5,
  },
  {
    name: "Manuela Ramírez",
    quote: "Trato excelente y muy profesional.",
    translation: "Excellent treatment and very professional.",
    rating: 5,
  },
];

/* ----------------------------------------------------------------------------
 * Novias · XV Años · Eventos  (servicio de mayor margen)
 * -------------------------------------------------------------------------- */

export type EventService = {
  title: Localized;
  description: Localized;
  icon: "crown" | "sparkles" | "camera";
};

export const eventServices: EventService[] = [
  {
    title: { es: "Novias", en: "Brides" },
    description: {
      es: "Maquillaje y peinado de novia con prueba previa. Look impecable que dura todo el día, en el salón o a domicilio.",
      en: "Bridal makeup and hair with a trial beforehand. A flawless look that lasts all day, at the salon or on location.",
    },
    icon: "crown",
  },
  {
    title: { es: "XV Años", en: "Quinceañeras" },
    description: {
      es: "El gran día de la quinceañera: maquillaje, peinado, alaciado y asesoría de imagen para que brille en cada foto.",
      en: "The quinceañera's big day: makeup, hair, straightening and image consulting so she shines in every photo.",
    },
    icon: "sparkles",
  },
  {
    title: { es: "Eventos y Graduaciones", en: "Events & Graduations" },
    description: {
      es: "Bodas, graduaciones y sesiones de fotos. Peinado y maquillaje profesional para ti y tu grupo.",
      en: "Weddings, graduations and photo shoots. Professional hair and makeup for you and your group.",
    },
    icon: "camera",
  },
];

/* ----------------------------------------------------------------------------
 * Promociones (confirmadas por el negocio). Son compromisos públicos: cualquier
 * cambio de porcentaje o condiciones debe aprobarlo Joaquín antes de publicarse.
 * -------------------------------------------------------------------------- */

export type Promo = {
  icon: "gift" | "users" | "cake";
  badge: Localized;
  title: Localized;
  description: Localized;
  cta: Localized;
  /** WhatsApp link with the prefilled message for the promo */
  whatsapp: Localized;
};

export const promos: Promo[] = [
  {
    icon: "gift",
    badge: { es: "Clientes nuevos", en: "New clients" },
    title: { es: "15% en tu primera visita", en: "15% off your first visit" },
    description: {
      es: "¿Es tu primera vez en Joaquín Studio Salon? Llévate un 15% de descuento en tu primer servicio.",
      en: "First time at Joaquín Studio Salon? Get 15% off your first service.",
    },
    cta: { es: "Quiero mi descuento", en: "Claim my discount" },
    whatsapp: {
      es: lines(
        "¡Hola Joaquín! Soy cliente nueva/o y quiero aprovechar el 15% de descuento en mi primera visita. ¿Me ayudas a agendar?",
      ),
      en: lines(
        "Hi Joaquín! I'm a new client and I'd like to use the 15% first-visit discount. Can you help me book?",
        "(¡Hola! Soy cliente nueva/o y quiero aprovechar el 15% de descuento en mi primera visita.)",
      ),
    },
  },
  {
    icon: "users",
    badge: { es: "Referidos", en: "Referrals" },
    title: { es: "Trae una amiga", en: "Bring a friend" },
    description: {
      es: "Recomienda el salón: tu amiga recibe 15% en su primer servicio y tú $150 de descuento en tu siguiente cita.",
      en: "Recommend the salon: your friend gets 15% off her first service and you get $150 MXN off your next appointment.",
    },
    cta: { es: "Recomendar a una amiga", en: "Refer a friend" },
    whatsapp: {
      es: lines(
        "¡Hola Joaquín! Quiero recomendar a una amiga para la promo de referidos. ¿Cómo funciona?",
      ),
      en: lines(
        "Hi Joaquín! I'd like to refer a friend for the referral promo. How does it work?",
        "(¡Hola! Quiero recomendar a una amiga para la promo de referidos. ¿Cómo funciona?)",
      ),
    },
  },
  {
    icon: "cake",
    badge: { es: "Cumpleaños", en: "Birthday" },
    title: { es: "Regalo en tu cumpleaños", en: "A gift on your birthday" },
    description: {
      es: "Si tu cita es el mismo día de tu cumpleaños, te llevas un producto de regalo.",
      en: "If your appointment is on your birthday, you take home a product as a gift.",
    },
    cta: { es: "Agendar en mi cumpleaños", en: "Book on my birthday" },
    whatsapp: {
      es: lines(
        "¡Hola Joaquín! Quiero agendar mi cita el día de mi cumpleaños para recibir mi producto de regalo. Mi cumpleaños es el: ",
      ),
      en: lines(
        "Hi Joaquín! I'd like to book my appointment on my birthday to get my gift product.",
        "(¡Hola! Quiero agendar mi cita el día de mi cumpleaños para recibir mi producto de regalo.)",
        "My birthday is / Mi cumpleaños es: ",
      ),
    },
  },
];

/* ----------------------------------------------------------------------------
 * Comodidades del salón (valor agregado confirmado por el negocio)
 * -------------------------------------------------------------------------- */

export type Amenity = {
  label: Localized;
  /** lucide icon resolved in the component */
  icon: "airVent" | "wifi" | "shower";
};

export const amenities: Amenity[] = [
  { label: { es: "Aire acondicionado", en: "Air conditioning" }, icon: "airVent" },
  { label: { es: "Wi-Fi gratis", en: "Free Wi-Fi" }, icon: "wifi" },
  { label: { es: "Lavado de cabello incluido", en: "Hair wash included" }, icon: "shower" },
];

/* ----------------------------------------------------------------------------
 * Galería / portafolio (fotos reales del salón, optimizadas en /public)
 * -------------------------------------------------------------------------- */

export type GalleryPhoto = { src: string; alt: Localized };
/** A photo with its description in the page's language. */
export type GalleryItem = { src: string; alt: string };

const photo = (file: string, es: string, en: string): GalleryPhoto => ({
  src: `/gallery/${file}.webp`,
  alt: { es, en },
});

export const gallery: GalleryPhoto[] = [
  photo("rayitos-mechas-cabello-largo", "Rayitos y mechas en cabello largo", "Highlights on long hair"),
  photo("balayage-caramelo-cabello-castano", "Balayage en tonos caramelo sobre cabello castaño", "Caramel balayage on brown hair"),
  photo("alaciado-cabello-rubio", "Alaciado profesional en cabello rubio", "Professional straightening on blonde hair"),
  photo("color-plata-money-piece", "Color plata con money piece", "Silver color with a money piece"),
  photo("rubio-platinado-laciado", "Cabello rubio platinado laciado", "Sleek platinum blonde hair"),
  photo("mechas-platinadas-cabello-largo", "Mechas platinadas en cabello largo", "Platinum highlights on long hair"),
  photo("balayage-degradado-castano", "Balayage degradado en cabello castaño", "Blended balayage on brown hair"),
  photo("color-alaciado-castano", "Color y alaciado en cabello castaño", "Color and straightening on brown hair"),
  photo("balayage-rubio-ondas", "Balayage rubio con ondas", "Blonde balayage with waves"),
  photo("corte-ondas-castano", "Corte y ondas en cabello castaño", "Cut and waves on brown hair"),
  photo("permanente-rizos-definidos", "Permanente con rizos definidos", "Perm with defined curls"),
  photo("balayage-rubio-movimiento", "Balayage rubio con movimiento", "Blonde balayage with movement"),
  photo("maquillaje-profesional-evento", "Maquillaje profesional para evento", "Professional event makeup"),
  photo("peinado-maquillaje-evento", "Peinado y maquillaje para evento", "Event hair and makeup"),
];

/** Photos with their descriptions in one language. */
export const localizeGallery = (photos: readonly GalleryPhoto[], lang: Locale): GalleryItem[] =>
  photos.map((p) => ({ src: p.src, alt: p.alt[lang] }));

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

export type Faq = { q: Localized; a: Localized };

export const faqs: Faq[] = [
  {
    q: {
      es: "¿Necesito cita o atienden por orden de llegada?",
      en: "Do I need an appointment, or do you take walk-ins?",
    },
    a: {
      es: "Todo el trabajo es con cita previa para darte una atención personalizada y sin esperas. Agenda fácil por WhatsApp.",
      en: "All our work is by appointment, so you get personal attention with no waiting. Booking on WhatsApp is easy.",
    },
  },
  {
    q: {
      es: "¿Qué comodidades tiene el salón?",
      en: "What amenities does the salon have?",
    },
    a: {
      es: "Contamos con aire acondicionado y Wi-Fi gratis, y el lavado de cabello está incluido.",
      en: "We have air conditioning and free Wi-Fi, and a hair wash is included.",
    },
  },
  {
    q: {
      es: "¿Qué formas de pago aceptan?",
      en: "What payment methods do you accept?",
    },
    a: {
      es: "Aceptamos efectivo en pesos o dólares, tarjeta y transferencia. Los precios están en pesos mexicanos.",
      en: "We accept cash in Mexican pesos or US dollars, card and bank transfer. Prices are in Mexican pesos (MXN).",
    },
  },
  {
    q: {
      es: "¿Atienden en inglés?",
      en: "Do you speak English?",
    },
    a: {
      es: "Hablamos inglés básico, y este sitio también está disponible en inglés.",
      en: "We speak basic English. The WhatsApp messages on this site include a Spanish version, so booking is easy.",
    },
  },
  {
    q: {
      es: "¿Atienden cabello largo?",
      en: "Do you work with long hair?",
    },
    a: {
      es: "¡Claro! Los precios de la lista son para cabello corto; el cabello largo o muy denso se cotiza en sitio durante tu valoración.",
      en: "Of course! Listed prices are for short hair; long or very thick hair is quoted at the salon during your consultation.",
    },
  },
  {
    q: {
      es: "¿Hacen maquillaje y peinado para novias, XV años y eventos?",
      en: "Do you do makeup and hair for brides, quinceañeras and events?",
    },
    a: {
      es: "Sí. Ofrecemos maquillaje, peinado, alaciado y asesoría de imagen para novias, quinceañeras, graduaciones y eventos. Reserva tu fecha con anticipación.",
      en: "Yes. We offer makeup, hairstyling, straightening and image consulting for brides, quinceañeras, graduations and events. Book your date well in advance.",
    },
  },
  {
    q: {
      es: "¿Qué productos utilizan?",
      en: "What products do you use?",
    },
    a: {
      es: "Trabajamos con marcas profesionales como Olaplex y Tec Italy para cuidar, proteger y dar el mejor acabado a tu cabello.",
      en: "We work with professional brands like Olaplex and Tec Italy to care for and protect your hair and give it the best finish.",
    },
  },
  {
    q: {
      es: "¿Cuánto cuesta mi servicio?",
      en: "How much will my service cost?",
    },
    a: {
      es: "Puedes ver la lista de precios en esta página. Para servicios de color o cabello largo te damos una cotización exacta por WhatsApp, sin compromiso.",
      en: "You can see the price list on this page. For color services or long hair, we'll send you an exact quote on WhatsApp, with no obligation.",
    },
  },
  {
    q: {
      es: "¿Dónde están ubicados?",
      en: "Where are you located?",
    },
    a: {
      es: "En Camino Federal #8059, C. Campeche, El Pípila, Tijuana B.C. Encuentra el mapa en la sección de contacto.",
      en: "At Camino Federal #8059, C. Campeche, El Pípila, Tijuana, B.C., Mexico. You'll find the map in the contact section.",
    },
  },
];

/* ----------------------------------------------------------------------------
 * Helpers for the service pages: they reuse the same prices, photos and FAQ
 * as the home page, looked up by their Spanish name so everything stays in
 * sync in both languages.
 * -------------------------------------------------------------------------- */

function pick<T>(all: readonly T[], keys: readonly string[], match: (item: T, key: string) => boolean): T[] {
  return keys.map((key) => {
    const found = all.find((item) => match(item, key));
    if (!found) throw new Error(`salon.ts: "${key}" no existe`);
    return found;
  });
}

export const pricesFor = (names: readonly string[]) =>
  pick(priceList.flatMap((c) => c.items), names, (i, n) => i.name.es === n);

export const galleryFor = (files: readonly string[]) =>
  pick(gallery, files, (g, f) => g.src === `/gallery/${f}.webp`);

export const faqsFor = (questions: readonly string[]) =>
  pick(faqs, questions, (f, q) => f.q.es === q);
