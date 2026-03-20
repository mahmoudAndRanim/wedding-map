import { motion } from 'framer-motion'

const CHAIRS_PER_TABLE = 8

function Table({ table, isActive, onClick }) {
  return (
    <motion.div
      className={`table${isActive ? ' table--active' : ''}`}
      onClick={() => onClick(table)}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: table.id * 0.04, type: 'spring', stiffness: 200 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="table__chairs">
        {Array.from({ length: CHAIRS_PER_TABLE }).map((_, i) => (
          <div key={i} className="chair" />
        ))}
      </div>
      <div className="table__surface">
        <span className="table__number">{table.id}</span>
      </div>
    </motion.div>
  )
}

export default function TableRows({ tables, activeTableId, onTableClick }) {
  /*
    Layout: 14 tables
    - Row 1 (nearest stage): 1 left | aisle | 1 right  (tables 1-2)
    - Row 2: 2 left | aisle | 2 right  (tables 3-6)
    - Row 3: 2 left | aisle | 2 right  (tables 7-10)
    - Row 4: 2 left | aisle | 2 right  (tables 11-14)
  */

  const rows = [
    { left: [1], right: [2] },
    { left: [3, 4], right: [5, 6] },
    { left: [7, 8], right: [9, 10] },
    { left: [11, 12], right: [13, 14] },
  ]

  const tableMap = {}
  tables.forEach((t) => { tableMap[t.id] = t })

  return (
    <div className="tables-area">
      <div className="aisle-line" />

      {rows.map((row, ri) => (
        <div className={`table-row${row.left.length === 1 ? ' table-row--narrow' : ''}`} key={ri}>
          <div className="table-row__left">
            {row.left.map((id) => (
              <Table
                key={id}
                table={tableMap[id]}
                isActive={activeTableId === id}
                onClick={onTableClick}
              />
            ))}
          </div>
          <div className="aisle" />
          <div className="table-row__right">
            {row.right.map((id) => (
              <Table
                key={id}
                table={tableMap[id]}
                isActive={activeTableId === id}
                onClick={onTableClick}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
