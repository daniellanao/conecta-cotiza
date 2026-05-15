export interface Country {
  id: string;
  /** Nombre para mostrar / alinear con `Creator.country`. */
  name: string;
  /** Factor 1.0 – 1.4 sobre la cotización base. */
  multiplier: number;
}
