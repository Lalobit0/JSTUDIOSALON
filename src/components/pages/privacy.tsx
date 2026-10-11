import Link from "next/link";

import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { salon } from "@/lib/salon";
import { routes, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const meta = {
  es: {
    title: "Aviso de privacidad | Joaquín Studio Salon",
    description:
      "Cómo Joaquín Studio Salon trata los datos personales que compartes al agendar por WhatsApp o teléfono, y cómo usa cookies y analítica en su sitio web.",
  },
  en: {
    title: "Privacy Notice | Joaquín Studio Salon",
    description:
      "How Joaquín Studio Salon handles the personal data you share when booking by WhatsApp or phone, and how its website uses cookies and analytics.",
  },
} satisfies Record<Locale, unknown>;

export const privacyMetadata = (lang: Locale) =>
  pageMetadata({ ...meta[lang], route: "privacy", lang });

const updatedAt = { es: "11 de octubre de 2026", en: "October 11, 2026" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-medium text-foreground">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-base leading-relaxed text-muted-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}

const address = `${salon.address.line1}, ${salon.address.line2}`;

function SpanishNotice() {
  return (
    <>
      <Section title="Responsable de tus datos">
        <p>
          <strong>{salon.stylist}</strong>, quien opera el negocio{" "}
          <strong>{salon.name}</strong>, con domicilio en {address}, México, es
          responsable del tratamiento de los datos personales que nos
          proporcionas.
        </p>
      </Section>

      <Section title="Qué datos recabamos">
        <p>
          Este sitio web <strong>no tiene formularios</strong> y no te pide
          datos personales. Los recabamos solo cuando tú nos contactas por
          WhatsApp ({salon.whatsapp.display.es}) o por teléfono (
          {salon.phone.display.es}):
        </p>
        <ul>
          <li>Nombre y número de teléfono.</li>
          <li>
            La información que compartas sobre el servicio que te interesa:
            tipo de servicio, fecha y horario deseados, tipo de evento, número
            de personas y lugar del servicio.
          </li>
          <li>Las fotografías que decidas enviarnos de tu cabello o del look que buscas.</li>
        </ul>
        <p>No solicitamos datos personales sensibles.</p>
      </Section>

      <Section title="Para qué usamos tus datos">
        <p>Finalidades necesarias para atenderte:</p>
        <ul>
          <li>Agendar, confirmar, cambiar o cancelar tus citas.</li>
          <li>Cotizar servicios y eventos, y resolver tus dudas.</li>
          <li>Prestar el servicio contratado.</li>
        </ul>
        <p>Finalidad adicional, que puedes rechazar:</p>
        <ul>
          <li>Avisarte de promociones del salón.</li>
        </ul>
        <p>
          Si no quieres recibir promociones, dínoslo por WhatsApp en cualquier
          momento; eso no afecta tus citas.
        </p>
      </Section>

      <Section title="Analítica y cookies del sitio">
        <ul>
          <li>
            <strong>Vercel Web Analytics</strong>: mide visitas de forma
            agregada (página visitada, país, tipo de dispositivo y sitio de
            origen). No usa cookies ni nos permite identificarte.
          </li>
          <li>
            <strong>Google Analytics y Google Ads</strong>: si los activamos,
            solo guardan cookies con tu consentimiento en el aviso de cookies
            del sitio. Sirven para medir visitas y saber qué anuncios generan
            citas. Puedes cambiar tu decisión en &ldquo;Preferencias de
            cookies&rdquo;, al pie de la página.
          </li>
          <li>
            <strong>Mapa de Google</strong>: al cargar el mapa de la sección de
            contacto, Google puede recabar datos conforme a su propia política
            de privacidad.
          </li>
          <li>
            <strong>Modo día</strong>: si eliges el modo día, tu navegador
            guarda esa preferencia. No sale de tu dispositivo.
          </li>
        </ul>
      </Section>

      <Section title="Con quién se comparten">
        <p>
          Para operar usamos proveedores que tratan datos por nosotros:
          WhatsApp (Meta) para la mensajería, Vercel para el alojamiento del
          sitio y Google para mapas y, con tu consentimiento, medición y
          publicidad. No vendemos tus datos personales.
        </p>
      </Section>

      <Section title="Tus derechos">
        <p>
          Puedes pedir acceso a tus datos, su corrección o cancelación,
          oponerte a su uso o revocar tu consentimiento. Envía tu solicitud por
          WhatsApp al {salon.whatsapp.display.es} o preséntala en el salón (
          {address}), indicando tu nombre, un medio para responderte y qué
          solicitas.
        </p>
      </Section>

      <Section title="Cambios a este aviso">
        <p>
          Cualquier cambio se publicará en esta página con su fecha de
          actualización.
        </p>
      </Section>
    </>
  );
}

function EnglishNotice() {
  return (
    <>
      <p className="mt-6 rounded-xl border border-gold/25 bg-gold/5 p-4 text-sm leading-relaxed text-muted-foreground">
        This is an English translation provided for convenience. If there is
        any difference, the{" "}
        <Link
          href={routes.privacy.es}
          hrefLang="es-MX"
          className="text-gold underline underline-offset-4"
        >
          Spanish version (<span lang="es-MX">Aviso de privacidad</span>)
        </Link>{" "}
        prevails.
      </p>

      <Section title="Who is responsible for your data">
        <p>
          <strong>{salon.stylist}</strong>, who runs the business{" "}
          <strong>{salon.name}</strong>, located at {address}, Mexico, is
          responsible for the processing of the personal data you provide to
          us.
        </p>
      </Section>

      <Section title="What data we collect">
        <p>
          This website <strong>has no forms</strong> and does not ask for your
          personal data. We only collect it when you contact us by WhatsApp (
          {salon.whatsapp.display.en}) or by phone ({salon.phone.display.en}):
        </p>
        <ul>
          <li>Your name and phone number.</li>
          <li>
            The information you share about the service you are interested in:
            type of service, preferred date and time, type of event, number of
            people and location of the service.
          </li>
          <li>Any photos you choose to send us of your hair or the look you want.</li>
        </ul>
        <p>We do not request sensitive personal data.</p>
      </Section>

      <Section title="How we use your data">
        <p>Purposes needed to serve you:</p>
        <ul>
          <li>Booking, confirming, changing or canceling your appointments.</li>
          <li>Quoting services and events, and answering your questions.</li>
          <li>Providing the service you booked.</li>
        </ul>
        <p>Additional purpose, which you can decline:</p>
        <ul>
          <li>Letting you know about salon promotions.</li>
        </ul>
        <p>
          If you do not want to receive promotions, tell us on WhatsApp at any
          time; it does not affect your appointments.
        </p>
      </Section>

      <Section title="Website analytics and cookies">
        <ul>
          <li>
            <strong>Vercel Web Analytics</strong>: measures visits in aggregate
            (page visited, country, device type and referring site). It does
            not use cookies and does not let us identify you.
          </li>
          <li>
            <strong>Google Analytics and Google Ads</strong>: when enabled,
            they only store cookies with your consent in the site&rsquo;s
            cookie notice. They are used to measure visits and see which ads
            lead to appointments. You can change your choice under
            &ldquo;Cookie preferences&rdquo; at the bottom of the page.
          </li>
          <li>
            <strong>Google Maps</strong>: when the map in the contact section
            loads, Google may collect data under its own privacy policy.
          </li>
          <li>
            <strong>Light mode</strong>: if you choose light mode, your browser
            stores that preference. It never leaves your device.
          </li>
        </ul>
      </Section>

      <Section title="Who we share it with">
        <p>
          To operate we use providers that process data on our behalf:
          WhatsApp (Meta) for messaging, Vercel for website hosting and Google
          for maps and, with your consent, measurement and advertising. We do
          not sell your personal data.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          You can ask to access, correct or delete your data, object to its
          use or withdraw your consent. Send your request on WhatsApp to{" "}
          {salon.whatsapp.display.en} or bring it to the salon ({address}),
          including your name, a way to reply to you and what you are
          requesting.
        </p>
      </Section>

      <Section title="Changes to this notice">
        <p>Any change will be posted on this page with its update date.</p>
      </Section>
    </>
  );
}

const copy = {
  es: { title: "Aviso de privacidad", updated: "Última actualización:" },
  en: { title: "Privacy notice", updated: "Last updated:" },
} satisfies Record<Locale, unknown>;

export function PrivacyPage({ lang }: { lang: Locale }) {
  const t = copy[lang];
  return (
    <>
      <Navbar lang={lang} route="privacy" />
      <main className="flex-1 px-5 pt-32 pb-24 sm:px-8">
        <article className="mx-auto max-w-3xl">
          <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase">
            Legal
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium text-foreground sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {t.updated} {updatedAt[lang]}
          </p>

          {lang === "es" ? <SpanishNotice /> : <EnglishNotice />}
        </article>
      </main>
      <Footer lang={lang} />
      <WhatsAppFloat lang={lang} />
    </>
  );
}
