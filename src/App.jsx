import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import useGoogleSheet from './hooks/useGoogleSheet'
import Stage from './components/Stage'
import TableRows from './components/TableRows'
import GuestModal from './components/GuestModal'
import Legend from './components/Legend'

export default function App() {
  const { tables, loading } = useGoogleSheet()
  const [activeTable, setActiveTable] = useState(null)

  const handleTableClick = useCallback((table) => {
    setActiveTable(table)
  }, [])

  const handleClose = useCallback(() => {
    setActiveTable(null)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="header__ornament">✦</div>
        <h1 className="header__title">Bordkart</h1>
        <p className="header__subtitle">Finn din plass</p>
        <div className="header__divider" />
      </header>

      {loading ? (
        <div className="loading">
          <div className="loading__spinner" />
          <p className="loading__text">Laster bordkart...</p>
        </div>
      ) : (
        <div className="hall">
          <Stage />
          <TableRows tables={tables} activeTableId={activeTable?.id} onTableClick={handleTableClick} />
        </div>
      )}

      <Legend />

      <footer className="footer">
        <p className="footer__text">Mahmoud & Raneem</p>
      </footer>

      <AnimatePresence>
        {activeTable && (
          <GuestModal table={activeTable} onClose={handleClose} />
        )}
      </AnimatePresence>
    </div>
  )
}
