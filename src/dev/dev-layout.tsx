import { useState } from 'react';
import {
  Header,
  VideoPlayer,
  ExampleTabs,
  ExampleDemo,
  CodeBlock,
  InstallSection,
  ApiTable,
  FeaturesGrid,
  Footer,
  usePreviewManager,
} from './components';

export const DevLayout: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [activeTab, setActiveTab] = useState('basic');

  const { handleGettingPreview } = usePreviewManager(maxTime);

  const handleTimeChange = (time: number, _offsetTime: number): void => {
    console.log('handleTimeChange', time, _offsetTime);
    setCurrentTime(time);
  };

  const handleMaxTimeChange = (maxTime: number): void => {
    setMaxTime(maxTime);
  };

  const handleProgressChange = (progress: number): void => {
    setProgress(progress);
  };

  return (
    <div className="dev-container">
      <Header />

      <main className="dev-main">
        <InstallSection />

        <section className="demo-section">
          <h2>Demo</h2>
          <VideoPlayer
            currentTime={currentTime}
            onTimeChange={handleTimeChange}
            onMaxTimeChange={handleMaxTimeChange}
            onProgressChange={handleProgressChange}
          />
        </section>

        <section className="examples-section">
          <h2>Usage Examples</h2>

          <ExampleTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="example-content">
            <ExampleDemo
              activeTab={activeTab}
              maxTime={maxTime}
              currentTime={currentTime}
              progress={progress}
              onTimeChange={handleTimeChange}
              onGettingPreview={handleGettingPreview}
            />

            <CodeBlock activeTab={activeTab} />
          </div>
        </section>

        <section className="api-section">
          <h2>API Reference</h2>
          <ApiTable />
        </section>

        <section className="features-section">
          <h2>Features</h2>
          <FeaturesGrid />
        </section>
      </main>

      <Footer />
    </div>
  );
};
