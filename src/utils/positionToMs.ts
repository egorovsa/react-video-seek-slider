export function positionToMs(
  max: number,
  position: number,
  trackWidth: number
): number {
  const percent = (position * 100) / trackWidth;
  return Math.floor(+(percent * (max / 100)));
}
