import { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import { DEPTS, AUDIT_LOGS, ET_LOGO } from '../data/index.js'

export default function AdminDash({ user, users, setUsers, content, setContent, toast }) {
  const [view, setView]     = useState('dashboard')
  const [deptF, setDeptF]   = useState('')
  const [newSec, setNewSec] = useState({ dept: '', name: '' })
  const [newMod, setNewMod] = useState({ dept: '', section: '', title: '' })

  const students = users.filter(u => u.role === 'student')
  const pending  = students.filter(u => u.status === 'pending')
  const approved = students.filter(u => u.status === 'approved')
  const totalMods = Object.values(content).reduce(
    (a, d) => a + (d?.sections?.reduce((b, s) => b + s.modules.length, 0) || 0), 0
  )

  const setApproval = (id, status) => {
    setUsers(u => u.map(x => x.id === id ? { ...x, status } : x))
    toast(`Student ${status === 'approved' ? 'approved ✓' : 'rejected'}`, status === 'approved' ? 'success' : 'error')
  }
  const toggleRole = (id) => {
    setUsers(u => u.map(x =>
      x.id === id && x.role !== 'admin'
        ? { ...x, role: x.role === 'registrar' ? 'student' : 'registrar' }
        : x
    ))
    toast('Role updated', 'success')
  }
  const toggleDisable = (id) => {
    setUsers(u => u.map(x => x.id === id ? { ...x, status: x.status === 'disabled' ? 'approved' : 'disabled' } : x))
    toast('Account updated', 'success')
  }
  const addSection = () => {
    if (!newSec.dept || !newSec.name) { toast('Fill all fields', 'error'); return }
    setContent(c => ({
      ...c,
      [newSec.dept]: {
        ...c[newSec.dept],
        sections: [...(c[newSec.dept]?.sections || []), { id: 's' + Date.now(), name: newSec.name, modules: [] }],
      },
    }))
    setNewSec({ dept: '', name: '' })
    toast('Section created', 'success')
  }
  const addModule = () => {
    if (!newMod.dept || !newMod.section || !newMod.title) { toast('Fill all fields', 'error'); return }
    const m = { id: 'm' + Date.now(), title: newMod.title, pdf: null, ppt: null, video: null }
    setContent(c => ({
      ...c,
      [newMod.dept]: {
        ...c[newMod.dept],
        sections: c[newMod.dept].sections.map(s =>
          s.id === newMod.section ? { ...s, modules: [...s.modules, m] } : s
        ),
      },
    }))
    setNewMod({ dept: '', section: '', title: '' })
    toast('Module added', 'success')
  }
  const deleteModule = (dId, sId, mId) => {
    setContent(c => ({
      ...c,
      [dId]: {
        ...c[dId],
        sections: c[dId].sections.map(s =>
          s.id === sId ? { ...s, modules: s.modules.filter(m => m.id !== mId) } : s
        ),
      },
    }))
    toast('Module deleted', 'success')
  }

  const filtered = users.filter(u => u.role !== 'admin' && (!deptF || u.department === deptF))

  const badgeClass = (status) => {
    if (status === 'approved') return 'badge badge-green'
    if (status === 'pending')  return 'badge badge-yellow'
    if (status === 'disabled') return 'badge badge-gray'
    return 'badge badge-red'
  }

  return (
    <div className="app-layout">
      <Sidebar user={user} active={view} setActive={setView} onLogout={() => window.location.reload()} />
      <div className="main-area">
        <div className="main-header">
          <div>
            <div className="main-header-title">Administration Panel</div>
            <div className="main-header-sub">Ethiopian Aviation University — System Admin</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {pending.length > 0 && <span className="badge badge-yellow">⏳ {pending.length} Pending</span>}
            <img src={ET_LOGO} alt="ET" style={{ height: 28 }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
          </div>
        </div>

        <div className="main-body">

          {/* ── OVERVIEW ── */}
          {view === 'dashboard' && (
            <div className="au">
              <div className="stat-grid">
                {[
                  { icon: '🎓', label: 'Total Students',   val: students.length, color: 'var(--green)' },
                  { icon: '⏳', label: 'Pending Approval', val: pending.length,  color: '#e65100'       },
                  { icon: '✅', label: 'Approved',         val: approved.length, color: 'var(--green)'  },
                  { icon: '📚', label: 'Total Modules',    val: totalMods,       color: 'var(--red)'    },
                ].map(s => (
                  <div key={s.label} className="stat-card" style={{ borderLeft: `4px solid ${s.color}` }}>
                    <div className="stat-card-icon">{s.icon}</div>
                    <div className="stat-card-val" style={{ color: s.color }}>{s.val}</div>
                    <div className="stat-card-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* PENDING */}
              <div className="card" style={{ marginBottom: 24, borderLeft: '4px solid var(--yellow)' }}>
                <div className="card-header">
                  <div className="card-header-title">⏳ Pending Student Approvals</div>
                  {pending.length > 0 && <span className="badge badge-yellow">{pending.length} awaiting</span>}
                </div>
                {pending.length === 0 ? (
                  <div style={{ padding: '14px 20px' }} className="alert-success">
                    <span>✅</span><span>All clear — no pending approvals.</span>
                  </div>
                ) : (
                  <div className="table-wrap" style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}>
                    <table>
                      <thead>
                        <tr><th>Student</th><th>ID</th><th>Department</th><th style={{ textAlign: 'center' }}>Actions</th></tr>
                      </thead>
                      <tbody>
                        {pending.map(u => (
                          <tr key={u.id} className="tr-pending">
                            <td>
                              <div style={{ fontWeight: 700 }}>{u.name}</div>
                              <div style={{ fontSize: 12, color: 'var(--grey3)' }}>{u.email}</div>
                            </td>
                            <td><code style={{ fontSize: 12, background: 'var(--grey0)', padding: '2px 6px', borderRadius: 3 }}>{u.studentId || '—'}</code></td>
                            <td>
                              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600 }}>
                                {DEPTS.find(d => d.name === u.department)?.icon || '🎓'} {u.department || '—'}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                                <button className="btn btn-green btn-sm" onClick={() => setApproval(u.id, 'approved')}>✓ Approve</button>
                                <button className="btn btn-danger btn-sm" onClick={() => setApproval(u.id, 'rejected')}>✕ Reject</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="sec-title" style={{ marginBottom: 12 }}>All Students</div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Name</th><th>Department</th><th>Status</th></tr></thead>
                  <tbody>
                    {students.map(u => (
                      <tr key={u.id}>
                        <td><div style={{ fontWeight: 600 }}>{u.name}</div><div style={{ fontSize: 12, color: 'var(--grey3)' }}>{u.email}</div></td>
                        <td>{u.department}</td>
                        <td><span className={badgeClass(u.status)}>{u.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── MANAGE USERS ── */}
          {view === 'users' && (
            <div className="au">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div className="sec-title" style={{ margin: 0 }}>Manage Users</div>
                <select className="form-input form-select" style={{ width: 175 }} value={deptF} onChange={e => setDeptF(e.target.value)}>
                  <option value="">All Departments</option>
                  {['Avionics','Power Plant','Airframe','Structure','AMT'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>User</th><th>ID</th><th>Dept/Role</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filtered.map(u => (
                      <tr key={u.id} className={u.status === 'pending' ? 'tr-pending' : ''}>
                        <td><div style={{ fontWeight: 600 }}>{u.name}</div><div style={{ fontSize: 12, color: 'var(--grey3)' }}>{u.email}</div></td>
                        <td><code style={{ fontSize: 12 }}>{u.studentId || '—'}</code></td>
                        <td>{u.department || u.role}</td>
                        <td><span className={badgeClass(u.status)}>{u.status}</span></td>
                        <td>
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {u.status === 'pending' && (
                              <>
                                <button className="btn btn-green btn-sm" onClick={() => setApproval(u.id, 'approved')}>✓ Approve</button>
                                <button className="btn btn-danger btn-sm" onClick={() => setApproval(u.id, 'rejected')}>✕ Reject</button>
                              </>
                            )}
                            {u.status === 'approved' && u.role === 'student' && (
                              <button className="btn btn-sm" style={{ background: '#e3f2fd', color: '#0d47a1', border: '1px solid #90caf9' }} onClick={() => toggleRole(u.id)}>↑ Registrar</button>
                            )}
                            {u.role === 'registrar' && (
                              <button className="btn btn-ghost btn-sm" onClick={() => toggleRole(u.id)}>↓ Remove Role</button>
                            )}
                            {(u.status === 'approved' || u.status === 'disabled') && (
                              <button
                                className="btn btn-sm"
                                style={{ background: u.status === 'disabled' ? '#e8f5e9' : '#ffebee', color: u.status === 'disabled' ? '#1b5e20' : '#b71c1c' }}
                                onClick={() => toggleDisable(u.id)}
                              >
                                {u.status === 'disabled' ? 'Enable' : 'Disable'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── CONTENT MANAGER ── */}
          {view === 'content' && (
            <div className="au">
              <div className="sec-title" style={{ marginBottom: 16 }}>Content Manager</div>
              {DEPTS.map(d => (
                <div key={d.id} className="card" style={{ marginBottom: 12 }}>
                  <div className="card-header" style={{ borderBottom: '2px solid var(--green)' }}>
                    <span>{d.icon}</span>
                    <div className="card-header-title">{d.name}</div>
                    <span className="badge badge-green">{content[d.id]?.sections?.length || 0} sections</span>
                  </div>
                  <div style={{ padding: 10 }}>
                    {(content[d.id]?.sections || []).map(sec => (
                      <div key={sec.id} style={{ background: 'var(--grey0)', borderRadius: 6, padding: 10, marginBottom: 8, border: '1px solid var(--grey2)' }}>
                        <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--green)', marginBottom: 6 }}>📂 {sec.name}</div>
                        {sec.modules.map(m => (
                          <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: '#fff', border: '1px solid var(--grey2)', borderRadius: 4, marginBottom: 4 }}>
                            <span style={{ fontSize: 13, fontWeight: 500 }}>{m.title}</span>
                            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                              {m.pdf   && <span className="tag tag-pdf">PDF</span>}
                              {m.ppt   && <span className="tag tag-ppt">PPT</span>}
                              {m.video && <span className="tag tag-vid">VID</span>}
                              <button className="btn btn-sm" style={{ background: '#ffebee', color: 'var(--red)', padding: '3px 8px' }} onClick={() => deleteModule(d.id, sec.id, m.id)}>🗑</button>
                            </div>
                          </div>
                        ))}
                        {sec.modules.length === 0 && <div style={{ fontSize: 12, color: 'var(--grey3)', fontStyle: 'italic' }}>No modules yet</div>}
                      </div>
                    ))}
                    {!content[d.id]?.sections?.length && <div style={{ fontSize: 12, color: 'var(--grey3)', fontStyle: 'italic', padding: '4px 2px' }}>No sections yet.</div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── UPLOAD & CREATE ── */}
          {view === 'upload' && (
            <div className="au">
              <div className="sec-title" style={{ marginBottom: 20 }}>Upload &amp; Create Content</div>
              <div className="two-col">
                <div className="panel">
                  <div style={{ fontWeight: 700, marginBottom: 14 }}>➕ Add New Section</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <select className="form-input form-select" value={newSec.dept} onChange={e => setNewSec(s => ({ ...s, dept: e.target.value }))}>
                        <option value="">Select Department</option>
                        {DEPTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Section Name</label>
                      <input className="form-input" placeholder="e.g. AVO 8 – Advanced Nav" value={newSec.name} onChange={e => setNewSec(s => ({ ...s, name: e.target.value }))} />
                    </div>
                    <button className="btn btn-green" onClick={addSection}>Create Section</button>
                  </div>
                </div>
                <div className="panel">
                  <div style={{ fontWeight: 700, marginBottom: 14 }}>➕ Add Module to Section</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <select className="form-input form-select" value={newMod.dept} onChange={e => setNewMod(m => ({ ...m, dept: e.target.value, section: '' }))}>
                        <option value="">Select</option>
                        {DEPTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Section</label>
                      <select className="form-input form-select" value={newMod.section} onChange={e => setNewMod(m => ({ ...m, section: e.target.value }))} disabled={!newMod.dept}>
                        <option value="">Select</option>
                        {(content[newMod.dept]?.sections || []).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Module Title</label>
                      <input className="form-input" placeholder="e.g. Autopilot Systems" value={newMod.title} onChange={e => setNewMod(m => ({ ...m, title: e.target.value }))} />
                    </div>
                    <button className="btn btn-red" onClick={addModule}>Add Module</button>
                  </div>
                </div>
              </div>
              <div className="panel" style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 700, marginBottom: 12 }}>📎 Attach Files to Module</div>
                <div className="upload-zone">
                  <div style={{ fontSize: 36, marginBottom: 10 }}>☁️</div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Drag &amp; Drop Files Here</div>
                  <div style={{ fontSize: 13, color: 'var(--grey3)', marginBottom: 14 }}>Supports PDF, PPTX, or YouTube URL</div>
                  <button className="btn btn-green btn-sm" onClick={() => toast('File upload active in production', 'info')}>Choose Files</button>
                </div>
              </div>
            </div>
          )}

          {/* ── AUDIT LOGS ── */}
          {view === 'logs' && (
            <div className="au">
              <div className="sec-title" style={{ marginBottom: 16 }}>Audit Logs</div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Timestamp</th><th>Action</th><th>Actor</th><th>Details</th></tr></thead>
                  <tbody>
                    {AUDIT_LOGS.map((row, i) => (
                      <tr key={i}>
                        <td><code style={{ fontSize: 12 }}>{row.t}</code></td>
                        <td><span className="badge badge-blue">{row.a}</span></td>
                        <td style={{ fontWeight: 600 }}>{row.ac}</td>
                        <td style={{ color: 'var(--grey4)' }}>{row.d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
