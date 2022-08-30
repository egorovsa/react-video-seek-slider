import React, { memo } from 'react';
import { getPositionPercent } from '../utils/getPositionStyle';
import { getTimeScale } from '../utils/getTimeScale';

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
  onHover?: (label: string) => void;
}

export const TimeCode: React.FC<Props> = memo(
  ({
    label,
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
    onHover = () => undefined,
  }) => {
    const gap = endTime === maxTime ? 0 : 2;
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

    const handleMouseMove = (): void => onHover(label);

    return (
      <div
        className="main"
        onMouseMove={handleMouseMove}
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
