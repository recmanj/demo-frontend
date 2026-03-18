const BASE = window._env_?.BACKEND_URL ?? '';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`${res.status}`);
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  listNotes: () => request('/api/notes'),
  getNote: (id) => request(`/api/notes/${id}`),
  createNote: (data) => request('/api/notes', { method: 'POST', body: JSON.stringify(data) }),
  updateNote: (id, data) => request(`/api/notes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteNote: (id) => request(`/api/notes/${id}`, { method: 'DELETE' }),
  seed: () => request('/api/seed', { method: 'POST' }),
};
