#!/usr/bin/env node
/**
 * Generates sprite sheets and a WebVTT thumbnails file for a video.
 * Requires ffmpeg and ffprobe in PATH.
 *
 * Usage:
 *   npx react-video-seek-slider thumbnails <video> <outDir> [--interval 5] [--width 160] [--columns 10] [--rows 10]
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const USAGE =
  'Usage: npx react-video-seek-slider thumbnails <video> <outDir> [--interval 5] [--width 160] [--columns 10] [--rows 10]';

const [command, input, outDir, ...rest] = process.argv.slice(2);

if (command !== 'thumbnails' || !input || !outDir) {
  console.error(USAGE);
  process.exit(1);
}

const options = { interval: 5, width: 160, columns: 10, rows: 10 };

for (let i = 0; i < rest.length; i += 2) {
  const key = rest[i].replace(/^--/, '');

  if (!(key in options)) {
    console.error(`Unknown option: ${rest[i]}`);
    process.exit(1);
  }

  options[key] = Number(rest[i + 1]);
}

const { interval, width, columns, rows } = options;

const probe = JSON.parse(
  execFileSync('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'stream=width,height:format=duration',
    '-of',
    'json',
    input,
  ]).toString()
);

const duration = Number(probe.format.duration);
const { width: sourceWidth, height: sourceHeight } = probe.streams[0];
const height = Math.round((width * sourceHeight) / sourceWidth / 2) * 2;
const frameCount = Math.ceil(duration / interval);
const perSheet = columns * rows;

mkdirSync(outDir, { recursive: true });

execFileSync(
  'ffmpeg',
  [
    '-v',
    'error',
    '-y',
    '-i',
    input,
    '-vf',
    `fps=1/${interval},scale=${width}:${height},tile=${columns}x${rows}`,
    '-q:v',
    '5',
    join(outDir, 'sprite-%03d.jpg'),
  ],
  { stdio: 'inherit' }
);

const formatTime = (seconds) => {
  const ms = Math.round(seconds * 1000);
  const hh = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const mm = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const ss = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  const mmm = String(ms % 1000).padStart(3, '0');

  return `${hh}:${mm}:${ss}.${mmm}`;
};

const cues = [];

for (let i = 0; i < frameCount; i++) {
  const sheet = Math.floor(i / perSheet) + 1;
  const index = i % perSheet;
  const x = (index % columns) * width;
  const y = Math.floor(index / columns) * height;
  const start = i * interval;
  const end = Math.min((i + 1) * interval, duration);
  const file = `sprite-${String(sheet).padStart(3, '0')}.jpg`;

  cues.push(
    `${formatTime(start)} --> ${formatTime(end)}\n${file}#xywh=${x},${y},${width},${height}`
  );
}

writeFileSync(
  join(outDir, 'thumbnails.vtt'),
  `WEBVTT\n\n${cues.join('\n\n')}\n`
);

console.log(
  `${frameCount} thumbnails ${width}x${height} in ${Math.ceil(frameCount / perSheet)} sheet(s), ${join(outDir, 'thumbnails.vtt')}`
);
