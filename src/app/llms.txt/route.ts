import {
  amenities,
  faqs,
  formatPrice,
  priceList,
  promos,
  salon,
} from "@/lib/salon";
import { courses, specialties } from "@/lib/training";
import { routes } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

// Built from the same data as the site, so prices and hours never drift.
export const dynamic = "force-static";

export function GET() {
  const prices = priceList
    .map(
      (c) =>
        `### ${c.title.es}\n` +
        c.items
          .map(
            (i) =>
              `- ${i.name.es}: ${formatPrice(i.price, "es")}${i.note ? ` (${i.note.es})` : ""}`,
          )
          .join("\n"),
    )
    .join("\n\n");

  const body = `# ${salon.name}

> Salón de belleza en El Pípila, Tijuana, B.C., México, a cargo de ${salon.stylist}, ${salon.title.es.toLowerCase()} ${salon.certification}. Color (balayage, mechas, babylights, corrección de color), cortes, tratamientos capilares y maquillaje y peinado para novias, XV años y eventos. Atención solo con cita. Sitio en español e inglés; en el salón se habla inglés básico.

## Contacto
- Dirección: ${salon.address.full}
- Teléfono: ${salon.phone.display.es} (desde EE. UU.: ${salon.phone.display.en})
- WhatsApp (citas): ${salon.whatsapp.display.es} — ${salon.whatsapp.link}
- Horario: ${salon.hours.weekdays.es}; ${salon.hours.sunday.es} ${salon.hours.note.es}
- Formas de pago: ${salon.payments.es}
- Google Maps: ${salon.googleMapsUrl}

## Comodidades
${amenities.map((a) => `- ${a.label.es}`).join("\n")}

## Promociones
${promos.map((p) => `- ${p.title.es}: ${p.description.es}`).join("\n")}

## Formación de Joaquín (cursos documentados)
${courses
  .map(
    (c) =>
      `- ${c.period ?? "Sin fecha confirmada"}: ${c.title} — ${c.institution}${c.hours ? ` ${c.hours.es}` : ""}`,
  )
  .join("\n")}

Áreas de especialización: ${specialties.map((s) => s.title.es).join(", ")}.

## Páginas
- [Inicio](${absoluteUrl(routes.home.es)}/): servicios, galería, precios, reseñas, preguntas frecuentes y ubicación
- [Novias y XV años](${absoluteUrl(routes.bridal.es)}): maquillaje y peinado para eventos
- [Balayage y color](${absoluteUrl(routes.color.es)}): balayage, babylights, rayitos y corrección de color
- [Aviso de privacidad](${absoluteUrl(routes.privacy.es)})

## English
- [Home](${absoluteUrl(routes.home.en)}): services, gallery, prices in MXN, reviews, FAQ and location
- [Bridal & quinceañera](${absoluteUrl(routes.bridal.en)})
- [Balayage & color](${absoluteUrl(routes.color.en)})
- [Privacy notice](${absoluteUrl(routes.privacy.en)})
- Payment: ${salon.payments.en}

## Precios (MXN, cabello corto; cabello largo se cotiza en sitio)
${prices}

## Preguntas frecuentes
${faqs.map((f) => `- ${f.q.es} ${f.a.es}`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
