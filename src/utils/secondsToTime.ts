export interface Time {
  hh: string;
  mm: string;
  ss: string;
}

export function millisecondsToTime(ms: number, offset = 0): Time {
  const roundedSeconds = Math.round(ms / 1000 + offset);

  const hours: number = Math.floor(roundedSeconds / 3600);
  const divirsForMinutes: number = roundedSeconds % 3600;
  const minutes: number = Math.floor(divirsForMinutes / 60);
  const sec: number = Math.ceil(divirsForMinutes % 60);

  return {
    hh: hours.toString(),
    mm: minutes < 10 ? `0${minutes}` : minutes.toString(),
    ss: sec < 10 ? `0${sec}` : sec.toString(),
  };
}
