export default function Stage({ t }) {
  return (
    <div className="stage">
      <div className="stage__area">
        <div className="kouch">
          <div className="kouch__back" />
          <div className="kouch__seat" />
          <div className="kouch__arm kouch__arm--left" />
          <div className="kouch__arm kouch__arm--right" />
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
