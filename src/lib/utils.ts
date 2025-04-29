import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function classMerge(...inputs: ClassValue[]) {
  const toMerge = clsx(inputs);
  return twMerge(toMerge);
}

export function getResponse<T>(data: T, status?: number, headers?: HeadersInit) {
  if (!status) status = 200;
  if (!headers) headers = {"Content-Type": "application/json"};

  const response = JSON.stringify(data);
  const init: ResponseInit = {status, headers};

  return new Response(response, init);
}
