/* eslint-disable max-len */
/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useState } from 'react';
import { VideoSeekSlider } from './index';

export interface State {
  currentTime: number;
  progress: number;
  test: boolean;
}

export const AppComponent: React.FC = () => {
  const player = useRef<HTMLVideoElement>(null);
  const interval = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  const handleTimeChange = (time: number, offsetTime: number): void => {
    if (!player.current?.currentTime) {
      return;
    }

    player.current.currentTime = time / 1000;
    setCurrentTime(time);

    // eslint-disable-next-line no-console
    console.log({ time, offsetTime });
  };

  useEffect(() => {
    if (!player) {
      return;
    }

    player.current?.addEventListener('play', () => {
      interval.current = setInterval(() => {
        setCurrentTime((player.current?.currentTime || 0) * 1000);
      }, 1000);
    });

    player.current?.addEventListener('pause', () => {
      clearInterval(interval.current);
    });

    player.current?.addEventListener('loadeddata', () => {
      setMaxTime((player.current?.duration || 0) * 1000);
    });

    player.current?.addEventListener('progress', () => {
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

        const a = buffer.end(currentBuffer);

        console.log({ a });

        setProgress(buffer.end(currentBuffer) * 1000 || 0);
      }
    });
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

      <video
        controls={true}
        autoPlay={true}
        className="video-preview"
        ref={player}
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};
