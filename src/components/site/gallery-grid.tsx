"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/lib/salon";
import { Reveal } from "@/components/site/reveal";

export function GalleryGrid({ items }: { items: readonly GalleryItem[] }) {
  const [index, setIndex] = React.useState<number | null>(null);
  const open = index !== null;

  const close = React.useCallback(() => setIndex(null), []);
  const go = React.useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  return (
    <>
      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal
            key={item.src}
            delay={(i % 4) * 70}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border"
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ampliar: ${item.alt}`}
              className="absolute inset-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {open && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={items[index].alt}
          onClick={close}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold/60 hover:text-gold"
          >
            <X className="size-5" />
          </button>

          <NavButton side="left" onClick={() => go(-1)} />
          <NavButton side="right" onClick={() => go(1)} />

          <figure
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88vh] flex-col items-center"
          >
            <Image
              src={items[index].src}
              alt={items[index].alt}
              width={1000}
              height={1333}
              className="h-auto max-h-[80vh] w-auto max-w-[92vw] rounded-lg object-contain"
              priority
            />
            <figcaption className="mt-3 text-center text-sm font-light text-white/70">
              {items[index].alt}
              <span className="ml-2 text-white/40">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Anterior" : "Siguiente"}
      className={cn(
        "absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold/60 hover:text-gold",
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
