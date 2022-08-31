import { useCallback, useEffect } from 'react';
import { isInRange } from '../utils/isInRange';
import { positionToMs } from '../utils/positionToMs';
import { getEndTimeByIndex } from '../utils/getEndTimeByIndex';
import { TimeCode, TimeCodeItem } from './timeCodeItem';

export interface Props {
  max: number;
  currentTime: number;
  bufferTime: number;
  seekHoverPosition: number;
  timeCodes: TimeCode[] | undefined;
  trackWidth: number;
  mobileSeeking: boolean;
  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
}

export const TimeCodes: React.FC<Props> = ({
  max = 1000,
  currentTime = 0,
  bufferTime = 0,
  seekHoverPosition = 0,
  timeCodes,
  trackWidth,
  mobileSeeking,
  label,
  setLabel,
}) => {
  const hoverTimeValue = positionToMs(max, seekHoverPosition, trackWidth);

  const handleLableChange = useCallback(
    (currentLabel: string) => {
      if (label !== currentLabel) {
        setLabel(currentLabel);
      }
    },
    [label]
  );

  useEffect(() => {
    if (!mobileSeeking) {
      return;
    }

    const currentCode = timeCodes?.find(({ fromMs }, index) => {
      const endTime = getEndTimeByIndex(timeCodes, index, max);

      return isInRange(currentTime, fromMs, endTime);
    });

    if (currentCode?.description !== label) {
      setLabel(currentCode?.description || '');
    }
  }, [currentTime, label, max, timeCodes]);

  return (
    <>
      {timeCodes?.map(({ fromMs, description }, index) => {
        const endTime = getEndTimeByIndex(timeCodes, index, max);

        const isTimePassed = endTime <= currentTime;
        const isBufferPassed = endTime <= bufferTime;
        const isHoverPassed = endTime <= hoverTimeValue;

        let inRange = isInRange(currentTime, fromMs, endTime);
        const newCurrentTime = isTimePassed || !inRange ? 0 : currentTime;

        inRange = isInRange(bufferTime, fromMs, endTime);
        const newBufferTime = isBufferPassed || !inRange ? 0 : bufferTime;

        inRange = isInRange(hoverTimeValue, fromMs, endTime);
        const newHoverTime = isHoverPassed || !inRange ? 0 : hoverTimeValue;

        return (
          <TimeCodeItem
            key={fromMs}
            trackWidth={trackWidth}
            label={description}
            maxTime={max}
            startTime={fromMs}
            endTime={endTime}
            isTimePassed={isTimePassed}
            isBufferPassed={isBufferPassed}
            isHoverPassed={isHoverPassed}
            currentTime={newCurrentTime}
            bufferTime={newBufferTime}
            seekHoverTime={newHoverTime}
            onHover={handleLableChange}
          />
        );
      })}
    </>
  );
};
