export const HEATMAP_WIDTH = 1000;
export const HEATMAP_HEIGHT = 100;

const round = (value: number): number => Math.round(value * 100) / 100;

/**
 * Builds a closed SVG path for evenly spaced values over the whole track.
 * Values are normalized by the maximum, so raw view counts work as well.
 * Neighbouring points are joined with horizontal-tangent cubic curves,
 * which keeps the line smooth without overshooting.
 */
export function getHeatmapPath(values: number[]): string {
  const safeValues = values.map((value) =>
    Number.isFinite(value) && value > 0 ? value : 0
  );
  const maxValue = safeValues.reduce((max, value) => Math.max(max, value), 0);

  if (!safeValues.length || maxValue <= 0) {
    return '';
  }

  const step = HEATMAP_WIDTH / safeValues.length;
  const points = safeValues.map((value, index) => [
    round((index + 0.5) * step),
    round(HEATMAP_HEIGHT - (value / maxValue) * HEATMAP_HEIGHT),
  ]);

  const [firstX, firstY] = points[0];
  const lastY = points[points.length - 1][1];
  let path = `M0 ${HEATMAP_HEIGHT}L0 ${firstY}L${firstX} ${firstY}`;

  for (let i = 1; i < points.length; i++) {
    const [prevX, prevY] = points[i - 1];
    const [x, y] = points[i];
    const middleX = round((prevX + x) / 2);

    path += `C${middleX} ${prevY} ${middleX} ${y} ${x} ${y}`;
  }

  return `${path}L${HEATMAP_WIDTH} ${lastY}L${HEATMAP_WIDTH} ${HEATMAP_HEIGHT}Z`;
}
