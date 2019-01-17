import * as React from 'react';
import { VideoSeekSlider } from "./index";

export interface State {
    currentTime: number,
    progress: number,
    test: boolean
}

export class AppComponent extends React.Component<any, State> {
    state: State = {
        currentTime: 10,
        progress: 0,
        test: false
    };

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentTime: this.state.currentTime < 11150 ? this.state.currentTime + 10 : 0,
            })
        }, 100);
        setInterval(() => {
            this.setState({
                progress: this.state.progress < 11150 ? this.state.progress + 3000 : 0,
            })
        }, 1000);
    }

    private getSlider() {
        if (!this.state.test) {
            return <VideoSeekSlider
                max={11150}
                currentTime={this.state.currentTime}
                progress={this.state.progress}
                onChange={(time: number, offsetTime: number) => {
                    this.setState({
                        currentTime: time // or offsetTime
                    } as State);
                }}
                offset={0}
                limitTimeTooltipBySides={true}
                secondsPrefix="00:00:"
                minutesPrefix="00:"
            />;
        }
    }

    public render() {
        return (
            <div className="container">
                <h1>React Video slider</h1>

                {this.getSlider()}
            </div>
        );
    }
}
