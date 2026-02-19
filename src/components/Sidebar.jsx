import { ET_LOGO } from '../data/index.js'
import EtStripe from './EtStripe.jsx'

const NAV = {
  admin: [
    { id:'dashboard', icon:'📊', label:'Overview' },
    { id:'users',     icon:'👥', label:'Manage Users' },
    { id:'content',   icon:'📁', label:'Content Manager' },
    { id:'upload',    icon:'⬆️', label:'Upload & Create' },
    { id:'logs',      icon:'📋', label:'Audit Logs' },
  ],
  registrar: [
    { id:'dashboard', icon:'⏳', label:'Pending Approvals' },
    { id:'students',  icon:'🎓', label:'All Students' },
  ],
  student: [
    { id:'dashboard', icon:'🏠', label:'Dashboard' },
    { id:'search',    icon:'🔍', label:'Search Materials' },
    { id:'recent',    icon:'🕒', label:'Recently Viewed' },
  ],
}

export default function Sidebar({ user, active, setActive, onLogout }) {
  const items = NAV[user.role] || NAV.student

  return (
    <div className="sidebar">
      <div className="sb-header">
        <div className="sb-logo-row">
          <img
            src={ET_LOGO}
            alt="ET"
            className="sb-logo-img"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>
        <div className="sb-user-row">
          <div className="sb-user-name">{user.name}</div>
          <div className="sb-user-sub">
            {user.role}{user.department ? ` · ${user.department}` : ''}
          </div>
        </div>
      </div>

      <EtStripe />

      <nav className="sb-nav">
        <div className="sb-section-label">Navigation</div>
        {items.map(item => (
          <button
            key={item.id}
            className={`sb-item${active === item.id ? ' active' : ''}`}
            onClick={() => setActive(item.id)}
          >
            <span className="sb-item-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sb-footer">
        <button className="sb-item" style={{ color: '#c8102e' }} onClick={onLogout}>
          <span className="sb-item-icon">🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}
