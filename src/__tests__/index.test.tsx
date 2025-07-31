import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VideoSeekSlider, Props } from '..';

const getWrapper = (overrides: Partial<Props> = {}): any => (
  <VideoSeekSlider
    max={1000}
    currentTime={500}
    bufferTime={600}
    onChange={(time: number, offsetTime: number) => {
      console.log({ time, offsetTime });
    }}
    offset={0}
    limitTimeTooltipBySides={true}
    secondsPrefix="00:00:"
    minutesPrefix="00:"
    {...overrides}
  />
);

// FIXME: This mock does not work correctly, It mock offsetWidth to elements
// with className "track" but at the same time it
// brakes the normal useRef begaviour

// jest.mock('react', () => ({
//   ...jest.requireActual<typeof React>('react'),
//   useRef: (initial: any) => {
//     const ref = { current: initial };

//     Object.defineProperty(ref, 'current', {
//       set(_current: any) {
//         if (_current && typeof _current === 'object') {
//           if (_current.className === 'track') {
//             jest.spyOn(
//                _current, 'offsetWidth', 'get'
//              ).mockReturnValueOnce(100);
//           }
//         }

//         this._current = _current;
//       },
//       get() {
//         return this._current;
//       },
//     });

//     return ref;
//   },
// }));

describe('VideoSeekSlider.tsx', () => {
  it('should render without errors', () => {
    render(getWrapper());
  });

  it('should render without hover time ', () => {
    render(getWrapper({ hideThumbTooltip: true }));
    expect(screen.queryByTestId('hover-time')).not.toBeInTheDocument();
  });

  it('should show hover-time by default', () => {
    render(getWrapper());
    expect(screen.getByTestId('hover-time')).toBeInTheDocument();
  });
});
