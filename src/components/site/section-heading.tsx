import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] text-gold uppercase">
        <span className="h-px w-8 bg-gold-gradient" />
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-medium leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </Reveal>
  );
}
