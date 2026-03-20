export default function Stage() {
  return (
    <div className="stage">
      {/* Centered sofa / bride & groom seating */}
      <div className="stage__area">
        <div className="kouch">
          <div className="kouch__back" />
          <div className="kouch__seat" />
          <div className="kouch__arm kouch__arm--left" />
          <div className="kouch__arm kouch__arm--right" />
        </div>
      </div>

      {/* Dance floor */}
      <div className="dancefloor">
        <div className="dancefloor__surface">
          <div className="dancefloor__label">Dansegulv</div>
        </div>
      </div>
    </div>
  )
}
