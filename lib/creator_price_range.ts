/** Techo al siguiente múltiplo de 10 (alineado con `calculate_price.service`). */
export function round_up_to_ten(value: number): number {
  return Math.ceil(value / 10) * 10;
}

/** Rango ±10 % sobre el precio base, cada extremo con techo a múltiplo de 10. */
export function price_range_from_center(center: number): {
  low: number;
  high: number;
} {
  const low = round_up_to_ten(center * 0.9);
  const high = round_up_to_ten(center * 1.1);
  return low <= high ? { low, high } : { low: high, high: low };
}
