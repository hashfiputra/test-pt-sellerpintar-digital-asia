"use client";

import { type ComponentProps } from "react";
import * as Primitive from "@radix-ui/react-separator";

import { classMerge } from "@lib/utils";

export type SeparatorProps = ComponentProps<typeof Primitive.Root>;

export function Separator(props: SeparatorProps) {
  const { className, orientation = "horizontal", decorative = true, ...rest } = props;
  const classes = classMerge(
    "bg-border shrink-0 " +
    "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full " +
    "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
    className,
  );

  return (
    <Primitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={classes}
      {...rest}
    />
  );
}
