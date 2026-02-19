import EtStripe from './EtStripe.jsx'
import { ET_LOGO } from '../data/index.js'

export default function PendingScreen({ user, onLogout }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--grey0)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'var(--green)', padding: '12px 20px' }}>
        <img src={ET_LOGO} alt="ET" style={{ height: 30, filter: 'brightness(0) invert(1)' }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
      </div>
      <EtStripe />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div className="card" style={{ maxWidth: 440, width: '100%', borderTop: '4px solid var(--yellow)' }}>
          <div style={{ background: 'var(--green)', padding: '20px 24px' }}>
            <img src={ET_LOGO} alt="ET" style={{ height: 32, filter: 'brightness(0) invert(1)' }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
          </div>
          <EtStripe />
          <div style={{ padding: 28, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, background: '#fff8e1', border: '2px solid var(--yellow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' }}>
              ⏳
            </div>
            <h2 style={{ fontFamily: 'var(--slab)', fontSize: 20, marginBottom: 10 }}>Account Under Review</h2>
            <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.75, marginBottom: 20 }}>
              Hello <strong>{user.name}</strong>, your application for the{' '}
              <strong>{user.department}</strong> department is under review by the registrar office.
            </p>
            <div style={{ background: 'var(--grey0)', border: '1px solid var(--grey2)', borderRadius: 'var(--r)', padding: '12px 14px', textAlign: 'left', marginBottom: 20 }}>
              {[
                ['Name',        user.name],
                ['Student ID',  user.studentId],
                ['Department',  user.department],
              ].map(([label, val]) => (
                <div key={label} style={{ fontSize: 13, marginBottom: 4 }}>
                  <span style={{ color: 'var(--grey3)' }}>{label}: </span>
                  <strong>{val}</strong>
                </div>
              ))}
              <div style={{ fontSize: 13 }}>
                <span style={{ color: 'var(--grey3)' }}>Status: </span>
                <span className="badge badge-yellow">Pending Approval</span>
              </div>
            </div>
            <button className="btn btn-outline-g" onClick={onLogout}>← Back to Sign In</button>
          </div>
        </div>
      </div>
    </div>
  )
}
