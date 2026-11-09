export function positionToMs(
  max: number,
  position: number,
  trackWidth: number
): number {
  if (!trackWidth) {
    return 0;
  }

  return Math.floor((position / trackWidth) * max);
}
