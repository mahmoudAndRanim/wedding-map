export default function Legend({ t }) {
  return (
    <div className="legend">
      <div className="legend__item">
        <span className="legend__dot legend__dot--green" />
        {t.ledig}
      </div>
      <div className="legend__item">
        <span className="legend__dot legend__dot--yellow" />
        {t.harPlass}
      </div>
      <div className="legend__item">
        <span className="legend__dot legend__dot--red" />
        {t.fullt}
      </div>
    </div>
  )
}
