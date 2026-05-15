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
  {
    id: "3",
    name: "Mariana",
    age: 29,
    country: "Argentina",
    city: "Buenos Aires",
    niche: "Finanzas personales & Tecnología",
    yearsExperience: 2,
    platforms: {
      instagram: { followers: 62000, engagementRate: 5.4 },
      tiktok: { followers: 98000, engagementRate: 6.2 },
    },
  },
  {
    id: "4",
    name: "Emilio",
    age: 26,
    country: "México",
    city: "Monterrey",
    niche: "Gaming & Tecnología",
    yearsExperience: 4,
    platforms: {
      tiktok: { followers: 185000, engagementRate: 7.1 },
      youtube: { followers: 72000, engagementRate: 4.9 },
    },
  },
];
