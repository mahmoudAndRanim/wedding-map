import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import tables from './data/tables'
import Stage from './components/Stage'
import TableRows from './components/TableRows'
import GuestModal from './components/GuestModal'
import Legend from './components/Legend'

export default function App() {
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

      <div className="hall">
        <Stage />
        <TableRows tables={tables} activeTableId={activeTable?.id} onTableClick={handleTableClick} />
      </div>

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
