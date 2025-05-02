import { ComponentProps } from "react";
import { classMerge } from "@lib/utils";

export type TextareaProps = ComponentProps<"textarea">;

export function Textarea(props: TextareaProps) {
  const { className, ...others } = props;
  const classes = classMerge(
    "flex w-full min-h-16 px-3 py-2 field-sizing-content",
    "text-sm bg-transparent border border-input rounded-md",
    "outline-none shadow-xs transition-[color,box-shadow]",
    "placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "dark:bg-input/30",
    className,
  );

  return <textarea data-slot="textarea" className={classes} {...others}/>;
}
