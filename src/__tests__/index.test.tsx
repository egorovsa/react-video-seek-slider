import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { VideoSeekSlider, Props } from '..';

const getWrapper = (overrides: Partial<Props> = {}): any => (
  <VideoSeekSlider
    max={1000}
    currentTime={500}
    progress={600}
    onChange={(time: number, offsetTime: number) => {
      // setCurrentTime(time);

      // eslint-disable-next-line no-console
      console.log({ time, offsetTime });
    }}
    offset={0}
    limitTimeTooltipBySides={true}
    secondsPrefix="00:00:"
    minutesPrefix="00:"
    {...overrides}
  />
);

describe('VideoSeekSlider.tsx', () => {
  it('should render without errors', () => {
    const instance = create(getWrapper());

    expect(instance.toJSON()).toMatchSnapshot();

    render(getWrapper());
  });
});
