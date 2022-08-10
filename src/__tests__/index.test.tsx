/* eslint-disable no-underscore-dangle */
import { render, screen, cleanup } from '@testing-library/react';
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

// jest.mock('react', () => ({
//   ...jest.requireActual<typeof React>('react'),
//   useRef: (initial: any) => {
//     // const ref = { current: null };

//     // Object.defineProperty(ref, 'current', {
//     //   set(_current: any) {

//     //     console.log({ _current });

//     //     if (_current && typeof _current === 'object') {
//     //       if (_current.className === 'track') {
//     //         jest.spyOn(_current, 'offsetWidth', 'get').mockReturnValueOnce(100);
//     //       }
//     //     }

//     //     this._current = _current;
//     //   },
//     //   get() {
//     //     return this._current;
//     //   },
//     // });

//     return ref;
//   },
// }));

describe('VideoSeekSlider.tsx', () => {
  it('should render without errors', () => {
    render(getWrapper());
  });

  it('should render without errors', () => {
    render(
      getWrapper({
        hideHoverTime: true,
      })
    );
  });

  it('should show hover-time by default', () => {
    cleanup();
    render(getWrapper({ hideHoverTime: false }));
    expect(screen.getByTestId('hover-time')).toBeInTheDocument();
  });

  it('should hide hover-time if hideHoverTime is true', () => {
    cleanup();
    render(getWrapper({ hideHoverTime: true }));
    const hoverTimeElement = screen.queryByTestId('hover-time');
    expect(hoverTimeElement).not.toBeInTheDocument();
  });

  it('should hide hover-time if hideHoverTime is true', () => {
    cleanup();
    render(getWrapper());
  });
});
