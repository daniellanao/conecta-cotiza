export interface Niche {
  id: string;
  /** Texto alineado con `Creator.niche` cuando aplique. */
  name: string;
  /** Factor sobre el monto base (1.0 = neutro, hasta 1.3 = mayor valor comercial). */
  multiplier: number;
}
