interface Props {
  max: number;
  currentTime: number;
  isThumbActive: boolean;
}

export const Thumb: React.FC<Props> = ({ max, currentTime, isThumbActive }) => {
  const getThumbHandlerPosition = (): { left: string } => {
    const thumbConstantOffset = -6;
    const leftPosition = (currentTime / max) * 100;

    return {
      left: `calc(${leftPosition}% + ${thumbConstantOffset}px)`,
    };
  };

  return (
    <div
      className={isThumbActive ? 'thumb active' : 'thumb active'}
      data-testid="testThumb"
      style={getThumbHandlerPosition()}
    >
      <div className="handler" />
    </div>
  );
};
