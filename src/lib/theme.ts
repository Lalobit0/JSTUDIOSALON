/**
 * Modo día / noche. El sitio abre en oscuro; si la persona elige el modo día
 * se recuerda en localStorage y se aplica antes de pintar la página.
 */

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "jss-theme";

/** Browser UI color (address bar on phones) for each theme. */
export const themeColors: Record<Theme, string> = {
  dark: "#110c08",
  light: "#f9f6f1",
};

/** Runs inline in <head>, before the first paint, to avoid a dark flash. */
export const themeScript = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="light"){document.documentElement.dataset.theme="light";var m=document.querySelector('meta[name="theme-color"]');if(m)m.content="${themeColors.light}"}}catch(e){}`;

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColors[theme]);
  try {
    if (theme === "light") localStorage.setItem(THEME_STORAGE_KEY, "light");
    else localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // Storage blocked (private mode): the choice lasts for this page only.
  }
}
