import { type ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { classMerge } from "@lib/utils";

export type BadgeProps =
  ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> &
  { asChild?: boolean };

export const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 shrink-0 " +
  "text-xs font-medium w-fit whitespace-nowrap " +
  "rounded-[100px] overflow-hidden border px-2 py-0.5 " +
  "[&>svg]:size-3 [&>svg]:pointer-events-none " +
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
  "aria-invalid:ring-destructive/20 aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40 " +
  "transition-[color,box-shadow]",
  {
    variants: {
      variant: {
        default: "border-transparent bg-muted text-accent-foreground [a&]:hover:bg-muted/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge(props: BadgeProps) {
  const { className, variant, asChild, ...rest } = props;
  const variants = badgeVariants({ variant, className });
  const Component = asChild ? Slot : "span";
  const classes = classMerge(variants);

  return <Component data-slot="badge" className={classes} {...rest}/>;
}
