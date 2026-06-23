export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000'

export const CATEGORIES = [
  { id: 'comida', label: 'Comida', icon: '🍽️', color: '#f97316' },
  { id: 'transporte', label: 'Transporte', icon: '🚌', color: '#3b82f6' },
  { id: 'hogar', label: 'Hogar', icon: '🏠', color: '#8b5cf6' },
  { id: 'ocio', label: 'Ocio', icon: '🎬', color: '#ec4899' },
  { id: 'salud', label: 'Salud', icon: '💊', color: '#10b981' },
  { id: 'otros', label: 'Otros', icon: '📦', color: '#6b7280' },
]

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1]
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('es-DO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}
