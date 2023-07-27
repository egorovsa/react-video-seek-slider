/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/media-has-caption */
import { useCallback, useEffect, useRef, useState } from 'react';
import { VideoSeekSlider } from './index';
import { timeToTimeString } from './utils/timeToTimeString';

export const DevLayout: React.FC = () => {
  const player = useRef<HTMLVideoElement>(null);
  const previewImage = useRef('');
  const interval = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  const handleTimeChange = useCallback(
    (time: number, offsetTime: number): void => {
      if (!player.current?.currentTime) {
        return;
      }

      player.current.currentTime = time / 1000;
      setCurrentTime(time);

      console.log({ time, offsetTime });
    },
    []
  );

  const handlePlay = (): void => {
    interval.current = setInterval(() => {
      setCurrentTime((player.current?.currentTime || 0) * 1000);
    }, 1000);
  };

  const handlePause = (): void => {
    clearInterval(interval.current);
  };

  const handleDataLoaded = (): void => {
    setMaxTime((player.current?.duration || 0) * 1000);
  };

  const handleProgress = (): void => {
    const buffer: any = player?.current?.buffered;

    if (((buffer?.length > 0 && player.current?.duration) || 0) > 0) {
      let currentBuffer = 0;
      const inSeconds = player.current?.currentTime || 0;

      for (let i = 0; i < buffer.length; i++) {
        if (buffer.start(i) <= inSeconds && inSeconds <= buffer.end(i)) {
          currentBuffer = i;
          break;
        }
      }

      setProgress(buffer.end(currentBuffer) * 1000 || 0);
    }
  };

  const updatePreviewImage = (hoverTime: number, maxValue: number): void => {
    const text = timeToTimeString(maxValue, hoverTime);
    const url = `https://via.placeholder.com/140x60?text=${text}`;
    const image = document.createElement('img');
    image.src = url;

    image.onload = () => {
      previewImage.current = url;
    };
  };

  const handleGettingPreview = useCallback(
    (hoverTime: number): string => {
      // FIND AND RETURN LOADED!!! VIDEO PREVIEW ACCORDING TO the hoverTime TIME
      console.log({ hoverTime, maxTime });
      updatePreviewImage(hoverTime, maxTime);

      return previewImage.current;
    },
    [maxTime]
  );

  useEffect(() => {
    if (!player) {
      return;
    }

    player.current?.addEventListener('play', handlePlay);
    player.current?.addEventListener('pause', handlePause);
    player.current?.addEventListener('loadeddata', handleDataLoaded);
    player.current?.addEventListener('progress', handleProgress);
  }, [player]);

  return (
    <div className="container">
      <h1>React Video slider</h1>

      <VideoSeekSlider
        max={maxTime}
        currentTime={currentTime}
        bufferTime={progress}
        onChange={handleTimeChange}
        offset={0}
        limitTimeTooltipBySides={true}
        secondsPrefix="00:"
        minutesPrefix="0:"
        getPreviewScreenUrl={handleGettingPreview}
        timeCodes={[
          {
            fromMs: 0,
            description: 'This is a very logn first part label you could use',
          },
          {
            fromMs: 130000,
            description: 'This is the second part',
          },
          {
            fromMs: 270000,
            description: 'One more part label',
          },
          {
            fromMs: 440000,
            description: 'Final battle',
          },
          {
            fromMs: 600000,
            description: 'Cast ',
          },
        ]}
      />

      <div className="caption">
        Seeker with time codes and preview opportunity
      </div>

      <video
        controls
        autoPlay
        className="video-preview"
        ref={player}
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          type="video/mp4"
        />
      </video>

      <VideoSeekSlider
        max={maxTime}
        currentTime={currentTime}
        bufferTime={progress}
        onChange={handleTimeChange}
        limitTimeTooltipBySides={true}
        secondsPrefix="00:"
        minutesPrefix="0:"
      />
      <div className="caption">Simple seeker with no timecodes</div>
    </div>
  );
};
