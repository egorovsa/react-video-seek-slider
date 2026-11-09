interface Props {
  max: number;
  currentTime: number;
}

const THUMB_OFFSET_PX = -6;

export const Thumb: React.FC<Props> = ({ max, currentTime }) => {
  const leftPosition = max ? (currentTime / max) * 100 : 0;

  return (
    <div
      className="thumb active"
      data-testid="testThumb"
      style={{ left: `calc(${leftPosition}% + ${THUMB_OFFSET_PX}px)` }}
    >
      <div className="handler" />
    </div>
  );
};
