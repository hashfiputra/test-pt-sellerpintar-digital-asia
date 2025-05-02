import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function classMerge(...inputs: ClassValue[]) {
  const toMerge = clsx(inputs);
  return twMerge(toMerge);
}

export function toBoolean(value?: string | null, fallback: boolean = false) {
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
}

export function toNumber(value?: string | null, fallback: number = 0) {
  if (!value) return fallback;
  const parsed = Number(value);
  const valid = Number.isFinite(parsed);
  return valid ? parsed : fallback;
}

export function getExcerpt(html: string, min: number = 50, max: number = 100) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= min) return text;

  const excerpt = text.slice(0, max);
  const postfix = text.length > max ? "..." : "";

  return excerpt + postfix;
}

export function parseDate(date: string, time?: boolean) {
  const parsed = new Date(date);
  const postfix = time ? " " + parsed.toTimeString().split(" ")[0] : "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return parsed.toLocaleDateString("en-US", options) + postfix;
}
