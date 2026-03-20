export default function Stage({ t }) {
  return (
    <div className="stage">
      <div className="stage__area">
        <div className="scene-box">
          <span className="scene-box__label">{t.scene}</span>
        </div>
      </div>

      <div className="dancefloor">
        <div className="dancefloor__surface">
          <div className="dancefloor__label">{t.dancefloor}</div>
        </div>
      </div>
    </div>
  )
}
