import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Five-star rating with partial fill, so 4.6 reads as 4.6 and not as five
 * full stars. Decorative: pair it with the rating as text.
 */
export function Stars({
  value,
  className,
  starClassName = "size-4",
}: {
  value: number;
  className?: string;
  starClassName?: string;
}) {
  return (
    <span className={cn("flex", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(Math.max(value - i, 0), 1);
        const full = <Star className={cn(starClassName, "fill-gold text-gold")} />;
        const empty = <Star className={cn(starClassName, "text-gold/35")} />;
        if (fill === 1) return <span key={i}>{full}</span>;
        if (fill === 0) return <span key={i}>{empty}</span>;
        // Partial star: filled copy clipped over an outline.
        return (
          <span key={i} className="relative inline-flex">
            {empty}
            <span
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              {full}
            </span>
          </span>
        );
      })}
    </span>
  );
}
