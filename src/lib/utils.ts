import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAsCurrency(value: string) {
  const numericValue = value?.replace(/[^0-9.]/g, "");

  const parts = numericValue?.split(".");
  const formattedValue =
    parts?.[0] + (parts?.length > 1 ? "." + parts?.[1]?.slice(0, 2) : "");

  if (!formattedValue) return "";

  const numberValue = parseFloat(formattedValue);

  if (isNaN(numberValue)) return "";

  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
}

export function formatPrice(value: number) {
  if (!value) return "";

  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
