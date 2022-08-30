import React, { memo } from 'react';
import { getPositionPercent } from '../utils/getPositionStyle';
import { isInRange } from '../utils/isInRange';

export interface Props {
  currentTime: number;
  seekHoverTime: number;
  bufferTime: number;
  startTime: number;
  endTime: number;
  maxTime: number;
  trackWidth: number | undefined;
  label: string;
  isTimePassed: boolean;
  isBufferPassed: boolean;
  isHoverPassed: boolean;
  onHover?: () => void;
}

function getTimeScale(
  currentTime: number,
  startTime: number,
  endTime: number,
  isTimePassed: boolean
): number {
  const isActiveTime = isInRange(currentTime, startTime, endTime);
  const timeDiff = endTime - startTime;
  const timeDiffWithCurrent = currentTime - startTime;
  const currentScalePercent = isActiveTime ? timeDiffWithCurrent / timeDiff : 0;

  return isTimePassed ? 1 : currentScalePercent;
}

export const TimeCode: React.FC<Props> = memo(
  ({
    startTime,
    maxTime,
    endTime,
    trackWidth = 0,
    currentTime,
    seekHoverTime,
    bufferTime,
    isTimePassed,
    isBufferPassed,
    isHoverPassed,
  }) => {
    const positionPercent = getPositionPercent(maxTime, startTime);

    const translateX = (trackWidth / 100) * positionPercent;

    const timeDiff = endTime - startTime;
    const widthPercent = (timeDiff / maxTime) * 100;
    const width = (trackWidth / 100) * widthPercent;

    const currentTimeScale = getTimeScale(
      currentTime,
      startTime,
      endTime,
      isTimePassed
    );
    const seekHoverTimeScale = getTimeScale(
      seekHoverTime,
      startTime,
      endTime,
      isHoverPassed
    );

    const bufferTimeScale = getTimeScale(
      bufferTime,
      startTime,
      endTime,
      isBufferPassed
    );

    const gap = endTime === maxTime ? 0 : 3;

    return (
      <div
        className="main"
        style={{
          width: `${width - gap}px`,
          left: `${translateX}px`,
        }}
      >
        <div
          className="inner-seek-block buffered"
          data-test-id="test-buffered"
          style={{ transform: `scaleX(${bufferTimeScale})` }}
        />

        <div
          className="inner-seek-block seek-hover"
          data-test-id="test-seek-hover"
          style={{ transform: `scaleX(${seekHoverTimeScale})` }}
        />

        <div
          className="inner-seek-block connect"
          style={{ transform: `scaleX(${currentTimeScale})` }}
        />
      </div>
    );
  }
);
