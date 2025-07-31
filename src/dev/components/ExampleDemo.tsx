import { VideoSeekSlider } from '../../index';

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

      {activeTab === 'advanced' && (
        <VideoSeekSlider
          {...commonProps}
          getPreviewScreenUrl={onGettingPreview}
          timeCodes={timeCodesAdvanced}
        />
      )}
    </div>
  );
};
