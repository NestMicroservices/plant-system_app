/**
 * Formats a volume by adding the appropriate unit.
 * If the volume is less than 1000, it displays in kg. If it is 1000 or more, it displays in tons (T).
 * Example: 500 -> "500 kg", 3000 -> "3 T"
 */
export function formatVolumeWithUnit(volume: number): string {
  if (volume < 1000) {
    return `${volume} kg`;
  }
  return `${volume / 1000} T`;
}
