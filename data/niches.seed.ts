import type { Niche } from "@/models/niche";

/**
 * Nichos de referencia para cotización.
 * Incluye los mismos `name` que en `creators.seed` + nichos frecuentes con multiplicador 1.0–1.3.
 */
export const nichesSeed: Niche[] = [
  // —— Presentes en creadores del seed ——
  {
    id: "wellness_mental_health",
    name: "Wellness & Mental Health",
    multiplier: 1.2,
  },
  {
    id: "food_recipes",
    name: "Food & Recipes",
    multiplier: 1.0,
  },
  {
    id: "finanzas_personal_tech",
    name: "Finanzas personales & Tecnología",
    multiplier: 1.28,
  },
  {
    id: "gaming_tech",
    name: "Gaming & Tecnología",
    multiplier: 1.24,
  },
  // —— Nichos adicionales (alta demanda publicitaria) ——
  {
    id: "beauty_skincare",
    name: "Belleza & Skincare",
    multiplier: 1.22,
  },
  {
    id: "fashion_lifestyle",
    name: "Moda & Lifestyle",
    multiplier: 1.18,
  },
  {
    id: "fitness_sports",
    name: "Fitness & Deporte",
    multiplier: 1.16,
  },
  {
    id: "education_courses",
    name: "Educación & Cursos online",
    multiplier: 1.14,
  },
  {
    id: "saas_b2b",
    name: "Software, SaaS & B2B",
    multiplier: 1.3,
  },
  {
    id: "entrepreneurship",
    name: "Emprendimiento & Negocios",
    multiplier: 1.26,
  },
  {
    id: "travel",
    name: "Viajes & Turismo",
    multiplier: 1.1,
  },
  {
    id: "family_parenting",
    name: "Familia & Crianza",
    multiplier: 1.08,
  },
];
