"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Pauses on hover, on keyboard focus and with a
 * visible button, so moving content can always be stopped (WCAG 2.2.2).
 */
export function Marquee({
  children,
  label,
  className,
  trackClassName,
}: {
  children: React.ReactNode;
  /** What is moving, for the button text: "reseñas", "marcas"… */
  label: string;
  className?: string;
  trackClassName?: string;
}) {
  const [paused, setPaused] = React.useState(false);

  return (
    <div className={className}>
      <div
        data-paused={paused}
        className="marquee-viewport relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
      >
        <div className={cn("marquee-track", trackClassName)}>{children}</div>
      </div>
      <div className="mt-3 flex justify-center motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-xs tracking-wide text-muted-foreground transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          {paused ? `Reanudar ${label}` : `Pausar ${label}`}
        </button>
      </div>
    </div>
  );
}
