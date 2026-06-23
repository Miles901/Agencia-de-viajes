import { useMemo } from 'react'
import { CATEGORIES } from '../constants/categories'
import { formatCurrency } from '../utils/format'

export default function ExpenseSummary({ expenses, summary }) {
  const stats = useMemo(() => {
    if (summary) {
      const byCategory = summary.byCategory.map((item) => {
        const cat = CATEGORIES.find((c) => c.id === item.category) ?? CATEGORIES[CATEGORIES.length - 1]
        return { ...cat, total: item.total }
      })
      const topCategory = byCategory.length
        ? byCategory.reduce((a, b) => (a.total >= b.total ? a : b))
        : null

      return {
        total: summary.total,
        monthTotal: summary.monthTotal,
        byCategory,
        topCategory,
        count: summary.count,
      }
    }

    const total = expenses.reduce((sum, e) => sum + e.amount, 0)
    const now = new Date()
    const monthTotal = expenses
      .filter((e) => {
        const d = new Date(e.date)
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      })
      .reduce((sum, e) => sum + e.amount, 0)

    const byCategory = CATEGORIES.map((cat) => ({
      ...cat,
      total: expenses
        .filter((e) => e.category === cat.id)
        .reduce((sum, e) => sum + e.amount, 0),
    })).filter((c) => c.total > 0)

    const topCategory = byCategory.length
      ? byCategory.reduce((a, b) => (a.total >= b.total ? a : b))
      : null

    return { total, monthTotal, byCategory, topCategory, count: expenses.length }
  }, [expenses, summary])

  return (
    <section className="summary-grid">
      <article className="stat-card stat-total">
        <span className="stat-label">Total registrado</span>
        <strong className="stat-value">{formatCurrency(stats.total)}</strong>
        <span className="stat-meta">{stats.count} gastos</span>
      </article>

      <article className="stat-card stat-month">
        <span className="stat-label">Este mes</span>
        <strong className="stat-value">{formatCurrency(stats.monthTotal)}</strong>
        <span className="stat-meta">
          {new Intl.DateTimeFormat('es-DO', { month: 'long', year: 'numeric' }).format(new Date())}
        </span>
      </article>

      {stats.topCategory && (
        <article className="stat-card stat-top">
          <span className="stat-label">Mayor categoría</span>
          <strong className="stat-value stat-value-sm">
            {stats.topCategory.icon} {stats.topCategory.label}
          </strong>
          <span className="stat-meta">{formatCurrency(stats.topCategory.total)}</span>
        </article>
      )}

      {stats.byCategory.length > 0 && (
        <article className="card breakdown-card">
          <h3>Por categoría</h3>
          <ul className="breakdown-list">
            {stats.byCategory.map((cat) => {
              const pct = stats.total > 0 ? (cat.total / stats.total) * 100 : 0
              return (
                <li key={cat.id} className="breakdown-item">
                  <div className="breakdown-header">
                    <span>{cat.icon} {cat.label}</span>
                    <span>{formatCurrency(cat.total)}</span>
                  </div>
                  <div className="breakdown-bar">
                    <div
                      className="breakdown-fill"
                      style={{ width: `${pct}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </article>
      )}
    </section>
  )
}
