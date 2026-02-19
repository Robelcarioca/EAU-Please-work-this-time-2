import { useState } from 'react'
import EtNav from './EtNav.jsx'
import EtStripe from './EtStripe.jsx'
import { ET_LOGO } from '../data/index.js'

export default function AuthPage({ users, setUsers, onAuth, onBack }) {
  const [tab, setTab]       = useState('login')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert]   = useState({ text: '', type: '' })
  const [form, setForm]     = useState({ email: '', password: '', name: '', studentId: '', department: '' })

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const clearAlert = () => setAlert({ text: '', type: '' })

  const handleLogin = () => {
    clearAlert()
    const emailNorm = form.email.trim().toLowerCase()
    if (!emailNorm || !form.password) {
      setAlert({ text: 'Please enter your email address and password.', type: 'error' })
      return
    }
    const found = users.find(u =>
      u.email.trim().toLowerCase() === emailNorm &&
      u.password === form.password
    )
    if (!found) {
      setAlert({ text: 'Incorrect email or password. Please try again.', type: 'error' })
      return
    }
    if (found.status === 'pending') {
      setAlert({ text: 'Your account is pending approval by the registrar.', type: 'error' })
      return
    }
    if (found.status === 'rejected') {
      setAlert({ text: 'Your registration has been rejected. Contact the admissions office.', type: 'error' })
      return
    }
    if (found.status === 'disabled') {
      setAlert({ text: 'Your account has been disabled. Contact administration.', type: 'error' })
      return
    }
    setLoading(true)
    setTimeout(() => { setLoading(false); onAuth(found) }, 600)
  }

  const handleSignup = () => {
    clearAlert()
    if (!form.name || !form.email || !form.password || !form.studentId || !form.department) {
      setAlert({ text: 'All fields are required.', type: 'error' })
      return
    }
    if (form.password.length < 6) {
      setAlert({ text: 'Password must be at least 6 characters.', type: 'error' })
      return
    }
    const emailNorm = form.email.trim().toLowerCase()
    if (users.find(u => u.email.trim().toLowerCase() === emailNorm)) {
      setAlert({ text: 'An account with this email already exists.', type: 'error' })
      return
    }
    const newUser = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      role: 'student',
      status: 'pending',
      department: form.department,
      studentId: form.studentId.trim(),
    }
    setUsers(prev => [...prev, newUser])
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setTab('login')
      setForm(f => ({ ...f, email: form.email.trim(), password: '', name: '', studentId: '', department: '' }))
      setAlert({ text: 'Account created! Your application is pending registrar approval.', type: 'success' })
    }, 700)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') tab === 'login' ? handleLogin() : handleSignup()
  }

  return (
    <div className="auth-wrap">
      <EtNav showBack onBack={onBack} />
      <EtStripe />

      <div className="auth-body">
        {/* LEFT */}
        <div className="auth-left">
          <div className="auth-left-photo" />
          <div className="auth-left-fade" />
          <div className="auth-left-content">
            <img
              src={ET_LOGO}
              alt="Ethiopian Airlines"
              style={{ height: 44, marginBottom: 20, filter: 'brightness(0) invert(1)' }}
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <h2 style={{ fontFamily: 'var(--slab)', color: '#fff', fontSize: 22, fontWeight: 900, lineHeight: 1.25, marginBottom: 10 }}>
              Ethiopian Aviation University
            </h2>
            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 13, lineHeight: 1.8, marginBottom: 20 }}>
              Africa&apos;s leading aviation maintenance training institution. ICAO accredited. Internationally recognised.
            </p>
            <EtStripe />
            <div className="cred-box">
              <div className="cred-box-title">⚡ Demo Credentials</div>
              {[
                { r: 'Admin',      e: 'admin@eau.edu.et',      p: 'admin123', note: 'Full access' },
                { r: 'Registrar',  e: 'registrar@eau.edu.et',  p: 'reg123',   note: 'Approve students' },
                { r: 'Student ✓',  e: 'abebe@student.eau.et',  p: 'pass123',  note: 'Pre-approved' },
              ].map(x => (
                <div key={x.r} className="cred-item">
                  <div className="cred-role">{x.r} <span style={{ color: 'rgba(255,255,255,.4)', fontWeight: 400 }}>— {x.note}</span></div>
                  <div className="cred-detail">{x.e}</div>
                  <div className="cred-detail">Password: {x.p}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,.3)' }}>
              📧 admissions@eau.edu.et · 📍 Addis Ababa, Ethiopia
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <div className="auth-form">
            <img
              src={ET_LOGO}
              alt="Ethiopian Airlines"
              style={{ height: 38, marginBottom: 20, display: 'block' }}
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <h1 style={{ fontFamily: 'var(--slab)', fontSize: 22, fontWeight: 900, color: 'var(--text)', marginBottom: 4 }}>
              {tab === 'login' ? 'Sign In to Your Account' : 'Create New Account'}
            </h1>
            <p style={{ color: 'var(--grey3)', fontSize: 13, marginBottom: 20 }}>
              {tab === 'login' ? 'Access your aviation learning dashboard.' : 'Register as a new aviation student.'}
            </p>

            <div className="auth-tabs">
              <button className={`auth-tab${tab === 'login' ? ' active' : ''}`} onClick={() => { setTab('login'); clearAlert() }}>Sign In</button>
              <button className={`auth-tab${tab === 'signup' ? ' active' : ''}`} onClick={() => { setTab('signup'); clearAlert() }}>Register</button>
            </div>

            {alert.text && (
              <div className={alert.type === 'success' ? 'alert-success' : 'alert-error'} style={{ marginBottom: 16 }}>
                <span>{alert.type === 'success' ? '✓' : '✕'}</span>
                <span>{alert.text}</span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {tab === 'signup' && (
                <>
                  <div className="two-col">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input className="form-input" placeholder="Abebe Girma" value={form.name} onChange={e => upd('name', e.target.value)} onKeyDown={handleKey} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Student ID</label>
                      <input className="form-input" placeholder="EAU-2024-XXX" value={form.studentId} onChange={e => upd('studentId', e.target.value)} onKeyDown={handleKey} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <select className="form-input form-select" value={form.department} onChange={e => upd('department', e.target.value)}>
                      <option value="">— Select Department —</option>
                      {['Avionics','Power Plant','Airframe','Structure','AMT'].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => upd('email', e.target.value)} onKeyDown={handleKey} autoComplete="email" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => upd('password', e.target.value)}
                  onKeyDown={handleKey}
                  autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                />
              </div>
              <button
                className="btn btn-green"
                style={{ width: '100%', justifyContent: 'center', padding: '11px', fontSize: 14, marginTop: 4 }}
                onClick={tab === 'login' ? handleLogin : handleSignup}
                disabled={loading}
              >
                {loading ? '⏳ Please wait…' : tab === 'login' ? 'Sign In to Platform' : 'Create Account →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
