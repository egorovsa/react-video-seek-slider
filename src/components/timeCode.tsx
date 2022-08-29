import React, { memo } from 'react';
import { getPositionPercent } from '../utils/getPositionStyle';

export interface Props {
  currentTime: number;
  startTime: number;
  endTime: number;
  maxTime: number;
  trackWidth: number | undefined;
  label: string;
  timePassed?: boolean;
  onHover?: () => void;
}

export const TimeCode: React.FC<Props> = memo(
  ({
    startTime,
    maxTime,
    endTime,
    timePassed,
    trackWidth = 0,
    currentTime,
  }) => {
    const positionPercent = getPositionPercent(maxTime, startTime);

    const translateX = (trackWidth / 100) * positionPercent;

    const timeDiff = endTime - startTime;
    const timeDiffWithCurrent = currentTime - startTime;
    const widthPercent = (timeDiff / maxTime) * 100;
    const width = (trackWidth / 100) * widthPercent;
    const isActiveTime = currentTime > startTime && currentTime < endTime;

    const currentScalePercent = isActiveTime
      ? timeDiffWithCurrent / timeDiff
      : 0;

    const gap = endTime === maxTime ? 0 : 3;
    const scaleStyle = timePassed ? 1 : currentScalePercent;

    return (
      <div
        className="main"
        style={{
          width: `${width - gap}px`,
          left: `${translateX}px`,
        }}
      >
        {/* <div
          className="buffered"
          data-test-id="testBuffered"
          style={bufferedStyle}
        />

        <div
          className="seek-hover"
          data-test-id="testSeekHover"
          style={seekHoverStyle}
        /> */}

        <div
          className="connect"
          style={{ transform: `scaleX(${scaleStyle})` }}
        />
      </div>
    );
  }
);
