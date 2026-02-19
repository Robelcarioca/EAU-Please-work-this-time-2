import { ET_LOGO } from '../data/index.js'

export default function EtNav({ onEnter, showBack, onBack }) {
  return (
    <div className="et-topbar-wrap">
      <div className="et-topbar-upper">
        <div className="et-logo" onClick={showBack ? onBack : onEnter}>
          <img
            src={ET_LOGO}
            alt="Ethiopian Airlines"
            className="et-logo-img"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>
        <div className="et-top-right">
          {showBack ? (
            <button className="et-top-btn" onClick={onBack}>← Home</button>
          ) : (
            <>
              <button className="et-top-btn">About EAU</button>
              <button className="et-top-btn">Programs</button>
              <button className="et-top-btn" onClick={onEnter}>Sign In</button>
              <button className="et-top-btn cta" onClick={onEnter}>Enroll Now</button>
            </>
          )}
        </div>
      </div>
      <div className="et-topbar-lower">
        <button className="et-nav-btn">Book</button>
        <button className="et-nav-btn">Information</button>
        <button className="et-nav-btn">Services</button>
        <button className="et-nav-btn active">Learning Portal</button>
      </div>
    </div>
  )
}
