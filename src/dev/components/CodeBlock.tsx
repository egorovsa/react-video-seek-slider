import { codeExamples } from './CodeExamples';

interface CodeBlockProps {
  activeTab: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ activeTab }) => {
  const handleCopy = () => {
    const code = codeExamples[activeTab as keyof typeof codeExamples];
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="example-code">
      <div className="code-header">
        <span>Example Code</span>
        <button 
          className="copy-btn"
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
      <pre className="code-block">
        <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
      </pre>
    </div>
  );
}; 