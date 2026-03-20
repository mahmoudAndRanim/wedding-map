import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function GuestModal({ table, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Lukk">
          ✕
        </button>

        <div className="modal__icon">🪑</div>
        <h2 className="modal__title">{table.label}</h2>
        <p className="modal__seats">{table.guests.length} plasser</p>

        <ul className="modal__list">
          {table.guests.map((guest, i) => (
            <motion.li
              key={i}
              className={`modal__guest${!guest ? ' modal__guest--empty' : ''}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
            >
              <span className="modal__guest-dot" />
              <span className="modal__guest-name">{guest || 'Ledig'}</span>
              <span className="modal__guest-seat">Plass {i + 1}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
