import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

/** jsdom has no PointerEvent: emulate it on top of MouseEvent so clientX/button survive. */
if (typeof window.PointerEvent === 'undefined') {
  class PointerEventPolyfill extends MouseEvent {
    pointerId: number;
    pointerType: string;

    constructor(
      type: string,
      init: ConstructorParameters<typeof MouseEvent>[1] & {
        pointerId?: number;
        pointerType?: string;
      } = {}
    ) {
      super(type, init);
      this.pointerId = init.pointerId ?? 1;
      this.pointerType = init.pointerType ?? 'mouse';
    }
  }

  window.PointerEvent = PointerEventPolyfill as unknown as typeof PointerEvent;
}

// Cleanup after each test
afterEach(() => {
  cleanup();
});
