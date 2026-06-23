import { useEffect, useState } from 'react'

const STORAGE_KEY = 'gastos-personales'

function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useExpenses() {
  const [expenses, setExpenses] = useState(loadExpenses)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expense) => {
    const newExpense = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...expense,
    }
    setExpenses((prev) => [newExpense, ...prev])
  }

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }

  const clearAll = () => {
    setExpenses([])
  }

  return { expenses, addExpense, deleteExpense, clearAll }
}
