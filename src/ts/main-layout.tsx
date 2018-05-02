import * as React from 'react';
import {VideoSeekSlider} from "./index";

export interface State {
	currentTime: number,
	test: boolean
}

export class AppComponent extends React.Component<any, State> {
	state: State = {
		currentTime: 0,
		test: false
	};

	componentDidMount() {
		// setTimeout(() => {
		// 	this.setState({
		// 		test: true
		// 	});
		// }, 4000);
	}

	private getSlider() {
		if (!this.state.test) {
			return <VideoSeekSlider
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