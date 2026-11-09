export const codeExamples = {
  basic: `import { VideoSeekSlider } from 'react-video-seek-slider';
import { useState, useRef } from 'react';
import 'react-video-seek-slider/styles.css';

const BasicExample = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
    // Update video currentTime
    if (videoRef.current) {
      videoRef.current.currentTime = time / 1000;
    }
  };

  return (
    <VideoSeekSlider
      max={maxTime}
      currentTime={currentTime}
      onChange={handleTimeChange}
    />
  );
};`,
  
  withThumbnails: `import { VideoSeekSlider } from 'react-video-seek-slider';
import { useState } from 'react';
import 'react-video-seek-slider/styles.css';

/**
 * thumbnails.vtt maps time ranges to parts of sprite sheets:
 *
 * WEBVTT
 *
 * 00:00:00.000 --> 00:00:05.000
 * sprite-001.jpg#xywh=0,0,160,66
 *
 * 00:00:05.000 --> 00:00:10.000
 * sprite-001.jpg#xywh=160,0,160,66
 */
const SpritePreviewExample = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  return (
    <VideoSeekSlider
      max={maxTime}
      currentTime={currentTime}
      onChange={setCurrentTime}
      previewThumbnails="/thumbnails/thumbnails.vtt"
    />
  );
};`,

  withHeatmap: `import { VideoSeekSlider } from 'react-video-seek-slider';
import { useState } from 'react';
import 'react-video-seek-slider/styles.css';

const HeatmapExample = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  // Watch counts per equal part of the video, e.g. from your analytics.
  // Any scale works: values are normalized by the maximum.
  const heatmap = [120, 340, 180, 90, 75, 410, 260, 110];

  return (
    <VideoSeekSlider
      max={maxTime}
      currentTime={currentTime}
      onChange={setCurrentTime}
      heatmap={heatmap}
    />
  );
};`,

  withTimeCodes: `import { VideoSeekSlider } from 'react-video-seek-slider';
import { useState } from 'react';
import 'react-video-seek-slider/styles.css';

const TimeCodesExample = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  const timeCodes = [
    { fromMs: 0, description: 'Introduction' },
    { fromMs: 30000, description: 'Main Content' },
    { fromMs: 60000, description: 'Conclusion' }
  ];

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <VideoSeekSlider
      max={maxTime}
      currentTime={currentTime}
      onChange={handleTimeChange}
      timeCodes={timeCodes}
    />
  );
};`,
  
  withPreview: `import { VideoSeekSlider } from 'react-video-seek-slider';
import { useState } from 'react';
import 'react-video-seek-slider/styles.css';

const PreviewExample = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  const getPreviewScreenUrl = (hoverTime: number) => {
    // Generate preview image based on hover time
    return \`https://your-api.com/preview?time=\${hoverTime}\`;
  };

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <VideoSeekSlider
      max={maxTime}
      currentTime={currentTime}
      onChange={handleTimeChange}
      getPreviewScreenUrl={getPreviewScreenUrl}
    />
  );
};`,
  
  advanced: `import { VideoSeekSlider } from 'react-video-seek-slider';
import { useState } from 'react';
import 'react-video-seek-slider/styles.css';

const AdvancedExample = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [bufferTime, setBufferTime] = useState(0);

  const timeCodes = [
    { fromMs: 0, description: 'Introduction' },
    { fromMs: 30000, description: 'Main Content' },
    { fromMs: 60000, description: 'Conclusion' }
  ];

  // Watch intensity per equal part of the video, from your analytics
  const heatmap = [0.2, 0.9, 0.4, 0.3, 0.6, 1, 0.5, 0.3];

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <VideoSeekSlider
      max={maxTime}
      currentTime={currentTime}
      bufferTime={bufferTime}
      onChange={handleTimeChange}
      timeCodes={timeCodes}
      previewThumbnails="/thumbnails/thumbnails.vtt"
      heatmap={heatmap}
      hideThumbTooltip={false}
      limitTimeTooltipBySides={true}
      secondsPrefix="00:"
      minutesPrefix="0:"
      offset={0}
    />
  );
};`
}; 