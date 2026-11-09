import { useEffect, useState } from 'react';
import {
  parseThumbnailsVtt,
  PreviewThumbnail,
} from '../utils/parseThumbnailsVtt';

interface Loaded {
  source: string;
  thumbnails: PreviewThumbnail[];
}

/** Returns the thumbnails as is, or loads and parses them when given a VTT URL. */
export function usePreviewThumbnails(
  source: string | PreviewThumbnail[] | undefined
): PreviewThumbnail[] | undefined {
  const [loaded, setLoaded] = useState<Loaded>();

  useEffect(() => {
    if (typeof source !== 'string') {
      return;
    }

    const controller = new AbortController();
    const vttUrl = new URL(source, document.baseURI).href;

    fetch(vttUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.text();
      })
      .then((text) =>
        setLoaded({ source, thumbnails: parseThumbnailsVtt(text, vttUrl) })
      )
      .catch((error: Error) => {
        if (error.name !== 'AbortError') {
          console.warn(
            `react-video-seek-slider: failed to load preview thumbnails from ${source}`,
            error
          );
        }
      });

    return () => controller.abort();
  }, [source]);

  if (typeof source !== 'string') {
    return source;
  }

  return loaded?.source === source ? loaded.thumbnails : undefined;
}
