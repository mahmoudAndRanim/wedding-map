export default function Legend() {
  return (
    <div className="legend">
      <div className="legend__item">
        <span className="legend__dot legend__dot--occupied" />
        Opptatt
      </div>
      <div className="legend__item">
        <span className="legend__dot legend__dot--free" />
        Ledig
      </div>
      <div className="legend__item">
        <span className="legend__dot legend__dot--available" />
        Har plass
      </div>
      <div className="legend__item">
        <span className="legend__dot legend__dot--full" />
        Fullt
      </div>
    </div>
  )
}
