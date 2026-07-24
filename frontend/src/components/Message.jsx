import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const CodeBlock = ({ className, children }) => {
  const code = String(children).replace(/\n$/, '');
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div>
      <div className="code-toolbar">
        <button className="copy-btn" onClick={handleCopy}>Copy</button>
      </div>
      <pre className={className}><code>{code}</code></pre>
    </div>
  );
};

const Message = ({ message, isUser }) => {
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
      <div className={`bubble ${isUser ? 'user' : 'ai'}`}>
        <div className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={{
            code({node, inline, className, children, ...props}){
              if(inline) return <code {...props} style={{background:'rgba(255,255,255,0.02)',padding:'2px 6px',borderRadius:6}}>{children}</code>
              return <CodeBlock className={className}>{children}</CodeBlock>
            }
          }}>{message}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Message;
