/**
 * Idiomas del sitio. El español vive en la raíz (/) y el inglés bajo /en,
 * cada uno con su propio layout raíz (app/(es) y app/(en)) para que
 * `<html lang>` sea correcto sin renderizar en cada visita.
 */

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

/** A value written once per language. */
export type Localized<T = string> = Record<Locale, T>;

export const htmlLang: Localized = { es: "es-MX", en: "en" };
export const ogLocale: Localized = { es: "es_MX", en: "en_US" };

/** Every page and its address in each language. */
export const routes = {
  home: { es: "/", en: "/en" },
  bridal: { es: "/novias-y-xv-anos", en: "/en/bridal-and-quinceanera" },
  color: { es: "/balayage-y-color", en: "/en/balayage-and-color" },
  privacy: { es: "/aviso-de-privacidad", en: "/en/privacy-notice" },
} as const satisfies Record<string, Localized>;

export type RouteKey = keyof typeof routes;

/** Link to a section of the home page, e.g. section("en", "precios"). */
export function section(lang: Locale, id: string) {
  return lang === "es" ? `/#${id}` : `/en#${id}`;
}

/** Names of the languages, written in their own language. */
export const languageNames: Localized = { es: "Español", en: "English" };
