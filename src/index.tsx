import { useEffect, useMemo, useRef, useState } from 'react';
import './ui-video-seek-slider.scss';

interface Time {
  hh: string;
  mm: string;
  ss: string;
}

export interface Props {
  max: number;
  currentTime: number;
  progress?: number;
  onChange: (time: number, offsetTime: number) => void;
  hideHoverTime?: boolean;
  offset?: number;
  secondsPrefix?: string;
  minutesPrefix?: string;
  limitTimeTooltipBySides?: boolean;
}

function secondsToTime(seconds: number, offset: number): Time {
  const roundedSeconds = Math.round(seconds / 1000 + offset);

  const hours: number = Math.floor(roundedSeconds / 3600);
  const divirsForMinutes: number = roundedSeconds % 3600;
  const minutes: number = Math.floor(divirsForMinutes / 60);
  const sec: number = Math.ceil(divirsForMinutes % 60);

  return {
    hh: hours.toString(),
    mm: minutes < 10 ? `0${minutes}` : minutes.toString(),
    ss: sec < 10 ? `0${sec}` : sec.toString(),
  };
}

function getTimeValue(
  max: number,
  seekHoverPosition: number,
  trackWidth: number,
  offset: number,
  minutesPrefix: string,
  secondsPrefix: string
): string {
  const percent: number = (seekHoverPosition * 100) / trackWidth;
  const seconds: number = Math.floor(+(percent * (max / 100)));
  const times: Time = secondsToTime(seconds, offset);

  if (max + offset < 60 * 1000) {
    return secondsPrefix + times.ss;
  }

  if (max + offset < 3600 * 1000) {
    return `${minutesPrefix + times.mm}:${times.ss}`;
  }

  return `${times.hh}:${times.mm}:${times.ss}`;
}

function getPositionStyle(max: number, time: number): { transform: string } {
  const divider = max || -1; // prevent division by zero
  const position = (time * 100) / divider;

  return { transform: `scaleX(${position / 100})` };
}

function getSeekHoverPosition(
  seekHoverPosition: number,
  trackWidth: number
): { transform: string } {
  const position = (seekHoverPosition * 100) / trackWidth;

  return { transform: `scaleX(${position / 100})` };
}

function getHoverTimePosition(
  seekHoverPosition: number,
  hoverTimeElement: HTMLDivElement | null,
  trackWidth: number,
  limitTimeTooltipBySides: boolean
): { transform: string } {
  let position = 0;

  if (hoverTimeElement) {
    position = seekHoverPosition - hoverTimeElement.offsetWidth / 2;

    if (limitTimeTooltipBySides) {
      if (position < 0) {
        position = 0;
      } else if (position + hoverTimeElement.offsetWidth > trackWidth) {
        position = trackWidth - hoverTimeElement.offsetWidth;
      }
    }
  }

  return { transform: `translateX(${position}px)` };
}

export const VideoSeekSlider: React.FC<Props> = ({
  max = 1000,
  currentTime = 0,
  progress = 0,
  hideHoverTime = false,
  offset = 0,
  secondsPrefix = '',
  minutesPrefix = '',
  onChange = () => undefined,
  limitTimeTooltipBySides = false,
}) => {
  const [seekHoverPosition, setSeekHoverPosition] = useState(0);

  const seeking = useRef(false);
  const trackWidth = useRef(0);
  const mobileSeeking = useRef(false);
  const trackElement = useRef<HTMLDivElement>(null);
  const hoverTimeElement = useRef<HTMLDivElement>(null);

  const hoverTimeValue = useMemo(
    () =>
      getTimeValue(
        max,
        seekHoverPosition,
        trackWidth.current,
        offset,
        minutesPrefix,
        secondsPrefix
      ),
    [max, minutesPrefix, offset, secondsPrefix, seekHoverPosition]
  );

  const bufferedStyle = getPositionStyle(max, progress);

  const seekHoverStyle = getSeekHoverPosition(
    seekHoverPosition,
    trackWidth?.current
  );

  const hoverTimePosition = getHoverTimePosition(
    seekHoverPosition,
    hoverTimeElement?.current,
    trackWidth?.current,
    limitTimeTooltipBySides
  );

  const isThumbActive = seekHoverPosition > 0 || seeking.current;
  const thumbClassName = isThumbActive ? 'thumb active' : 'thumb';
  const hoverTimeClassName = isThumbActive ? 'hover-time active' : 'hover-time';

  const changeCurrentTimePosition = (pageX: number): void => {
    const left = trackElement.current?.getBoundingClientRect().left || 0;
    let position = pageX - left;

    position = position < 0 ? 0 : position;
    position = position > trackWidth.current ? trackWidth.current : position;

    setSeekHoverPosition(position);

    const percent = (position * 100) / trackWidth.current;
    const time = +(percent * (max / 100)).toFixed(0);

    onChange(time, time + offset);
  };

  const handleTouchSeeking = (event: TouchEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    let pageX = 0;

    for (let i = 0; i < event.changedTouches.length; i++) {
      pageX = event.changedTouches?.[i].pageX;
    }

    pageX = pageX < 0 ? 0 : pageX;

    if (mobileSeeking.current) {
      changeCurrentTimePosition(pageX);
    }
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

    setSeekHoverPosition(position);
  };

  const getThumbHandlerPosition = (): { transform: string } => {
    const position = trackWidth.current / (max / currentTime);

    return { transform: `translateX(${position}px)` };
  };

  const setMobileSeeking = (state = true): void => {
    mobileSeeking.current = state;
    setSeekHoverPosition(state ? seekHoverPosition : 0);
  };

  const setSeeking = (state: boolean, event: MouseEvent): void => {
    event.preventDefault();

    handleSeeking(event);
    seeking.current = state;

    setSeekHoverPosition(state ? seekHoverPosition : 0);
  };

  const mouseSeekingHandler = (event: MouseEvent): void => {
    setSeeking(false, event);
  };

  const mobileTouchSeekingHandler = (): void => {
    setMobileSeeking(false);
  };

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
        className={isThumbActive ? 'track active' : 'track'}
        ref={trackElement}
        onMouseMove={(event) => handleTrackHover(false, event)}
        onMouseLeave={(event) => handleTrackHover(true, event)}
        onMouseDown={(event) => setSeeking(true, event as any)}
        onTouchStart={() => setMobileSeeking(true)}
        data-testid="main-track"
      >
        <div className="main">
          <div
            className="buffered"
            data-test-id="testBuffered"
            style={bufferedStyle}
          />

          <div
            className="seek-hover"
            data-test-id="testSeekHover"
            style={seekHoverStyle}
          />

          <div
            className="connect"
            data-test-id="testConnect"
            style={getPositionStyle(max, currentTime)}
          />
        </div>
      </div>

      {!hideHoverTime && (
        <div
          className={hoverTimeClassName}
          style={hoverTimePosition}
          ref={hoverTimeElement}
          data-testid="hover-time"
        >
          {hoverTimeValue}
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
