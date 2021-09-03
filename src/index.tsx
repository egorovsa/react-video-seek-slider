import { useEffect, useMemo, useRef, useState } from "react";
import './ui-video-seek-slider.scss';

interface Time {
    hh: string;
    mm: string;
    ss: string;
}

interface Props {
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

export const VideoSeekSlider: React.FC<Props> = ({
    max = 100,
    currentTime = 0,
    progress = 0,
    hideHoverTime = false,
    offset = 0,
    secondsPrefix = '',
    minutesPrefix = '',
    onChange = () => undefined,
    limitTimeTooltipBySides = false
}) => {
    const [seekHoverPosition, setSeekHoverPosition] = useState(0);

    const seeking = useRef(false);
    const trackWidth = useRef(0);
    const mobileSeeking = useRef(false);
    const track = useRef<HTMLDivElement>(null);
    const hoverTime = useRef<HTMLDivElement>(null);

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
        }
    }, []);

    const hoverTimeValue = useMemo(() => {
        const percent: number = seekHoverPosition * 100 / trackWidth.current;
        const time: number = Math.floor(+(percent * (max / 100)));
        const times: Time = secondsToTime(time);

        if ((max + offset) < 60) {
            return secondsPrefix + (times.ss);
        } else if ((max + offset) < 3600) {
            return minutesPrefix + times.mm + ':' + times.ss;
        } else {
            return times.hh + ':' + times.mm + ':' + times.ss;
        }
    }, [seekHoverPosition, trackWidth])

    function handleTouchSeeking(event: TouchEvent): void {
        event.preventDefault();
        event.stopPropagation();

        let pageX: number = 0;

        for (let i = 0; i < event.changedTouches.length; i++) {
            pageX = event.changedTouches?.[i].pageX;
        }

        pageX = pageX < 0 ? 0 : pageX;

        if (mobileSeeking.current) {
            changeCurrentTimePosition(pageX);
        }
    };

    function handleSeeking(event: MouseEvent): void {
        if (seeking.current) {
            changeCurrentTimePosition(event.pageX);
        }
    };

    function changeCurrentTimePosition(pageX: number): void {
        let position = pageX - track.current!?.getBoundingClientRect().left;

        position = position < 0 ? 0 : position;
        position = position > trackWidth.current ? trackWidth.current : position;

        setSeekHoverPosition(position);

        const percent = position * 100 / trackWidth.current;
        const time = +(percent * (max / 100)).toFixed(0);

        onChange(time, (time + offset));
    }

    function setTrackWidthState(): void {
        if (track.current) {
            trackWidth.current = track.current.offsetWidth;
        }
    };

    function handleTrackHover(
        clear: boolean,
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void {
        let position = event.pageX - track.current!?.getBoundingClientRect().left;

        if (clear) {
            position = 0;
        }

        setSeekHoverPosition(position);
    };

    function getPositionStyle(time: number): { transform: string } {
        let position = time * 100 / max;

        return { transform: `scaleX(${position / 100})` };
    }

    function getThumbHandlerPosition(): { transform: string } {
        let position = trackWidth.current / (max / currentTime);

        return { transform: `translateX(${position}px)` };
    }

    function getSeekHoverPosition(): { transform: string } {
        let position: number = seekHoverPosition * 100 / trackWidth.current;

        return { transform: `scaleX(${position / 100})` }
    }

    function getHoverTimePosition(): { transform: string } {
        let position: number = 0;

        if (hoverTime.current) {
            position = seekHoverPosition - hoverTime.current.offsetWidth / 2;

            if (limitTimeTooltipBySides) {
                if (position < 0) {
                    position = 0;
                } else if (position + hoverTime.current.offsetWidth > trackWidth.current) {
                    position = trackWidth.current - hoverTime.current.offsetWidth;
                }
            }
        }

        return {
            transform: `translateX(${position}px)`
        }
    }

    function secondsToTime(seconds: number): Time {
        seconds = Math.round(seconds + offset);

        const hours: number = Math.floor(seconds / 3600);
        const divirsForMinutes: number = seconds % 3600;
        const minutes: number = Math.floor(divirsForMinutes / 60);
        const sec: number = Math.ceil(divirsForMinutes % 60);

        return {
            hh: hours.toString(),
            mm: minutes < 10 ? "0" + minutes : minutes.toString(),
            ss: sec < 10 ? "0" + sec : sec.toString()
        }
    }

    function mouseSeekingHandler(event: MouseEvent): void {
        setSeeking(false, event);
    };

    function setSeeking(
        state: boolean,
        event: MouseEvent
    ): void {
        event.preventDefault();

        handleSeeking(event);
        seeking.current = state;

        setSeekHoverPosition(state ? seekHoverPosition : 0)
    };

    function mobileTouchSeekingHandler(): void {
        setMobileSeeking(false);
    };

    function setMobileSeeking(state = true): void {
        mobileSeeking.current = state;
        setSeekHoverPosition(state ? seekHoverPosition : 0)
    };

    function isThumbActive(): boolean {
        return seekHoverPosition > 0 || seeking.current;
    }

    return (
        <div className="ui-video-seek-slider">
            <div
                className={isThumbActive() ? "track active" : "track"}
                ref={track}
                onMouseMove={(event) => handleTrackHover(false, event)}
                onMouseLeave={(event) => handleTrackHover(true, event)}
                onMouseDown={(event) => setSeeking(true, event as any)}
                onTouchStart={() => setMobileSeeking(true)}
            >
                <div className="main">
                    <div
                        className="buffered"
                        style={getPositionStyle(progress)}
                    />

                    <div
                        className="seek-hover"
                        style={getSeekHoverPosition()}
                    />

                    <div
                        className="connect"
                        style={getPositionStyle(currentTime)}
                    />
                </div>
            </div>

            {!hideHoverTime && (
                <div
                    className={isThumbActive() ? "hover-time active" : "hover-time"}
                    style={getHoverTimePosition()}
                    ref={hoverTime}
                >
                    {hoverTimeValue}
                </div>
            )}

            <div
                className={isThumbActive() ? "thumb active" : "thumb"}
                style={getThumbHandlerPosition()}
            >
                <div className="handler" />
            </div>
        </div>
    )
}
