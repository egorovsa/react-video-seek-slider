import { isInRange } from '../utils/isInRange';
import { getEndTimeByIndex } from '../utils/getEndTimeByIndex';
import { TimeCode, TimeCodeItem } from './timeCodeItem';

export interface Props {
  max: number;
  currentTime: number;
  bufferTime: number;
  hoverTimeValue: number;
  timeCodes: TimeCode[] | undefined;
}

export const TimeCodes: React.FC<Props> = ({
  max = 1000,
  currentTime = 0,
  bufferTime = 0,
  hoverTimeValue,
  timeCodes,
}) => (
  <>
    {timeCodes?.map(({ fromMs }, index) => {
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
          maxTime={max}
          startTime={fromMs}
          endTime={endTime}
          isTimePassed={isTimePassed}
          isBufferPassed={isBufferPassed}
          isHoverPassed={isHoverPassed}
          currentTime={newCurrentTime}
          bufferTime={newBufferTime}
          seekHoverTime={newHoverTime}
          withGap={true}
        />
      );
    })}
  </>
);
