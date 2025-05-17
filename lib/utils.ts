import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date, includeTime = false): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }

  if (includeTime) {
    options.hour = "2-digit"
    options.minute = "2-digit"
  }

  return new Intl.DateTimeFormat("en-US", options).format(date)
}
