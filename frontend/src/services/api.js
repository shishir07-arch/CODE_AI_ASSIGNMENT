const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const request = async (path, options = {}) => {
  const token = sessionStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload;
};

export const loginUser = (payload) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) });
export const registerUser = (payload) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) });
export const askTutor = (payload) => request('/api/tutor/ask', { method: 'POST', body: JSON.stringify(payload) });
