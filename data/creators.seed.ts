import type { Creator } from "@/models/creator";

export const creatorsSeed: Creator[] = [
  {
    id: "1",
    name: "Valentina",
    age: 31,
    country: "Colombia",
    city: "Medellín",
    niche: "Wellness & Mental Health",
    yearsExperience: 4,
    platforms: {
      instagram: { followers: 85000, engagementRate: 4.8 },
      tiktok: { followers: 120000, engagementRate: 5.2 },
    },
  },
  {
    id: "2",
    name: "Paola",
    age: 24,
    country: "México",
    city: "Guadalajara",
    niche: "Food & Recipes",
    yearsExperience: 2,
    platforms: {
      instagram: { followers: 45000, engagementRate: 6.1 },
      tiktok: { followers: 100000, engagementRate: 5.5 },
    },
  },
];
