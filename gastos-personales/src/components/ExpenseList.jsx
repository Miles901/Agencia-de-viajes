import { useMemo, useState } from 'react'
import { CATEGORIES, getCategory } from '../constants/categories'
import { formatCurrency, formatDate } from '../utils/format'

export default function ExpenseList({ expenses, onDelete, onClearAll }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchesCategory = filter === 'all' || e.category === filter
      const matchesSearch =
        !search.trim() ||
        e.description.toLowerCase().includes(search.trim().toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [expenses, filter, search])

  if (expenses.length === 0) {
    return (
      <section className="card list-card empty-state">
        <div className="empty-icon">💸</div>
        <h3>Sin gastos todavía</h3>
        <p>Registra tu primer gasto con el formulario de arriba.</p>
      </section>
    )
  }

  return (
    <section className="card list-card">
      <div className="list-header">
        <h2>Historial</h2>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => {
            if (window.confirm('¿Borrar todos los gastos? Esta acción no se puede deshacer.')) {
              onClearAll()
            }
          }}
        >
          Borrar todo
        </button>
      </div>

      <div className="list-filters">
        <input
          type="search"
          placeholder="Buscar por descripción..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="filter-chips">
          <button
            type="button"
            className={`chip ${filter === 'all' ? 'chip-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`chip ${filter === cat.id ? 'chip-active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="no-results">No hay gastos que coincidan con tu búsqueda.</p>
      ) : (
        <ul className="expense-list">
          {filtered.map((expense) => {
            const cat = getCategory(expense.category)
            return (
              <li key={expense.id} className="expense-item">
                <div
                  className="expense-icon"
                  style={{ backgroundColor: `${cat.color}22`, color: cat.color }}
                  aria-hidden
                >
                  {cat.icon}
                </div>
                <div className="expense-info">
                  <span className="expense-desc">{expense.description}</span>
                  <span className="expense-meta">
                    {cat.label} · {formatDate(expense.date)}
                  </span>
                </div>
                <div className="expense-actions">
                  <span className="expense-amount">{formatCurrency(expense.amount)}</span>
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => onDelete(expense.id)}
                    aria-label={`Eliminar ${expense.description}`}
                    title="Eliminar"
                  >
                    ✕
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
