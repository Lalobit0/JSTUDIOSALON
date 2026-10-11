import { AirVent, ShowerHead, Wifi, type LucideIcon } from "lucide-react";

import { amenities, type Amenity } from "@/lib/salon";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const icons: Record<Amenity["icon"], LucideIcon> = {
  airVent: AirVent,
  wifi: Wifi,
  shower: ShowerHead,
};

export const amenitiesTitle: Record<Locale, string> = {
  es: "Comodidades del salón",
  en: "Salon amenities",
};

/** Value-added comforts of the salon, shown as a row of chips. */
export function Amenities({
  lang,
  className,
  align = "start",
}: {
  lang: Locale;
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <ul
      aria-label={amenitiesTitle[lang]}
      className={cn(
        "flex flex-wrap gap-3",
        align === "center" && "justify-center",
        className,
      )}
    >
      {amenities.map((amenity) => {
        const Icon = icons[amenity.icon];
        return (
          <li
            key={amenity.icon}
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-2 text-sm text-foreground"
          >
            <Icon className="size-4 shrink-0 text-gold" />
            {amenity.label[lang]}
          </li>
        );
      })}
    </ul>
  );
}
