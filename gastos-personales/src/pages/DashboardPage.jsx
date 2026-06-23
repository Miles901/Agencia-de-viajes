import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import ExpenseSummary from '../components/ExpenseSummary'
import { useAuth } from '../context/AuthContext'
import { useExpenses } from '../hooks/useExpenses'
import '../App.css'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { expenses, summary, loading, error, addExpense, deleteExpense, clearAll } = useExpenses()

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <p className="eyebrow">Finanzas personales · RD$</p>
          <h1>Mis Gastos</h1>
          <p className="subtitle">
            Hola, {user?.fullName}. Registra y controla tus gastos en pesos dominicanos.
          </p>
        </div>
        <button type="button" className="btn btn-ghost btn-sm logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      <main className="app-main">
        {loading && <p className="loading-msg">Cargando gastos...</p>}
        {error && <p className="form-error" role="alert">{error}</p>}

        {!loading && (
          <>
            <ExpenseSummary expenses={expenses} summary={summary} />
            <ExpenseForm onAdd={addExpense} />
            <ExpenseList
              expenses={expenses}
              onDelete={deleteExpense}
              onClearAll={clearAll}
            />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Sincronizado con SQL Server · Web y móvil</p>
      </footer>
    </div>
  )
}
