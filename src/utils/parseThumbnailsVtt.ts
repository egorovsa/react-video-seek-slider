export interface PreviewThumbnail {
  fromMs: number;
  toMs: number;
  url: string;
  /** Sprite fragment in image pixels. Omit to show the whole image. */
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const TIMESTAMP = /^(?:(\d+):)?(\d{1,2}):(\d{2})[.,](\d{3})$/;
const XYWH = /^xywh=(?:pixel:)?(\d+),(\d+),(\d+),(\d+)$/;

const parseTimestamp = (value: string): number => {
  const match = TIMESTAMP.exec(value.trim().split(/\s+/)[0]);

  if (!match) {
    return NaN;
  }

  const [, hh = '0', mm, ss, ms] = match;

  return ((+hh * 60 + +mm) * 60 + +ss) * 1000 + +ms;
};

const resolveUrl = (path: string, baseUrl?: string): string => {
  if (!baseUrl) {
    return path;
  }

  try {
    return new URL(path, baseUrl).href;
  } catch {
    return path;
  }
};

/**
 * Parses a WebVTT thumbnails track: every cue payload is an image URL,
 * optionally with a `#xywh=x,y,w,h` sprite fragment.
 * Relative URLs are resolved against `baseUrl` (usually the VTT file URL).
 */
export function parseThumbnailsVtt(
  vtt: string,
  baseUrl?: string
): PreviewThumbnail[] {
  const thumbnails: PreviewThumbnail[] = [];
  const blocks = vtt.replace(/\r\n?/g, '\n').split(/\n{2,}/);

  for (const block of blocks) {
    const lines = block
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const timingIndex = lines.findIndex((line) => line.includes('-->'));
    const payload = lines[timingIndex + 1];

    if (timingIndex === -1 || !payload) {
      continue;
    }

    const [start, end] = lines[timingIndex].split('-->');
    const fromMs = parseTimestamp(start);
    const toMs = parseTimestamp(end);

    if (Number.isNaN(fromMs) || Number.isNaN(toMs)) {
      continue;
    }

    const hashIndex = payload.lastIndexOf('#');
    const fragment =
      hashIndex === -1 ? null : XYWH.exec(payload.slice(hashIndex + 1));
    const path = fragment ? payload.slice(0, hashIndex) : payload;
    const thumbnail: PreviewThumbnail = {
      fromMs,
      toMs,
      url: resolveUrl(path, baseUrl),
    };

    if (fragment) {
      const [, x, y, width, height] = fragment.map(Number);
      Object.assign(thumbnail, { x, y, width, height });
    }

    thumbnails.push(thumbnail);
  }

  return thumbnails.sort((a, b) => a.fromMs - b.fromMs);
}
