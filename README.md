# Joaquín Studio Salon

Sitio web oficial de **Joaquín Studio Salon**, salón de belleza en El Pípila,
Tijuana B.C., a cargo de Joaquín Alonzo Gaytán — estilista certificado Pivot
Point.

Landing page de una sola página con servicios, lista de precios, presentación
del estudio, ubicación con mapa y agendado directo por WhatsApp.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** con tema de lujo negro/dorado en OKLCH
- **shadcn/ui** (estilo New York) + Radix primitives
- **lucide-react** para iconografía
- Tipografías: *Cormorant Garamond* (display) + *Jost* (texto)
- SEO: metadata Open Graph, `sitemap.xml`, `robots.txt` y datos
  estructurados `HairSalon` (JSON-LD)

## Desarrollo

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # build de producción
pnpm start        # sirve el build
pnpm lint         # ESLint
```

## Estructura

```
src/
  app/
    layout.tsx        # fuentes, metadata, viewport
    page.tsx          # composición de la página + JSON-LD
    globals.css       # tema (tokens OKLCH, utilidades)
    sitemap.ts / robots.ts
  components/
    ui/button.tsx     # botón base estilo shadcn
    site/             # secciones: navbar, hero, services, studio,
                      # pricing, contact, footer, whatsapp-float...
  lib/
    salon.ts          # datos del negocio (contacto, servicios, precios)
    utils.ts          # helper cn()
```

## Editar contenido

Toda la información del negocio (teléfono, WhatsApp, dirección, horario,
servicios y precios) vive en [`src/lib/salon.ts`](src/lib/salon.ts). Cambiar
ese archivo actualiza el sitio completo.

> Las tarifas corresponden a cabello corto; cabello largo se cotiza en sitio.

## Fotografías

Para añadir fotos reales del salón, colócalas en `public/` e intégralas en las
secciones de Estudio/Galería con `next/image`.

## Skills usados

Diseñado e implementado con la ayuda de los skills `claude-webkit`,
`ui-ux-pro-max`, `emil-design-eng` y `playwright-cli`. Las definiciones se
materializan desde `skills-lock.json` con `npx skills install` y no se versionan
(ver `.gitignore`).
