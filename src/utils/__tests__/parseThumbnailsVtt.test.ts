import { describe, it, expect } from 'vitest';
import { parseThumbnailsVtt } from '../parseThumbnailsVtt';
import { findThumbnail } from '../findThumbnail';

const VTT = `WEBVTT

1
00:00:05.000 --> 00:00:10.000
sprite-001.jpg#xywh=160,0,160,90

00:00.000 --> 00:05.000 align:start
sprite-001.jpg#xywh=0,0,160,90

01:00:00.000 --> 01:00:05.500
/images/single frame.jpg
`;

describe('parseThumbnailsVtt', () => {
  it('parses cues with and without hours, ids and settings, sorted by time', () => {
    expect(parseThumbnailsVtt(VTT)).toEqual([
      {
        fromMs: 0,
        toMs: 5000,
        url: 'sprite-001.jpg',
        x: 0,
        y: 0,
        width: 160,
        height: 90,
      },
      {
        fromMs: 5000,
        toMs: 10000,
        url: 'sprite-001.jpg',
        x: 160,
        y: 0,
        width: 160,
        height: 90,
      },
      { fromMs: 3600000, toMs: 3605500, url: '/images/single frame.jpg' },
    ]);
  });

  it('resolves relative urls against the base url', () => {
    const [first, , last] = parseThumbnailsVtt(
      VTT,
      'https://cdn.example.com/videos/42/thumbnails.vtt'
    );

    expect(first.url).toBe('https://cdn.example.com/videos/42/sprite-001.jpg');
    expect(last.url).toBe('https://cdn.example.com/images/single%20frame.jpg');
  });

  it('handles CRLF line endings and skips broken cues', () => {
    const vtt =
      'WEBVTT\r\n\r\n00:00:00.000 --> 00:00:01.000\r\na.jpg\r\n\r\nbroken --> 00:00:02.000\r\nb.jpg\r\n\r\n00:00:02.000 --> 00:00:03.000\r\n';

    expect(parseThumbnailsVtt(vtt)).toEqual([
      { fromMs: 0, toMs: 1000, url: 'a.jpg' },
    ]);
  });
});

describe('findThumbnail', () => {
  const thumbnails = parseThumbnailsVtt(VTT);

  it('finds the cue containing the time', () => {
    expect(findThumbnail(thumbnails, 0)?.x).toBe(0);
    expect(findThumbnail(thumbnails, 7000)?.x).toBe(160);
    expect(findThumbnail(thumbnails, 3602000)?.url).toBe(
      '/images/single frame.jpg'
    );
  });

  it('returns undefined in gaps and outside the range', () => {
    expect(findThumbnail(thumbnails, 20000)).toBeUndefined();
    expect(findThumbnail(thumbnails, 4000000)).toBeUndefined();
    expect(findThumbnail([], 0)).toBeUndefined();
  });
});
