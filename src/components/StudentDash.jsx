import { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import ModViewer from './ModViewer.jsx'
import { DEPTS, ET_LOGO } from '../data/index.js'

function DeptView({ dept, content, onBack, onMod }) {
  const [open, setOpen] = useState({})
  const toggle = (id) => setOpen(o => ({ ...o, [id]: !o[id] }))

  return (
    <div style={{ padding: 24, maxWidth: 860, margin: '0 auto' }}>
      <div className="breadcrumb">
        <a onClick={onBack}>Dashboard</a>
        <span>›</span>
        <span>{dept.name}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid var(--green)' }}>
        <div style={{ width: 48, height: 48, background: 'var(--green)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
          {dept.icon}
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--slab)', fontSize: 22, fontWeight: 900 }}>{dept.name}</h1>
          <p style={{ color: 'var(--text3)', fontSize: 13 }}>{dept.desc}</p>
        </div>
      </div>

      {content ? (
        content.sections.map(sec => (
          <div key={sec.id} className="accordion">
            <div className={`acc-head${open[sec.id] ? ' open' : ''}`} onClick={() => toggle(sec.id)}>
              <div className="acc-title">
                <span style={{ color: 'var(--green)' }}>▸</span>
                {sec.name}
                <span className="badge badge-green">{sec.modules.length}</span>
              </div>
              <span className={`acc-chevron${open[sec.id] ? ' open' : ''}`}>▼</span>
            </div>
            {open[sec.id] && (
              <div className="mod-list">
                {sec.modules.map((m, i) => (
                  <div key={m.id} className="mod-item" onClick={() => onMod(dept, sec, m)}>
                    <div className="mod-title">
                      <span className="mod-num">{i + 1}</span>
                      {m.title}
                    </div>
                    <div className="mod-tags">
                      {m.pdf   && <span className="tag tag-pdf">PDF</span>}
                      {m.ppt   && <span className="tag tag-ppt">PPT</span>}
                      {m.video && <span className="tag tag-vid">VID</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-title">No content yet</div>
          <div className="empty-state-sub">The admin has not added modules to this department yet.</div>
        </div>
      )}
    </div>
  )
}

export default function StudentDash({ user, content, toast }) {
  const [view, setView]     = useState('dashboard')
  const [dept, setDept]     = useState(null)
  const [mod, setMod]       = useState(null)
  const [recent, setRecent] = useState([])
  const [query, setQuery]   = useState('')
  const [results, setResults] = useState([])

  const openMod = (d, s, m) => {
    setMod({ dept: d, sec: s, mod: m })
    setRecent(r => [{ dept: d, sec: s, mod: m, time: Date.now() }, ...r.filter(x => x.mod.id !== m.id)].slice(0, 12))
  }

  const doSearch = (val) => {
    setQuery(val)
    if (!val.trim()) { setResults([]); return }
    const found = []
    DEPTS.forEach(d =>
      (content[d.id]?.sections || []).forEach(s =>
        s.modules.forEach(m => {
          if (
            m.title.toLowerCase().includes(val.toLowerCase()) ||
            s.name.toLowerCase().includes(val.toLowerCase())
          ) {
            found.push({ dept: d, sec: s, mod: m })
          }
        })
      )
    )
    setResults(found)
  }

  const switchView = (v) => { setView(v); setDept(null) }
  const logout = () => window.location.reload()

  if (mod) {
    return <ModViewer dept={mod.dept} sec={mod.sec} mod={mod.mod} onBack={() => setMod(null)} toast={toast} />
  }

  if (dept) {
    return (
      <div className="app-layout">
        <Sidebar user={user} active="dashboard" setActive={switchView} onLogout={logout} />
        <div className="main-area">
          <div className="main-header">
            <div>
              <div className="main-header-title">{dept.icon} {dept.name}</div>
              <div className="main-header-sub">{dept.desc}</div>
            </div>
            <img src={ET_LOGO} alt="ET" style={{ height: 28 }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
          </div>
          <DeptView dept={dept} content={content[dept.id]} onBack={() => setDept(null)} onMod={openMod} />
        </div>
      </div>
    )
  }

  return (
    <div className="app-layout">
      <Sidebar user={user} active={view} setActive={switchView} onLogout={logout} />
      <div className="main-area">
        <div className="main-header">
          <div>
            <div className="main-header-title">Student Learning Portal</div>
            <div className="main-header-sub">
              Welcome back, {user.name.split(' ')[0]} · {user.department} · {user.studentId}
            </div>
          </div>
          <img src={ET_LOGO} alt="ET" style={{ height: 28 }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
        </div>

        <div className="main-body">
          {/* DASHBOARD */}
          {view === 'dashboard' && (
            <div className="au">
              <div className="sec-title">My Departments</div>
              <div className="sec-sub">Select a department to access your learning materials</div>
              <div className="dept-grid">
                {DEPTS.map(d => (
                  <div key={d.id} className="dept-card" onClick={() => setDept(d)}>
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
          )}

          {/* SEARCH */}
          {view === 'search' && (
            <div className="au">
              <div className="sec-title">Search Materials</div>
              <div style={{ marginBottom: 16 }}>
                <input
                  className="form-input"
                  placeholder="Search modules, sections, departments…"
                  value={query}
                  onChange={e => doSearch(e.target.value)}
                  style={{ fontSize: 15, padding: '12px 14px' }}
                />
              </div>
              {results.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {results.map((r, i) => (
                    <div key={i} className="accordion" style={{ cursor: 'pointer' }} onClick={() => openMod(r.dept, r.sec, r.mod)}>
                      <div className="acc-head" style={{ padding: '12px 16px' }}>
                        <div className="acc-title" style={{ gap: 10 }}>
                          <span>{r.dept.icon}</span>
                          <div>
                            <div style={{ fontWeight: 700 }}>{r.mod.title}</div>
                            <div style={{ fontWeight: 400, fontSize: 12, color: 'var(--grey3)', marginTop: 2 }}>
                              {r.dept.name} › {r.sec.name}
                            </div>
                          </div>
                        </div>
                        <div className="mod-tags">
                          {r.mod.pdf   && <span className="tag tag-pdf">PDF</span>}
                          {r.mod.ppt   && <span className="tag tag-ppt">PPT</span>}
                          {r.mod.video && <span className="tag tag-vid">VID</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : query ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🔍</div>
                  <div className="empty-state-title">No results found</div>
                  <div className="empty-state-sub">Try a different keyword.</div>
                </div>
              ) : null}
            </div>
          )}

          {/* RECENT */}
          {view === 'recent' && (
            <div className="au">
              <div className="sec-title">Recently Viewed</div>
              {recent.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🕒</div>
                  <div className="empty-state-title">No history yet</div>
                  <div className="empty-state-sub">Open a module to see it here.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {recent.map((r, i) => (
                    <div key={i} className="accordion" style={{ cursor: 'pointer' }} onClick={() => openMod(r.dept, r.sec, r.mod)}>
                      <div className="acc-head" style={{ padding: '12px 16px' }}>
                        <div className="acc-title" style={{ gap: 10 }}>
                          <span>{r.dept.icon}</span>
                          <div>
                            <div style={{ fontWeight: 700 }}>{r.mod.title}</div>
                            <div style={{ fontWeight: 400, fontSize: 12, color: 'var(--grey3)', marginTop: 2 }}>
                              {r.dept.name} › {r.sec.name}
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: 12, color: 'var(--grey3)' }}>
                          {Math.max(1, Math.round((Date.now() - r.time) / 60000))}m ago
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
