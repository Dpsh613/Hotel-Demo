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

export function formatDate(
  isoString: string,
  format: string = "DD/MM/YYYY",
): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return format.replace("DD", day).replace("MM", month).replace("YYYY", year);
}

export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function resolveImagePath(ref: string): string {
  if (!ref) return "";
  if (ref.startsWith("http://") || ref.startsWith("https://")) return ref;
  if (ref.startsWith("/")) return ref;
  return `/${ref}`;
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
