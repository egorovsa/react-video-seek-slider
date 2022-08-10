import { useEffect, useState } from 'react';
import { VideoSeekSlider } from './index';

export interface State {
  currentTime: number;
  progress: number;
  test: boolean;
}

export const AppComponent: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  useEffect(() => {
    const currentTimeId = setInterval(() => {
      setCurrentTime((prev) => (prev < maxTime ? prev + 4 : 0));
    }, 4);

    const progressId = setInterval(() => {
      setProgress((prev) => (prev < maxTime ? prev + 500 : 0));
    }, 1000);

    return () => {
      clearInterval(currentTimeId);
      clearInterval(progressId);
    };
  }, [maxTime]);

  const handleTimeChange = (time: number, offsetTime: number): void => {
    setCurrentTime(time);

    // eslint-disable-next-line no-console
    console.log({ time, offsetTime });
  };

  useEffect(() => {
    setTimeout(() => {
      setMaxTime(50000);
    }, 100);
  }, []);

  return (
    <div className="container">
      <h1>React Video slider</h1>

      <VideoSeekSlider
        max={maxTime}
        currentTime={currentTime}
        progress={progress}
        onChange={handleTimeChange}
        offset={0}
        limitTimeTooltipBySides={true}
        secondsPrefix="0:"
        minutesPrefix="0:"
      />
    </div>
  );
};
