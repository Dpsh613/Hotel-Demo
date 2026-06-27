import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// tailwind merge is usig cn and  accepting any number of (...inputs) values and everything goes into one array.
// returns a single string and passes into tailwind merge and returns final classes even in case of duplicate exist.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
