import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseSummary from './components/ExpenseSummary'
import { useExpenses } from './hooks/useExpenses'
import './App.css'

export default function App() {
  const { expenses, addExpense, deleteExpense, clearAll } = useExpenses()

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <p className="eyebrow">Finanzas personales</p>
          <h1>Mis Gastos</h1>
          <p className="subtitle">
            Registra, organiza y visualiza tus gastos del día a día.
          </p>
        </div>
      </header>

      <main className="app-main">
        <ExpenseSummary expenses={expenses} />
        <ExpenseForm onAdd={addExpense} />
        <ExpenseList
          expenses={expenses}
          onDelete={deleteExpense}
          onClearAll={clearAll}
        />
      </main>

      <footer className="app-footer">
        <p>Los datos se guardan automáticamente en tu navegador.</p>
      </footer>
    </div>
  )
}
