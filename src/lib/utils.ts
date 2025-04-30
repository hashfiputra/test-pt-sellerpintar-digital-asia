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
