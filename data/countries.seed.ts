import type { Country } from "@/models/country";

/**
 * 10 países LATAM + España.
 * Multiplicadores 1.0–1.4 (mayor mercado publicitario → mayor factor).
 */
export const countriesSeed: Country[] = [
  { id: "spain", name: "España", multiplier: 1.39 },
  { id: "brazil", name: "Brasil", multiplier: 1.37 },
  { id: "mexico", name: "México", multiplier: 1.35 },
  { id: "colombia", name: "Colombia", multiplier: 1.24 },
  { id: "argentina", name: "Argentina", multiplier: 1.2 },
  { id: "chile", name: "Chile", multiplier: 1.16 },
  { id: "peru", name: "Perú", multiplier: 1.12 },
  { id: "uruguay", name: "Uruguay", multiplier: 1.14 },
  { id: "ecuador", name: "Ecuador", multiplier: 1.08 },
  { id: "costa_rica", name: "Costa Rica", multiplier: 1.1 },
  { id: "dominican_republic", name: "República Dominicana", multiplier: 1.0 },
];
