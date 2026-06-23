const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function getToken() {
  return localStorage.getItem('auth_token')
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const token = getToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (response.status === 204) return null

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Ocurrió un error en la solicitud.')
  }

  return data
}

export const api = {
  register: (body) =>
    request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  login: (body) =>
    request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  me: () => request('/api/auth/me'),

  getExpenses: (params = {}) => {
    const query = new URLSearchParams()
    if (params.category && params.category !== 'all') query.set('category', params.category)
    if (params.search) query.set('search', params.search)
    const qs = query.toString()
    return request(`/api/expenses${qs ? `?${qs}` : ''}`)
  },

  getSummary: () => request('/api/expenses/summary'),

  createExpense: (body) =>
    request('/api/expenses', { method: 'POST', body: JSON.stringify(body) }),

  deleteExpense: (id) =>
    request(`/api/expenses/${id}`, { method: 'DELETE' }),

  deleteAllExpenses: () =>
    request('/api/expenses', { method: 'DELETE' }),
}

export { API_URL }
