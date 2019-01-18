import * as React from 'react';
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
interface State {
    ready: boolean;
    trackWidth: number;
    seekHoverPosition: number;
}
export declare class VideoSeekSlider extends React.Component<Props, State> {
    state: State;
    static defaultProps: Props;
    private seeking;
    private mobileSeeking;
    private track;
    private hoverTime;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handleTouchSeeking;
    private handleSeeking;
    private changeCurrentTimePosition;
    private setTrackWidthState;
    private handleTrackHover;
    private getPositionStyle;
    private getThumbHandlerPosition;
    private getSeekHoverPosition;
    private getHoverTimePosition;
    private secondsToTime;
    private getHoverTime;
    private mouseSeekingHandler;
    private setSeeking;
    private mobileTouchSeekingHandler;
    private setMobileSeeking;
    private isThumbActive;
    private drawHoverTime;
    render(): JSX.Element;
}
export {};
