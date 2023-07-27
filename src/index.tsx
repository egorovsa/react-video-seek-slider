import './ui-video-seek-slider.scss';
import { useEffect, useRef, useState } from 'react';
import { TimeCodeItem } from './components/timeCodeItem';
import { isInRange } from './utils/isInRange';
import { positionToMs } from './utils/positionToMs';
import { getEndTimeByIndex } from './utils/getEndTimeByIndex';
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
  offset?: number;
  timeCodes?: TimeCode[];
  hideThumbTooltip?: boolean;
  limitTimeTooltipBySides?: boolean;
  secondsPrefix?: string;
  minutesPrefix?: string;
  onChange: (time: number, offsetTime: number) => void;
  getPreviewScreenUrl?: (hoverTimeValue: number) => string;
}

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
  const [label, setLabel] = useState('');
  const seeking = useRef(false);
  const mobileSeeking = useRef(false);
  const trackElement = useRef<HTMLDivElement>(null);

  const trackWidth = trackElement.current?.offsetWidth || 0;
  const isThumbActive = seekHoverPosition > 0 || seeking.current;
  const hoverTimeValue = positionToMs(max, seekHoverPosition, trackWidth);

  const changeCurrentTimePosition = (pageX: number): void => {
    const clientRect = trackElement.current?.getBoundingClientRect();
    const left = clientRect?.left || 0;
    const width = clientRect?.width || 0;

    let position = pageX - left;
    position = position < 0 ? 0 : position;
    position = position > width ? width : position;

    const percent = (position * 100) / width;
    const time = +(percent * (max / 100)).toFixed(0);

    setSeekHoverPosition(position);
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

  const handleTrackHover = (
    clear: boolean,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const left = trackElement.current?.getBoundingClientRect().left || 0;
    const position = clear ? 0 : event.pageX - left;

    setSeekHoverPosition(position);
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
    window.addEventListener('mousemove', handleSeeking);
    window.addEventListener('mouseup', mouseSeekingHandler);
    window.addEventListener('touchmove', handleTouchSeeking);
    window.addEventListener('touchend', mobileTouchSeekingHandler);

    return () => {
      window.removeEventListener('mousemove', handleSeeking);
      window.removeEventListener('mouseup', mouseSeekingHandler);
      window.removeEventListener('touchmove', handleTouchSeeking);
      window.removeEventListener('touchend', mobileTouchSeekingHandler);
    };
  }, [max, offset, trackWidth]);

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
        {Boolean(timeCodes?.length) && (
          <TimeCodes
            currentTime={currentTime}
            max={max}
            bufferTime={bufferTime}
            seekHoverPosition={seekHoverPosition}
            timeCodes={timeCodes}
            mobileSeeking={mobileSeeking.current}
            trackWidth={trackWidth}
            label={label}
            setLabel={setLabel}
          />
        )}

        {!timeCodes && (
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

      <Thumb
        max={max}
        currentTime={currentTime}
        isThumbActive={isThumbActive}
      />
    </div>
  );
};
