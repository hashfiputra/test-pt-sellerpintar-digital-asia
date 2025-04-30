import type { ComponentProps } from "react";

import { classMerge } from "@lib/utils";

export type InputProps =
  ComponentProps<"input">;

export default function Input(props: InputProps) {
  const {className, type, ...rest} = props;
  const classes = classMerge(
    "peer flex gap-2 h-10 w-full min-w-0 rounded-sm " +
    "border border-input bg-white px-3 py-2 text-sm " +
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
    "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 " +
    "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-white file:text-sm file:font-medium " +
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 " +
    "outline-none transition-[color,box-shadow]",
    className,
  );

  return <input type={type} data-slot="input" className={classes} {...rest}/>;
}
