import './ui-video-seek-slider.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getHoverTimePosition } from './utils/getHoverTimePosition';
import { hoverPositionToTimeString } from './utils/hoverPositionToTimeString';
import { TimeCode } from './components/timeCode';
import { isInRange } from './utils/isInRange';
import { positionToMs } from './utils/positionToMs';
import { getEndTimeByIndex } from './utils/getEndTimeByIndex';

export interface TimeCode {
  fromMs: number;
  description: string;
}

export interface Props {
  max: number;
  currentTime: number;
  bufferTime?: number;
  onChange: (time: number, offsetTime: number) => void;
  hideHoverTime?: boolean;
  offset?: number;
  secondsPrefix?: string;
  minutesPrefix?: string;
  limitTimeTooltipBySides?: boolean;
  timeCodes?: TimeCode[];
}

export const VideoSeekSlider: React.FC<Props> = ({
  max = 1000,
  currentTime = 0,
  bufferTime = 0,
  hideHoverTime = false,
  offset = 0,
  secondsPrefix = '',
  minutesPrefix = '',
  onChange = () => undefined,
  limitTimeTooltipBySides = false,
  timeCodes,
}) => {
  const [seekHoverPosition, setSeekHoverTime] = useState(0);

  const [label, setLabel] = useState('');
  const seeking = useRef(false);
  const trackWidth = useRef(0);
  const mobileSeeking = useRef(false);
  const trackElement = useRef<HTMLDivElement>(null);
  const hoverTimeElement = useRef<HTMLDivElement>(null);

  const isThumbActive = seekHoverPosition > 0 || seeking.current;
  const thumbClassName = isThumbActive ? 'thumb active' : 'thumb active';
  const hoverTimeClassName = isThumbActive ? 'hover-time active' : 'hover-time';

  const hoverTimeValue = positionToMs(
    max,
    seekHoverPosition,
    trackWidth.current
  );

  const hoverTimeString = hoverPositionToTimeString(
    max,
    hoverTimeValue,
    offset,
    minutesPrefix,
    secondsPrefix
  );

  const hoverTimePosition = getHoverTimePosition(
    seekHoverPosition,
    hoverTimeElement?.current,
    trackWidth?.current,
    limitTimeTooltipBySides
  );

  const changeCurrentTimePosition = (pageX: number): void => {
    const left = trackElement.current?.getBoundingClientRect().left || 0;
    let position = pageX - left;

    position = position < 0 ? 0 : position;
    position = position > trackWidth.current ? trackWidth.current : position;

    setSeekHoverTime(position);

    const percent = (position * 100) / trackWidth.current;
    const time = +(percent * (max / 100)).toFixed(0);

    onChange(time, time + offset);
  };

  const handleTouchSeeking = (event: TouchEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    if (!mobileSeeking.current) {
      return;
    }

    const { changedTouches } = event;

    let pageX = changedTouches?.[changedTouches.length - 1]?.pageX || 0;

    pageX = pageX < 0 ? 0 : pageX;

    changeCurrentTimePosition(pageX);
  };

  const handleSeeking = (event: MouseEvent): void => {
    if (seeking.current) {
      changeCurrentTimePosition(event.pageX);
    }
  };

  const setTrackWidthState = (): void => {
    if (trackElement.current) {
      trackWidth.current = trackElement.current.offsetWidth;
    }
  };

  const handleTrackHover = (
    clear: boolean,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const left = trackElement.current?.getBoundingClientRect().left || 0;
    const position = clear ? 0 : event.pageX - left;

    setSeekHoverTime(position);
  };

  const getThumbHandlerPosition = (): { transform: string } => {
    const position = trackWidth.current / (max / currentTime);

    return { transform: `translateX(${position}px)` };
  };

  const setMobileSeeking = (state = true): void => {
    mobileSeeking.current = state;
    setSeekHoverTime(state ? seekHoverPosition : 0);
  };

  const setSeeking = (state: boolean, event: MouseEvent): void => {
    event.preventDefault();

    handleSeeking(event);
    seeking.current = state;

    setSeekHoverTime(state ? seekHoverPosition : 0);
  };

  const mouseSeekingHandler = (event: MouseEvent): void => {
    setSeeking(false, event);
  };

  const mobileTouchSeekingHandler = (): void => {
    setMobileSeeking(false);
  };

  const handleLableChange = useCallback(
    (currentLabel: string) => {
      if (label !== currentLabel) {
        setLabel(currentLabel);
      }
    },
    [label]
  );

  useEffect(() => {
    if (!mobileSeeking.current) {
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

  useEffect(() => {
    setTrackWidthState();

    window.addEventListener('resize', setTrackWidthState);
    window.addEventListener('mousemove', handleSeeking);
    window.addEventListener('mouseup', mouseSeekingHandler);
    window.addEventListener('touchmove', handleTouchSeeking);
    window.addEventListener('touchend', mobileTouchSeekingHandler);

    return () => {
      window.removeEventListener('resize', setTrackWidthState);
      window.removeEventListener('mousemove', handleSeeking);
      window.removeEventListener('mouseup', mouseSeekingHandler);
      window.removeEventListener('touchmove', handleTouchSeeking);
      window.removeEventListener('touchend', mobileTouchSeekingHandler);
    };
  }, [max, offset]);

  return (
    <div className="ui-video-seek-slider">
      <div
        className={isThumbActive ? 'track' : 'track'}
        ref={trackElement}
        onMouseMove={(event) => handleTrackHover(false, event)}
        onMouseLeave={(event) => handleTrackHover(true, event)}
        onMouseDown={(event) => setSeeking(true, event as any)}
        onTouchStart={() => setMobileSeeking(true)}
        data-testid="main-track"
      >
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
            <TimeCode
              key={fromMs}
              trackWidth={trackWidth?.current}
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

        {!timeCodes && (
          <TimeCode
            trackWidth={trackWidth?.current}
            maxTime={max}
            startTime={0}
            endTime={max}
            currentTime={currentTime}
            bufferTime={bufferTime}
            seekHoverTime={hoverTimeValue}
            onHover={handleLableChange}
          />
        )}
      </div>

      {!hideHoverTime && (
        <div
          className={hoverTimeClassName}
          style={hoverTimePosition}
          ref={hoverTimeElement}
          data-testid="hover-time"
        >
          <div className="preview-screen" />
          {label && <div>{label}</div>}
          {hoverTimeString}
        </div>
      )}

      <div
        className={thumbClassName}
        data-testid="testThumb"
        style={getThumbHandlerPosition()}
      >
        <div className="handler" />
      </div>
    </div>
  );
};
