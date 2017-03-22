/// <reference types="react" />
import * as React from 'react';
export interface Props {
    max: number;
    currentTime: number;
    progress?: number;
    onChange: (time: number) => void;
    hideHoverTime?: boolean;
}
export interface State {
    ready: boolean;
    trackWidth: number;
    seekHoverPosition: number;
    seeking: boolean;
    mobileSeeking: boolean;
}
export declare class VideoSeekSlider extends React.Component<Props, State> {
    state: State;
    static defaultProps: Props;
    private track;
    private hoverTime;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handleTouchSeeking;
    private handleSeeking;
    private changeCurrentTimePosition(pageX);
    private setTrackWidthState;
    private handleTrackHover;
    private getPositionStyle(time);
    private getThumbHandlerPosition();
    private getSeekHoverPosition();
    private getHoverTimePosition();
    private secondsToTime(seconds);
    private getHoverTime();
    private setSeeking;
    private setMobileSeeking;
    private isThumbActive();
    private drawHoverTime();
    render(): JSX.Element;
}
