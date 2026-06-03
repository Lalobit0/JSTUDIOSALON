import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official Joaquín Studio Salon emblem (gold ring) paired with the wordmark.
 * The transparent PNG lives at /public/logo.png.
 */
export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
        alt="Joaquín Studio Salon"
        width={120}
        height={120}
        priority
        className="size-11 shrink-0 object-contain"
      />
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
