export function getHoverTimePosition(
  seekHoverPosition: number,
  hoverTimeElement: HTMLDivElement | null,
  trackWidth: number,
  limitTimeTooltipBySides: boolean
): { transform: string } {
  let position = 0;

  if (hoverTimeElement) {
    position = seekHoverPosition - hoverTimeElement.offsetWidth / 2;

    if (limitTimeTooltipBySides) {
      if (position < 0) {
        position = 0;
      } else if (position + hoverTimeElement.offsetWidth > trackWidth) {
        position = trackWidth - hoverTimeElement.offsetWidth;
      }
    }
  }

  return { transform: `translateX(${position}px)` };
}
