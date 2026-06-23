import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from './constants'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

async function getToken() {
  return AsyncStorage.getItem(TOKEN_KEY)
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const token = await getToken()
  if (token) headers.Authorization = `Bearer ${token}`

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

  getExpenses: () => request('/api/expenses'),

  getSummary: () => request('/api/expenses/summary'),

  createExpense: (body) =>
    request('/api/expenses', { method: 'POST', body: JSON.stringify(body) }),

  deleteExpense: (id) =>
    request(`/api/expenses/${id}`, { method: 'DELETE' }),

  deleteAllExpenses: () =>
    request('/api/expenses', { method: 'DELETE' }),
}

export async function saveSession(auth) {
  await AsyncStorage.multiSet([
    [TOKEN_KEY, auth.token],
    [USER_KEY, JSON.stringify(auth.user)],
  ])
}

export async function clearSession() {
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY])
}

export async function loadStoredUser() {
  const user = await AsyncStorage.getItem(USER_KEY)
  const token = await AsyncStorage.getItem(TOKEN_KEY)
  if (!user || !token) return null
  return JSON.parse(user)
}
