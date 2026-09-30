import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official Joaquín Studio Salon emblem (gold ring) paired with the wordmark.
 * The transparent PNG lives at /public/logo.png. Only the header copy is
 * above the fold, so only it gets `priority`.
 */
export function Logo({
  className,
  withText = true,
  priority = false,
}: {
  className?: string;
  withText?: boolean;
  priority?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
        // The wordmark next to it already names the salon.
        alt={withText ? "" : "Joaquín Studio Salon"}
        width={44}
        height={44}
        priority={priority}
        className="size-11 shrink-0 object-contain"
      />
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-[0.2em] text-gold-gradient">
            JOAQUIN
          </span>
          <span className="text-[0.65rem] font-normal tracking-[0.42em] text-muted-foreground">
            STUDIO SALON
          </span>
        </span>
      )}
    </span>
  );
}
