export default function Legend() {
  return (
    <div className="legend">
      <div className="legend__item">
        <span className="legend__dot legend__dot--green" />
        Ledig
      </div>
      <div className="legend__item">
        <span className="legend__dot legend__dot--yellow" />
        Har plass
      </div>
      <div className="legend__item">
        <span className="legend__dot legend__dot--red" />
        Fullt
      </div>
    </div>
  )
}
