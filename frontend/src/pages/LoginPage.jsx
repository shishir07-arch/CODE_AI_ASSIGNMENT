import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

const LoginPage = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginUser({ email: form.email, password: form.password });
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      onAuthSuccess(response.data.user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Sign in to Coding Tutor</h2>
      <form onSubmit={handleSubmit}>
        <input className="input-modern" type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <input className="input-modern" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        {error ? <div className="error-msg">{error}</div> : null}
        <button className="primary-btn" type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>
      </form>
      <p style={{ marginTop: '12px', color: 'var(--muted)' }}>No account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default LoginPage;
