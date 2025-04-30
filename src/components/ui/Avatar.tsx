"use client";

import { type ComponentProps } from "react";
import { Root, Image, Fallback } from "@radix-ui/react-avatar";

import { classMerge } from "@lib/utils";

export type AvatarProps = ComponentProps<typeof Root>;
export type AvatarImageProps = ComponentProps<typeof Image>;
export type AvatarFallbackProps = ComponentProps<typeof Fallback>;

export function Avatar(props: AvatarProps) {
  const {className, ...rest} = props;
  const classes = classMerge("relative flex size-8 shrink-0 overflow-hidden rounded-full", className);

  return <Root data-slot="avatar" className={classes} {...rest}/>;
}

export function AvatarImage(props: AvatarImageProps) {
  const {className, alt, ...rest} = props;
  const classes = classMerge("aspect-square size-full", className);

  return <Image data-slot="avatar-image" className={classes} alt={alt} {...rest}/>;
}

export function AvatarFallback(props: AvatarFallbackProps) {
  const {className, ...rest} = props;
  const classes = classMerge(
    "flex size-full items-center justify-center " +
    "bg-muted text-accent-foreground rounded-full font-medium " +
    "[&_svg]:size-4",
    className,
  );

  return <Fallback data-slot="avatar-fallback" className={classes} {...rest}/>;
}
