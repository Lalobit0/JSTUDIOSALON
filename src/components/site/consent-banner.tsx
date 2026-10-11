"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  CONSENT_CHANGE_EVENT,
  OPEN_CONSENT_EVENT,
  readConsent,
  readConsentRaw,
  saveConsent,
  type ConsentChoice,
} from "@/lib/analytics";
import { routes, type Locale } from "@/lib/i18n";

const copy = {
  es: {
    title: "Tu privacidad",
    body: "Con tu permiso usamos cookies de Google Analytics y Google Ads para medir las visitas y saber qué anuncios funcionan. Sin tu permiso no se guardan. Más detalles en el",
    privacy: "Aviso de privacidad",
    legend: "Preferencias de cookies",
    analytics: "Analíticas",
    analyticsText: "Google Analytics: cuántas personas visitan y qué secciones usan.",
    marketing: "Publicidad",
    marketingText: "Google Ads: medir qué anuncios generan citas y mostrar anuncios relevantes.",
    save: "Guardar preferencias",
    accept: "Aceptar",
    reject: "Rechazar",
    customize: "Configurar",
  },
  en: {
    title: "Your privacy",
    body: "With your permission we use Google Analytics and Google Ads cookies to measure visits and see which ads work. Without your permission, nothing is stored. More details in the",
    privacy: "Privacy notice",
    legend: "Cookie preferences",
    analytics: "Analytics",
    analyticsText: "Google Analytics: how many people visit and which sections they use.",
    marketing: "Advertising",
    marketingText: "Google Ads: measure which ads lead to appointments and show relevant ads.",
    save: "Save preferences",
    accept: "Accept",
    reject: "Reject",
    customize: "Customize",
  },
} satisfies Record<Locale, unknown>;

const NONE: ConsentChoice = { analytics: false, marketing: false };

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  };
}

/**
 * Cookie consent for Google Analytics / Google Ads. Only mounted when GTM is
 * configured; the footer can reopen it through OPEN_CONSENT_EVENT.
 */
export function ConsentBanner({ lang }: { lang: Locale }) {
  const t = copy[lang];
  // "ssr" on the server so the banner never renders into the static HTML.
  const stored = React.useSyncExternalStore(subscribe, readConsentRaw, () => "ssr");
  const [editing, setEditing] = React.useState(false);
  // Covers browsers where storage is blocked and the choice cannot persist.
  const [dismissed, setDismissed] = React.useState(false);
  const [customize, setCustomize] = React.useState(false);
  const [choice, setChoice] = React.useState<ConsentChoice>(NONE);

  React.useEffect(() => {
    const reopen = () => {
      setChoice(readConsent() ?? NONE);
      setCustomize(true);
      setEditing(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const decide = (next: ConsentChoice) => {
    saveConsent(next);
    setDismissed(true);
    setEditing(false);
    setCustomize(false);
  };

  if (!editing && (stored !== null || dismissed)) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-2xl rounded-2xl border border-gold/30 bg-card/95 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <p id="consent-title" className="font-display text-xl font-medium text-foreground">
        {t.title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t.body}{" "}
        <Link href={routes.privacy[lang]} className="text-gold underline underline-offset-4">
          {t.privacy}
        </Link>
        .
      </p>

      {customize && (
        <fieldset className="mt-4 flex flex-col gap-3 text-sm">
          <legend className="sr-only">{t.legend}</legend>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 size-4 accent-[var(--gold)]"
              checked={choice.analytics}
              onChange={(e) => setChoice((c) => ({ ...c, analytics: e.target.checked }))}
            />
            <span>
              <span className="font-medium text-foreground">{t.analytics}</span>
              <span className="block text-muted-foreground">{t.analyticsText}</span>
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 size-4 accent-[var(--gold)]"
              checked={choice.marketing}
              onChange={(e) => setChoice((c) => ({ ...c, marketing: e.target.checked }))}
            />
            <span>
              <span className="font-medium text-foreground">{t.marketing}</span>
              <span className="block text-muted-foreground">{t.marketingText}</span>
            </span>
          </label>
        </fieldset>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {customize ? (
          <Button size="sm" onClick={() => decide(choice)}>
            {t.save}
          </Button>
        ) : (
          <>
            <Button size="sm" onClick={() => decide({ analytics: true, marketing: true })}>
              {t.accept}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => decide({ analytics: false, marketing: false })}
            >
              {t.reject}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setCustomize(true)}>
              {t.customize}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

/** Footer link that reopens the consent preferences. */
export function ConsentPreferencesButton({
  lang,
  className,
}: {
  lang: Locale;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      {copy[lang].legend}
    </button>
  );
}
