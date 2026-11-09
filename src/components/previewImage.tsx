import { PreviewThumbnail } from '../utils/parseThumbnailsVtt';
import { cssUrl } from '../utils/cssUrl';

/** Keep in sync with `.preview-screen` width in the styles. */
const PREVIEW_WIDTH = 160;

interface Props {
  thumbnail: PreviewThumbnail;
}

export const PreviewImage: React.FC<Props> = ({ thumbnail }) => {
  const { url, x = 0, y = 0, width, height } = thumbnail;

  if (!width || !height) {
    return (
      <div
        className="preview-screen"
        style={{ backgroundImage: cssUrl(url) }}
        data-testid="preview-screen"
      />
    );
  }

  const scale = PREVIEW_WIDTH / width;

  return (
    <div
      className="preview-screen sprite"
      style={{ height: Math.round(height * scale) }}
      data-testid="preview-screen"
    >
      <div
        className="preview-sprite"
        style={{
          width,
          height,
          backgroundImage: cssUrl(url),
          backgroundPosition: `${-x}px ${-y}px`,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
};
