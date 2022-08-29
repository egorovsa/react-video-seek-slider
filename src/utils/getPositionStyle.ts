export function getPositionPercent(max: number, current: number): number {
  const divider = max || -1; // prevent division by zero
  return (current * 100) / divider;
}

export function getPositionStyle(
  max: number,
  current: number
): { transform: string } {
  const positionPercent = getPositionPercent(max, current);

  return { transform: `scaleX(${positionPercent / 100})` };
}
