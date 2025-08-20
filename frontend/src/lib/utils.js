import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const parseTechnologies = (technologies) => {
  if (Array.isArray(technologies)) {
    return technologies;
  }
  if (typeof technologies === 'string') {
    try {
      const parsed = JSON.parse(technologies);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      return technologies.split(',').map(t => t.trim()).filter(Boolean);
    }
  }
  return [];
};
