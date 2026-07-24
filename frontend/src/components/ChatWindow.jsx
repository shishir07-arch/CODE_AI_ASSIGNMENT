import { useState } from 'react';
import Message from './Message';
import { askTutor } from '../services/api';

const EXAMPLES = [
  'Explain the difference between let and const in JavaScript',
  'How to optimize a slow SQL query?',
  'Show an example of a binary search in Python'
];

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event?.preventDefault?.();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input.trim(), isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await askTutor({ question: userMessage.text });
      const answer = response?.data?.answer || 'No answer returned.';
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: answer, isUser: false }]);
    } catch (err) {
      setError(err.message || 'Unable to reach tutor service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="chat-panel">
        <div className="chat-header">
          <div className="chat-title">AI Tutor</div>
          <div className="chat-sub">Hello {user?.name || 'there'} — ask anything about coding.</div>
        </div>

        <div className="messages" role="log">
          {messages.length === 0 && !loading ? (
            <div className="empty-state">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#eef2ff"/><path d="M7 8h10M7 12h6" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div style={{fontSize:18,fontWeight:700,color:'#0f172a'}}>Welcome to Coding Tutor</div>
              <div style={{maxWidth:560,textAlign:'center',color:'#475569'}}>Ask coding questions, request examples, or paste snippets for explanation.</div>
              <div className="example-prompts">
                {EXAMPLES.map((ex) => (
                  <button type="button" key={ex} className="example-chip" onClick={() => { setInput(ex); }}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((message) => (
            <Message key={message.id} message={message.text} isUser={message.isUser} />
          ))}

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div className="bubble ai">
                <div className="typing-dots"><span></span><span></span><span></span></div>
              </div>
            </div>
          ) : null}
        </div>

        {error ? <div style={{ padding: '0 18px 18px', color: '#ff7b7b' }}>{error}</div> : null}

        <form onSubmit={handleSubmit} className="input-row">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about algorithms, debugging, or syntax"
            className="input"
          />
          <button type="submit" className="send-btn">{loading ? 'Sending…' : 'Send'}</button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
