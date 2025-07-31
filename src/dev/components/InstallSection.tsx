export const InstallSection: React.FC = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText('npm install react-video-seek-slider');
  };

  return (
    <section className="examples-section">
      <h2>How to install</h2>
      
      <div className="example-code" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="code-header">
          <span>Installation Command</span>
          <button 
            className="copy-btn"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>
        <pre className="code-block">
          <code>npm install react-video-seek-slider</code>
        </pre>
      </div>
    </section>
  );
}; 