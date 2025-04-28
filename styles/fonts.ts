import clsx from "clsx";
import { Archivo, Fira_Mono } from "next/font/google";

export const fontHeader = Archivo({
  variable: "--font-header",
  subsets: ["latin-ext"],
});

export const fontBody = Archivo({
  variable: "--font-body",
  subsets: ["latin-ext"],
});

export const fontMono = Fira_Mono({
  weight: "500",
  variable: "--font-mono",
  subsets: ["latin-ext"],
});

export const fontVariables = clsx(
  fontHeader.variable,
  fontBody.variable,
  fontMono.variable,
);
