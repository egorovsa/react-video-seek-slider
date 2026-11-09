import './ui-video-seek-slider.scss';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TimeCodeItem } from './components/timeCodeItem';
import { positionToMs } from './utils/positionToMs';
import { findTimeCode } from './utils/findTimeCode';
import { TimeCodes } from './components/timeCodes';
import { HoverTimeWithPreview } from './components/hoverTimeWithPreview';
import { Thumb } from './components/thumb';

export interface TimeCode {
  fromMs: number;
  description: string;
}

export interface Props {
  max: number;
  currentTime: number;
  bufferTime?: number;
  /** Offset in milliseconds, added to the displayed time and to `offsetTime` in `onChange`. */
  offset?: number;
  timeCodes?: TimeCode[];
  hideThumbTooltip?: boolean;
  limitTimeTooltipBySides?: boolean;
  secondsPrefix?: string;
  minutesPrefix?: string;
  onChange: (time: number, offsetTime: number) => void;
  getPreviewScreenUrl?: (hoverTimeValue: number) => string;
}

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export const VideoSeekSlider: React.FC<Props> = ({
  max = 1000,
  currentTime = 0,
  bufferTime = 0,
  hideThumbTooltip = false,
  offset = 0,
  secondsPrefix = '',
  minutesPrefix = '',
  limitTimeTooltipBySides = true,
  timeCodes,
  onChange = () => undefined,
  getPreviewScreenUrl,
}) => {
  const [seekHoverPosition, setSeekHoverPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const trackElement = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const track = trackElement.current;

    if (!track) {
      return;
    }

    const updateWidth = (): void => setTrackWidth(track.offsetWidth);

    updateWidth();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(track);

    return () => observer.disconnect();
  }, []);

  const isThumbActive = seekHoverPosition > 0 || isSeeking;
  const hoverTimeValue = positionToMs(max, seekHoverPosition, trackWidth);

  const label = isThumbActive
    ? findTimeCode(timeCodes, hoverTimeValue, max)?.description || ''
    : '';

  const getTrackPosition = (clientX: number): number => {
    const rect = trackElement.current?.getBoundingClientRect();

    if (!rect) {
      return 0;
    }

    return Math.min(Math.max(clientX - rect.left, 0), rect.width);
  };

  const seekTo = (clientX: number): void => {
    const position = getTrackPosition(clientX);
    const width = trackElement.current?.getBoundingClientRect().width || 0;
    const time = width ? Math.round((position / width) * max) : 0;

    setSeekHoverPosition(position);
    onChange(time, time + offset);
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ): void => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsSeeking(true);
    seekTo(event.clientX);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ): void => {
    if (isSeeking) {
      seekTo(event.clientX);
      return;
    }

    setSeekHoverPosition(getTrackPosition(event.clientX));
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ): void => {
    if (!isSeeking) {
      return;
    }

    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setIsSeeking(false);
    setSeekHoverPosition(0);
  };

  const handlePointerLeave = (): void => {
    if (!isSeeking) {
      setSeekHoverPosition(0);
    }
  };

  return (
    <div className="ui-video-seek-slider">
      <div
        className={isThumbActive ? 'track active' : 'track'}
        ref={trackElement}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        data-testid="main-track"
      >
        {Boolean(timeCodes?.length) && (
          <TimeCodes
            currentTime={currentTime}
            max={max}
            bufferTime={bufferTime}
            hoverTimeValue={hoverTimeValue}
            timeCodes={timeCodes}
          />
        )}

        {!timeCodes?.length && (
          <TimeCodeItem
            maxTime={max}
            startTime={0}
            endTime={max}
            currentTime={currentTime}
            bufferTime={bufferTime}
            seekHoverTime={hoverTimeValue}
          />
        )}
      </div>

      {!hideThumbTooltip && (
        <HoverTimeWithPreview
          max={max}
          hoverTimeValue={hoverTimeValue}
          isThumbActive={isThumbActive}
          label={label}
          limitTimeTooltipBySides={limitTimeTooltipBySides}
          offset={offset}
          seekHoverPosition={seekHoverPosition}
          trackWidth={trackWidth}
          getPreviewScreenUrl={getPreviewScreenUrl}
          minutesPrefix={minutesPrefix}
          secondsPrefix={secondsPrefix}
        />
      )}

      <Thumb max={max} currentTime={currentTime} />
    </div>
  );
};
