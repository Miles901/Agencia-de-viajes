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
