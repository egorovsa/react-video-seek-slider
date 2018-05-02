import * as React from 'react';
import {VideoSeekSlider} from "./index";

export interface State {
	currentTime: number,
	test: boolean
}

export class AppComponent extends React.Component<any, State> {
	state: State = {
		currentTime: 110,
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
				max={11150}
				currentTime={this.state.currentTime}
				progress={4000}
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