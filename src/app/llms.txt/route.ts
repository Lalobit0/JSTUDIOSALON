import { faqs, priceList, salon, siteUrl } from "@/lib/salon";

// Built from the same data as the site, so prices and hours never drift.
export const dynamic = "force-static";

export function GET() {
  const prices = priceList
    .map(
      (c) =>
        `### ${c.title}\n` +
        c.items
          .map((i) => `- ${i.name}: ${i.price}${i.note ? ` (${i.note})` : ""}`)
          .join("\n"),
    )
    .join("\n\n");

  const body = `# ${salon.name}

> Salón de belleza en El Pípila, Tijuana, B.C., México, a cargo de ${salon.stylist}, ${salon.title.toLowerCase()} ${salon.certification}. Color (balayage, mechas, babylights, corrección de color), cortes, tratamientos capilares y maquillaje y peinado para novias, XV años y eventos. Atención solo con cita.

## Contacto
- Dirección: ${salon.address.full}
- Teléfono: ${salon.phone.display}
- WhatsApp (citas): ${salon.whatsapp.display} — ${salon.whatsapp.link}
- Horario: ${salon.hours.weekdays}; ${salon.hours.sunday} ${salon.hours.note}
- Google Maps: ${salon.googleMapsUrl}

## Páginas
- [Inicio](${siteUrl}/): servicios, galería, precios, reseñas, preguntas frecuentes y ubicación
- [Novias y XV años](${siteUrl}/novias-y-xv-anos): maquillaje y peinado para eventos
- [Balayage y color](${siteUrl}/balayage-y-color): balayage, babylights, rayitos y corrección de color
- [Aviso de privacidad](${siteUrl}/aviso-de-privacidad)

## Precios (MXN, cabello corto; cabello largo se cotiza en sitio)
${prices}

## Preguntas frecuentes
${faqs.map((f) => `- ${f.q} ${f.a}`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
