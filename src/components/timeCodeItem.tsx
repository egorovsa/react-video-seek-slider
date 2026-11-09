import React, { memo } from 'react';
import { getPositionPercent } from '../utils/getPositionPercent';
import { getTimeScale } from '../utils/getTimeScale';

export interface TimeCode {
  fromMs: number;
  description: string;
}

export interface Props {
  currentTime: number;
  seekHoverTime: number;
  bufferTime: number;
  startTime: number;
  endTime: number;
  maxTime: number;
  isTimePassed?: boolean;
  isBufferPassed?: boolean;
  isHoverPassed?: boolean;
  withGap?: boolean;
}

export const TimeCodeItem: React.FC<Props> = memo(
  ({
    startTime,
    maxTime,
    endTime,
    currentTime,
    seekHoverTime,
    bufferTime,
    isTimePassed = false,
    isBufferPassed = false,
    isHoverPassed = false,
    withGap,
  }) => {
    const positionPercent = getPositionPercent(maxTime, startTime);
    const timeDiff = endTime - startTime;
    const widthPercent = (timeDiff / maxTime) * 100;
    const mainClassName = `main${withGap ? ' with-gap' : ''}`;

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

    return (
      <div
        className={mainClassName}
        style={{
          width: `${widthPercent}%`,
          left: `${positionPercent}%`,
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
