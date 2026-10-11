"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";
import { applyTheme, currentTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const labels: Record<Locale, Record<Theme, string>> = {
  // Named after what the button does next.
  es: { dark: "Cambiar a modo día", light: "Cambiar a modo noche" },
  en: { dark: "Switch to light mode", light: "Switch to dark mode" },
};

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

/** Sun / moon button. The theme itself is set before paint by themeScript. */
export function ThemeToggle({
  lang,
  className,
}: {
  lang: Locale;
  className?: string;
}) {
  // The server always renders the default (dark) state.
  const theme = React.useSyncExternalStore(subscribe, currentTheme, () => "dark" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(next);
        trackEvent("theme_change", { theme: next });
      }}
      aria-label={labels[lang][theme]}
      title={labels[lang][theme]}
      className={cn(
        "flex size-11 items-center justify-center rounded-md text-gold transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
