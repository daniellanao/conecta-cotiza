import type { ExperienceYear } from "@/models/experience-year";

/** Multiplicador lineal: 1 + (años / 10) × 0.2 → rango [1.0, 1.2]. */
export const experienceYearsSeed: ExperienceYear[] = Array.from(
  { length: 11 },
  (_, years) => ({
    years,
    multiplier: Number((1 + (years / 10) * 0.2).toFixed(4)),
  }),
);
