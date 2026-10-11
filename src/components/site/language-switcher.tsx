import { cn } from "@/lib/utils";
import {
  htmlLang,
  languageNames,
  locales,
  routes,
  type Locale,
  type RouteKey,
} from "@/lib/i18n";

const label: Record<Locale, string> = { es: "Idioma", en: "Language" };

/**
 * "Español | English" switch. Each option goes to the same page in the other
 * language; the current one is marked, not linked. A group rather than a
 * <nav>, since it appears twice on phones (hero and menu).
 */
export function LanguageSwitcher({
  lang,
  route,
  className,
}: {
  lang: Locale;
  route: RouteKey;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label[lang]} className={className}>
      <ul className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-foreground/5 p-1 text-xs font-medium tracking-[0.12em] uppercase backdrop-blur-sm">
        {locales.map((l) =>
          l === lang ? (
            <li key={l}>
              <span
                aria-current="true"
                className="inline-flex h-9 items-center rounded-full bg-gold-gradient px-4 text-[oklch(0.2_0.03_60)]"
              >
                {languageNames[l]}
              </span>
            </li>
          ) : (
            <li key={l}>
              <a
                href={routes[route][l]}
                hrefLang={htmlLang[l]}
                lang={htmlLang[l]}
                data-track="language"
                className="inline-flex h-9 items-center rounded-full px-4 text-foreground/80 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {languageNames[l]}
              </a>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

/** Compact "EN" / "ES" link for the desktop header. */
export function LanguageLink({
  lang,
  route,
  className,
}: {
  lang: Locale;
  route: RouteKey;
  className?: string;
}) {
  const other: Locale = lang === "es" ? "en" : "es";
  return (
    <a
      href={routes[route][other]}
      hrefLang={htmlLang[other]}
      lang={htmlLang[other]}
      data-track="language"
      className={cn(
        "flex h-11 items-center rounded-md px-2 text-xs font-medium tracking-[0.18em] text-foreground/80 uppercase transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span aria-hidden="true">{other}</span>
      <span className="sr-only">{languageNames[other]}</span>
    </a>
  );
}
