"use client";

import { type CSSProperties } from "react";
import { type ToasterProps, Toaster as Sonner } from "sonner";
import { useTheme } from "next-themes";

import { classMerge } from "@lib/utils";

export function Toaster(props: ToasterProps) {
  const { className, style, ...rest } = props;
  const theme = (useTheme().theme || "system") as ToasterProps["theme"];
  const classes = classMerge("toaster group", className);
  const styles = {
    "--normal-bg": "var(--color-popover)",
    "--normal-text": "var(--color-popover-foreground)",
    "--normal-border": "var(--color-border)",
    ...style,
  } as CSSProperties;

  return <Sonner theme={theme} className={classes} style={styles} {...rest}/>;
}
