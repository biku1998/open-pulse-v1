/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
// eslint-disable-next-line import/no-unresolved
import { toast as sonnerToast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToCamelCase = <T>(obj: any): T => {
  if (Array.isArray(obj)) {
    return obj.map(convertToCamelCase) as T;
  } else if (typeof obj === "object" && obj !== null) {
    const result: { [key: string]: any } = {};
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
          letter.toUpperCase(),
        );
        result[camelKey] = convertToCamelCase(obj[key]);
      }
    }
    return result as T;
  } else {
    return obj;
  }
};

export const toast = sonnerToast;
