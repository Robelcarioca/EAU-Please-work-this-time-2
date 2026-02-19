import EtNav from './EtNav.jsx'
import EtStripe from './EtStripe.jsx'
import { DEPTS, ET_LOGO } from '../data/index.js'

export default function Landing({ onEnter }) {
  return (
    <div>
      <EtNav onEnter={onEnter} />
      <EtStripe />

      {/* HERO */}
      <div className="hero" style={{ background: '#1a5e1a' }}>
        <div className="hero-bg" />
        <div className="hero-grad" />
        <div className="hero-content au">
          <div className="hero-eyebrow">The New Spirit of Africa</div>
          <h1 className="hero-title">
            Ethiopian Aviation University<br />
            <span style={{ color: 'var(--yellow)' }}>Digital Learning Platform</span>
          </h1>
          <p className="hero-sub">
            Empowering the next generation of aviation maintenance technicians
            with ICAO-accredited education — accessible anywhere.
          </p>
          <div className="hero-btns">
            <button className="btn btn-yellow btn-lg" onClick={onEnter}>
              Access Platform →
            </button>
            <button className="btn btn-outline-w" onClick={onEnter}>
              Student Sign In
            </button>
          </div>
          <div className="hero-stats">
            {[['4+','Departments'],['500+','Students'],['200+','Modules'],['ICAO','Accredited']].map(([v, l]) => (
              <div key={l}>
                <div className="hero-stat-val">{v}</div>
                <div className="hero-stat-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DEPARTMENTS */}
      <div style={{ padding: '40px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="sec-title">Learning Departments</div>
        <div className="sec-sub">Select your department to explore courses and materials</div>
        <div className="dept-grid">
          {DEPTS.map(d => (
            <div key={d.id} className="dept-card" onClick={onEnter}>
              <img className="dept-card-img" src={d.img} alt={d.name} onError={(e) => { e.currentTarget.style.display = 'none' }} />
              <div className="dept-card-ov" />
              <div className="dept-card-body">
                <div className="dept-card-icon">{d.icon}</div>
                <div className="dept-card-name">{d.name}</div>
                <div className="dept-card-desc">{d.desc}</div>
                <div className="dept-card-bar">
                  <span style={{ flex: 1, background: 'var(--green)' }} />
                  <span style={{ flex: 1, background: 'var(--yellow)' }} />
                  <span style={{ flex: 1, background: 'var(--red)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY EAU */}
      <div style={{ background: 'var(--grey0)', padding: '40px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-title">Why Ethiopian Aviation University?</div>
          <div className="sec-sub">The industry standard for aviation maintenance education in Africa</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
            {[
              { icon: '✈️', title: 'ICAO Accredited',   desc: 'All programs meet ICAO Doc 9379 and EASA Part-66 standards' },
              { icon: '📱', title: 'Digital-First',     desc: 'Access PDFs, PowerPoints and video lectures from any device' },
              { icon: '🎓', title: 'Expert Faculty',    desc: 'Learn from certified aviation maintenance instructors' },
              { icon: '🌍', title: 'Pan-African Reach', desc: 'Serving students across Africa and beyond' },
            ].map(f => (
              <div key={f.title} className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 14 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#1a1a1a', color: '#fff', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 24 }}>
          <div>
            <img
              src={ET_LOGO}
              alt="ET"
              style={{ height: 32, filter: 'brightness(0) invert(1)', marginBottom: 12, display: 'block' }}
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', lineHeight: 1.8 }}>
              Ethiopian Aviation University<br />Digital Learning Platform
            </p>
          </div>
          {[
            { title: 'Quick Links', links: ['Departments', 'Programs', 'About EAU', 'Contact'] },
            { title: 'Support',     links: ['Help Center', 'FAQ', 'Registrar Office', 'IT Support'] },
            { title: 'Contact',     links: ['admissions@eau.edu.et', '📍 Addis Ababa, Ethiopia', '📞 +251-111-517-000'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>
                {col.title}
              </div>
              {col.links.map(l => (
                <div key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', marginBottom: 7 }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1100, margin: '24px auto 0', borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 16, fontSize: 12, color: 'rgba(255,255,255,.28)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span>© 2026 Ethiopian Aviation University. All rights reserved.</span>
          <span>Privacy Policy · Terms of Use</span>
        </div>
      </div>
    </div>
  )
}
