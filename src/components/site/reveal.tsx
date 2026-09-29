"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * One IntersectionObserver shared by every <Reveal> on the page instead of one
 * per instance (there are ~50), to keep main-thread work low on phones.
 */
const callbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function observe(el: Element, onVisible: () => void) {
  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
  );
  callbacks.set(el, onVisible);
  sharedObserver.observe(el);
  return () => {
    callbacks.delete(el);
    sharedObserver?.unobserve(el);
  };
}

/**
 * Reveals children with a gentle upward fade as they enter the viewport.
 * Respects prefers-reduced-motion and stays visible without JavaScript via the
 * .reveal CSS rules.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el, () => setVisible(true));
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
