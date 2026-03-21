import { useState, useCallback, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import useGoogleSheet from './hooks/useGoogleSheet'
import Stage from './components/Stage'
import TableRows from './components/TableRows'
import GuestModal from './components/GuestModal'
import Legend from './components/Legend'

const translations = {
  no: {
    title: 'Bordkart',
    subtitle: 'Finn din plass',
    loading: 'Laster bordkart...',
    scene: 'Scene',
    dancefloor: 'Dansegulv',
    ledig: 'Ledig',
    harPlass: 'Har plass',
    fullt: 'Fullt',
    plasser: 'plasser',
    plass: 'Plass',
    bord: 'Bord',
    langBtn: 'عربي',
    footer: 'Mahmoud & Raneem',
  },
  ar: {
    title: 'خريطة الطاولات',
    subtitle: 'ابحث عن مكانك',
    loading: 'جاري التحميل...',
    scene: 'المسرح',
    dancefloor: 'حلبة الرقص',
    ledig: 'متاح',
    harPlass: 'يوجد أماكن',
    fullt: 'ممتلئ',
    plasser: 'مقاعد',
    plass: 'مقعد',
    bord: 'طاولة',
    langBtn: 'Norsk',
    footer: 'محمود و رنيم',
  },
}

export default function App() {
  const { tables, loading } = useGoogleSheet()
  const [activeTable, setActiveTable] = useState(null)
  const [lang, setLang] = useState('ar')
  const t = translations[lang]
  const isArabic = lang === 'ar'

  const highlightedTableId = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    const bord = parseInt(params.get('bord'), 10)
    if (bord && bord >= 3 && bord <= 14) return bord
    return null
  }, [])

  const handleTableClick = useCallback((table) => {
    setActiveTable(table)
  }, [])

  const handleClose = useCallback(() => {
    setActiveTable(null)
  }, [])

  return (
    <div className={`app${isArabic ? ' rtl' : ''}`}>
      <nav className="navbar">
        <h1 className="navbar__title">{t.title}</h1>
        <button
          className="lang-toggle"
          onClick={() => setLang(lang === 'no' ? 'ar' : 'no')}
        >
          {t.langBtn}
        </button>
      </nav>

      {loading ? (
        <div className="loading">
          <div className="loading__spinner" />
          <p className="loading__text">{t.loading}</p>
        </div>
      ) : (
        <div className="hall">
          <Stage t={t} />
          <TableRows tables={tables} activeTableId={activeTable?.id} highlightedTableId={highlightedTableId} onTableClick={handleTableClick} t={t} />
        </div>
      )}

      <Legend t={t} />

      <footer className="footer">
        <p className="footer__text">{t.footer}</p>
      </footer>

      <AnimatePresence>
        {activeTable && (
          <GuestModal table={activeTable} onClose={handleClose} t={t} />
        )}
      </AnimatePresence>
    </div>
  )
}
