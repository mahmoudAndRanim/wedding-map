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

  const tables = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    // Parse CSV row handling quoted fields
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
    if (isNaN(tableNum)) continue

    // Column B onwards: comma-separated guest names (or multiple columns)
    const guestStr = cols.slice(1).join(',')
    const guests = guestStr
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean)
      .slice(0, 8)

    // Pad to 8
    while (guests.length < 8) {
      guests.push('')
    }

    tables.push({
      id: tableNum,
      label: `Bord ${tableNum}`,
      guests,
    })
  }

  return tables.sort((a, b) => a.id - b.id)
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
        const parsed = parseCSV(csv)
        if (parsed.length > 0) {
          // Preserve family table flags from fallback data
          const familyMap = {}
          fallbackTables.forEach((t) => {
            if (t.family) familyMap[t.id] = t
          })
          const merged = parsed.map((t) =>
            familyMap[t.id] ? { ...t, family: true, familyName: familyMap[t.id].familyName, guests: [] } : t
          )
          // Add any fallback tables not in the sheet (e.g. empty ones)
          const parsedIds = new Set(merged.map((t) => t.id))
          fallbackTables.forEach((t) => {
            if (!parsedIds.has(t.id)) merged.push(t)
          })
          merged.sort((a, b) => a.id - b.id)
          setTables(merged)
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
