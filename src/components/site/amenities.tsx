import { AirVent, ShowerHead, Wifi, type LucideIcon } from "lucide-react";

import { amenities, type Amenity } from "@/lib/salon";
import { cn } from "@/lib/utils";

const icons: Record<Amenity["icon"], LucideIcon> = {
  airVent: AirVent,
  wifi: Wifi,
  shower: ShowerHead,
};

/** Value-added comforts of the salon, shown as a row of chips. */
export function Amenities({
  className,
  align = "start",
}: {
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <ul
      aria-label="Comodidades del salón"
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
            key={amenity.label}
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-2 text-sm text-foreground"
          >
            <Icon className="size-4 shrink-0 text-gold" />
            {amenity.label}
          </li>
        );
      })}
    </ul>
  );
}
