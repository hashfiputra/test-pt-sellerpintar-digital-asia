import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function classMerge(...inputs: ClassValue[]) {
  const toMerge = clsx(inputs);
  return twMerge(toMerge);
}
