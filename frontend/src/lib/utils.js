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

export const parseAchievements = (achievements) => {
  if (Array.isArray(achievements)) {
    return achievements;
  }
  if (typeof achievements === 'string') {
    try {
      const parsed = JSON.parse(achievements);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      return achievements.split(',').map(t => t.trim()).filter(Boolean);
    }
  }
  return [];
};

export const parseFeatures = (features) => {
  if (Array.isArray(features)) {
    return features;
  }
  if (typeof features === 'string') {
    try {
      const parsed = JSON.parse(features);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      return features.split(',').map(t => t.trim()).filter(Boolean);
    }
  }
  return [];
};
