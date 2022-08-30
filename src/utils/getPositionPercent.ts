export function getPositionPercent(max: number, current: number): number {
  const divider = max || -1; // prevent division by zero
  return (current * 100) / divider;
}
