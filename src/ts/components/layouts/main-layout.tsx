import * as React from 'react';
import {VideoSeekSlider} from "../ui/VideoSeekSlider";

export interface Props {

}

export interface State {
	currentTime: number
}

export class AppComponent extends React.Component<Props, State> {
	state: State = {
		currentTime: 0
	};

	//static defaultProps: Props = {} as Props;

	public render() {
		return (
			<div>
				<div className="container">
					<VideoSeekSlider
						max={1152}
						currentTime={this.state.currentTime}
						progress={400}
						onChange={(time: number, offsetTime: number) => {
							this.setState({
								currentTime: time // or offsetTime
							} as State);
						}}
						offset={0}
						secondsPrefix="00:00:"
						minutesPrefix="00:"
					/>
				</div>
			</div>
		);
	}
}