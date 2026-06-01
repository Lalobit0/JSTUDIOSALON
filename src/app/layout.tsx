import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { salon } from "@/lib/salon";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://joaquinstudiosalon.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${salon.name} | Estilista Certificado Pivot Point en Tijuana`,
    template: `%s | ${salon.name}`,
  },
  description:
    "Salón de belleza en El Pípila, Tijuana. Balayage, corrección de color, cortes, tratamientos y maquillaje con Joaquín Alonzo Gaytán, estilista certificado Pivot Point. Agenda por WhatsApp.",
  keywords: [
    "salón de belleza Tijuana",
    "estilista Tijuana",
    "balayage Tijuana",
    "corrección de color",
    "Pivot Point",
    "El Pípila",
    "Joaquín Studio Salon",
    "keratina",
    "tratamientos capilares",
  ],
  authors: [{ name: salon.stylist }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: salon.name,
    title: `${salon.name} | Estilismo profesional en Tijuana`,
    description:
      "Color, cortes y tratamientos profesionales con técnica Pivot Point. Reserva tu cita en El Pípila, Tijuana.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${salon.name} | Estilismo profesional en Tijuana`,
    description:
      "Color, cortes y tratamientos profesionales con técnica Pivot Point en Tijuana.",
  },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: "#1a1814",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
