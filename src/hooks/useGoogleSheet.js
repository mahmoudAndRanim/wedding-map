import { useState, useEffect } from 'react'
import fallbackTables from '../data/tables'

// Replace this with your Google Sheet ID
// The sheet must be published: File → Share → Publish to web → Entire Document → CSV
const SHEET_ID = '1d5qE7KKDYrCZR2JLqJYpw7Lt_TJlXfEeHWoCt70c_SY'
const SHEET_GID = '0' // First sheet tab

function buildUrl(sheetId, gid) {
  return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:csv&gid=${encodeURIComponent(gid)}`
}

function parseCSV(text) {
  const lines = text.split('\n').filter((l) => l.trim())
  if (lines.length < 2) return []

  const rows = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    // Simple CSV parse handling quoted fields
    const cols = []
    let current = ''
    let inQuotes = false
    for (let c = 0; c < line.length; c++) {
      const ch = line[c]
      if (ch === '"') {
        if (inQuotes && line[c + 1] === '"') {
          current += '"'
          c++
        } else {
          inQuotes = !inQuotes
        }
      } else if (ch === ',' && !inQuotes) {
        cols.push(current.trim())
        current = ''
      } else {
        current += ch
      }
    }
    cols.push(current.trim())

    const tableNum = parseInt(cols[0], 10)
    const name = cols[1] || ''
    if (!isNaN(tableNum) && name) {
      rows.push({ tableNum, name })
    }
  }
  return rows
}

function groupIntoTables(rows) {
  const map = {}
  rows.forEach(({ tableNum, name }) => {
    if (!map[tableNum]) {
      map[tableNum] = {
        id: tableNum,
        label: `Bord ${tableNum}`,
        guests: [],
      }
    }
    if (map[tableNum].guests.length < 8) {
      map[tableNum].guests.push(name)
    }
  })

  // Pad each table to exactly 8 seats
  Object.values(map).forEach((table) => {
    while (table.guests.length < 8) {
      table.guests.push('')
    }
  })

  // Return sorted by table number
  return Object.values(map).sort((a, b) => a.id - b.id)
}

export default function useGoogleSheet() {
  const [tables, setTables] = useState(fallbackTables)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const url = buildUrl(SHEET_ID, SHEET_GID)

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((csv) => {
        const rows = parseCSV(csv)
        if (rows.length > 0) {
          setTables(groupIntoTables(rows))
        }
        setLoading(false)
      })
      .catch((err) => {
        console.warn('Could not fetch Google Sheet, using fallback data:', err)
        setError(err)
        setLoading(false)
      })
  }, [])

  return { tables, loading, error }
}
