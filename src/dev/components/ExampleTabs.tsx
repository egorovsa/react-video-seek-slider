interface ExampleTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ExampleTabs: React.FC<ExampleTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      <button 
        className={`tab ${activeTab === 'basic' ? 'active' : ''}`}
        onClick={() => onTabChange('basic')}
      >
        Basic
      </button>
      <button 
        className={`tab ${activeTab === 'withTimeCodes' ? 'active' : ''}`}
        onClick={() => onTabChange('withTimeCodes')}
      >
        With Time Codes
      </button>
      <button 
        className={`tab ${activeTab === 'withPreview' ? 'active' : ''}`}
        onClick={() => onTabChange('withPreview')}
      >
        With Preview
      </button>
      <button 
        className={`tab ${activeTab === 'advanced' ? 'active' : ''}`}
        onClick={() => onTabChange('advanced')}
      >
        Advanced
      </button>
    </div>
  );
}; 