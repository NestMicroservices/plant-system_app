/**
 * Formatea un costo a dos decimales.
 * Ejemplo: 0.015 -> "0.02", 15 -> "15.00"
 */
export function formatCost(value: number): string {
  return value.toFixed(2);
}
