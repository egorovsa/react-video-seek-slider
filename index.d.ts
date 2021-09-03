/// <reference types="react" />
import './ui-video-seek-slider.scss';
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
export declare const VideoSeekSlider: React.FC<Props>;
export {};
