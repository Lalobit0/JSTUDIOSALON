import { Cormorant_Garamond, Jost } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";

import "@/app/globals.css";
import { consentDefaultScript, gtmId } from "@/lib/analytics";
import { htmlLang, type Locale } from "@/lib/i18n";
import { themeScript } from "@/lib/theme";
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

/**
 * <html> shared by the Spanish and English root layouts (and the 404).
 * `suppressHydrationWarning`: themeScript may set data-theme before React
 * hydrates.
 */
export function RootDocument({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={htmlLang[lang]}
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* App Router document shared by both root layouts; the rule targets pages/. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Consent Mode defaults must run before GTM loads. */}
        {gtmId && <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />}
      </head>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className="flex min-h-full flex-col">
        {children}
        <ConversionTracker />
        {gtmId && <ConsentBanner lang={lang} />}
        <Analytics />
      </body>
    </html>
  );
}
