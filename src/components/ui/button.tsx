import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium tracking-wide transition-[transform,background-color,color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        gold: "bg-gold-gradient text-[oklch(0.2_0.03_60)] shadow-[0_8px_30px_-12px_oklch(0.66_0.13_70/0.7)] hover:shadow-[0_12px_40px_-12px_oklch(0.66_0.13_70/0.9)] hover:brightness-110 font-semibold",
        outline:
          "border border-gold/60 text-gold hover:bg-gold/10 hover:border-gold",
        ghost: "text-foreground/80 hover:text-gold hover:bg-foreground/5",
      },
      size: {
        default: "h-11 px-6 py-2",
        lg: "h-13 px-8 text-base",
        sm: "h-9 px-4",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
