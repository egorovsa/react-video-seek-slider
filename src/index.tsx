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
  const roundedSeconds = Math.round(seconds + offset);

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

export const VideoSeekSlider: React.FC<Props> = ({
  max = 100,
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
  const track = useRef<HTMLDivElement>(null);
  const hoverTime = useRef<HTMLDivElement>(null);

  const hoverTimeValue = useMemo(() => {
    const percent: number = (seekHoverPosition * 100) / trackWidth.current;
    const time: number = Math.floor(+(percent * (max / 100)));
    const times: Time = secondsToTime(time, offset);

    if (max + offset < 60) {
      return secondsPrefix + times.ss;
    }

    if (max + offset < 3600) {
      return `${minutesPrefix + times.mm}:${times.ss}`;
    }

    return `${times.hh}:${times.mm}:${times.ss}`;
  }, [max, minutesPrefix, offset, secondsPrefix, seekHoverPosition]);

  function changeCurrentTimePosition(pageX: number): void {
    const left = track.current?.getBoundingClientRect().left || 0;
    let position = pageX - left;

    position = position < 0 ? 0 : position;
    position = position > trackWidth.current ? trackWidth.current : position;

    setSeekHoverPosition(position);

    const percent = (position * 100) / trackWidth.current;
    const time = +(percent * (max / 100)).toFixed(0);

    onChange(time, time + offset);
  }

  function handleTouchSeeking(event: TouchEvent): void {
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
  }

  function handleSeeking(event: MouseEvent): void {
    if (seeking.current) {
      changeCurrentTimePosition(event.pageX);
    }
  }

  function setTrackWidthState(): void {
    if (track.current) {
      trackWidth.current = track.current.offsetWidth;
    }
  }

  function handleTrackHover(
    clear: boolean,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    const left = track.current?.getBoundingClientRect().left || 0;
    const position = clear ? 0 : event.pageX - left;

    setSeekHoverPosition(position);
  }

  function getPositionStyle(time: number): { transform: string } {
    const divider = max || -1; // prevent division by zero
    const position = (time * 100) / divider;

    return { transform: `scaleX(${position / 100})` };
  }

  function getThumbHandlerPosition(): { transform: string } {
    const position = trackWidth.current / (max / currentTime);

    return { transform: `translateX(${position}px)` };
  }

  function getSeekHoverPosition(): { transform: string } {
    const position = (seekHoverPosition * 100) / trackWidth.current;

    return { transform: `scaleX(${position / 100})` };
  }

  function getHoverTimePosition(): { transform: string } {
    let position = 0;

    if (hoverTime.current) {
      position = seekHoverPosition - hoverTime.current.offsetWidth / 2;

      if (limitTimeTooltipBySides) {
        if (position < 0) {
          position = 0;
        } else if (
          position + hoverTime.current.offsetWidth >
          trackWidth.current
        ) {
          position = trackWidth.current - hoverTime.current.offsetWidth;
        }
      }
    }

    return { transform: `translateX(${position}px)` };
  }

  function setMobileSeeking(state = true): void {
    mobileSeeking.current = state;
    setSeekHoverPosition(state ? seekHoverPosition : 0);
  }

  function setSeeking(state: boolean, event: MouseEvent): void {
    event.preventDefault();

    handleSeeking(event);
    seeking.current = state;

    setSeekHoverPosition(state ? seekHoverPosition : 0);
  }

  function mouseSeekingHandler(event: MouseEvent): void {
    setSeeking(false, event);
  }

  function mobileTouchSeekingHandler(): void {
    setMobileSeeking(false);
  }

  function isThumbActive(): boolean {
    return seekHoverPosition > 0 || seeking.current;
  }

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
        className={isThumbActive() ? 'track active' : 'track'}
        ref={track}
        onMouseMove={(event) => handleTrackHover(false, event)}
        onMouseLeave={(event) => handleTrackHover(true, event)}
        onMouseDown={(event) => setSeeking(true, event as any)}
        onTouchStart={() => setMobileSeeking(true)}
        data-test-id="testTrack"
      >
        <div className="main">
          <div
            className="buffered"
            data-test-id="testBuffered"
            style={getPositionStyle(progress)}
          />

          <div
            className="seek-hover"
            data-test-id="testSeekHover"
            style={getSeekHoverPosition()}
          />

          <div
            className="connect"
            data-test-id="testConnect"
            style={getPositionStyle(currentTime)}
          />
        </div>
      </div>

      {!hideHoverTime && (
        <div
          className={isThumbActive() ? 'hover-time active' : 'hover-time'}
          style={getHoverTimePosition()}
          ref={hoverTime}
        >
          {hoverTimeValue}
        </div>
      )}

      <div
        className={isThumbActive() ? 'thumb active' : 'thumb'}
        data-test-id="testThumb"
        style={getThumbHandlerPosition()}
      >
        <div className="handler" />
      </div>
    </div>
  );
};
