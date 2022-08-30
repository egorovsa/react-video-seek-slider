export const isInRange = (time: number, start: number, end: number): boolean =>
  time > start && time < end;
