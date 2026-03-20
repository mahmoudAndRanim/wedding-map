export default function Stage() {
  return (
    <div className="stage">
      <div className="stage__platform">
        <div className="stage__curtain-left" />
        <div className="stage__curtain-right" />
        <div className="stage__spotlight stage__spotlight--left" />
        <div className="stage__spotlight stage__spotlight--right" />
        <div className="stage__content">
          <div className="stage__icon">💍</div>
          <div className="stage__label">Scenen</div>
          <div className="stage__sub">Brudeparret</div>
        </div>
        <div className="stage__edge" />
      </div>
      <div className="stage__spacer">
        <div className="stage__floor-pattern" />
      </div>
    </div>
  )
}
