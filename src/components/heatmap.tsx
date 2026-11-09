import { useMemo } from 'react';
import {
  getHeatmapPath,
  HEATMAP_HEIGHT,
  HEATMAP_WIDTH,
} from '../utils/getHeatmapPath';

interface Props {
  values: number[];
  isActive: boolean;
}

export const Heatmap: React.FC<Props> = ({ values, isActive }) => {
  const path = useMemo(() => getHeatmapPath(values), [values]);

  if (!path) {
    return null;
  }

  return (
    <svg
      className={isActive ? 'heatmap active' : 'heatmap'}
      viewBox={`0 0 ${HEATMAP_WIDTH} ${HEATMAP_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      data-testid="heatmap"
    >
      <path d={path} />
    </svg>
  );
};
