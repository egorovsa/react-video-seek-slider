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

  const getPreviewScreenUrl = (hoverTime: number) => {
    return \`https://your-api.com/preview?time=\${hoverTime}\`;
  };

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
      getPreviewScreenUrl={getPreviewScreenUrl}
      hideThumbTooltip={false}
      limitTimeTooltipBySides={true}
      secondsPrefix="00:"
      minutesPrefix="0:"
      offset={0}
    />
  );
};`
}; 