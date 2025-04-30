import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { classMerge } from "@lib/utils";

export type ButtonProps =
  ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> &
  { asChild?: boolean };

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 " +
  "whitespace-nowrap rounded-sm text-sm font-medium " +
  "transition-all hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none " +
  "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 " +
  "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground focus-visible:ring-destructive/20",
        outline: "bg-background border hover:opacity-100 hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost: "hover:opacity-100 hover:bg-accent dark:hover:bg-accent/50",
        link: "hover:opacity-100",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-9 px-3 has-[>svg]:px-2.5",
        lg: "h-11 px-8 has-[>svg]:px-6",
        icon: "h-10",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      full: false,
    },
  },
);

export default function Button(props: ButtonProps) {
  const {className, variant, size, full, asChild, ...rest} = props;
  const variants = buttonVariants({variant, size, full, className});
  const Component = asChild ? Slot : "button";
  const classes = classMerge(variants);

  return <Component data-slot="button" className={classes} {...rest}/>;
}
