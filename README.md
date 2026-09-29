# Joaquín Studio Salon

Sitio web oficial de **Joaquín Studio Salon**, salón de belleza en El Pípila,
Tijuana B.C., a cargo de Joaquín Alonzo Gaytán — estilista certificado Pivot
Point.

Sitio con página principal (servicios, galería, reseñas, precios, promociones,
estudio, FAQ y ubicación), páginas de servicio para **Novias y XV años** y
**Balayage y color**, aviso de privacidad y agendado directo por WhatsApp.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** con tema de lujo negro/dorado en OKLCH
- **shadcn/ui** (estilo New York) + Radix primitives
- **lucide-react** para iconografía
- Tipografías: *Cormorant Garamond* (display) + *Jost* (texto)
- SEO: metadata por página, Open Graph, `sitemap.xml`, `robots.txt`,
  `llms.txt` y datos estructurados `WebSite`, `HairSalon`, `FAQPage`,
  `Service` y `BreadcrumbList` (JSON-LD)
- Analítica: Vercel Web Analytics + Google Tag Manager con Consent Mode v2
  (se activa con `NEXT_PUBLIC_GTM_ID`)

## Desarrollo

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # build de producción
pnpm start        # sirve el build
pnpm lint         # ESLint
```

## Google Tag Manager / GA4 / Google Ads

GTM **no se carga** hasta definir la variable de entorno
`NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` en Vercel → Settings → Environment
Variables (y volver a desplegar). Al activarla:

- Se carga GTM con Consent Mode v2: todo empieza en `denied` y se muestra un
  aviso de cookies (Aceptar / Rechazar / Configurar). La elección se guarda y
  se puede cambiar desde "Preferencias de cookies" en el footer.
- El sitio envía al `dataLayer` estos eventos (configurar en GTM las etiquetas
  GA4 y las conversiones de Google Ads que los usen):

| Evento | Cuándo | Parámetros |
|---|---|---|
| `click_whatsapp` | Clic en cualquier botón de WhatsApp | `cta_location`, `cta_text`, `page_path` |
| `click_phone` | Clic en un teléfono | `cta_location`, `cta_text`, `page_path` |
| `click_directions` | Clic en "Cómo llegar" | `cta_location` |
| `click_reviews` | Clic en "Ver reseñas en Google" | `cta_location` |
| `click_social` | Clic a Instagram, Facebook o TikTok | `network`, `cta_location` |
| `view_pricing` | La sección de precios entra en pantalla | `cta_location` |
| `faq_open` | Se abre una pregunta frecuente | `question` |
| `gallery_open` | Se amplía una foto | `image` |

`click_whatsapp` y `click_phone` son las conversiones principales (marcarlas
como eventos clave en GA4). Vercel Web Analytics sigue recibiendo
`whatsapp_click` y `call_click`.

## Estructura

```
src/
  app/
    layout.tsx               # fuentes, metadata base, GTM + consentimiento
    page.tsx                 # página principal + JSON-LD
    novias-y-xv-anos/        # página de servicio: novias y XV años
    balayage-y-color/        # página de servicio: balayage y color
    aviso-de-privacidad/     # aviso de privacidad
    not-found.tsx            # 404 con la identidad del sitio
    llms.txt/route.ts        # resumen para asistentes de IA (desde salon.ts)
    globals.css              # tema (tokens OKLCH, utilidades)
    sitemap.ts / robots.ts
  components/
    ui/button.tsx     # botón base estilo shadcn
    site/             # secciones: navbar, hero, services, studio,
                      # pricing, contact, footer, whatsapp-float...
  lib/
    salon.ts          # datos del negocio (contacto, servicios, precios)
    analytics.ts      # GTM, Consent Mode y eventos del dataLayer
    seo.tsx           # metadata por página y JSON-LD
    nav.ts            # enlaces del menú y footer
    utils.ts          # helper cn()
```

## Editar contenido

Toda la información del negocio (teléfono, WhatsApp, dirección, horario,
servicios y precios) vive en [`src/lib/salon.ts`](src/lib/salon.ts). Cambiar
ese archivo actualiza el sitio completo.

> Las tarifas corresponden a cabello corto; cabello largo se cotiza en sitio.

Mantenimiento:

- **Calificación de Google** (`rating` y `reviews` en `salon.ts`): revisarla
  una vez al mes contra el perfil de Google y actualizarla.
- **Sitemap**: al cambiar el contenido de una página, actualizar su fecha en
  `src/app/sitemap.ts`.
- Las páginas de servicio toman precios, fotos y preguntas de `salon.ts` por
  nombre; si se renombra un elemento, el build falla indicando cuál.

## Fotografías

Las fotos de la galería viven en `public/gallery/` con nombres descriptivos
(p. ej. `balayage-caramelo-cabello-castano.webp`) y se registran en `gallery`
dentro de `salon.ts`. Para la página de Novias y XV conviene agregar más fotos
reales de novias y quinceañeras.

## Skills usados

Diseñado e implementado con la ayuda de los skills `claude-webkit`,
`ui-ux-pro-max`, `emil-design-eng` y `playwright-cli`. Las definiciones se
materializan desde `skills-lock.json` con `npx skills install` y no se versionan
(ver `.gitignore`).
