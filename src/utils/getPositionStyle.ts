export function getPositionStyle(
  max: number,
  current: number
): { transform: string } {
  const divider = max || -1; // prevent division by zero
  const position = (current * 100) / divider;

  return { transform: `scaleX(${position / 100})` };
}
