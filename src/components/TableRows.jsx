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
    Layout: 13 tables total
    - Tables 1-12: arranged in rows of 4 (2 left | aisle | 2 right)
      Row 1 (front, near stage): tables 1, 2 | 3, 4
      Row 2: tables 5, 6 | 7, 8
      Row 3: tables 9, 10 | 11, 12
    - Table 13: centered at bottom
    
    Numbering: 1 starts at front (near stage), goes left-to-right, row by row
  */

  const rows = [
    { left: [1, 2], right: [3, 4] },
    { left: [5, 6], right: [7, 8] },
    { left: [9, 10], right: [11, 12] },
  ]

  const tableMap = {}
  tables.forEach((t) => { tableMap[t.id] = t })

  return (
    <div className="tables-area">
      {rows.map((row, ri) => (
        <div className="table-row" key={ri}>
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

      {/* Table 13 centered */}
      <div className="tables-extra">
        <Table
          table={tableMap[13]}
          isActive={activeTableId === 13}
          onClick={onTableClick}
        />
      </div>
    </div>
  )
}
