# Auditoría web profesional — Joaquín Studio Salon

**URL auditada:** https://joaquinstudiosalon.com
**Empresa:** Joaquín Studio Salon (Joaquín Alonzo Gaytán, estilista)
**Mercado:** El Pípila, Tijuana, Baja California, México — servicio local con cita previa
**Actividad:** Salón de belleza: color (balayage, mechas, tintes, corrección de color), cortes, tratamientos capilares, maquillaje y peinado para novias, XV años y eventos
**Fecha:** 29 de septiembre de 2026
**Versión auditada:** despliegue de producción `dpl_7sgavukR6LXEAJrfUM5vT8YWkBcL`, commit `5797d40` de `main` ("Ajusta precio de Tintes a Desde $2,500")

---

## Metodología y alcance (léase primero)

| Fuente | Qué se hizo | Nivel de certeza |
|---|---|---|
| Código fuente del repositorio (commit `5797d40`, idéntico al de producción) | Lectura completa de `src/` y `public/` | HECHO VERIFICADO |
| Conector de Vercel (solo lectura) | Configuración del proyecto `jstudiosalon`, dominios, despliegue activo y **respuestas HTTP reales del dominio de producción** (`robots.txt`, `sitemap.xml`, 404, redirección HTTP→HTTPS, cabeceras) | HECHO VERIFICADO |
| Build de producción local del mismo commit | `next build` + `next start`; análisis del HTML renderizado de la home (el sitio es 100 % estático/prerenderizado, el HTML es el mismo que sirve Vercel) | HECHO VERIFICADO |
| Lighthouse 13.5.0 (móvil y escritorio) sobre el build local | Métricas de laboratorio con throttling simulado. **No son datos de campo (CrUX)** y el servidor local tiene TTFB de 10 ms, más rápido que un CDN real | Medición de laboratorio |
| axe-core + Playwright (Chromium) | Accesibilidad WCAG 2.2 AA, overflow y posición de CTA a 320, 360, 375, 390, 414, 768 y 1280 px; foco de teclado; render sin JavaScript | HECHO VERIFICADO (laboratorio) |

**Limitaciones:**

- El dominio público no fue accesible directamente desde la red del entorno de auditoría; la verificación de producción se hizo a través del conector de Vercel (mismas respuestas que recibe un visitante).
- **Sin acceso** a Google Search Console, GA4, Google Ads, Google Business Profile, WhatsApp Business, panel de Vercel Analytics ni DNS. Todo lo que depende de esos accesos se marca **❓ NO VERIFICABLE** con instrucciones de verificación.
- El mapa de Google embebido no se pudo cargar en el entorno de pruebas (red bloqueada); su evaluación es por código.

**Leyenda**

| Estado | Prioridad | Tipo de afirmación |
|---|---|---|
| ✅ Correcto | **P0** Crítico — resolver ya | **HECHO VERIFICADO** — comprobado en código o respuesta HTTP |
| ⚠️ Mejorable | **P1** Alta — antes de invertir en Ads | **HALLAZGO** — problema detectado a partir de hechos |
| ❌ Falta / incorrecto | **P2** Media | **RECOMENDACIÓN** — lo que se propone hacer |
| ❓ No verificable | **P3** Baja | **HIPÓTESIS** — probable, debe validarse con datos |

Dificultad: **Baja** (< 2 h, sin riesgo), **Media** (medio día a 2 días o requiere decisiones), **Alta** (varios días o requiere contenido/fotos del negocio).

---

## A. Resumen ejecutivo

**Estado general: bueno en diseño y base técnica, insuficiente en medición y en "hablar el idioma de las búsquedas".**

El sitio es una sola página rápida en escritorio, bien construida, con precios transparentes, fotos reales, reseñas reales, dirección, horario y botones de WhatsApp en todas las secciones. Eso es más de lo que tienen la mayoría de los salones locales, y **no debe rehacerse**.

**Lo que está impidiendo conseguir más clientes hoy:**

1. **No se puede medir en Google cuántas personas piden cita desde la web.** No existe Google Analytics 4, ni Google Tag Manager, ni etiqueta de Google Ads. Solo hay Vercel Web Analytics, que no se conecta con Google Ads. Si hoy se invierte en publicidad, Google no sabrá qué anuncios generan citas y no podrá optimizar.
2. **Google no recibe una señal clara de "salón de belleza en Tijuana".** El título principal (H1) de la página dice solo "Joaquín Studio Salon". La frase "salón de belleza" aparece **cero veces** en el texto visible (solo en la meta descripción). En cambio "Pivot Point" aparece 8 veces: es un sello de calidad, pero no es lo que escribe una clienta en Google.
3. **Todo vive en una sola URL.** Balayage, novias/XV, keratina y cortes compiten por la misma página. Para anuncios de "maquillaje para novia Tijuana" la persona llega a una portada genérica y tiene que bajar 6 pantallas para ver novias y 12 para ver precios.
4. **En móvil la carga es lenta en laboratorio (LCP 4.5 s).** Se descarga una foto de 168–336 KB que se muestra al 40 % de opacidad detrás de un degradado oscuro, más un favicon de 156 KB.
5. **Riesgo comercial inmediato:** las promociones (15 % primera visita, referidos con $150) están publicadas, pero el propio código indica que Joaquín "debe confirmar los porcentajes y condiciones antes de difundir". No hay evidencia de esa confirmación.

**Oportunidades principales:**

- Ajustar título, meta descripción, H1 y subtítulos con términos de búsqueda reales (1 día de trabajo, alto impacto SEO y de Ads).
- Medición completa en GA4 + Google Ads de clics a WhatsApp y llamadas, segmentados por sección y tipo de servicio.
- Dos páginas específicas con intención comercial clara: **Novias/XV años** (servicio de mayor margen) y **Balayage/Color** (servicio de mayor ticket), para SEO y como landing de campañas.
- Mejor calidad de prospecto en eventos: mensaje de WhatsApp precargado que pida fecha, número de personas y lugar.

**Qué arreglar antes de meter publicidad (en este orden):** confirmar promociones → aviso de privacidad → GTM + GA4 + conversiones de WhatsApp/llamada → Search Console y Perfil de Negocio alineados → título/H1/hero → peso de la imagen principal → landing de Novias/XV si esa será la campaña.

**Riesgos:** calificación "4.6 · 34 reseñas" escrita a mano en el código (se desactualiza sola y se muestra como 5 estrellas llenas); `www.joaquinstudiosalon.com` no está configurado en Vercel; no hay aviso de privacidad publicado.

---

## B. Tabla maestra de auditoría

| # | Área | Elemento | Estado | Evidencia | Problema | Impacto | Solución | Prioridad | Dificultad |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Analítica | GA4 | ❌ | Sin `gtag`, `G-…` ni `googletagmanager` en HTML ni en `src/` | No existe GA4 | Sin datos de adquisición ni conversiones en Google | GTM + GA4 con eventos (sección L/M) | P0 | Baja |
| 2 | Analítica | Conversiones Google Ads | ❌ | Sin `AW-…` ni Google tag | No hay conversiones que Ads pueda optimizar | Presupuesto a ciegas, Smart Bidding inservible | Conversiones "Clic WhatsApp" y "Clic llamada" | P0 | Media |
| 3 | Negocio | Promociones publicadas | ❓ | `src/lib/salon.ts:222-224`: "Joaquín debe confirmar/ajustar los porcentajes y condiciones antes de difundir" — y están en producción | Oferta pública posiblemente no confirmada | Reclamos, pérdida de margen, confianza | Confirmar por escrito o retirar; publicar condiciones | P0 | Baja |
| 4 | Analítica | Vercel Web Analytics + eventos | ⚠️ | `@vercel/analytics`; `track("whatsapp_click"/"call_click", {section})` | Activación y plan no verificables; no alimenta Google Ads | Datos aislados | Verificar panel; mantener como respaldo | P1 | Baja |
| 5 | SEO On-page | Meta title | ⚠️ | 67 caracteres: "Joaquín Studio Salon \| Estilista Certificado Pivot Point en Tijuana" | Se trunca (~60), sin "salón de belleza" | CTR y relevancia | Title de 62 car. (sección G) | P1 | Baja |
| 6 | SEO On-page | Meta description | ⚠️ | 187 caracteres | Se trunca (~155) | CTR | Description de 149 car. | P1 | Baja |
| 7 | SEO On-page | H1 | ❌ | Único H1: "Joaquín Studio Salon" | Solo marca, sin servicio ni ciudad | Relevancia SEO y message match de Ads | H1 descriptivo (sección G) | P1 | Baja |
| 8 | SEO On-page | Vocabulario | ⚠️ | Texto visible: "salón de belleza" 0, "estética" 0, "Pivot Point" 8, "Tijuana" 7 | Vocabulario de marca, no de búsqueda | Rankings genéricos | Integrar términos (validar volumen) | P1 | Baja |
| 9 | SEO On-page | H2 | ⚠️ | "Nuestro trabajo habla por sí solo", "Más razones para visitarnos"… | H2 creativos, no descriptivos | Semántica y escaneo | H2 descriptivos (sección G) | P2 | Baja |
| 10 | Arquitectura | Una sola URL | ⚠️ | `sitemap.xml` con 1 URL; 11 secciones ancla | Todas las intenciones en una URL | Rankings por servicio, message match | Páginas Novias/XV y Balayage/Color | P1 | Alta |
| 11 | SEO On-page | Meta keywords | ⚠️ | `<meta name="keywords">` con 9 términos | Google la ignora; expone estrategia | Nulo / competencia | Eliminar | P3 | Baja |
| 12 | SEO Técnico | robots.txt | ✅ | 200; `Allow: /`; declara sitemap | — | — | Mantener | — | — |
| 13 | SEO Técnico | sitemap.xml | ✅ | 200, XML válido, 1 URL canónica, sin redirecciones | `lastmod` = fecha de build (2026-06-05T05:54:42Z) | Menor | `lastmod` real | P3 | Baja |
| 14 | SEO Técnico | Canonical home | ✅ | `https://joaquinstudiosalon.com` | Heredado por la 404 | Menor | Mover a `page.tsx` | P3 | Baja |
| 15 | SEO Técnico | HTTP→HTTPS | ✅ | 308 permanente a https | — | — | Mantener | — | — |
| 16 | SEO Técnico | www | ❌ / ❓ | Proyecto Vercel sin `www.joaquinstudiosalon.com`; DNS no verificable | Quien escriba "www" puede ver error | Tráfico directo / impresos | Agregar www con 308 → dominio raíz | P1 | Baja |
| 17 | SEO Técnico | Dominios `*.vercel.app` | ✅ | Protección Vercel `all_except_custom_domains` | No hay duplicado público | — | Validar en ventana privada | — | — |
| 18 | SEO Técnico | Página 404 | ⚠️ | HTTP 404 ✅, `noindex` ✅; página genérica en inglés, fondo blanco, sin menú/CTA, 2 etiquetas `<title>`, canonical a home | Visitante perdido | Leads perdidos | `not-found.tsx` con marca y CTA | P2 | Baja |
| 19 | SEO Técnico | Favicon | ⚠️ | `icon.png` 512×512 **156 KB** (2.º recurso más pesado); `/favicon.ico` → 404 | Peso y 404 | LCP/datos móviles | ICO 48 px + PNG 192 px comprimido | P2 | Baja |
| 20 | SEO Técnico | llms.txt | ❌ | `/llms.txt` → 404 | Propuesta emergente, opcional | Bajo | Opcional (sección H) | P3 | Baja |
| 21 | SEO Técnico | Páginas innecesarias indexables | ✅ | No hay `/page/`, tags, búsqueda ni parámetros | — | — | Mantener | — | — |
| 22 | SEO Técnico | Contenido sin JavaScript | ⚠️ | 51 de 51 bloques `.reveal` con `opacity:0` sin JS | Si JS falla, la página queda en blanco | Robustez | Fallback CSS | P2 | Baja |
| 23 | Seguridad | HSTS | ✅ | `strict-transport-security: max-age=63072000` | — | — | Mantener | — | — |
| 24 | Seguridad | Cabeceras de seguridad | ❌ | Sin CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy ni protección anti-iframe | Superficie de ataque evitable | Confianza/seguridad | `headers()` en `next.config.ts` | P2 | Media |
| 25 | Seguridad | Mixed content | ✅ | Recursos relativos o https | — | — | — | — | — |
| 26 | Rendimiento | LCP móvil (lab) | ❌ | Lighthouse móvil: LCP 4.5 s, rendimiento 78; escritorio 0.9 s / 98 | > 4 s = "pobre" | Rebote, experiencia de landing en Ads | Hero, favicon, JS | P1 | Media |
| 27 | Rendimiento | Imagen hero | ❌ | Original 1200×1600 336 KB; se sirve 168 KB (750w) o 336 KB (1200w en iPhone) con `opacity-40`; sin ella LCP baja a 3.6 s | Peso alto para imagen casi invisible | LCP | `quality` 50 y ancho máx. 828 | P1 | Baja |
| 28 | Rendimiento | CLS | ✅ | CLS 0 | — | — | Mantener | — | — |
| 29 | Rendimiento | JavaScript / INP | ⚠️ | TBT 300 ms (lab); ~167 KB gzip de JS; 48 KB sin usar; 51 componentes cliente `Reveal` | Hilo principal ocupado | INP potencial | Un solo observer o CSS | P2 | Media |
| 30 | Rendimiento | Galería | ✅ | `loading="lazy"`, `sizes`, WebP, contenedor con `aspect-ratio` | — | — | Mantener | — | — |
| 31 | Rendimiento | Logo | ⚠️ | `logo.png` 600×600 258 KB → 28.9 KB para mostrarse a 44 px | Sobredimensionado | Menor | Fuente de 176 px | P3 | Baja |
| 32 | Rendimiento | Fuentes | ⚠️ | 8 pesos (Cormorant 400–700, Jost 300–600), autohospedadas ✅ | Pesos de más | Menor | Reducir a 5 | P3 | Baja |
| 33 | Rendimiento | Compresión / CDN / caché | ✅ | `content-encoding: br`, `x-vercel-cache: HIT`, prerender estático | — | — | Mantener | — | — |
| 34 | Imágenes | ALT | ✅ | 18 `<img>` (17 archivos distintos) con ALT descriptivo, sin keyword stuffing | Logo con ALT redundante junto a texto | Menor | `alt=""` en logo del menú | P3 | Baja |
| 35 | Imágenes | Nombres de archivo | ⚠️ | `g01.webp` … `g14.webp` | No descriptivos | Google Imágenes (bajo) | Renombrar | P3 | Baja |
| 36 | Imágenes | Open Graph | ⚠️ | `og.jpg` 1200×630, 52 KB: solo logo con franjas negras | Sin foto ni propuesta de valor | CTR al compartir | Foto real + texto | P3 | Baja |
| 37 | Móvil | Overflow horizontal | ✅ | Ancho de documento = viewport en 320–1280 px | — | — | Mantener | — | — |
| 38 | Móvil | CTA persistente | ✅ | Botón flotante WhatsApp 56×56 fijo en todas las pantallas | Sin acceso rápido a llamada | Bajo | Mantener; barra opcional | P3 | Baja |
| 39 | Móvil | Touch targets footer | ⚠️ | Enlaces del footer 20 px de alto; iconos sociales 20×20 | < 44 px recomendado | UX / accesibilidad | Área táctil 44 px | P2 | Baja |
| 40 | Móvil | Longitud | ⚠️ | 15,398 px a 390 px de ancho; Precios en la pantalla 12.2, Contacto en la 15.8 | Mucho scroll | Conversión | "Precios" en menú; reordenar | P2 | Baja |
| 41 | UX | Navegación | ⚠️ | Menú sin "Precios"; footer sin Galería, Novias, Promos, FAQ | Inconsistente | Conversión | Unificar | P2 | Baja |
| 42 | UX / Confianza | Estrellas | ⚠️ | `Math.round(4.6)` → 5 estrellas llenas en hero y reseñas | Exagera visualmente la calificación | Confianza | Estrella parcial | P2 | Baja |
| 43 | Accesibilidad | Carruseles | ⚠️ | Reseñas y marcas en movimiento continuo; pausa solo con hover (no teclado ni táctil) | WCAG 2.2.2 | Accesibilidad | Botón pausar | P2 | Baja |
| 44 | Contenido | "Cambio de look: Por confirmar" | ⚠️ | Fila de la lista de precios | Parece inacabado | Confianza | "Cotización" | P2 | Baja |
| 45 | UX | Tipografía | ⚠️ | `font-light` (300) en textos de 12–14 px sobre fondo oscuro | Legibilidad | UX | Peso 400 en cuerpo | P2 | Baja |
| 46 | Accesibilidad | Nombre del enlace del logo | ⚠️ | `aria-label="Ir al inicio"` sobre texto visible "JOAQUIN STUDIO SALON" (Lighthouse) | WCAG 2.5.3 | Lectores de voz | Nombre que incluya el texto | P2 | Baja |
| 47 | Accesibilidad | Lightbox | ⚠️ | Al abrir, el foco se queda en la miniatura; no hay trampa de foco | Teclado / lector | Accesibilidad | Gestión de foco | P2 | Baja |
| 48 | Accesibilidad | Landmarks | ⚠️ | axe `region`: botón flotante fuera de landmarks | Menor | — | Envolver en `<aside>` | P3 | Baja |
| 49 | Accesibilidad | Contraste / encabezados | ✅ | Lighthouse accesibilidad 100; contraste y orden de encabezados sin fallos | — | — | Mantener | — | — |
| 50 | Conversión | Hero | ⚠️ | CTA principal y secundario sobre el pliegue en todos los anchos ✅; H1 solo marca ❌ | Falta qué/dónde/por qué | Conversión y message match | Hero nuevo (sección K) | P1 | Baja |
| 51 | Conversión | CTAs WhatsApp | ✅ | 10 enlaces `wa.me/526645369855` con mensajes distintos (cita, evento, promo nueva, referidos) | — | — | Mantener | — | — |
| 52 | Leads | Calidad del lead de eventos | ⚠️ | Mensaje precargado genérico sin fecha/personas/lugar | Conversaciones largas para cotizar | Calidad | Plantilla (sección K) | P1 | Baja |
| 53 | Conversión | Formularios | ✅ (N/A) | 0 `<form>`, 0 `<input>` | Decisión correcta para un salón | — | No agregar formulario general | — | — |
| 54 | Conversión | Página de gracias | N/A | No existe (`/gracias` → 404) | No aplica a WhatsApp | — | No crear una "falsa" | — | — |
| 55 | Conversión | Teléfono | ✅ | `tel:+526648653576` (E.164) en Contacto y footer | No visible arriba del pliegue | Bajo | Mantener | P3 | Baja |
| 56 | Conversión | Correo | ❌ | Sin `mailto:` ni correo en todo el sitio | Canal ausente | Bajo (salón) | Agregar si existe correo | P3 | Baja |
| 57 | Conversión / Local | Mapa | ⚠️ | iframe por coordenadas `32.492,-116.875`; sin ficha del negocio; sin botón "Cómo llegar" | No muestra nombre ni reseñas | Conversión local | Embed del perfil + botón | P2 | Baja |
| 58 | Confianza | Calificación | ⚠️ / ❓ | `rating: 4.6, reviews: 34` escrito a mano en `salon.ts` | Se desactualiza | Confianza / schema | Proceso de actualización | P1 | Baja |
| 59 | Confianza | E-E-A-T | ⚠️ | Sin años de experiencia, certificado, fotos de novias/XV (la sección usa iconos) | Menos prueba | Conversión | Contenido del negocio | P2 | Alta |
| 60 | SEO Local | Google Business Profile | ❓ | Enlace `maps.app.goo.gl/kMdqwCBMybu1oQmm9`; dos teléfonos (fijo y WhatsApp); Facebook `HairStudioSalonn` | NAP no verificable | SEO local | Checklist GBP (sección G) | P1 | Baja |
| 61 | Schema | HairSalon | ⚠️ | JSON-LD válido; `aggregateRating` propio; sin `image`/`logo`; `@id` igual a la URL; `addressRegion: "B.C."` | Detalles incorrectos/incompletos | Rich results | JSON-LD corregido (sección P) | P2 | Baja |
| 62 | Schema | FAQPage | ✅ | Válido, sincronizado con el FAQ visible | Google ya no muestra FAQ enriquecido para este tipo de sitio | Nulo | Mantener sin expectativa | P3 | — |
| 63 | Schema | WebSite | ❌ | No existe | Nombre del sitio en resultados | Bajo | Agregar | P3 | Baja |
| 64 | Legal | Aviso de privacidad | ❌ | 0 menciones de "privacidad" | Requisito previo a GA4/Ads | Legal / confianza | Publicar (revisión legal) | P1 | Media |
| 65 | Legal | Condiciones de promociones | ❌ | "Aplican condiciones; consulta los detalles al agendar" | Condiciones no publicadas | Confianza | Publicar condiciones | P2 | Baja |
| 66 | Legal | Banner de cookies | ⚠️ | Hoy no hay cookies propias; Vercel Analytics no usa cookies; el mapa de Google (tercero) carga al hacer scroll | Necesario al instalar GA4/Ads | Legal | Banner con Consent Mode | P1 (con GA4) | Media |
| 67 | Social | Botones de compartir | ✅ | No existen | Correcto para este negocio | — | No agregar | — | — |
| 68 | Branding | Favicon personalizado | ✅ | `icon.png` y `apple-icon.png` con el logo | Peso (ver #19) | — | — | — | — |
| 69 | Social | Open Graph / Twitter | ✅ | `og:title`, `og:description`, `og:image` 1200×630, `og:url`, `og:type`, `og:locale`, `twitter:card` | — | — | Mejorar imagen (#36) | — | — |
| 70 | SEO IA | Preparación para IA | ⚠️ | NAP, horario, precios y FAQ en HTML ✅; falta experiencia, área de domicilio, pagos | Respuestas incompletas | Visibilidad en respuestas | Datos concretos (sección H) | P2 | Media |

---

## C. Problemas críticos P0

Solo dos. El sitio no está "roto": lo crítico es lo que impide medir y lo que puede generar un compromiso comercial no autorizado.

### P0-1 · No existe medición de conversiones utilizable por Google (GA4 / Google Ads)

- **ELEMENTO:** Analítica y conversiones (tabla maestra #1, #2).
- **ESTADO:** ❌ — **HECHO VERIFICADO.**
- **EVIDENCIA:** El HTML de producción solo carga scripts propios de Next.js y el componente `<Analytics />` de Vercel (`src/app/layout.tsx:90`). No hay `gtag.js`, `googletagmanager.com`, IDs `G-…`, `GTM-…`, `AW-…` ni Meta Pixel en el HTML ni en `src/`. Existe un rastreador propio (`src/components/site/conversion-tracker.tsx`) que envía `whatsapp_click` y `call_click` **solo a Vercel Web Analytics**.
- **URL / SECCIÓN:** Todo el sitio.
- **QUÉ ESTÁ MAL:** Google Ads no puede importar eventos de Vercel. No hay forma de saber qué búsqueda, anuncio o campaña terminó en una conversación de WhatsApp o una llamada.
- **POR QUÉ IMPORTA:** Sin conversiones, Google Ads optimiza por clics (tráfico barato, no clientas). Tampoco se puede calcular costo por cita.
- **IMPACTO SEO:** Bajo (GA4 no afecta el ranking), pero sin GA4 no se ve qué páginas atraen tráfico orgánico que convierte.
- **IMPACTO GOOGLE ADS:** Crítico. Sin conversiones no hay estrategias de puja "Maximizar conversiones" ni reporte de ROI.
- **IMPACTO UX:** Nulo.
- **IMPACTO CONVERSIÓN / LEADS:** Indirecto pero alto: sin datos no se sabe qué CTA (hero, precios, novias, promos) genera más contactos.
- **SOLUCIÓN:** Instalar Google Tag Manager; dentro de GTM configurar la etiqueta de Google (GA4) y las conversiones de Google Ads; enviar desde el `ConversionTracker` existente un evento al `dataLayer` además del evento de Vercel.
- **EJEMPLO:**

```tsx
// src/app/layout.tsx  (requiere: pnpm add @next/third-parties)
import { GoogleTagManager } from "@next/third-parties/google";
// …
<html lang="es-MX" className={…}>
  <GoogleTagManager gtmId="GTM-XXXXXXX" />  {/* ID real del contenedor */}
  <body>…</body>
</html>
```

```tsx
// src/components/site/conversion-tracker.tsx — dentro del handler existente
import { sendGTMEvent } from "@next/third-parties/google";
// …
const isWhatsApp = link.href.includes("wa.me");
track(isWhatsApp ? "whatsapp_click" : "call_click", { section }); // Vercel (se conserva)
sendGTMEvent({
  event: isWhatsApp ? "click_whatsapp" : "click_phone",
  cta_location: section,             // inicio | novias | promos | precios | contacto | global
  cta_text: link.textContent?.trim() // "Agendar por WhatsApp", "Cotizar mi evento", …
});
```

- **PASOS:**
  1. Crear cuenta/contenedor de GTM (web) y propiedad GA4 con el dominio `joaquinstudiosalon.com`.
  2. Publicar primero el **Aviso de privacidad** y el mecanismo de consentimiento (P1-6).
  3. Instalar GTM en el layout (código arriba) y el `sendGTMEvent` en el rastreador.
  4. En GTM: etiqueta de Google (GA4) en All Pages; activadores de evento personalizado `click_whatsapp` y `click_phone`; etiquetas de evento GA4 con parámetros `cta_location` y `cta_text`.
  5. En GA4: marcar `click_whatsapp` y `click_phone` como **eventos clave**.
  6. En Google Ads: vincular GA4 e importar ambos eventos clave, o crear conversiones nativas de Ads con el mismo activador (usar **una sola** de las dos vías para no duplicar).
- **PRIORIDAD / DIFICULTAD:** P0 / Media.
- **DEPENDENCIAS:** Aviso de privacidad y consentimiento (P1-6); acceso a Google Ads.
- **VALIDACIÓN:** GTM → Vista previa (Tag Assistant): al tocar cada botón de WhatsApp se ve `click_whatsapp` con `cta_location` correcto. GA4 → Tiempo real → Eventos. Google Ads → Objetivos → Conversiones: estado "Registrando conversiones" en 24–48 h. Confirmar que un clic produce **una** conversión, no dos.

### P0-2 · Promociones publicadas que el propio código marca como "pendientes de confirmar"

- **ELEMENTO:** Sección Promociones `#promos` (tabla maestra #3).
- **ESTADO:** ❓ — el hecho de la nota es **VERIFICADO**; si Joaquín ya las autorizó es **NO VERIFICABLE**.
- **EVIDENCIA:** `src/lib/salon.ts:222-224`: *"IMPORTANTE: estos son compromisos del negocio. Joaquín debe confirmar/ajustar los porcentajes y condiciones antes de difundir."* Las dos promos ("15 % en tu primera visita" y "Trae una amiga: 15 % + $150") están en producción con botones de WhatsApp.
- **QUÉ ESTÁ MAL:** Una oferta publicada en la web es una promesa a cualquier persona que la lea. Si no está autorizada, o sus condiciones no están definidas ("Aplican condiciones; consulta los detalles al agendar"), genera conflicto en el momento de cobrar.
- **POR QUÉ IMPORTA:** Una clienta molesta por una promo no respetada se traduce en reseñas negativas en Google, que afectan SEO local y conversión.
- **IMPACTO SEO / ADS:** Si se usa la promo en anuncios, Google Ads exige que la oferta del anuncio esté en la landing y sea real.
- **IMPACTO CONVERSIÓN:** Alto, positivo si es real; negativo si no se cumple.
- **SOLUCIÓN:** Joaquín confirma por escrito: porcentaje, vigencia, servicios excluidos (¿aplica a balayage de $4,500?), si es acumulable, cómo se valida "cliente nuevo" y cómo se valida el referido. Luego se publican esas condiciones debajo de las tarjetas o en una página de condiciones.
- **EJEMPLO de texto de condiciones (a completar por el negocio):** "Válido en el primer servicio de clientes nuevos hasta el [fecha]. No aplica en [servicios]. No acumulable con otras promociones. Menciónalo al agendar por WhatsApp."
- **PASOS:** 1) Confirmación del dueño. 2) Editar `promos` en `src/lib/salon.ts` (o retirar la sección de `src/app/page.tsx` y el enlace "Promociones" del menú). 3) Publicar condiciones.
- **PRIORIDAD / DIFICULTAD:** P0 / Baja (la decisión es del negocio; el cambio técnico toma minutos).
- **DEPENDENCIAS:** Decisión de Dirección.
- **VALIDACIÓN:** La nota "IMPORTANTE… antes de difundir" desaparece del código y las condiciones son visibles en la web.

---

## D. Prioridad P1 (antes o durante el lanzamiento de campañas)

### P1-1 · Título, meta descripción, H1 y hero sin los términos que busca la clienta

- **ELEMENTO:** `<title>`, `<meta name="description">`, `<h1>` y subtítulo del hero (tabla maestra #5–#8, #50).
- **ESTADO:** ⚠️/❌ — **HECHO VERIFICADO.**
- **EVIDENCIA:** Title de 67 caracteres; description de 187; H1 = "Joaquín Studio Salon"; "salón de belleza" aparece 0 veces en el texto visible; "Pivot Point" 8 veces.
- **URL / SECCIÓN:** `/` — `src/app/layout.tsx:26-31` y `src/components/site/hero.tsx:36-51`.
- **QUÉ ESTÁ MAL:** El H1 y el título priorizan la marca y la certificación. Quien no conoce el salón busca "salón de belleza en Tijuana", "balayage Tijuana", "maquillaje para novia Tijuana"; el término "estética" es habitual en México para este tipo de negocio (**HIPÓTESIS**: validar volumen en Keyword Planner y en las consultas de Search Console antes de usarlo).
- **POR QUÉ IMPORTA:** El title y el H1 son las señales on-page más fuertes; el title además es el texto clicable en Google.
- **IMPACTO SEO:** Alto para búsquedas no de marca. **IMPACTO ADS:** Relevancia de landing (Quality Score) y message match. **IMPACTO UX / CONVERSIÓN:** Hoy el visitante entiende "salón" por las fotos, pero el titular no dice qué hace ni dónde.
- **SOLUCIÓN / EJEMPLO:**
  - META TITLE (62 car.): `Salón de Belleza en Tijuana: Balayage y Color | Joaquín Studio`
  - META DESCRIPTION (149 car.): `Balayage, corrección de color, cortes y keratina en El Pípila, Tijuana. Maquillaje para novias y XV. Precios desde $200. Agenda tu cita por WhatsApp.` ("desde $200" es verificable en la lista de precios: corte de niño, barba y ceja.)
  - H1: `Balayage, color y cortes profesionales en Tijuana` — la marca "Joaquín Studio Salon" pasa al eyebrow/logo con el mismo tratamiento visual dorado.
  - Hero completo en la sección K.
- **PASOS:** Editar `metadata` en `layout.tsx` (o moverla a `page.tsx`) y el JSX del hero. Mantener "Pivot Point" en el eyebrow y en la sección Estudio, no en el H1.
- **PRIORIDAD / DIFICULTAD:** P1 / Baja. **DEPENDENCIAS:** Visto bueno del dueño al texto.
- **VALIDACIÓN:** Ver código fuente de producción: un solo `<h1>` con el texto nuevo; title ≤ 60–62 car.; Search Console → Inspección de URL → "Solicitar indexación"; comparar CTR e impresiones en GSC a 28 días.

### P1-2 · LCP móvil de 4.5 s (laboratorio) por la imagen del hero y el favicon

- **ELEMENTO:** Rendimiento móvil (tabla maestra #26, #27, #19).
- **ESTADO:** ❌ — **medición de laboratorio**, no dato de campo.
- **EVIDENCIA:** Lighthouse 13.5 móvil: Rendimiento 78, FCP 1.1 s, **LCP 4.5 s**, TBT 300 ms, CLS 0. Bloqueando solo la imagen del hero el LCP baja a **3.6 s**. El hero se sirve a 168 KB (750w) o 336 KB (1200w, pantallas 3x) y se muestra con `opacity-40` bajo un degradado del 70–95 %. El favicon `icon.png` pesa 156 KB (512×512) y se descarga en cada visita. El elemento LCP medido es el párrafo del subtítulo del hero, con ~1.2 s de "retraso de renderizado" por competencia de ancho de banda y del hilo principal.
- **URL / SECCIÓN:** `/` — `src/components/site/hero.tsx:14-21`, `src/app/icon.png`.
- **POR QUÉ IMPORTA:** Google usa Core Web Vitals como señal de experiencia; Google Ads evalúa "experiencia en la página de destino". El tráfico de Ads es mayoritariamente móvil.
- **IMPACTO:** SEO medio; Ads medio; UX alto en redes móviles lentas; conversión: cada segundo extra aumenta el abandono.
- **SOLUCIÓN / EJEMPLO:**

```ts
// next.config.ts
const nextConfig: NextConfig = {
  images: { qualities: [50, 75] }, // Next 16 exige declarar calidades distintas de 75
};
```

```tsx
// hero.tsx — la foto se ve al 40 %: no necesita más de 828 px ni calidad 75
<Image src="/hero.webp" alt="" fill priority quality={50}
  sizes="(max-width: 828px) 100vw, 828px" className="object-cover object-top opacity-40" />
```

  Además: `alt=""` porque la foto es decorativa (el texto del hero ya describe el servicio); reemplazar `src/app/icon.png` por un PNG de 192×192 comprimido (objetivo < 15 KB) y agregar `src/app/favicon.ico` de 48×48.
- **PRIORIDAD / DIFICULTAD:** P1 / Baja. **DEPENDENCIAS:** Ninguna.
- **VALIDACIÓN:** Lighthouse móvil: LCP < 2.5 s en laboratorio (objetivo) y peso del hero < 60 KB en DevTools → Network. A 28 días: Search Console → Core Web Vitals (si hay suficiente tráfico) o Vercel Speed Insights (hoy no instalado).

### P1-3 · El subdominio `www` no está configurado

- **ESTADO:** ❌ en Vercel — **HECHO VERIFICADO**; comportamiento DNS de `www` — ❓ **NO VERIFICABLE**.
- **EVIDENCIA:** El proyecto `jstudiosalon` solo tiene asignado `joaquinstudiosalon.com` (más dominios `*.vercel.app` protegidos). No existe `www.joaquinstudiosalon.com` en el proyecto.
- **QUÉ ESTÁ MAL / POR QUÉ IMPORTA:** Mucha gente escribe "www." por costumbre, y tarjetas o lonas impresas pueden llevarlo. Si no resuelve, esa visita se pierde.
- **IMPACTO:** SEO bajo; Ads nulo; UX/conversión medio para tráfico directo.
- **SOLUCIÓN:** Vercel → Proyecto → Settings → Domains → Add `www.joaquinstudiosalon.com` → "Redirect to joaquinstudiosalon.com" con 308; crear el registro DNS que Vercel indique (CNAME).
- **PRIORIDAD / DIFICULTAD:** P1 / Baja. **DEPENDENCIAS:** Acceso al DNS del dominio.
- **VALIDACIÓN:** `curl -I https://www.joaquinstudiosalon.com` → `308` con `location: https://joaquinstudiosalon.com/`.

### P1-4 · Google Search Console: verificación, sitemap e indexación

- **ESTADO:** ❓ **NO VERIFICABLE** (sin acceso). **HECHO VERIFICADO:** existe el archivo de verificación `public/google22c529a94d6d6d3f.html` y responde 200, lo que indica que se inició una verificación por archivo HTML.
- **POR QUÉ IMPORTA:** Sin GSC no se sabe con qué búsquedas aparece el sitio ni si Google lo indexó.
- **SOLUCIÓN:** Checklist completa en la sección L. Recomendación adicional: crear también la **propiedad de dominio** (verificación DNS), que cubre `www`, `http` y `https`.
- **PRIORIDAD / DIFICULTAD:** P1 / Baja. **VALIDACIÓN:** Sitemap `https://joaquinstudiosalon.com/sitemap.xml` con estado "Correcto"; Inspección de URL de la home → "La URL está en Google".

### P1-5 · Google Business Profile y consistencia NAP (nombre, dirección, teléfono)

- **ESTADO:** ❓ **NO VERIFICABLE.**
- **EVIDENCIA VERIFICADA:** La web enlaza al perfil (`https://maps.app.goo.gl/kMdqwCBMybu1oQmm9`); usa **dos teléfonos** (fijo 664 865 3576 para llamadas, 664 536 9855 para WhatsApp); el schema declara el fijo; la página de Facebook tiene el slug `HairStudioSalonn`, que no coincide con el nombre comercial.
- **POR QUÉ IMPORTA:** Para un salón local, el Perfil de Negocio (mapa de Google) trae más clientes que la web. Google cruza nombre, dirección y teléfono entre el perfil, la web y los directorios.
- **SOLUCIÓN:** Revisar en el perfil: nombre exacto "Joaquín Studio Salon"; categoría principal (p. ej. "Salón de belleza"); teléfono principal = el mismo que el schema; sitio web = `https://joaquinstudiosalon.com`; horario idéntico al de la web (L–S 10:00–18:00, D 11:00–15:00); servicios y precios cargados; fotos recientes; respuesta a reseñas. Si el teléfono principal del perfil es el de WhatsApp, cambiar el schema para que coincida.
- **PRIORIDAD / DIFICULTAD:** P1 / Baja. **DEPENDENCIAS:** Acceso de propietario al perfil.
- **VALIDACIÓN:** Captura del perfil vs. footer de la web: mismo nombre, dirección, teléfono y horario.

### P1-6 · No hay Aviso de privacidad ni mecanismo de consentimiento (requisito previo a GA4/Ads)

- **ESTADO:** ❌ — **HECHO VERIFICADO** (0 menciones de "privacidad", "cookies" o "términos"; sin enlaces legales en el footer).
- **POR QUÉ IMPORTA:** Hoy la web no recolecta datos en formularios y Vercel Web Analytics no usa cookies. Al instalar GA4 y Google Ads se instalarán cookies de medición y publicidad; además la conversación de WhatsApp recolecta nombre y teléfono. En México la LFPDPPP regula el tratamiento de datos personales por particulares; **el alcance exacto de las obligaciones para este negocio debe confirmarlo un profesional legal** (no se verifica aquí).
- **SOLUCIÓN:** Página `/aviso-de-privacidad` enlazada desde el footer y desde el banner de cookies. Debe documentar (información que debe proporcionar el negocio): responsable y domicilio, datos que se recaban (vía WhatsApp y teléfono), finalidades (agenda, cotización, promociones), uso de cookies/analítica/publicidad, transferencias (Google, Meta/WhatsApp), medios para ejercer derechos, y fecha de actualización.
- **PRIORIDAD / DIFICULTAD:** P1 / Media (redacción con asesoría). **DEPENDENCIAS:** Bloquea P0-1.
- **VALIDACIÓN:** Enlace "Aviso de privacidad" visible en el footer de todas las páginas; responde 200 e indexable.

### P1-7 · Calificación de Google escrita a mano y mostrada como 5 estrellas

- **ESTADO:** ⚠️ — **HECHO VERIFICADO**; si 4.6/34 es el dato actual es ❓.
- **EVIDENCIA:** `src/lib/salon.ts:12-13` (`rating: 4.6`, `reviews: 34`) se usa en el hero, en Estudio, en Reseñas y en el schema `aggregateRating`. `hero.tsx:61` y `testimonials.tsx:15` usan `Math.round(4.6)` = 5 → **cinco estrellas llenas**.
- **QUÉ ESTÁ MAL:** 1) El dato se desactualiza sin que nadie lo note. 2) Visualmente se comunica 5.0. 3) Google no muestra estrellas de reseñas para un negocio que publica su propia calificación ("self-serving reviews"), así que el `aggregateRating` no aporta y sí puede quedar inconsistente con el perfil.
- **IMPACTO:** Confianza y riesgo de percepción engañosa; SEO nulo/negativo leve.
- **SOLUCIÓN:** Mostrar 4 estrellas llenas + 1 parcial (o el número "4.6" sin estrellas); revisar el dato cada mes (tarea en el plan) o citar "Calificación en Google al [mes/año]"; eliminar `aggregateRating` del JSON-LD.
- **PRIORIDAD / DIFICULTAD:** P1 / Baja. **VALIDACIÓN:** Hero y Reseñas muestran 4 ½ estrellas; el JSON-LD ya no contiene `aggregateRating`; el número coincide con el perfil de Google el día de la revisión.

### P1-8 · Calidad del prospecto de eventos (novias/XV): el mensaje no pide datos para cotizar

- **ESTADO:** ⚠️ — **HECHO VERIFICADO.**
- **EVIDENCIA:** `src/components/site/events.tsx:14-16`: "Me interesa el servicio para un evento especial (novia / XV años / graduación). ¿Me pasas información y disponibilidad?"
- **QUÉ ESTÁ MAL:** Cada cotización requiere varios mensajes de ida y vuelta; la fecha, que decide si hay disponibilidad, llega al final.
- **IMPACTO:** Leads: alto (tiempo de respuesta y cierre); Ads: permite calificar leads.
- **SOLUCIÓN / EJEMPLO de mensaje precargado:**

```text
¡Hola Joaquín! Quiero cotizar maquillaje y peinado para un evento.
• Tipo de evento: (novia / XV años / graduación / otro)
• Fecha: __/__/____
• Número de personas: __
• Lugar: (en el salón / a domicilio en ____ )
¿Tienes disponibilidad?
```

- **PRIORIDAD / DIFICULTAD:** P1 / Baja. **VALIDACIÓN:** Tocar "Cotizar mi evento" en móvil y comprobar que WhatsApp abre con el texto completo y con los saltos de línea.

### P1-9 · Landings específicas para las campañas que se vayan a pagar (Novias/XV y Balayage/Color)

- **ESTADO:** ⚠️ — **HALLAZGO** basado en hechos verificados.
- **EVIDENCIA:** A 390 px, la sección Novias empieza en la pantalla 5.9 y Precios en la 12.2 (página de 15,398 px). El H1 no menciona ningún servicio. El sitemap tiene 1 URL.
- **POR QUÉ IMPORTA:** Un anuncio de "maquillaje para novia en Tijuana" que aterriza en una portada genérica rompe el message match: la persona no ve de inmediato lo que buscó.
- **SOLUCIÓN:** Ver sección N (decisión A vs. B) y S (estructura de cada página). Solo crear páginas con contenido real del negocio (fotos propias de novias/XV, proceso, prueba previa, anticipo, cobertura a domicilio, rango de precios).
- **PRIORIDAD / DIFICULTAD:** P1 si habrá campañas por servicio; P2 si solo habrá campaña de marca/genérica. Dificultad Alta (requiere fotos y datos del negocio).
- **VALIDACIÓN:** Cada landing con un solo H1 alineado a su grupo de anuncios, CTA arriba del pliegue, evento `click_whatsapp` con `cta_location` propio.

### P1-10 · Vercel Web Analytics: comprobar que realmente registra

- **ESTADO:** ❓ **NO VERIFICABLE.**
- **EVIDENCIA VERIFICADA:** El componente está instalado y el código envía eventos personalizados.
- **RIESGO:** Web Analytics debe estar activado en el panel del proyecto, y según la documentación de Vercel los **eventos personalizados** (`track`) no están disponibles en el plan Hobby. Si el equipo está en Hobby, `whatsapp_click` y `call_click` no se estarían guardando.
- **SOLUCIÓN / VALIDACIÓN:** Vercel → Proyecto → Analytics → comprobar visitas de los últimos 7 días y la pestaña **Events**. Si no aparecen eventos, depender de GA4 (P0-1).
- **PRIORIDAD / DIFICULTAD:** P1 / Baja.

---

## E. Prioridad P2 (mejoras relevantes, no críticas)

| ID | Elemento | Evidencia (verificada) | Qué está mal y por qué importa | Solución / ejemplo | Validación | Dificultad |
|---|---|---|---|---|---|---|
| P2-1 | Página 404 | HTTP 404 ✅ y `noindex` ✅; plantilla por defecto en inglés ("This page could not be found."), fondo blanco, sin menú ni CTA; dos `<title>` | Quien llega de un enlace roto abandona | Crear `src/app/not-found.tsx` con logo, "No encontramos esta página", botones "Ir al inicio" y "Agendar por WhatsApp"; mover `alternates.canonical` de `layout.tsx` a `page.tsx` para que la 404 no herede el canonical | `curl -I /x` → 404; un solo `<title>`; sin canonical | Baja |
| P2-2 | Cabeceras de seguridad | Respuestas de producción solo con HSTS; sin `headers()` en `next.config.ts` ni `vercel.json` | Protección básica ausente (clickjacking, MIME sniffing, fuga de referer) | Ver ejemplo abajo | securityheaders.com → mínimo grado A sin CSP, A+ con CSP | Media |
| P2-3 | Contenido invisible sin JavaScript | 51/51 bloques `.reveal` con `opacity:0` hasta que el JS los activa | Si el JS falla o tarda (red lenta, bloqueadores), el visitante ve secciones vacías | Aplicar la opacidad 0 solo cuando JS está activo: agregar `class="js"` al `<html>` con un script inline y cambiar el selector a `.js .reveal` | Desactivar JS en DevTools: todas las secciones visibles | Baja |
| P2-4 | JavaScript e INP | TBT 300 ms (lab); ~167 KB gzip de JS; 48 KB sin usar; 51 instancias de `Reveal` (componente cliente, un `IntersectionObserver` cada una) | Hilo principal ocupado en móviles modestos | Un único observer compartido o animaciones CSS por scroll; mantener componentes de servidor | TBT < 200 ms en Lighthouse móvil | Media |
| P2-5 | H2 descriptivos | 10 H2 creativos (ver sección G) | Google y el lector no identifican el tema de cada bloque | Tabla de H2 propuestos en la sección G; la frase creativa puede quedar como subtítulo | Revisar esquema de encabezados con extensión "HeadingsMap" | Baja |
| P2-6 | Navegación | Menú: Servicios, Galería, Novias y Eventos, Promociones, Contacto (sin **Precios**). Footer: Servicios, Precios, El Estudio, Contacto | La 2.ª razón de visita (precio) no está en el menú | Menú: Servicios · Precios · Novias y XV · Galería · Contacto. Footer: mismos enlaces + Aviso de privacidad | Menú móvil y footer con los mismos destinos | Baja |
| P2-7 | Touch targets del footer | Enlaces de 20 px de alto; iconos sociales de 20×20 px | Difícil de tocar; WCAG 2.2 recomienda ≥ 24 px (44 px como buena práctica) | `py-2.5` en enlaces; iconos dentro de área `size-11` como en Contacto | Playwright/Lighthouse: sin objetivos < 44 px | Baja |
| P2-8 | Carruseles en movimiento | Reseñas y marcas animadas sin fin; pausa solo con hover (no teclado ni táctil). Sí respeta `prefers-reduced-motion` ✅ | WCAG 2.2.2 (pausar, detener, ocultar) | Botón "Pausar" visible o pausa con `:focus-within`; alternativa: cuadrícula estática de reseñas | Navegar con Tab: el carrusel se detiene | Baja |
| P2-9 | "Cambio de look: Por confirmar" | Fila en la lista de precios | Parece un pendiente olvidado | Cambiar a "Cotización" (como Extensiones) o retirar | Revisión visual | Baja |
| P2-10 | Tipografía ligera | `font-light` (300) en cuerpo de 12–14 px sobre fondo oscuro | Legibilidad reducida, sobre todo para personas mayores | Peso 400 para párrafos y notas; 300 solo en textos ≥ 18 px | Revisión visual en móvil con brillo bajo | Baja |
| P2-11 | Nombre accesible del logo | `aria-label="Ir al inicio"` sobreescribe el texto visible (Lighthouse `label-content-name-mismatch`) | Usuarios de control por voz dicen "Joaquín" y no funciona | `aria-label="Joaquín Studio Salon, ir al inicio"` y `alt=""` en la imagen del logo | Lighthouse accesibilidad sin la advertencia | Baja |
| P2-12 | Lightbox de galería | Al abrir, el foco queda en la miniatura; no hay trampa de foco; al cerrar no se devuelve | Teclado y lectores de pantalla pierden el contexto | Mover foco al botón "Cerrar" al abrir, atrapar Tab dentro del diálogo, devolver foco al cerrar (o usar `Dialog` de Radix, ya instalado) | Probar con teclado: Tab no sale del lightbox | Baja |
| P2-13 | Mapa | iframe por coordenadas (`google.com/maps?q=32.492,-116.875`) | No muestra el nombre del negocio ni sus reseñas; no hay botón "Cómo llegar" | Usar el código "Insertar un mapa" del propio perfil de Google y agregar botón "Cómo llegar" hacia `googleMapsUrl` | El mapa muestra la ficha "Joaquín Studio Salon" | Baja |
| P2-14 | Prueba y experiencia (E-E-A-T) | Sin años de experiencia, sin foto del certificado, sección Novias/XV solo con iconos | Menos argumentos para el servicio de mayor ticket | Agregar: años de experiencia, foto del certificado Pivot Point, 6 fotos reales de novias/XV, 2–3 reseñas de novias. **Requiere información del cliente** | Revisión de contenido | Alta |
| P2-15 | Schema HairSalon | Ver sección P | `aggregateRating` propio, sin `image`/`logo`, `@id` igual a la URL, `addressRegion` abreviado | JSON-LD corregido en sección P | Rich Results Test sin advertencias | Baja |
| P2-16 | Condiciones de promociones | "Promociones no acumulables. Aplican condiciones; consulta los detalles al agendar." | Condiciones no públicas | Publicar condiciones confirmadas (ver P0-2) | Visibles en la web | Baja |
| P2-17 | FAQ incompleto | 6 preguntas; faltan pagos, estacionamiento, anticipo, domicilio, cancelación | Dudas que frenan la cita | Preguntas propuestas en sección K. **Respuestas requieren información del cliente** | FAQ actualizado | Media |
| P2-18 | Tracking complementario | Solo se rastrean `wa.me` y `tel:` | No se mide intención secundaria | Eventos `click_directions`, `click_reviews`, `click_social`, `view_pricing` (sección M) | GTM Vista previa | Baja |

**Ejemplo P2-2 (cabeceras de seguridad), `next.config.ts`:**

```ts
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // CSP: activar primero como Content-Security-Policy-Report-Only y ajustar.
  // Debe permitir Google Maps (frame-src), Vercel Insights y GTM/GA4 si se instalan.
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { qualities: [50, 75] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
```

---

## F. Prioridad P3 (optimizaciones futuras)

| ID | Elemento | Evidencia | Recomendación | Dificultad |
|---|---|---|---|---|
| P3-1 | Meta keywords | Presente en `layout.tsx:32-42` | Eliminar: Google la ignora y muestra la estrategia a competidores | Baja |
| P3-2 | `lastmod` del sitemap | `new Date()` en `sitemap.ts` = fecha de cada build | Fecha fija que se actualice cuando cambie el contenido | Baja |
| P3-3 | llms.txt | 404 | Opcional; ver sección H. No es factor de ranking | Baja |
| P3-4 | Logo | 600×600, 258 KB → 28.9 KB para 44 px | Versión de 176×176 px para el menú | Baja |
| P3-5 | Fuentes | 8 pesos cargables | Cormorant 500/600 y Jost 300/400/500 | Baja |
| P3-6 | Nombres de imágenes | `g01.webp`…`g14.webp` | Nombres descriptivos (sección O) | Baja |
| P3-7 | Imagen Open Graph | Solo logo con franjas negras | Foto real de trabajo + "Salón de belleza · El Pípila, Tijuana" | Baja |
| P3-8 | Schema WebSite | No existe | Agregar (sección P) para el nombre del sitio en resultados | Baja |
| P3-9 | FAQPage | Válido y sincronizado | Mantener sin esperar resultado enriquecido (Google lo limita a sitios gubernamentales y de salud desde 2023) | — |
| P3-10 | Correo electrónico | No existe en el sitio | Si hay correo del negocio, agregarlo en Contacto (útil para proveedores y novias que piden cotización formal) | Baja |
| P3-11 | Landmark del botón flotante | axe `region` | Envolver en `<aside aria-label="Contacto rápido">` | Baja |
| P3-12 | AVIF | `images.formats` por defecto (solo WebP) | Evaluar `['image/avif','image/webp']` (≈20 % menos peso; más costo de transformación) | Baja |
| P3-13 | `X-Powered-By` | Local lo envía; producción no mostró la cabecera en las respuestas revisadas | `poweredByHeader: false` | Baja |
| P3-14 | Teléfono visible arriba | Solo en Contacto y footer | Opcional: icono de llamada en el header móvil | Baja |

---

## G. SEO On-Page por URL

El sitio tiene **una sola URL indexable**. Las secciones son anclas (`#servicios`, `#precios`…) que Google no trata como páginas separadas.

### URL: `https://joaquinstudiosalon.com/`

| Campo | Actual (VERIFICADO) | Propuesto (RECOMENDACIÓN) |
|---|---|---|
| **INTENCIÓN** | Mixta: marca + local + servicios + precios | Local transaccional: "salón de belleza / estética en Tijuana", "salón en El Pípila", búsquedas de marca |
| **KEYWORD PRINCIPAL** | No definida (title orientado a "Estilista Certificado Pivot Point") | `salón de belleza en Tijuana` |
| **KEYWORDS SECUNDARIAS** | — | `balayage Tijuana`, `corrección de color Tijuana`, `keratina Tijuana`, `salón de belleza El Pípila`, `estética en Tijuana` (**validar volumen**), `precios de balayage` |
| **TÉRMINOS SEMÁNTICOS** | Presentes: balayage, babylights, rayitos, mechas, keratina, Olaplex, botox capilar, maquillaje, novias, XV años | Agregar: "cita", "cerca de El Pípila / Camino Federal", "tinte", "decoloración" (solo si se ofrece) |
| **META TITLE** | `Joaquín Studio Salon \| Estilista Certificado Pivot Point en Tijuana` (67 car.) | `Salón de Belleza en Tijuana: Balayage y Color \| Joaquín Studio` (62 car.) |
| **META DESCRIPTION** | `Salón de belleza en El Pípila, Tijuana. Balayage, corrección de color, cortes, tratamientos y maquillaje con Joaquín Alonzo Gaytán, estilista certificado Pivot Point. Agenda por WhatsApp.` (187 car.) | `Balayage, corrección de color, cortes y keratina en El Pípila, Tijuana. Maquillaje para novias y XV. Precios desde $200. Agenda tu cita por WhatsApp.` (149 car.) |
| **H1** | `Joaquín Studio Salon` | `Balayage, color y cortes profesionales en Tijuana` (marca en el eyebrow) |
| **CTA PRINCIPAL** | "Agendar por WhatsApp" ✅ | Mantener |

**H2 recomendados** (la frase creativa actual puede quedar como texto de apoyo):

| Sección | H2 actual | H2 propuesto |
|---|---|---|
| Servicios | Servicios de estilismo profesional | Servicios de salón de belleza en Tijuana |
| Galería | Nuestro trabajo habla por sí solo | Galería: balayage, color y peinados hechos en el salón |
| Novias | Novias · XV Años · Eventos | Maquillaje y peinado para novias, XV años y eventos |
| Estudio | Un espacio dedicado a tu mejor versión | Joaquín Alonzo Gaytán, estilista certificado Pivot Point |
| Marcas | Trabajamos con marcas premium | Marcas profesionales: Olaplex, Tec Italy, Neurone y Verenize |
| Reseñas | Lo que dicen nuestros clientes | Reseñas de clientes en Google |
| Promos | Más razones para visitarnos | Promociones vigentes |
| Precios | Tarifas claras, resultados de salón | Precios de balayage, tintes, cortes y tratamientos |
| FAQ | Resolvemos tus dudas | Preguntas frecuentes sobre citas y precios |
| Contacto | Te esperamos en El Pípila, Tijuana ✅ | Mantener |

**H3:** 17 H3 bien anidados bajo sus H2 ✅ (servicios, eventos, highlights, promos, categorías de precio). Orden de encabezados correcto según Lighthouse ✅.

**INTERLINKING (hoy):** solo anclas internas; el hero enlaza a `#precios` ✅; Galería enlaza a Instagram ✅; Reseñas enlaza al perfil de Google ✅. **Propuesto:** cuando existan las landings (sección S), enlazar desde la tarjeta "Maquillaje & Eventos" y desde la sección Novias a `/novias-y-xv-anos`, y desde "Color & Balayage" / "Corrección de color" a `/balayage-y-color`; en precios, cada categoría enlaza a su página.

**Checklist on-page de la home:**

| Punto | Estado | Nota |
|---|---|---|
| Title único | ✅ | Única página; la 404 hereda el title además del propio (P2-1) |
| Description única | ✅ | Demasiado larga (P1-1) |
| Un solo H1 | ✅ | Contenido del H1 mejorable (P1-1) |
| H1 relacionado pero distinto del title | ⚠️ | Hoy no comparten ningún término de servicio |
| Estructura H1→H2→H3 | ✅ | |
| Contenido suficiente | ✅ | ~1,130 palabras visibles; adecuado para una home |
| Thin content / duplicado / canibalización | ✅ | No aplica con una sola URL; vigilar al crear landings (no repetir textos) |
| Keyword stuffing | ✅ | No hay; "Pivot Point" (8) es alto pero natural |
| Resumen / TL;DR | ⚠️ | El hero cumple esa función si se reescribe (P1-1); no hace falta otro bloque |
| CTA tras el primer bloque relevante | ✅ | Hero con 2 CTA; Servicios **no** tiene CTA propio (agregar "Agendar" bajo la cuadrícula) |
| CTA al final | ✅ | Contacto: "Agendar mi cita" |
| Listas y tablas | ✅ | Lista de precios estructurada como `<ul>`; correcto |
| FAQ | ✅ | 6 preguntas reales; ampliar (P2-17) |
| Breadcrumbs | N/A | No aplica a una página única; sí en landings futuras |
| URLs limpias | ✅ | Sin parámetros, números ni `/page/` |

### SEO local

| Punto | Estado | Evidencia / acción |
|---|---|---|
| Nombre | ✅ | "Joaquín Studio Salon" consistente en web y schema; Facebook con slug distinto (`HairStudioSalonn`) ❓ |
| Dirección | ✅ | "Camino Federal #8059, C. Campeche, El Pípila, 22206, Tijuana, B.C." visible y en schema |
| Teléfono | ⚠️ | Dos números (llamadas y WhatsApp). Definir cuál es el principal del perfil de Google y usar el mismo en schema |
| Horario | ✅ | Visible e idéntico en schema |
| Mapa | ⚠️ | Embed por coordenadas (P2-13) |
| Google Business Profile | ❓ | Existe enlace al perfil; contenido no verificable (P1-5) |
| LocalBusiness schema | ✅ / ⚠️ | `HairSalon` presente; correcciones en sección P |
| Páginas de ubicación | ✅ (no crear) | Un solo local: **no** crear páginas por colonia o ciudad; serían doorway pages |
| Área de servicio a domicilio | ❓ | La web dice "en el salón o a domicilio" (novias) sin zonas. **Requiere información del cliente** |
| Citaciones / directorios | ❓ | No verificable. Revisar consistencia NAP en Facebook, Instagram, TikTok, Apple Maps y Bing Places |

### Análisis como Google (sección 54 del brief)

- **Tema principal que identifica:** un salón de belleza/estilista llamado Joaquín Studio Salon en Tijuana (lo entiende por el schema `HairSalon`, la dirección y el vocabulario de servicios, más que por el H1).
- **Servicios que entiende:** color (balayage, mechas, tintes, corrección), cortes, tratamientos (keratina, Olaplex, botox capilar), maquillaje y peinado de eventos — todos con igual peso, porque todos viven en la misma URL.
- **Ciudad / región:** Tijuana, B.C. y El Pípila (dirección, schema con geo y texto).
- **Páginas con intención clara:** la home, para búsquedas de marca y locales genéricas.
- **Páginas ambiguas:** ninguna otra existe; la ambigüedad es interna (una URL para 5 intenciones).
- **Entidades:** negocio (HairSalon), persona (Joaquín Alonzo Gaytán, sin schema `Person`), certificación (Pivot Point), marcas (Olaplex, Tec Italy, Neurone, Verenize), lugar (El Pípila, Tijuana).
- **Contenido que falta:** fotos de novias/XV, años de experiencia, formas de pago, zonas a domicilio, duración de servicios.
- **Contenido que compite entre sí:** no hay canibalización entre URLs hoy. Al crear landings, evitar que la home y la landing repitan los mismos párrafos.

---

## H. SEO técnico

| Elemento | Estado | Evidencia (VERIFICADA en producción salvo indicación) |
|---|---|---|
| HTTPS / certificado | ✅ | Servido por Vercel con HTTPS; HSTS `max-age=63072000` |
| HTTP → HTTPS | ✅ | `http://joaquinstudiosalon.com/robots.txt` → **308** a `https://…` |
| www vs. sin www | ❌ / ❓ | `www` no está en el proyecto Vercel (P1-3) |
| Canonical | ✅ | `<link rel="canonical" href="https://joaquinstudiosalon.com">` en la home |
| Meta robots | ✅ | La home no tiene `noindex`; la 404 tiene `noindex` |
| Redirecciones / cadenas / loops | ✅ | Solo la redirección 308 http→https; sin cadenas |
| Códigos HTTP | ✅ | `/` 200 · `/robots.txt` 200 · `/sitemap.xml` 200 · URL inexistente **404** (no soft 404) |
| Soft 404 | ✅ | No hay: las URLs inexistentes devuelven 404 real |
| Trailing slash / parámetros / paginación / faceted | ✅ | No aplica (una URL, sin parámetros) |
| Enlaces internos rotos | ✅ | Todas las anclas (`#inicio`, `#servicios`, `#galeria`, `#novias`, `#estudio`, `#promos`, `#precios`, `#contacto`) existen |
| Enlaces externos | ✅ (build) / ❓ (destino) | 10 `wa.me`, 2 `tel:`, Instagram, Facebook, TikTok, Maps; formato correcto. Que cada perfil esté activo: ❓ |
| Imágenes rotas | ✅ | Las 17 imágenes distintas responden 200 en el build |
| Recursos bloqueados | ✅ | `robots.txt` no bloquea CSS/JS |
| Renderizado / JS | ✅ / ⚠️ | Todo el texto está en el HTML inicial (SSR/SSG) ✅; los bloques quedan con opacidad 0 sin JS (P2-3) |
| Lazy loading | ✅ | Galería, foto de Joaquín y mapa con carga diferida; hero y logo con `priority` |
| Dominios `*.vercel.app` | ✅ | Protegidos con Vercel Authentication (`all_except_custom_domains`); validar en ventana privada |
| Sitemap declarado en robots | ✅ | `Sitemap: https://joaquinstudiosalon.com/sitemap.xml` |

**INDEX / NOINDEX**

| URL | Debe estar | Estado actual |
|---|---|---|
| `/` | **INDEX** | ✅ Indexable |
| `/novias-y-xv-anos`, `/balayage-y-color` (futuras) | **INDEX** | — |
| `/aviso-de-privacidad` (futura) | **INDEX** (es confianza; no aporta ranking pero no hay razón para ocultarla) | — |
| `/google22c529a94d6d6d3f.html` | Dejar como está (necesario para verificación; Google no lo trata como contenido) | 200 |
| Cualquier URL inexistente | **NOINDEX / 404** | ✅ 404 + `noindex` |
| `/gracias` (solo si algún día hay formulario) | **NOINDEX** | No existe |

### robots.txt (VERIFICADO en producción)

```text
User-Agent: *
Allow: /

Sitemap: https://joaquinstudiosalon.com/sitemap.xml
```

✅ Existe, responde 200, no bloquea contenido, CSS ni JS, declara el sitemap y no expone rutas sensibles. **No requiere cambios.**

### sitemap.xml (VERIFICADO en producción)

URL exacta: **`https://joaquinstudiosalon.com/sitemap.xml`**

```xml
<url>
  <loc>https://joaquinstudiosalon.com</loc>
  <lastmod>2026-06-05T05:54:42.196Z</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1</priority>
</url>
```

✅ XML válido, 1 URL indexable y canónica, sin redirecciones, sin 404 ni noindex; apto para enviar a Search Console. ⚠️ `lastmod` es la fecha del build, no del último cambio de contenido (P3-2). Si se envió a GSC: ❓ (sección L). Cuando existan landings, agregarlas aquí.

### Página 404 (VERIFICADO en producción)

HTTP **404** real ✅ y `noindex` ✅. ❌ Diseño por defecto de Next.js en inglés, fondo blanco/negro del sistema, sin menú, sin inicio ni CTA; dos `<title>` ("404: This page could not be found." y el title del sitio) y canonical a la home heredado. Solución en P2-1.

### Seguridad básica (revisión pasiva)

| Cabecera / punto | Estado | Evidencia |
|---|---|---|
| HTTPS | ✅ | Vercel |
| Mixed content | ✅ | Sin recursos `http://` |
| HSTS | ✅ | `max-age=63072000` (dominio propio, sin `includeSubDomains`; correcto hasta configurar `www`) |
| Content-Security-Policy | ❌ | Ausente |
| X-Content-Type-Options | ❌ | Ausente |
| Referrer-Policy | ❌ | Ausente (el navegador aplica `strict-origin-when-cross-origin` por defecto) |
| Permissions-Policy | ❌ | Ausente |
| Protección anti-clickjacking | ❌ | Sin `X-Frame-Options` ni `frame-ancestors` |
| Formularios / datos sensibles | ✅ N/A | No hay formularios ni endpoints propios |

Solución: P2-2. No se realizó ninguna prueba intrusiva.

### llms.txt

- **Estado:** ❌ `/llms.txt` → 404 (VERIFICADO en build).
- **Qué es:** una **propuesta emergente** (no un estándar ampliamente soportado) para ofrecer a modelos de lenguaje un resumen en Markdown del sitio. **No es requisito ni factor de ranking de Google.** Su lectura por asistentes de IA no está garantizada.
- **Recomendación:** opcional, P3. Beneficio potencial pequeño (un resumen fiel de servicios, precios "desde", dirección, horario y contacto). Costo casi nulo, pero debe mantenerse sincronizado con `salon.ts` para no difundir precios viejos.

### SEO para IA / motores de respuesta

| Punto | Estado | Nota |
|---|---|---|
| Entidad clara (nombre, tipo de negocio) | ✅ | Schema `HairSalon` + nombre consistente |
| Datos concretos | ✅ | Dirección, horario, teléfonos, precios "desde" en HTML |
| Preguntas y respuestas | ✅ | FAQ en el HTML inicial (legible para rastreadores sin JS) |
| Información estructurada | ✅ | JSON-LD HairSalon + FAQPage |
| Autoridad / experiencia | ⚠️ | Falta años de experiencia, credenciales verificables, número de servicios realizados (**requiere datos del cliente**) |
| Servicios y ubicaciones | ✅ | Claros; área a domicilio sin definir |
| Contenido accesible sin JS | ✅ | El texto está en el HTML (los rastreadores que no ejecutan JS lo leen) |

No se promete aparición en respuestas de IA: estos puntos mejoran la comprensión del negocio, no la garantizan.

---

## I. UX/UI

**Lo que está bien y no debe tocarse (VERIFICADO):** identidad visual coherente negro/dorado; fotos reales del trabajo; precios publicados con "desde" y nota de cabello largo; CTA de WhatsApp en hero, novias, promos, precios, contacto y botón flotante; mensajes de WhatsApp precargados distintos por contexto; FAQ nativo (`<details>`) accesible; `prefers-reduced-motion` respetado; CLS 0; contraste suficiente (Lighthouse sin fallos).

| Tema | Hallazgo (con evidencia) | Recomendación | Prioridad |
|---|---|---|---|
| Jerarquía del hero | El elemento más grande es el nombre de la marca; el servicio y la ciudad están en un párrafo gris `font-light` | Hero nuevo (sección K) | P1 |
| Imagen del hero | Foto real al 40 % de opacidad bajo degradado del 70–95 %: casi no se ve y pesa 168–336 KB | O se muestra con más protagonismo (p. ej. 60 % y degradado solo abajo), o se optimiza fuerte (P1-2). No pagar peso por una imagen invisible | P1 |
| Orden de secciones | Servicios → Galería → Novias → Estudio → Marcas → Reseñas → Promos → **Precios** → FAQ → Contacto | Subir **Reseñas** justo después de Galería (prueba social temprana) y **Precios** antes de Estudio. Marcas puede ir dentro de Estudio | P2 |
| Navegación | Menú sin "Precios"; footer con otro set de enlaces | P2-6 | P2 |
| Estrellas | 4.6 dibujado como 5 estrellas llenas | P1-7 | P1 |
| Movimiento | Dos carruseles infinitos + efecto de aparición en 51 bloques + flecha con rebote | Reducir: una sola animación de aparición sutil; pausa en carruseles (P2-8) | P2 |
| Tipografía | Cuerpo en peso 300, 12–14 px, sobre fondo oscuro; texto mínimo de 9.6 px ("STUDIO SALON" del logo) | P2-10 | P2 |
| Sección Novias/XV | Tres tarjetas con iconos, sin una sola foto, siendo el servicio de mayor margen | Galería específica de novias/XV (fotos del negocio) | P2 |
| Sección Estudio | Buena, pero "Estilista certificado" no se respalda con evidencia visible | Foto del diploma o enlace verificable | P2 |
| "Por confirmar" en precios | Da imagen de sitio inacabado | P2-9 | P2 |
| Distracciones del objetivo comercial | Botón de Instagram tras la galería y marquee de marcas: aceptables. Los iconos sociales en el menú móvil y en Contacto sacan del sitio antes de convertir | Mantener redes en footer y en Galería; quitar la fila de redes del menú móvil | P3 |
| 404 | Rompe totalmente la identidad visual | P2-1 | P2 |

---

## J. Móvil

Pruebas en Chromium con emulación táctil a 320, 360, 375, 390, 414 y 768 px (VERIFICADO en laboratorio).

| Punto | 320 | 360 | 375 | 390 | 414 | 768 |
|---|---|---|---|---|---|---|
| Overflow horizontal | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| CTA principal sobre el pliegue (alto 740 px) | ✅ (y=551) | ✅ | ✅ | ✅ (y=536) | ✅ | ✅ |
| CTA secundario sobre el pliegue | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Botón flotante WhatsApp | 56×56 | 56×56 | 56×56 | 56×56 | 56×56 | 157×56 con texto |

| Elemento | Estado | Detalle |
|---|---|---|
| Menú | ✅ | Hamburguesa 40×40 con `aria-expanded`; cajón con enlaces de 48 px y CTA WhatsApp. Falta "Precios" (P2-6) |
| Hero | ⚠️ | Eyebrow "PIVOT POINT · ESTILISTA CERTIFICADO" ocupa 2 líneas a 390 px; mucho espacio vertical antes del H1 |
| Textos | ⚠️ | Legibles; peso 300 en cuerpo (P2-10) |
| Botones | ✅ | 52 px de alto en hero; 44 px en el resto |
| Formularios | N/A | No hay |
| Imágenes | ✅ | Galería 2 columnas con `sizes` correctos |
| Tablas / precios | ✅ | Listas apiladas en una columna, precios alineados a la derecha sin cortes |
| Cards | ✅ | Una columna, espaciado consistente |
| CTA persistente | ✅ | Botón flotante de WhatsApp siempre visible |
| Footer | ⚠️ | Enlaces de 20 px de alto e iconos de 20×20 (P2-7) |
| Longitud | ⚠️ | 15,398 px ≈ 18 pantallas de un iPhone 14; Precios en la pantalla 12.2, Contacto en la 15.8 |
| Touch targets | ⚠️ | 14 elementos por debajo de 44 px de alto (footer, flecha del hero) |

**CTA fijo en móvil (sección 9 del brief):** ya existe un botón flotante de WhatsApp (✅). Una barra inferior `[ WhatsApp ] [ Llamar ]` **no es necesaria hoy**: el negocio agenda por WhatsApp y la barra taparía contenido en una página ya larga. **Recomendación:** mantener el botón flotante; si los datos de GA4 muestran que las llamadas son relevantes, probar (A/B) una barra que aparezca solo después del hero con "Agendar por WhatsApp" + icono de llamada, de 56 px de alto y con `padding-bottom` equivalente en el `<body>` para no tapar el footer.

---

## K. Conversiones y leads

### Análisis del recorrido como clienta (sección 53 del brief)

| Pregunta | Respuesta honesta |
|---|---|
| ¿Entiendo qué vende? | Sí, pero hasta el subtítulo: el titular solo dice el nombre del salón |
| ¿Entiendo a quién vende? | Parcialmente: mujeres principalmente, también caballeros y niños (precios de corte). Novias y XV están en la pantalla 6 |
| ¿Entiendo dónde? | Sí: "El Pípila, Tijuana B.C." visible en el hero |
| ¿Por qué elegirlos? | Certificación Pivot Point, 4.6 en Google, fotos reales, marcas premium. Falta experiencia en años y prueba específica de novias |
| ¿Encuentro rápido cómo agendar? | Sí: botón dorado y botón flotante de WhatsApp |
| ¿Confío? | Bastante: dirección, horario, precios y reseñas reales. Resta confianza: "Por confirmar" en precios, 5 estrellas para 4.6, promo con "aplican condiciones" sin detallar |
| ¿Qué dudas me quedan? | ¿Cuánto cuesta en cabello largo? ¿Cuánto dura un balayage? ¿Formas de pago? ¿Hay estacionamiento? ¿Piden anticipo para novia? ¿Van a domicilio a mi zona? |
| ¿Qué me haría abandonar? | No encontrar el precio de mi servicio en cabello largo; una promo que después "no aplica"; carga lenta con datos móviles |
| ¿Qué me haría contactar? | Ver fotos de trabajos como el que quiero + precio "desde" + respuesta rápida por WhatsApp |

### Hero propuesto (sección 25 del brief)

```text
EYEBROW:            JOAQUÍN STUDIO SALON · EL PÍPILA, TIJUANA
H1:                 Balayage, color y cortes profesionales en Tijuana
SUBTÍTULO:          Estilista certificado Pivot Point. Precios desde $200,
                    productos Olaplex y atención solo con cita.
CTA PRIMARIO:       Agendar por WhatsApp
CTA SECUNDARIO:     Ver precios
PRUEBA DE CONFIANZA: ★ 4.6 en Google · 34 reseñas   (dato a actualizar; estrellas parciales)
```

Todos los datos del hero propuesto están en el sitio actual; no se inventa información.

### Inventario de CTA (VERIFICADO)

| CTA | Ubicación | Visibilidad | Texto | Jerarquía / contraste | Acción | Fricción | Recomendación |
|---|---|---|---|---|---|---|---|
| Agendar cita | Header escritorio | Alta | "Agendar cita" | Botón dorado pequeño ✅ | WhatsApp (mensaje de cita) | Baja | Mantener |
| Agendar por WhatsApp | Hero | Muy alta, sobre el pliegue | ✅ claro | Primario dorado 52 px ✅ | WhatsApp | Baja | Mantener |
| Ver lista de precios | Hero | Alta | ✅ | Secundario con borde ✅ | Ancla `#precios` | Baja | Renombrar "Ver precios" (más corto) |
| Botón flotante | Todas las pantallas | Muy alta | "Agendar cita" (≥640 px) / icono (móvil) | Verde WhatsApp ✅ | WhatsApp | Baja | Mantener; unificar `aria-label` con el texto visible |
| Mira más en Instagram | Tras galería | Media | "@joaquin_studio_salon" | Secundario | Sale del sitio | Media (fuga) | Aceptable; medir `click_social` |
| Cotizar mi evento | Novias | Alta | ✅ | Primario | WhatsApp (mensaje de evento) | Baja | Plantilla de datos (P1-8) |
| Ver reseñas en Google | Reseñas | Media | ✅ | Secundario | Sale al perfil | Media | Medir `click_reviews` |
| Quiero mi descuento / Recomendar a una amiga | Promos | Alta | ✅ | Primario | WhatsApp (mensaje de promo) | Baja | Solo tras P0-2 |
| Cotizar y agendar | Precios | Alta | ✅ | Primario | WhatsApp | Baja | Mantener |
| Llámanos / WhatsApp (tarjetas) | Contacto | Media | Número visible | Tarjetas | `tel:` / WhatsApp | Baja | Mantener |
| Agendar mi cita | Contacto | Alta | ✅ | Primario | WhatsApp | Baja | Mantener |
| Teléfono | Footer | Baja | Número | Texto | `tel:` | Baja | Área táctil 44 px |
| Solicitar cotización / Descargar catálogo / Correo | — | No existen | — | — | — | — | No se necesitan catálogo ni formulario; correo opcional (P3-10) |

### Formularios

**No hay formularios** (0 `<form>`, 0 `<input>`) — VERIFICADO. Para un salón con agenda por WhatsApp es la **decisión correcta**: un formulario agrega fricción y un canal que alguien tiene que revisar. No se recomienda agregar un formulario general. Si en el futuro se hace una landing de novias para Ads con alto volumen, evaluar un formulario corto (nombre, WhatsApp, tipo de evento, fecha, número de personas, lugar) con: `label` visibles, `autocomplete` (`name`, `tel`), validación en línea, estado de envío, bloqueo de doble envío, protección anti-spam (honeypot o Turnstile), enlace al aviso de privacidad y redirección a `/gracias-evento` (noindex) que dispare la conversión.

### WhatsApp

| Punto | Estado | Detalle |
|---|---|---|
| Enlace | ✅ | `https://wa.me/526645369855` — formato internacional correcto (52 + 10 dígitos) |
| Número correcto | ❓ | Que el número sea el de WhatsApp Business del salón y esté atendido: no verificable |
| Mensaje precargado | ✅ | 4 variantes: cita general, evento, promo cliente nueva, referidos |
| Visibilidad móvil / escritorio | ✅ | Botón flotante + CTAs en 6 secciones |
| Seguimiento | ⚠️ | Solo Vercel (`whatsapp_click` con sección). Falta GA4/Ads (P0-1) |
| Conversión | ⚠️ | El clic es **intención**, no una cita. Para medir citas reales: etiqueta "Web" en WhatsApp Business al primer mensaje que llegue con el texto precargado, y conteo mensual de citas con esa etiqueta |

**Mensaje precargado comercial propuesto (cita general):**

```text
¡Hola Joaquín! Vi su página y quiero agendar una cita.
Servicio: ______ (ej. balayage, corte, keratina)
Día y horario que me acomoda: ______
```

### Teléfono y correo

| Punto | Estado | Detalle |
|---|---|---|
| `tel:` | ✅ | `tel:+526648653576` en Contacto y footer (formato E.164) |
| Número real | ❓ | No verificable que la línea esté atendida |
| Clic desde móvil | ✅ | Enlace nativo |
| Seguimiento | ⚠️ | `call_click` solo en Vercel |
| `mailto:` / correo | ❌ | No existe. Opcional (P3-10) |

### Dirección y datos del negocio

Presentes ✅: nombre comercial, dirección completa con CP, ciudad, estado, país (schema), dos teléfonos, horario, mapa, Facebook, Instagram, TikTok. Ausentes: correo, razón social (no imprescindible para un salón), formas de pago, referencias para llegar/estacionamiento. **No se inventan.**

### Página de gracias

No existe y **no debe crearse para WhatsApp**: una página de "gracias" que se cargue al tocar el botón mediría clics, no conversiones, e interrumpiría el paso a WhatsApp. Solo tiene sentido si se agrega un formulario (ver arriba).

### Descargas

No hay catálogo ni archivos descargables. Para un salón, la lista de precios en HTML es mejor que un PDF (indexable, rápida, actualizable). **No se recomienda** agregar descargas.

### Embudo y puntos de fuga

```text
ANUNCIO / BÚSQUEDA ──► HOME (hero)
     │   fuga: H1 sin servicio → no confirma que "llegó al lugar correcto"
     ▼
INTERÉS: servicios, galería, novias (pantallas 1–6)
     │   fuga: novias sin fotos; precios hasta la pantalla 12
     ▼
CTA WhatsApp (10 botones + flotante)          ✅ bien resuelto
     │
     ▼
CONVERSACIÓN EN WHATSAPP                        ◄── aquí termina la medición posible en web
     │   fuga: respuesta lenta, datos incompletos (P1-8)
     ▼
CITA AGENDADA                                   ◄── solo medible en WhatsApp Business / agenda
     │
     ▼
MEDICIÓN: hoy solo Vercel; falta GA4 + Google Ads (P0-1)
```

### Calidad del lead (sección 47 del brief)

El equilibrio correcto para este negocio es **cero campos y un mensaje precargado estructurado**: pedir tipo de servicio, fecha deseada y (para eventos) número de personas y lugar dentro del texto de WhatsApp. Eso filtra mejor que un formulario sin agregar fricción. Para cabello largo/color, sugerir en el mensaje "puedes enviar una foto de tu cabello actual" para cotizar sin visita previa (**confirmar con el negocio si así se trabaja**).

### FAQ propuesto (sección 27 del brief)

| Pregunta | Estado |
|---|---|
| ¿Cuánto dura una cita de balayage o corrección de color? | RESPUESTA REQUIERE INFORMACIÓN DEL CLIENTE |
| ¿Qué formas de pago aceptan? | RESPUESTA REQUIERE INFORMACIÓN DEL CLIENTE |
| ¿Piden anticipo para apartar fecha de novia o XV años? | RESPUESTA REQUIERE INFORMACIÓN DEL CLIENTE |
| ¿Hacen servicio a domicilio? ¿A qué zonas y con qué costo? | RESPUESTA REQUIERE INFORMACIÓN DEL CLIENTE (la web ya dice "a domicilio" para novias) |
| ¿Con cuánta anticipación debo reservar para mi evento? | RESPUESTA REQUIERE INFORMACIÓN DEL CLIENTE |
| ¿Hay estacionamiento o cómo llego? | RESPUESTA REQUIERE INFORMACIÓN DEL CLIENTE |
| ¿Cuál es la política de cancelación o cambio de cita? | RESPUESTA REQUIERE INFORMACIÓN DEL CLIENTE |
| ¿Puedo cotizar enviando una foto de mi cabello? | RESPUESTA REQUIERE INFORMACIÓN DEL CLIENTE |

---

## L. Analítica

### GA4

| QUÉ EXISTE | QUÉ FALTA | NO VERIFICABLE | QUÉ CONFIGURAR |
|---|---|---|---|
| Nada (VERIFICADO: sin `gtag`/`G-`) | Propiedad, flujo web, eventos, eventos clave, vinculación con Ads y Search Console | Si existe una propiedad GA4 creada pero no instalada | Propiedad GA4 → flujo web `joaquinstudiosalon.com` → medición mejorada (scroll, clics salientes) → eventos de la sección M → marcar `click_whatsapp` y `click_phone` como eventos clave → vincular Google Ads y Search Console → retención de datos 14 meses |

Measurement ID: **no existe** en el sitio.

### Google Tag Manager

| QUÉ EXISTE | QUÉ FALTA | NO VERIFICABLE | QUÉ CONFIGURAR |
|---|---|---|---|
| Nada (VERIFICADO: sin `GTM-`) | Contenedor web | Si ya hay un contenedor creado sin instalar | Instalar vía `@next/third-parties` (P0-1). Etiquetas: Google tag (GA4), eventos GA4, conversiones de Google Ads (o importación desde GA4, **no ambas**), vinculador de conversiones, plantilla de consentimiento. Sin riesgo de doble medición hoy porque no hay etiquetas previas |

Container ID: **no existe** en el sitio.

### Vercel Web Analytics (existente)

✅ Instalado (`@vercel/analytics` 2.x) con eventos `whatsapp_click` y `call_click` y propiedad `section`. ❓ Activación y disponibilidad de eventos personalizados según el plan (P1-10). No usa cookies. **Mantener** como respaldo y para comparar cifras con GA4.

### Google Search Console

❓ **NO VERIFICABLE DESDE AUDITORÍA EXTERNA.** Hecho verificado: archivo `google22c529a94d6d6d3f.html` publicado (verificación por archivo HTML iniciada).

**Checklist exacta dentro de GSC:**

1. **Propiedad:** existe la propiedad `https://joaquinstudiosalon.com/` (prefijo) y, recomendado, la **propiedad de dominio** `joaquinstudiosalon.com` verificada por DNS.
2. **Verificación:** Configuración → Propietarios: el dueño del negocio figura como propietario (no solo la agencia/desarrollador).
3. **Sitemaps:** enviado `https://joaquinstudiosalon.com/sitemap.xml`; estado "Correcto"; 1 URL descubierta.
4. **Indexación → Páginas:** la home aparece como "Indexada". Revisar motivos de exclusión: "Rastreada: actualmente sin indexar", "Descubierta: actualmente sin indexar", "Duplicada", "Página alternativa con etiqueta canónica", "No encontrada (404)", "Soft 404". Hoy lo esperable es 1 indexada y 0 errores relevantes.
5. **Inspección de URL** de la home: "La URL está en Google", canonical seleccionada por Google = `https://joaquinstudiosalon.com/`, rastreada con smartphone, captura de pantalla con contenido visible.
6. **Experiencia → Core Web Vitals:** probablemente "No hay suficientes datos" por volumen; si hay datos, revisar LCP móvil.
7. **HTTPS:** 1 URL HTTPS, 0 errores.
8. **Acciones manuales** y **Problemas de seguridad:** ambos "No se detectaron problemas".
9. **Mejoras / Datos estructurados:** revisar informes que aparezcan (p. ej. "Preguntas frecuentes", "Fragmentos de reseñas"); tras quitar `aggregateRating`, validar que no queden errores.
10. **Rendimiento → Resultados de búsqueda** (últimos 3 y 12 meses): consultas, clics, impresiones, CTR, posición media; filtrar consultas **sin** "joaquin" para medir tráfico no de marca; países (México vs. EE. UU., relevante por la frontera); dispositivos (móvil vs. escritorio); aspecto en la búsqueda.
11. **Vinculación** con GA4.
12. Tras publicar el nuevo title/H1: Inspección de URL → **Solicitar indexación**, y anotar la fecha para comparar CTR a 28 días.

### Google Ads

| QUÉ EXISTE | QUÉ FALTA | NO VERIFICABLE | QUÉ CONFIGURAR |
|---|---|---|---|
| Nada en el sitio (VERIFICADO: sin `AW-`) | Etiqueta, conversiones, vinculaciones | Si hay cuenta de Google Ads o campañas activas | Ver sección N |

---

## M. Eventos y conversiones recomendados

| Evento | Disparador | GA4 | Conversión | Google Ads | Prioridad |
|---|---|---|---|---|---|
| `page_view` | Carga de página (automático) | Evento automático | No | No | — |
| `session_start`, `user_engagement`, `scroll` | Automáticos / medición mejorada | Eventos automáticos | No | No | — |
| `click_whatsapp` | Clic en cualquier `a[href*="wa.me"]`; parámetros `cta_location` (inicio, servicios, novias, promos, precios, contacto, global) y `cta_text` | Evento personalizado | **Sí — evento clave** | **Conversión primaria** "Contacto WhatsApp" (hasta tener datos de citas) | P0 |
| `click_phone` | Clic en `a[href^="tel:"]` | Evento personalizado | **Sí — evento clave** | **Conversión primaria** "Llamada desde web" | P0 |
| `request_quote` (evento) | Clic en "Cotizar mi evento" = `click_whatsapp` con `cta_location=novias` | Se deriva del parámetro (no duplicar evento) | Sí (dentro de `click_whatsapp`) | Conversión separada solo si hay campaña de novias, con mayor valor | P1 |
| `click_directions` | Clic en "Cómo llegar"/mapa (cuando exista el botón) | Evento personalizado | No (micro) | Secundaria (observación) | P2 |
| `click_reviews` | Clic en "Ver reseñas en Google" | Evento personalizado | No | No | P3 |
| `click_social` | Clic a Instagram, Facebook, TikTok; parámetro `network` | Evento personalizado | No | No | P3 |
| `view_pricing` | Sección `#precios` visible ≥ 50 % | Evento personalizado | No (micro) | Audiencia de remarketing | P2 |
| `faq_open` | Apertura de un `<details>`; parámetro `question` | Evento personalizado | No | No | P3 |
| `gallery_open` | Apertura del lightbox | Evento personalizado | No | No | P3 |
| `form_start` / `form_submit` / `generate_lead` / `thank_you_page` | **Solo si** se crea formulario en el futuro | Recomendados | `generate_lead` sí | Primaria | — |
| `click_email`, `download_catalog`, `file_download`, `product_view` | No aplican hoy (no hay correo, catálogo ni productos) | — | — | — | — |
| Llamadas desde anuncios | Extensión/recurso de llamada en Ads | — | — | Conversión de llamada de Ads (si está disponible para la cuenta) | P1 |

**Mapa de medición:**

```text
VISITA (page_view) → VIEW PRICING / scroll → CTA CLICK
   ├─► click_whatsapp  (evento clave · primaria Ads)
   ├─► click_phone     (evento clave · primaria Ads)
   └─► click_directions / click_social / click_reviews (secundarias, solo observación)
        ↓
   Cita confirmada en WhatsApp Business (etiqueta "Web"/"Google Ads") → conteo manual mensual
```

**Regla:** un `page_view` nunca es un lead; un clic a WhatsApp es un **contacto iniciado**, no una cita. Reportar ambos por separado.

---

## N. Google Ads readiness

### Análisis como Google Ads (sección 55 del brief)

| Pregunta | Respuesta |
|---|---|
| ¿Qué problemas tendríamos hoy? | Ninguna conversión medible en Google; landing genérica para cualquier palabra clave; LCP móvil de laboratorio 4.5 s |
| ¿Dónde se perderían los usuarios? | En el hero (no confirma el servicio buscado) y en el scroll largo hasta novias (pantalla 6) o precios (pantalla 12) |
| ¿Podemos medir leads reales? | No. Solo clics en Vercel, sin conexión con Ads |
| ¿La experiencia móvil es suficiente? | Diseño sí (sin overflow, CTA sobre el pliegue); velocidad mejorable |
| ¿Los formularios están listos? | No hay formularios; el canal es WhatsApp — válido |
| ¿Existe una conversión clara? | La acción sí (WhatsApp); la medición no |
| ¿Existe message match? | Solo para búsquedas de marca o "salón de belleza Tijuana" (y aun así el H1 no lo dice) |
| ¿Suficiente confianza? | Buena: reseñas, dirección, precios, fotos reales |
| ¿Qué arreglaría antes de invertir? | Lista de abajo |

### Qué debe estar terminado ANTES de invertir presupuesto

| # | Requisito | Estado hoy | Referencia |
|---|---|---|---|
| 1 | Promociones confirmadas (o retiradas) | ❓ | P0-2 |
| 2 | Aviso de privacidad + consentimiento de cookies | ❌ | P1-6 |
| 3 | GTM + GA4 + eventos `click_whatsapp`/`click_phone` como eventos clave | ❌ | P0-1 |
| 4 | Conversiones en Google Ads (primarias: WhatsApp y llamada) y prueba en Tag Assistant | ❌ | P0-1 |
| 5 | Title/H1/hero con el servicio y la ciudad | ⚠️ | P1-1 |
| 6 | Hero optimizado (LCP) | ⚠️ | P1-2 |
| 7 | Perfil de Negocio alineado (para recursos de ubicación y llamada) | ❓ | P1-5 |
| 8 | Landing específica por campaña temática (si la hay) | ❌ | P1-9 |
| 9 | Proceso para etiquetar en WhatsApp Business los chats que llegan con mensajes precargados | ❓ | K |

### ¿A) Usar la página actual o B) crear landings por campaña?

**Recomendación: combinación justificada.**

- **A) Home actual** para campañas de **marca** ("joaquin studio salon") y **genéricas locales** ("salón de belleza Tijuana", "estética El Pípila"), **después** de P1-1 y P1-2. Justificación: la home ya contiene precios, dirección, reseñas y CTA sobre el pliegue; el problema es el titular, no la estructura.
- **B) Landing específica** para **Novias/XV años** (y, si se invierte en color, **Balayage/Color**). Justificación técnica y de conversión: (1) en la home el contenido de novias empieza en la pantalla 5.9 de 18 en móvil; (2) el H1 no menciona el servicio → peor relevancia de la página de destino para Quality Score; (3) es el servicio de mayor ticket y con mayor necesidad de prueba (fotos de novias), que la home no puede dar sin alargarse más; (4) una landing permite un evento `click_whatsapp` con `cta_location` propio y un mensaje precargado con fecha y personas, lo que mejora la calidad del lead.
- **No** crear landings por colonia ni por cada servicio de la lista de precios.

**Quality Score potencial (HIPÓTESIS):** relevancia de anuncio y CTR esperado dependen de la cuenta; la **experiencia en la página de destino** hoy sería media por el H1 genérico y la velocidad móvil, y mejoraría con P1-1, P1-2 y P1-9.

---

## O. Rendimiento

### Core Web Vitals

| Métrica | Móvil (lab) | Escritorio (lab) | Umbral "bueno" | Elemento probable / causa |
|---|---|---|---|---|
| **LCP** | **4.5 s** ❌ | 0.9 s ✅ | ≤ 2.5 s | LCP = párrafo del subtítulo del hero, con ~1.2 s de retraso de renderizado; compite con la imagen del hero (168–336 KB, precargada con prioridad alta), dos fuentes precargadas y el favicon de 156 KB. Sin la imagen del hero: 3.6 s |
| **INP** | No medible en lab; TBT 300 ms ⚠️ | TBT 100 ms | INP ≤ 200 ms | ~167 KB gzip de JS; 51 componentes cliente `Reveal`; hidratación de React |
| **CLS** | 0 ✅ | 0 ✅ | ≤ 0.1 | Imágenes con `fill` dentro de contenedores con `aspect-ratio`; fuentes con `size-adjust` de `next/font` |
| FCP | 1.1 s ✅ | 0.3 s | ≤ 1.8 s | — |
| Speed Index | 2.3 s | 0.5 s | — | — |
| TTFB | 10 ms (servidor local) | — | ≤ 0.8 s | En producción depende del CDN de Vercel (HTML prerenderizado en caché, `x-vercel-cache: HIT`) |

Lighthouse móvil: **Rendimiento 78, Accesibilidad 100, Buenas prácticas 96, SEO 100.** El único error de consola fue `/_vercel/insights/script.js` 404, que **solo ocurre en local** (en Vercel ese script existe): no es un problema de producción.

**Datos de campo (CrUX):** ❓ no verificables; es probable que el sitio no tenga tráfico suficiente para CrUX. Instalar **Vercel Speed Insights** o revisar el informe Core Web Vitals de GSC para obtener datos reales.

### Imágenes y compresión

| ARCHIVO | PESO ACTUAL | DIMENSIONES | FORMATO | RECOMENDACIÓN | PESO OBJETIVO APROX. |
|---|---|---|---|---|---|
| `src/app/icon.png` (favicon) | 156 KB | 512×512 | PNG | PNG 192×192 optimizado + `favicon.ico` 48×48 | < 15 KB |
| `public/hero.webp` | 336 KB (se sirve 168 KB a 750w; 336 KB a 1200w) | 1200×1600 | WebP | `quality={50}`, `sizes` con tope de 828 px; o mostrar la foto con más protagonismo si se va a pagar su peso | 50–70 KB servidos |
| `public/logo.png` | 258 KB (se sirve 28.9 KB a 256w) | 600×600 | PNG | Fuente de 176×176 para el menú; conservar 600 px solo para OG/schema | 6–8 KB servidos |
| `public/gallery/g02.webp` | 357 KB | 1000×1333 | WebP | Re-codificar la fuente a calidad ~75 (afecta al lightbox: hoy sirve 314 KB) | ≈ 150 KB |
| `public/gallery/g11.webp` | 348 KB | 1000×1333 | WebP | Igual que g02 | ≈ 150 KB |
| `public/gallery/g07.webp`, `g08`, `g10`, `g12` | 254–275 KB | 1000×1333 | WebP | Igual | ≈ 150 KB |
| `public/joaquin.webp` | 138 KB (se sirve 46 KB a 640w) | 1000×1333 | WebP | ✅ Correcto | — |
| `public/og.jpg` | 52 KB | 1200×630 | JPEG | ✅ Peso correcto (mejorar contenido, P3-7) | — |
| `src/app/apple-icon.png` | 27 KB | 180×180 | PNG | ✅ Aceptable | — |

En la carga normal, las miniaturas de la galería se sirven a 256–384 px (≈ 30–60 KB c/u) con `loading="lazy"` y `sizes` correctos ✅. `srcset`/`sizes` ✅ en todas las imágenes (`next/image`). `width`/`height` ✅ (o `fill` con contenedor de proporción fija). AVIF: no activado (P3-12). SVG: los iconos son SVG inline de lucide ✅.

### Nombres de archivo de imagen

| Actual | Propuesto (describe la foto, sin relleno de keywords) |
|---|---|
| `g01.webp` | `rayitos-mechas-cabello-largo.webp` |
| `g02.webp` | `balayage-caramelo-cabello-castano.webp` |
| `g03.webp` | `alaciado-cabello-rubio.webp` |
| `g04.webp` | `color-plata-money-piece.webp` |
| `g05.webp` | `rubio-platinado-laciado.webp` |
| `g06.webp` | `mechas-platinadas-cabello-largo.webp` |
| `g07.webp` | `balayage-degradado-castano.webp` |
| `g08.webp` | `color-alaciado-castano.webp` |
| `g09.webp` | `balayage-rubio-ondas.webp` |
| `g10.webp` | `corte-ondas-castano.webp` |
| `g11.webp` | `permanente-rizos-definidos.webp` |
| `g12.webp` | `balayage-rubio-movimiento.webp` |
| `g13.webp` | `maquillaje-profesional-evento.webp` |
| `g14.webp` | `peinado-maquillaje-evento.webp` |
| `hero.webp`, `joaquin.webp`, `logo.png`, `og.jpg` | ✅ Aceptables |

Los nombres salen del ALT actual de cada foto. Impacto bajo (Google Imágenes); hacerlo al re-comprimir las fuentes.

### ALT text

✅ 18 `<img>` (17 archivos) con ALT que describe la imagen, sin keyword stuffing. Ajustes: logo del menú y footer → `alt=""` (el nombre ya está como texto al lado); hero → `alt=""` si se mantiene como fondo decorativo al 40 %.

### JavaScript, CSS, fuentes, servidor, caché y externos

| Área | Hallazgo (VERIFICADO) | Impacto | Esfuerzo | Recomendación |
|---|---|---|---|---|
| JavaScript | 9 archivos, ~167 KB gzip (sin contar polyfills `nomodule`); 48 KB sin usar en carga inicial | Medio | Medio | Reducir componentes cliente (`Reveal`, un observer compartido) |
| CSS | 1 archivo, 9.2 KB gzip, bloquea render ~170 ms (lab) | Bajo | — | Aceptable (Tailwind ya purga) |
| Fuentes | Autohospedadas con `next/font` ✅, `display: swap` ✅, 2 precargadas; 8 pesos declarados | Bajo | Bajo | P3-5 |
| HTML | 286 KB sin comprimir / 34 KB gzip (incluye ~128 KB de payload RSC) | Bajo | — | Aceptable comprimido |
| Servidor / CDN | Vercel, prerender estático, `x-vercel-cache: HIT` ✅ | — | — | Mantener |
| Compresión | Brotli (`content-encoding: br`) ✅ | — | — | Mantener |
| Caché | Estáticos con hash (inmutables); HTML `max-age=0, must-revalidate` en CDN ✅ | — | — | Mantener |
| Recursos externos | Vercel Insights (ligero); iframe de Google Maps con `loading="lazy"` ✅ (pesado al entrar en pantalla) | Bajo | Bajo | Opcional: imagen estática del mapa + botón "Abrir en Google Maps" |
| Preload / preconnect | Hero y logo precargados; no hay orígenes externos críticos | — | — | Quitar `priority` al logo del footer (hoy ambos logos llevan `priority`) |
| Animaciones | `will-change` en 51 bloques `.reveal` | Bajo | Bajo | Quitar `will-change` tras la animación |

**Clasificación impacto/esfuerzo:** alto impacto + bajo esfuerzo → hero y favicon (P1-2). Medio + medio → JS/`Reveal` (P2-4). Bajo + bajo → fuentes, logo, AVIF, nombres (P3).

---

## P. Datos estructurados

### EXISTENTES (VERIFICADO en el HTML)

1. **`HairSalon`** (subtipo de `LocalBusiness`): name, @id, url, telephone, priceRange `$$`, address, geo, openingHoursSpecification (L–S 10–18, D 11–15), aggregateRating (4.6/34), sameAs (Facebook, Instagram, TikTok), makesOffer (23 servicios sin precio).
2. **`FAQPage`**: 6 preguntas, generadas desde los mismos datos que el FAQ visible ✅ (no hay desincronización).

### ERRORES / PROBLEMAS

| Propiedad | Problema | Corrección |
|---|---|---|
| `aggregateRating` | Calificación del propio negocio sobre sí mismo: Google no la muestra como estrellas ("self-serving") y el valor está fijo en el código | Eliminar |
| `@id` | Igual a la URL de la página (`https://joaquinstudiosalon.com`) | Usar un identificador de entidad: `https://joaquinstudiosalon.com/#salon` |
| `addressRegion` | `"B.C."` | `"Baja California"` |
| `image` / `logo` | No existen (Google recomienda `image` para negocios locales) | Agregar |
| `telephone` | Fijo; el perfil de Google puede tener otro | Igualar al teléfono principal del perfil (P1-5) |
| `geo` | 3 decimales (≈ 100 m) | Copiar las coordenadas exactas del pin del perfil (5 decimales) |
| `makesOffer` | Ofertas sin precio | Opcional: `priceSpecification` con `minPrice` para los "Desde" |

### FALTANTES / RECOMENDADOS

| Schema | ¿Corresponde? | Motivo |
|---|---|---|
| `WebSite` | ✅ Sí | Ayuda a Google a mostrar "Joaquín Studio Salon" como nombre del sitio |
| `Person` (Joaquín, como `employee`/`founder`) | Opcional | Refuerza la entidad del estilista; solo con datos verificables |
| `BreadcrumbList` | Solo en landings futuras | La home no lo necesita |
| `Service` | En landings futuras | Una por página de servicio, con `provider` → `#salon` |
| `Product`, `Article` | ❌ No | No hay productos a la venta ni blog |
| `ContactPoint` | Opcional | Útil para diferenciar llamadas vs. WhatsApp |
| `FAQPage` | Mantener | Sin expectativa de resultado enriquecido |

**JSON-LD recomendado para la home** (solo datos ya publicados en el sitio; los marcados con ⟨⟩ deben confirmarse con el perfil de Google):

```json
[
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://joaquinstudiosalon.com/#website",
    "url": "https://joaquinstudiosalon.com/",
    "name": "Joaquín Studio Salon",
    "inLanguage": "es-MX",
    "publisher": { "@id": "https://joaquinstudiosalon.com/#salon" }
  },
  {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": "https://joaquinstudiosalon.com/#salon",
    "name": "Joaquín Studio Salon",
    "url": "https://joaquinstudiosalon.com/",
    "logo": "https://joaquinstudiosalon.com/logo.png",
    "image": [
      "https://joaquinstudiosalon.com/og.jpg",
      "https://joaquinstudiosalon.com/joaquin.webp"
    ],
    "telephone": "⟨+526648653576⟩",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Camino Federal #8059, C. Campeche, El Pípila",
      "addressLocality": "Tijuana",
      "addressRegion": "Baja California",
      "postalCode": "22206",
      "addressCountry": "MX"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": "⟨32.492⟩", "longitude": "⟨-116.875⟩" },
    "hasMap": "https://maps.app.goo.gl/kMdqwCBMybu1oQmm9",
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "10:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "11:00", "closes": "15:00" }
    ],
    "sameAs": [
      "https://www.facebook.com/HairStudioSalonn/",
      "https://www.instagram.com/joaquin_studio_salon/",
      "https://www.tiktok.com/@joaquinalonzo895"
    ]
  }
]
```

(Sin `aggregateRating`; `makesOffer` puede conservarse.) **Validación:** Rich Results Test y validator.schema.org sin errores; GSC → Mejoras sin advertencias nuevas.

---

## Q. Privacidad y legal

| Elemento | Estado | Evidencia | Recomendación |
|---|---|---|---|
| Aviso / Política de privacidad | ❌ | No existe página ni enlace | P1-6. Accesible desde footer y desde el banner de cookies. No hay formularios, así que no aplica el enlace junto a formularios |
| Términos y condiciones | ❌ | No existe | Para un salón con agenda por WhatsApp **no es imprescindible** una página de T&C general. Sí conviene publicar: condiciones de promociones (P0-2), política de anticipo/cancelación de eventos y vigencia de precios. **Requiere información del cliente** |
| Banner de cookies | ❌ (hoy no crítico) | No hay cookies propias; Vercel Web Analytics no usa cookies; el mapa de Google (tercero) se carga al hacer scroll hasta Contacto | Necesario **al instalar GA4/Google Ads** |
| Scripts antes del consentimiento | ✅ hoy | Solo Next.js y Vercel Insights | Con GTM: cargar GA4/Ads condicionados al consentimiento |

**Categorías de cookies (tras implementar P0-1):**

| Categoría | Ejemplos en este sitio | Consentimiento |
|---|---|---|
| Necesarias | Ninguna hoy (sitio estático sin sesión) | No requiere |
| Analíticas | GA4 (`_ga`, `_ga_*`) | Según criterio legal; recomendado pedirlo |
| Marketing | Google Ads (`_gcl_*`), remarketing; cookies del iframe de Google Maps | Pedir consentimiento |

**Consent Mode:** Google exige Consent Mode v2 para tráfico del Espacio Económico Europeo y Reino Unido; para México no es un requisito de Google, pero implementarlo con la plantilla de consentimiento de GTM permite respetar la elección del usuario y modelar conversiones. **Requisito técnico** (Consent Mode, banner con Aceptar/Rechazar/Configurar) ≠ **requisito legal** (qué obliga la LFPDPPP u otra norma aplicable a este negocio): lo segundo debe confirmarlo un profesional legal; esta auditoría no asegura cumplimiento legal.

**Qué debe documentarse (información del negocio):** responsable y domicilio, datos personales tratados (nombre, teléfono, fotos del cabello si se piden por WhatsApp, fecha de evento), finalidades primarias y secundarias (promociones), herramientas de terceros (Google Analytics, Google Ads, Vercel, WhatsApp/Meta), medios para ejercer derechos, cambios al aviso.

---

## R. Arquitectura actual (VERIFICADA)

```text
https://joaquinstudiosalon.com/   (única página indexable)
├── #inicio      Hero
├── #servicios   6 servicios destacados
├── #galeria     14 fotos + lightbox → Instagram
├── #novias      Novias · XV · Eventos → WhatsApp (evento)
├── #estudio     Joaquín / certificación
├── #productos   Marcas (carrusel)
├── #resenas     4.6 · 34 + 4 reseñas → perfil de Google
├── #promos      2 promociones → WhatsApp (promo)
├── #precios     3 categorías, 23 precios → WhatsApp
├── #faq         6 preguntas
└── #contacto    Dirección, horario, teléfonos, redes, mapa → WhatsApp

Archivos técnicos: /robots.txt · /sitemap.xml · /icon.png · /apple-icon.png · /og.jpg
                   /google22c529a94d6d6d3f.html (verificación GSC)
404: plantilla por defecto
```

---

## S. Arquitectura recomendada

Solo se proponen páginas con intención de búsqueda real y valor comercial. **No** se proponen páginas por colonia, por ciudad ni por cada servicio de la lista.

```text
HOME  /                                  "salón de belleza en Tijuana" + marca
├── /novias-y-xv-anos                    maquillaje y peinado de novia / XV años / eventos   [P1 si hay Ads de eventos]
├── /balayage-y-color                    balayage, babylights, rayitos, corrección de color   [P2; P1 si hay Ads de color]
├── /tratamientos-capilares              keratina, botox capilar, Olaplex                     [P3 — solo si GSC muestra demanda]
├── /aviso-de-privacidad                 legal                                                [P1]
└── (404 personalizada)                                                                         [P2]
```

| Página | Keyword principal | Intención | META TITLE | META DESCRIPTION | H1 | H2 sugeridos | CTA |
|---|---|---|---|---|---|---|---|
| `/novias-y-xv-anos` | maquillaje y peinado para novia Tijuana | Transaccional (cotizar fecha) | `Maquillaje y Peinado de Novia y XV en Tijuana \| Joaquín Studio` | `Maquillaje y peinado de novia y XV años en Tijuana, en el salón o a domicilio. Prueba previa y cotización a la medida por WhatsApp. Aparta tu fecha.` (148 car.) | Maquillaje y peinado para novias y XV años en Tijuana | Qué incluye · Prueba previa · Galería de novias y quinceañeras · Cómo apartar tu fecha · Preguntas frecuentes | "Cotizar mi evento" (plantilla P1-8) |
| `/balayage-y-color` | balayage Tijuana | Transaccional/comparativa | `Balayage y Corrección de Color en Tijuana \| Joaquín Studio` | `Balayage desde $4,500, babylights y corrección de color en El Pípila, Tijuana. Mira fotos reales del salón y cotiza tu color por WhatsApp.` (138 car.) | Balayage y corrección de color en Tijuana | Técnicas: balayage, babylights, rayitos · Antes y después · Precios desde · Cuidado con Olaplex · Preguntas frecuentes | "Cotizar mi color" |

Cada landing: textos propios (no copiados de la home), fotos propias del servicio, precios "desde" ya publicados, FAQ con respuestas del negocio, `BreadcrumbList` + `Service`, CTA sobre el pliegue y enlace de vuelta a la home.

### Blog / estrategia de contenido

**Recomendación: no abrir un blog ahora.** Un salón con un solo estilista obtiene más retorno del Perfil de Negocio de Google (publicaciones, fotos, reseñas) e Instagram que de artículos. Si más adelante GSC muestra impresiones en búsquedas informativas, priorizar contenido BOFU/MOFU dentro de las landings (como secciones o FAQ) antes que artículos sueltos:

| Etapa | Tema | Dónde |
|---|---|---|
| BOFU | ¿Cuánto cuesta un balayage en Tijuana? (con los precios reales "desde" y qué cambia con el largo) | `/balayage-y-color` |
| BOFU | Cómo apartar tu fecha de novia: prueba previa, anticipo, tiempos | `/novias-y-xv-anos` |
| MOFU | Balayage vs. babylights vs. rayitos: diferencias y para quién es cada uno | `/balayage-y-color` |
| MOFU | Keratina vs. botox capilar: cuál elegir | `/tratamientos-capilares` (si se crea) |
| TOFU | Cuidados del color después del salón | Solo si hay capacidad de publicar; baja prioridad |

### Interlinking y clusters

```text
PÁGINA PILAR:  Home (salón de belleza en Tijuana)
      ↓
SUBTEMAS:      Color  ·  Novias/XV  ·  (Tratamientos)
      ↓
SERVICIOS:     /balayage-y-color     /novias-y-xv-anos     (/tratamientos-capilares)
      ↓
SOPORTE:       FAQ y secciones comparativas dentro de cada landing
```

Enlaces específicos: Home tarjeta "Color & Balayage" y "Corrección de Color" → `/balayage-y-color`; Home tarjeta "Maquillaje & Eventos" y sección Novias → `/novias-y-xv-anos`; Precios "Color & Mechas" → `/balayage-y-color`; cada landing → Home (`#precios`, `#contacto`) y entre sí solo si hay relación real (p. ej. novias → color para "prueba de color antes de la boda", si el negocio lo ofrece).

---

## T. Plan de acción

| Fase | Tarea | RESPONSABLE RECOMENDADO | PRIORIDAD | DIFICULTAD | DEPENDENCIAS | RESULTADO ESPERADO |
|---|---|---|---|---|---|---|
| **1 — Crítico** | Confirmar o retirar promociones; publicar condiciones | Dirección (Joaquín) + Programador | P0 | Baja | — | Sin ofertas no autorizadas |
| 1 | Verificar Vercel Analytics (visitas y pestaña Events) | Programador | P1 | Baja | — | Saber si hay datos históricos |
| 1 | Configurar `www` → 308 → dominio raíz | Programador | P1 | Baja | Acceso DNS | Nadie ve un error por escribir www |
| **2 — SEO y conversiones** | Nuevo title, description, H1, hero y H2 | Especialista SEO + Diseñador + Programador | P1 | Baja | Aprobación de textos | Relevancia para "salón de belleza Tijuana" y servicios |
| 2 | Optimizar hero, favicon y logo | Programador | P1 | Baja | — | LCP móvil de laboratorio < 2.5–3 s |
| 2 | Estrellas parciales, quitar `aggregateRating`, proceso mensual de actualización de la calificación | Programador + Dirección | P1 | Baja | — | Prueba social exacta |
| 2 | Plantilla de mensaje para eventos y para cita general | Marketing + Programador | P1 | Baja | Visto bueno de Joaquín | Leads con fecha/servicio desde el primer mensaje |
| 2 | "Precios" en el menú, orden de secciones, "Por confirmar" → "Cotización" | Diseñador + Programador | P2 | Baja | — | Menos scroll hasta el precio |
| 2 | 404 personalizada; fallback sin JS de `.reveal` | Programador | P2 | Baja | — | Robustez |
| **3 — Analítica** | Aviso de privacidad + banner de consentimiento | Dirección + Asesor legal + Programador | P1 | Media | Información del negocio | Base legal/técnica para medir |
| 3 | GTM + GA4 + eventos + eventos clave | Programador / Agencia | P0 | Media | Aviso de privacidad | Contactos medidos por sección |
| 3 | Search Console (dominio, sitemap, inspección) y vinculación con GA4 | Especialista SEO | P1 | Baja | Acceso DNS | Datos de búsqueda |
| 3 | Perfil de Negocio: NAP, categorías, servicios, fotos | Dirección + Marketing | P1 | Baja | Acceso al perfil | Coherencia local |
| **4 — Google Ads** | Conversiones de Ads (WhatsApp y llamada) + prueba Tag Assistant | Agencia | P0 | Media | Fase 3 | Campañas optimizables |
| 4 | Landing `/novias-y-xv-anos` (si habrá campaña de eventos) | Diseñador + Programador + Dirección (fotos y datos) | P1 | Alta | Fotos reales, datos de anticipo/domicilio | Message match y leads de mayor ticket |
| 4 | Campañas: marca + genérica local → home; eventos → landing | Agencia | — | Media | Todo lo anterior | Costo por contacto medible |
| **5 — Crecimiento SEO** | Landing `/balayage-y-color` | SEO + Programador | P2 | Alta | Fotos antes/después | Rankings por "balayage Tijuana" |
| 5 | Ampliar FAQ con respuestas del negocio; E-E-A-T (años, certificado) | Marketing + Dirección | P2 | Media | Información del negocio | Menos objeciones |
| 5 | Cabeceras de seguridad (CSP en modo reporte primero) | Programador | P2 | Media | Lista de dominios de GTM/GA4/Maps | Grado A en securityheaders.com |
| 5 | Accesibilidad: pausa de carruseles, foco del lightbox, touch targets, nombre del logo | Programador | P2 | Baja | — | WCAG 2.2 AA más sólido |
| **6 — Optimización continua** | Revisión mensual: GSC (consultas no de marca), GA4 (`click_whatsapp` por `cta_location`), citas etiquetadas en WhatsApp Business, calificación de Google | Marketing | — | Baja | Fases 3–4 | Decisiones con datos |
| 6 | Tareas P3 (fuentes, AVIF, nombres de imágenes, OG, llms.txt, WebSite schema) | Programador | P3 | Baja | — | Pulido |

---

## U. Quick wins

| Acción | Tiempo estimado | Dificultad | Impacto |
|---|---|---|---|
| Confirmar/retirar promociones | 15 min (decisión) + 10 min (código) | Baja | Alto (riesgo) |
| Nuevo title y meta description | 20 min | Baja | Alto (CTR/SEO) |
| Nuevo H1 + subtítulo del hero | 45 min | Baja | Alto (SEO/Ads/conversión) |
| Hero a `quality={50}` y `sizes` con tope + `images.qualities` | 20 min | Baja | Alto (LCP) |
| Favicon de 156 KB → < 15 KB + `favicon.ico` | 20 min | Baja | Medio |
| `www` con redirección 308 | 15 min + propagación DNS | Baja | Medio |
| Plantilla de WhatsApp para eventos | 15 min | Baja | Alto (calidad del lead) |
| Estrellas parciales y quitar `aggregateRating` | 30 min | Baja | Medio (confianza) |
| "Por confirmar" → "Cotización" | 5 min | Baja | Bajo-medio |
| "Precios" en el menú | 10 min | Baja | Medio |
| `aria-label` del logo, `alt=""` en logo, touch targets del footer | 30 min | Baja | Medio (accesibilidad) |
| Quitar meta keywords, `poweredByHeader: false` | 5 min | Baja | Bajo |

(Tiempos estimados para un programador que ya conoce el proyecto; no incluyen revisión del dueño.)

---

## V. Top 10 — las 10 acciones que debemos hacer primero

Orden por: impacto en leads → riesgo → impacto en Ads → impacto SEO → UX → esfuerzo.

| # | Acción | Por qué en este lugar |
|---|---|---|
| 1 | **Confirmar o retirar las promociones** (P0-2) | Riesgo reputacional inmediato, 15 minutos |
| 2 | **Aviso de privacidad + consentimiento** (P1-6) | Bloquea la medición; conviene tenerlo antes de cualquier etiqueta |
| 3 | **GTM + GA4 + `click_whatsapp`/`click_phone` como eventos clave** (P0-1) | Sin esto no hay forma de saber qué genera citas |
| 4 | **Title, description, H1 y hero con servicio + Tijuana** (P1-1) | Mayor impacto SEO por hora invertida; mejora message match |
| 5 | **Plantilla de WhatsApp para eventos y cita** (P1-8) | Mejora la calidad del lead sin agregar fricción |
| 6 | **Optimizar hero y favicon** (P1-2) | LCP móvil; bajo esfuerzo |
| 7 | **Search Console + Perfil de Negocio alineados** (P1-4, P1-5) | El mapa de Google es el canal local principal |
| 8 | **Conversiones de Google Ads** (sección N) | Solo después de 2–3; requisito para invertir |
| 9 | **Calificación exacta** (estrellas parciales, sin `aggregateRating`, actualización mensual) (P1-7) | Confianza y coherencia con Google |
| 10 | **Landing de Novias/XV años** (P1-9) | El servicio de mayor ticket; imprescindible si habrá campaña de eventos |

---

## W. Validación final

### Checklist de cobertura

- [x] SEO On-Page (G)
- [x] SEO Técnico (H)
- [x] Meta Titles (G, P1-1)
- [x] Meta Descriptions (G, P1-1)
- [x] H1/H2/H3 (G)
- [x] Intención de búsqueda (G, S)
- [x] Interlinking (G, S)
- [x] Robots.txt (H)
- [x] Sitemap.xml (H)
- [x] Canonicals (H)
- [x] Indexación (H, L)
- [x] GA4 (L)
- [x] GTM (L)
- [x] GSC (L — no verificable, checklist incluida)
- [x] Google Ads (L, N)
- [x] Formularios (K — no existen; decisión correcta)
- [x] Página de gracias (K — no aplica a WhatsApp)
- [x] WhatsApp (K)
- [x] Teléfono (K)
- [x] Email (K — no existe)
- [x] CTA (K)
- [x] CTA móvil (J)
- [x] Imágenes (O)
- [x] Compresión (O)
- [x] ALT (O)
- [x] Nombres de imágenes (O)
- [x] Core Web Vitals (O — laboratorio; campo no verificable)
- [x] Rendimiento (O)
- [x] Mobile (J)
- [x] UX/UI (I)
- [x] Schema (P)
- [x] LocalBusiness (P, G)
- [x] FAQ (K, P)
- [x] 404 (H)
- [x] Privacidad (Q)
- [x] Cookies (Q)
- [x] Términos (Q)
- [x] Dirección real (K)
- [x] Favicon (B #19, O)
- [x] Open Graph (B #36, #69)
- [x] Accesibilidad (B, E)
- [x] Seguridad básica (H)
- [x] llms.txt (H)
- [x] Arquitectura (R, S)
- [x] Leads (K)
- [x] Conversiones (K, M)
- [x] Tracking (M)
- [x] Preparación Google Ads (N)

### Checklist original obligatoria (consolidada, sin duplicados)

| Punto | Estado | Dónde |
|---|---|---|
| Meta título único en cada página | ✅ (1 página) / ⚠️ 404 con 2 títulos | G, P2-1 |
| Meta descripción única en cada página | ✅ (demasiado larga) | P1-1 |
| Intención de búsqueda | ⚠️ una URL para 5 intenciones | G, S |
| Solo un H1 principal | ✅ | G |
| H1 relacionado pero diferente del title | ⚠️ | P1-1 |
| Estructura H1/H2/H3 | ✅ jerarquía; ⚠️ H2 poco descriptivos | P2-5 |
| Resumen / TL;DR | ⚠️ el hero debe cumplirlo | K |
| CTA después del primer bloque relevante | ✅ | K |
| Interlinking y clusters | ⚠️ solo anclas | S |
| Tablas y listas | ✅ | G |
| FAQ | ✅ (ampliar) | P2-17 |
| FAQ Schema | ✅ existe; sin resultado enriquecido esperado | P |
| Nombres descriptivos de imágenes | ⚠️ | O |
| ALT text | ✅ | O |
| LocalBusiness Schema | ✅ / ⚠️ correcciones | P |
| robots.txt | ✅ | H |
| URLs limpias | ✅ | G |
| `/page/` y páginas innecesarias indexadas | ✅ no existen | H |
| llms.txt | ❌ opcional | H |
| CTA fijo en móvil | ✅ | J |
| Botón de compartir | ✅ no existe — correcto | B #67 |
| GA4 / Analítica | ❌ GA4; ⚠️ Vercel | L |
| Google Search Console | ❓ | L |
| Sitemap.xml | ✅ | H |
| Sitemap registrado en Search Console | ❓ | L |
| Política de privacidad | ❌ | Q |
| Compresión de imágenes | ⚠️ hero, favicon, logo | O |
| Términos y condiciones | ❌ (condiciones de promos) | Q |
| Estados de error en formularios | N/A (no hay formularios) | K |
| Dirección de contacto real | ✅ | K |
| Banner de cookies | ❌ necesario con GA4/Ads | Q |
| Página 404 personalizada | ⚠️ 404 real pero genérica | H |
| Página de Gracias | N/A | K |
| Breakpoints móvil | ✅ 320–768 sin overflow | J |
| Favicon personalizado | ✅ (pesado) | O |
| Imagen Open Graph | ✅ (mejorable) | P3-7 |

**Declaración final:** todo lo marcado como ✅/❌/⚠️ se comprobó en el código de producción, en respuestas HTTP de producción obtenidas mediante el conector de Vercel o en el build local del mismo commit. Las métricas de rendimiento son de laboratorio. Lo que depende de cuentas de Google, WhatsApp Business, DNS o decisiones del negocio está marcado ❓ con su método de verificación. No se detectó ni se asume ningún CRM, automatización comercial, chatbot, píxel publicitario ni sistema de newsletter.

---

## X. Estado de implementación (29 de septiembre de 2026)

Decisiones del negocio tomadas para esta ronda: promociones **confirmadas** (se mantienen); aviso de privacidad **aprobado** para publicarse (pendiente de revisión legal); GTM **listo pero inactivo** hasta tener ID; landings de **Novias/XV** y **Balayage/Color** aprobadas usando solo fotos, textos y precios existentes.

### Implementado en el código

| Hallazgo | Cambio |
|---|---|
| P0-1 Medición | GTM vía `@next/third-parties` con Consent Mode v2 (todo `denied` por defecto), banner Aceptar/Rechazar/Configurar, "Preferencias de cookies" en el footer y eventos `click_whatsapp`, `click_phone`, `click_directions`, `click_reviews`, `click_social`, `view_pricing`, `faq_open`, `gallery_open`. Se activa con `NEXT_PUBLIC_GTM_ID` |
| P0-2 Promociones | Nota de "pendiente de confirmar" reemplazada: promociones confirmadas por el negocio |
| P1-1 Title/description/H1/hero | Title 62 car., description 149 car., H1 "Balayage, color y cortes profesionales en Tijuana", hero con precio desde $200 y "Ver precios"; H2 descriptivos en todas las secciones; meta keywords eliminada |
| P1-2 LCP | Hero con `quality={50}` y tope de 828 px (`images.qualities`), favicon 156 KB → 12.6 KB + `favicon.ico`, logo servido a 48/96 px, `priority` solo en el logo del header, un solo `IntersectionObserver` compartido, fuentes Cormorant reducidas a 2 pesos |
| P1-6 Privacidad | `/aviso-de-privacidad` con datos reales del sitio, enlazada en footer y banner |
| P1-7 Calificación | Estrellas parciales (4.6 ya no se dibuja como 5), `aggregateRating` eliminado del JSON-LD, nota de revisión mensual en `salon.ts` |
| P1-8 Calidad del lead | Mensajes de WhatsApp estructurados: cita (servicio, día/horario), evento (tipo, fecha, personas, lugar) y color (servicio, largo) |
| P1-9 Landings | `/novias-y-xv-anos` y `/balayage-y-color` con H1, precios, fotos, FAQ, CTA propios, `BreadcrumbList` y `Service`; enlazadas desde menú, servicios, novias, precios y footer |
| P2-1 404 | `not-found.tsx` con menú, CTA y footer; un solo `<title>`, sin canonical, `noindex` |
| P2-2 Seguridad | `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, CSP (`frame-ancestors`, `base-uri`, `object-src`, `form-action`), `poweredByHeader: false` |
| P2-3 Sin JS | `@media (scripting: none)` muestra todo el contenido |
| P2-5/6 Navegación | Menú: Servicios · Precios · Novias y XV · Galería · Promociones · Contacto (enlaces `/#…` que funcionan desde las landings); menú completo desde 1024 px |
| P2-7 Touch targets | Footer, iconos sociales, flecha del hero y hamburguesa a 44 px |
| P2-8 Carruseles | Botón Pausar/Reanudar, pausa con foco de teclado; duplicados ocultos a lectores de pantalla |
| P2-9 "Por confirmar" | Cambiado a "Cotización" |
| P2-10 Tipografía | Cuerpo de texto a peso 400 |
| P2-11/12, P3-11 Accesibilidad | Nombre del enlace del logo = texto visible; `alt=""` en logo y hero decorativos; lightbox con foco al abrir, trampa de Tab y retorno de foco; botón flotante dentro de `<aside>` con etiqueta que incluye el texto visible |
| P2-13 Mapa | Botón "Cómo llegar" al perfil de Google (el iframe sigue por coordenadas: el código de inserción del perfil debe copiarse desde Google Maps) |
| P2-15, P3-8 Schema | `WebSite` + `HairSalon` con `@id` de entidad, `logo`, `image`, `hasMap`, `addressRegion: "Baja California"` |
| Orden de secciones | Reseñas tras Galería; Precios antes de Promociones y Estudio |
| P3-2 Sitemap | 4 URLs con fechas reales de contenido |
| P3-3 llms.txt | `/llms.txt` generado desde `salon.ts` (siempre sincronizado) |
| P3-6 Nombres de imágenes | Galería renombrada con nombres descriptivos. Re-comprimir las fuentes solo ahorraba ~6 % con pérdida adicional, así que se conservaron |

### Resultado medido (mismo método de laboratorio que la auditoría)

| Página | Rendimiento móvil | LCP | TBT | CLS | Accesibilidad | SEO |
|---|---|---|---|---|---|---|
| `/` antes | 78 | 4.5 s | 300 ms | 0 | 100 | 100 |
| `/` después | 94–98 | 2.4–2.9 s | 80–120 ms | 0 | 100 | 100 |
| `/novias-y-xv-anos` | 98 | 2.2–2.3 s | 70 ms | 0 | 100 | 100 |
| `/balayage-y-color` | 91–94 | 3.0–3.5 s | 40–100 ms | 0 | 100 | 100 |

Playwright a 320, 360, 375, 390, 414, 768, 1024 y 1280 px en las 5 plantillas: sin overflow horizontal, un solo H1, primer CTA de WhatsApp sobre el pliegue, sin objetivos táctiles < 24 px y **0 violaciones de axe** (WCAG 2.2 AA + buenas prácticas).

### Pendiente (requiere cuentas, datos o decisiones del negocio)

| Tarea | Responsable | Referencia |
|---|---|---|
| Crear contenedor GTM y propiedad GA4; poner `NEXT_PUBLIC_GTM_ID` en Vercel y redesplegar; configurar etiquetas y marcar `click_whatsapp`/`click_phone` como eventos clave | Agencia / Marketing | P0-1, sección M |
| Conversiones de Google Ads (importadas de GA4 **o** nativas, no ambas) | Agencia | Sección N |
| Revisión legal del Aviso de privacidad | Dirección + asesor legal | P1-6 |
| DNS de `www` (si el dominio no usa los nameservers de Vercel) | Dueño del dominio | P1-3 |
| Search Console: propiedad de dominio, enviar sitemap (ahora con 4 URLs), solicitar indexación de las páginas nuevas | Especialista SEO | P1-4 |
| Perfil de Negocio: NAP, horario, sitio web, teléfono principal | Dirección | P1-5 |
| Confirmar mensualmente la calificación de Google | Dirección | P1-7 |
| Fotos reales de novias y XV años; años de experiencia; certificado Pivot Point | Dirección | P2-14 |
| Respuestas para el FAQ ampliado (pagos, anticipo, domicilio, estacionamiento, cancelación) | Dirección | P2-17 |
| Código "Insertar un mapa" del perfil de Google para reemplazar el iframe por coordenadas | Dirección | P2-13 |
| Nueva imagen Open Graph con foto real | Diseñador | P3-7 |
