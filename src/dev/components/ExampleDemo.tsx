import { VideoSeekSlider } from '../../index';

const THUMBNAILS_URL = `${import.meta.env.BASE_URL}thumbnails/thumbnails.vtt`;

/** Sample watch intensity: a few smooth peaks over a flat base. */
const SAMPLE_HEATMAP = Array.from({ length: 100 }, (_, index) => {
  const peak = (center: number, width: number, height: number): number =>
    height * Math.exp(-((index - center) ** 2) / (2 * width ** 2));

  return (
    0.15 +
    peak(4, 3, 0.9) +
    peak(38, 6, 0.6) +
    peak(62, 2, 1) +
    peak(88, 5, 0.5)
  );
});

interface ExampleDemoProps {
  activeTab: string;
  maxTime: number;
  currentTime: number;
  progress: number;
  onTimeChange: (time: number, offsetTime: number) => void;
  onGettingPreview: (hoverTime: number) => string;
}

export const ExampleDemo: React.FC<ExampleDemoProps> = ({
  activeTab,
  maxTime,
  currentTime,
  progress,
  onTimeChange,
  onGettingPreview,
}) => {
  const timeCodes = [
    { fromMs: 0, description: 'Introduction' },
    { fromMs: 130000, description: 'Main Content' },
    { fromMs: 270000, description: 'Story Development' },
    { fromMs: 440000, description: 'Climax' },
    { fromMs: 600000, description: 'Finale' },
  ];

  const timeCodesAdvanced = [
    { fromMs: 0, description: 'Beginning' },
    { fromMs: 130000, description: 'Development' },
    { fromMs: 270000, description: 'Climax' },
    { fromMs: 440000, description: 'Resolution' },
  ];

  const commonProps = {
    max: maxTime,
    currentTime,
    bufferTime: progress,
    onChange: onTimeChange,
    limitTimeTooltipBySides: true,
    secondsPrefix: '00:',
    minutesPrefix: '0:',
  };

  return (
    <div className="example-demo">
      {activeTab === 'basic' && <VideoSeekSlider {...commonProps} />}

      {activeTab === 'withTimeCodes' && (
        <VideoSeekSlider
          {...commonProps}
          timeCodes={timeCodes}
        />
      )}

      {activeTab === 'withPreview' && (
        <VideoSeekSlider
          {...commonProps}
          getPreviewScreenUrl={onGettingPreview}
        />
      )}

      {activeTab === 'withThumbnails' && (
        <VideoSeekSlider
          {...commonProps}
          previewThumbnails={THUMBNAILS_URL}
        />
      )}

      {activeTab === 'withHeatmap' && (
        <VideoSeekSlider
          {...commonProps}
          heatmap={SAMPLE_HEATMAP}
        />
      )}

      {activeTab === 'advanced' && (
        <VideoSeekSlider
          {...commonProps}
          previewThumbnails={THUMBNAILS_URL}
          heatmap={SAMPLE_HEATMAP}
          timeCodes={timeCodesAdvanced}
        />
      )}
    </div>
  );
};
