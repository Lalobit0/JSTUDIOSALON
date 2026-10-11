"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Disclosure button + panel. The panel is always in the HTML (indexable) and
 * only collapsed visually; while closed it is `inert`, so its content is not
 * focusable or announced. Height animates with a grid-rows transition, which
 * is skipped for reduced motion.
 */
export function Collapsible({
  id,
  openLabel,
  closeLabel,
  trackAs,
  children,
}: {
  id: string;
  openLabel: string;
  closeLabel: string;
  /** dataLayer event sent the first time the panel is opened */
  trackAs?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const tracked = React.useRef(false);

  const toggle = () => {
    setOpen((o) => !o);
    if (!open && trackAs && !tracked.current) {
      tracked.current = true;
      trackEvent(trackAs);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="lg"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        // Long labels wrap instead of overflowing on 320px screens.
        className="h-auto min-h-13 max-w-full whitespace-normal py-3 text-center"
      >
        {open ? closeLabel : openLabel}
        <ChevronDown
          className={cn(
            "transition-transform duration-300 motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </Button>

      <div
        id={id}
        inert={!open}
        className={cn(
          "grid w-full transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          // Without JavaScript the button cannot work: show the content.
          "[@media(scripting:none)]:grid-rows-[1fr] [@media(scripting:none)]:opacity-100",
        )}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </>
  );
}
