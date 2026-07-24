import React from 'react';
import ReactMarkdown from 'react-markdown';

const CodeBlock = ({ children }) => {
  const code = String(children ?? '').replace(/\n$/, '');

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
        <button className="copy-btn" onClick={handleCopy}>
          Copy
        </button>
      </div>

      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const Message = ({ message, isUser }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '12px',
      }}
    >
      <div className={`bubble ${isUser ? 'user' : 'ai'}`}>
        <div className="markdown">
          {isUser ? (
            message
          ) : (
            <ReactMarkdown
              components={{
                code({ inline, children, ...props }) {
                  if (inline) {
                    return (
                      <code
                        {...props}
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          padding: '2px 6px',
                          borderRadius: 6,
                        }}
                      >
                        {children}
                      </code>
                    );
                  }

                  return <CodeBlock>{children}</CodeBlock>;
                },
              }}
            >
              {message || ''}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;