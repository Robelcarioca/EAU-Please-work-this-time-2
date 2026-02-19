import { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import { DEPTS, ET_LOGO } from '../data/index.js'

export default function RegistrarDash({ user, users, setUsers, toast }) {
  const [view, setView]   = useState('dashboard')
  const [deptF, setDeptF] = useState('')

  const updateStatus = (id, status) => {
    setUsers(u => u.map(x => x.id === id ? { ...x, status } : x))
    toast(`Student ${status === 'approved' ? 'approved ✓' : 'rejected'}`, status === 'approved' ? 'success' : 'error')
  }

  const pending = users.filter(u => u.role === 'student' && u.status === 'pending' && (!deptF || u.department === deptF))
  const all     = users.filter(u => u.role === 'student' && (!deptF || u.department === deptF))
  const list    = view === 'dashboard' ? pending : all

  const badgeClass = (status) => {
    if (status === 'approved') return 'badge badge-green'
    if (status === 'pending')  return 'badge badge-yellow'
    return 'badge badge-red'
  }

  return (
    <div className="app-layout">
      <Sidebar user={user} active={view} setActive={setView} onLogout={() => window.location.reload()} />
      <div className="main-area">
        <div className="main-header">
          <div>
            <div className="main-header-title">Registrar Office</div>
            <div className="main-header-sub">Student Enrollment Management</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {pending.length > 0 && <span className="badge badge-yellow">⏳ {pending.length} Pending</span>}
            <img src={ET_LOGO} alt="ET" style={{ height: 28 }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
          </div>
        </div>

        <div className="main-body">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div className="sec-title" style={{ margin: 0 }}>
              {view === 'dashboard' ? 'Pending Approvals' : 'All Students'}
            </div>
            <select className="form-input form-select" style={{ width: 175 }} value={deptF} onChange={e => setDeptF(e.target.value)}>
              <option value="">All Departments</option>
              {['Avionics','Power Plant','Airframe','Structure','AMT'].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          {list.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">{view === 'dashboard' ? '🎉' : '📭'}</div>
              <div className="empty-state-title">{view === 'dashboard' ? 'All caught up!' : 'No students found'}</div>
              <div className="empty-state-sub">{view === 'dashboard' ? 'No pending approvals at this time.' : 'Try adjusting the filter.'}</div>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Student ID</th>
                    <th>Department</th>
                    <th>Status</th>
                    {view === 'dashboard' && <th style={{ textAlign: 'center' }}>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {list.map(u => (
                    <tr key={u.id} className={u.status === 'pending' ? 'tr-pending' : ''}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{u.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--grey3)' }}>{u.email}</div>
                      </td>
                      <td><code style={{ fontSize: 12 }}>{u.studentId || '—'}</code></td>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600 }}>
                          {DEPTS.find(d => d.name === u.department)?.icon || '🎓'} {u.department || '—'}
                        </span>
                      </td>
                      <td><span className={badgeClass(u.status)}>{u.status}</span></td>
                      {view === 'dashboard' && (
                        <td>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                            <button className="btn btn-green btn-sm" onClick={() => updateStatus(u.id, 'approved')}>✓ Approve</button>
                            <button className="btn btn-danger btn-sm" onClick={() => updateStatus(u.id, 'rejected')}>✕ Reject</button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
