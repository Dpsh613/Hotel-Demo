import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// tailwind merge is usig cn and  accepting any number of (...inputs) values and everything goes into one array.
// returns a single string and passes into tailwind merge and returns final classes even in case of duplicate exist.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//currency-

export function formatCurrency(
  amount: number,
  currency: string,
  locale: string = "en-BE",
): string {
  if (amount === 0) return "—";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyRange(
  min: number,
  max: number,
  currency: string,
): string {
  if (min === max) return formatCurrency(min, currency);
  return `${formatCurrency(min, currency)} – ${formatCurrency(max, currency)}`;
}

// what does this function do...

export function isExternalUrl(url: string): boolean {
  if (!url) return false;
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:")
  );
}

export function getLinkProps(url: string): { target?: string; rel?: string } {
  if (isExternalUrl(url)) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
  return {};
}
