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
  label?: string;
  isTimePassed?: boolean;
  isBufferPassed?: boolean;
  isHoverPassed?: boolean;
  onHover?: (label: string) => void;
  withGap?: boolean;
}

export const TimeCodeItem: React.FC<Props> = memo(
  ({
    label = '',
    startTime,
    maxTime,
    endTime,
    currentTime,
    seekHoverTime,
    bufferTime,
    isTimePassed = false,
    isBufferPassed = false,
    isHoverPassed = false,
    onHover = () => undefined,
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

    const handleMouseMove = (): void => onHover(label);

    return (
      <div
        className={mainClassName}
        onMouseMove={handleMouseMove}
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
