import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { salon } from "@/lib/salon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Aviso de privacidad | Joaquín Studio Salon",
  description:
    "Cómo Joaquín Studio Salon trata los datos personales que compartes al agendar por WhatsApp o teléfono, y cómo usa cookies y analítica en su sitio web.",
  path: "/aviso-de-privacidad",
});

const updatedAt = "29 de septiembre de 2026";

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

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-5 pt-32 pb-24 sm:px-8">
        <article className="mx-auto max-w-3xl">
          <p className="text-xs font-medium tracking-[0.3em] text-gold uppercase">
            Legal
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium text-foreground sm:text-5xl">
            Aviso de privacidad
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Última actualización: {updatedAt}
          </p>

          <Section title="Responsable de tus datos">
            <p>
              <strong>{salon.stylist}</strong>, quien opera el negocio{" "}
              <strong>{salon.name}</strong>, con domicilio en{" "}
              {salon.address.line1}, {salon.address.line2}, México, es
              responsable del tratamiento de los datos personales que nos
              proporcionas.
            </p>
          </Section>

          <Section title="Qué datos recabamos">
            <p>
              Este sitio web <strong>no tiene formularios</strong> y no te pide
              datos personales. Los recabamos solo cuando tú nos contactas por
              WhatsApp ({salon.whatsapp.display}) o por teléfono (
              {salon.phone.display}):
            </p>
            <ul>
              <li>Nombre y número de teléfono.</li>
              <li>
                La información que compartas sobre el servicio que te
                interesa: tipo de servicio, fecha y horario deseados, tipo de
                evento, número de personas y lugar del servicio.
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
              Si no quieres recibir promociones, dínoslo por WhatsApp en
              cualquier momento; eso no afecta tus citas.
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
                <strong>Google Analytics y Google Ads</strong>: si los
                activamos, solo guardan cookies con tu consentimiento en el
                aviso de cookies del sitio. Sirven para medir visitas y saber
                qué anuncios generan citas. Puedes cambiar tu decisión en
                &ldquo;Preferencias de cookies&rdquo;, al pie de la página.
              </li>
              <li>
                <strong>Mapa de Google</strong>: al cargar el mapa de la
                sección de contacto, Google puede recabar datos conforme a su
                propia política de privacidad.
              </li>
            </ul>
          </Section>

          <Section title="Con quién se comparten">
            <p>
              Para operar usamos proveedores que tratan datos por nosotros:
              WhatsApp (Meta) para la mensajería, Vercel para el alojamiento
              del sitio y Google para mapas y, con tu consentimiento, medición
              y publicidad. No vendemos tus datos personales.
            </p>
          </Section>

          <Section title="Tus derechos">
            <p>
              Puedes pedir acceso a tus datos, su corrección o cancelación,
              oponerte a su uso o revocar tu consentimiento. Envía tu solicitud
              por WhatsApp al {salon.whatsapp.display} o preséntala en el salón
              ({salon.address.line1}, {salon.address.line2}), indicando tu
              nombre, un medio para responderte y qué solicitas.
            </p>
          </Section>

          <Section title="Cambios a este aviso">
            <p>
              Cualquier cambio se publicará en esta página con su fecha de
              actualización.
            </p>
          </Section>
        </article>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
