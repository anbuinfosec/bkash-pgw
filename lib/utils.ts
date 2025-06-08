import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple UUID alternative if needed
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
