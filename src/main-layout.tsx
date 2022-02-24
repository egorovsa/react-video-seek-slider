import { useEffect, useState } from 'react';
import { VideoSeekSlider } from './index';

export interface State {
  currentTime: number;
  progress: number;
  test: boolean;
}

export const AppComponent: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(10);
  const [progress, setProgress] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  useEffect(() => {
    const currentTimeId = setInterval(() => {
      setCurrentTime((prev) => (prev < maxTime ? prev + 10 : 0));
    }, 100);

    const progressId = setInterval(() => {
      setProgress((prev) => (prev < maxTime ? prev + 3000 : 0));
    }, 1000);

    return () => {
      clearInterval(currentTimeId);
      clearInterval(progressId);
    };
  }, [maxTime]);

  useEffect(() => {
    setTimeout(() => {
      setMaxTime(11150);
    }, 1000);
  }, []);

  return (
    <div className="container">
      <h1>React Video slider</h1>

      <VideoSeekSlider
        max={maxTime}
        currentTime={currentTime}
        progress={progress}
        onChange={(time: number, offsetTime: number) => {
          setCurrentTime(time);

          // eslint-disable-next-line no-console
          console.log({ time, offsetTime });
        }}
        offset={0}
        limitTimeTooltipBySides={true}
        secondsPrefix="00:00:"
        minutesPrefix="00:"
      />
    </div>
  );
};
