import { useState } from 'react'
import { CATEGORIES } from '../constants/categories'
import { todayISO } from '../utils/format'

const initialForm = {
  description: '',
  amount: '',
  category: 'comida',
  date: todayISO(),
}

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const description = form.description.trim()
    const amount = parseFloat(form.amount)

    if (!description) {
      setError('Escribe una descripción para el gasto.')
      return
    }

    if (!amount || amount <= 0) {
      setError('El importe debe ser mayor que cero.')
      return
    }

    onAdd({
      description,
      amount,
      category: form.category,
      date: form.date,
    })

    setForm({ ...initialForm, date: todayISO() })
    setError('')
  }

  return (
    <section className="card form-card">
      <h2>Nuevo gasto</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <label htmlFor="description">Descripción</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Ej. Supermercado, gasolina..."
            value={form.description}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="form-grid">
          <div className="form-row">
            <label htmlFor="amount">Importe (RD$)</label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="date">Fecha</label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button type="submit" className="btn btn-primary">
          Registrar gasto
        </button>
      </form>
    </section>
  )
}
