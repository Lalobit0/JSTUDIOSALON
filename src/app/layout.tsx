import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { salon, siteUrl } from "@/lib/salon";
import { consentDefaultScript, gtmId } from "@/lib/analytics";
import { ConversionTracker } from "@/components/site/conversion-tracker";
import { ConsentBanner } from "@/components/site/consent-banner";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/*
 * Site-wide defaults. Each page sets its own title, description and canonical
 * so that the 404 page does not inherit the home page's canonical.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Salón de Belleza en Tijuana: Balayage y Color | Joaquín Studio",
    template: `%s | ${salon.name}`,
  },
  description:
    "Balayage, corrección de color, cortes y keratina en El Pípila, Tijuana. Maquillaje para novias y XV. Precios desde $200. Agenda tu cita por WhatsApp.",
  applicationName: salon.name,
  authors: [{ name: salon.stylist }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: salon.name,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Joaquín Studio Salon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
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
      {gtmId && (
        <head>
          {/* Consent Mode defaults must run before GTM loads. */}
          <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
        </head>
      )}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className="flex min-h-full flex-col">
        {children}
        <ConversionTracker />
        {gtmId && <ConsentBanner />}
        <Analytics />
      </body>
    </html>
  );
}
