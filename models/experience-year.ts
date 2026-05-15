export interface ExperienceYear {
  /** Años de experiencia (0–10). */
  years: number;
  /** 1.0 en 0 años, 1.2 en 10 años, proporcional en el medio. */
  multiplier: number;
}
