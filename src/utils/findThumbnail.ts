import { PreviewThumbnail } from './parseThumbnailsVtt';

/** Binary search over thumbnails sorted by `fromMs`. */
export function findThumbnail(
  thumbnails: PreviewThumbnail[],
  time: number
): PreviewThumbnail | undefined {
  let low = 0;
  let high = thumbnails.length - 1;
  let candidate = -1;

  while (low <= high) {
    const middle = (low + high) >> 1;

    if (thumbnails[middle].fromMs <= time) {
      candidate = middle;
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  const thumbnail = thumbnails[candidate];

  return thumbnail && time <= thumbnail.toMs ? thumbnail : undefined;
}
