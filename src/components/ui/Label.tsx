"use client";

import type { ComponentProps } from "react";

import { Root } from "@radix-ui/react-label";

import { classMerge } from "@lib/utils";

export type LabelProps =
  ComponentProps<typeof Root>;

export default function Label(props: LabelProps) {
  const {className, ...rest} = props;
  const classes = classMerge(
    "flex items-center gap-2 text-sm font-medium select-none " +
    "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-70 " +
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    className,
  );

  return <Root data-slot="label" className={classes} {...rest}/>;
}
