import { cn } from "@/lib/utils";

/**
 * Wordmark for Joaquín Studio Salon — a champagne-gold ring framing the
 * salon name, echoing the brand's printed identity.
 */
export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 64 64"
        className="size-9 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        <defs>
          <linearGradient id="ring-gold" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0" stopColor="oklch(0.66 0.13 70)" />
            <stop offset="0.5" stopColor="oklch(0.9 0.09 92)" />
            <stop offset="1" stopColor="oklch(0.66 0.13 70)" />
          </linearGradient>
        </defs>
        <circle
          cx="32"
          cy="32"
          r="26"
          stroke="url(#ring-gold)"
          strokeWidth="2.5"
        />
        <circle
          cx="32"
          cy="32"
          r="20"
          stroke="url(#ring-gold)"
          strokeWidth="1"
          opacity="0.5"
        />
        <text
          x="32"
          y="36"
          textAnchor="middle"
          fontFamily="var(--font-display), serif"
          fontSize="15"
          fontWeight="600"
          fill="url(#ring-gold)"
        >
          JS
        </text>
      </svg>
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-[0.2em] text-gold-gradient">
            JOAQUIN
          </span>
          <span className="text-[0.6rem] font-light tracking-[0.42em] text-muted-foreground">
            STUDIO SALON
          </span>
        </span>
      )}
    </span>
  );
}
