// Seating data for each table (1-14)
// Each table has 8 seats — fallback data (overridden by Google Sheet if available)
const tables = [
  {
    id: 1,
    label: 'Bord 1',
    family: true,
    familyName: 'Abouchandi',
    guests: [],
  },
  {
    id: 2,
    label: 'Bord 2',
    family: true,
    familyName: 'Hussein',
    guests: [],
  },
  {
    id: 3,
    label: 'Bord 3',
    guests: [
      'ديانا', 'ليا', 'محمد', 'Linn Khalaf',
      'Gasha saber rasul', 'Khitam Waked', '', '',
    ],
  },
  {
    id: 4,
    label: 'Bord 4',
    guests: [
      'وائل', 'نور', 'رغد', 'لمار',
      'Ammar', 'Baraa', 'Ahmed', 'Abodi',
    ],
  },
  {
    id: 5,
    label: 'Bord 5',
    guests: [
      'ضرار', 'الاء', 'يامن', 'تاليا',
      'نور', 'مرتضى', 'علا', '',
    ],
  },
  {
    id: 6,
    label: 'Bord 6',
    guests: [
      'Kushtrim', 'Arta', 'Fiza', 'Farzana',
      'Joudy Mouhaffel', 'Jasmin Mirza', 'Kamilah Iqbal', '',
    ],
  },
  {
    id: 7,
    label: 'Bord 7',
    guests: [
      'Amna halymah', 'Ziad', 'حسين الدريب', 'Aysha Nour Alhajjaj',
      'Maram Saleh', 'Omar Bouhmidi', 'Maaz Hassan Raja', 'Ahmad Adil Abbas',
    ],
  },
  {
    id: 8,
    label: 'Bord 8',
    guests: [
      'Agon Berisha', 'هوازن', 'Ahmad Alkhateb', '',
      '', '', '', '',
    ],
  },
  {
    id: 9,
    label: 'Bord 9',
    guests: ['', '', '', '', '', '', '', ''],
  },
  {
    id: 10,
    label: 'Bord 10',
    guests: ['', '', '', '', '', '', '', ''],
  },
  {
    id: 11,
    label: 'Bord 11',
    guests: ['', '', '', '', '', '', '', ''],
  },
  {
    id: 12,
    label: 'Bord 12',
    guests: ['', '', '', '', '', '', '', ''],
  },
  {
    id: 13,
    label: 'Bord 13',
    guests: ['', '', '', '', '', '', '', ''],
  },
  {
    id: 14,
    label: 'Bord 14',
    guests: ['', '', '', '', '', '', '', ''],
  },
]

export default tables
