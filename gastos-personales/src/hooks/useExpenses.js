import { useCallback, useEffect, useState } from 'react'
import { api } from '../services/api'

export function useExpenses() {
  const [expenses, setExpenses] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [list, stats] = await Promise.all([
        api.getExpenses(),
        api.getSummary(),
      ])
      setExpenses(list)
      setSummary(stats)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const [list, stats] = await Promise.all([
          api.getExpenses(),
          api.getSummary(),
        ])
        if (!active) return
        setExpenses(list)
        setSummary(stats)
      } catch (err) {
        if (!active) return
        setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [])

  const addExpense = async (expense) => {
    await api.createExpense(expense)
    await refresh()
  }

  const deleteExpense = async (id) => {
    await api.deleteExpense(id)
    await refresh()
  }

  const clearAll = async () => {
    await api.deleteAllExpenses()
    await refresh()
  }

  return { expenses, summary, loading, error, addExpense, deleteExpense, clearAll, refresh }
}
