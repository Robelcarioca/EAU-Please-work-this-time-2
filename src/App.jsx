import { useState } from 'react'

const ET_LOGO = 'https://assets.airtrfx.com/media-em/et/logos/et-large-default.svg'

const USERS = [
  { id:1, name:'Admin User',      email:'admin@eau.edu.et',      password:'admin123', role:'admin',     status:'approved', department:null,          studentId:null },
  { id:2, name:'Registrar Staff', email:'registrar@eau.edu.et',  password:'reg123',   role:'registrar', status:'approved', department:null,          studentId:null },
  { id:3, name:'Abebe Girma',     email:'abebe@student.eau.et',  password:'pass123',  role:'student',   status:'approved', department:'Avionics',    studentId:'EAU-2024-001' },
  { id:4, name:'Tigist Haile',    email:'tigist@student.eau.et', password:'pass123',  role:'student',   status:'pending',  department:'Power Plant', studentId:'EAU-2024-002' },
  { id:5, name:'Dawit Tadesse',   email:'dawit@student.eau.et',  password:'pass123',  role:'student',   status:'pending',  department:'Airframe',    studentId:'EAU-2024-003' },
]

const DEPTS = [
  { id:'avionics',   name:'Avionics',    icon:'📡', desc:'Aircraft Electronic Systems & Navigation', img:'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=600&q=80' },
  { id:'powerplant', name:'Power Plant', icon:'⚙️', desc:'Turbine Engines & Propulsion Systems',    img:'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=600&q=80' },
  { id:'airframe',   name:'Airframe',    icon:'✈️', desc:'Aircraft Structure & Systems',             img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80' },
  { id:'structure',  name:'Structure',   icon:'🔩', desc:'Composite Materials & Structural Repair',  img:'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600&q=80' },
  { id:'gc',         name:'GC Course',   icon:'📚', desc:'General Course – Freshman Foundation',     img:'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80' },
]

const CONTENT = {
  avionics:   { sections:[{ id:'a1', name:'AVO 1 – DC Fundamentals', modules:[{ id:'m1', title:'Introduction to DC Circuits', pdf:'DC_Circuits.pdf', ppt:null, video:'https://www.youtube.com/embed/F_vLWkkNbKY' },{ id:'m2', title:"Ohm's Law & Kirchhoff's Laws", pdf:'Ohms.pdf', ppt:'Ohms.pptx', video:null },{ id:'m3', title:'Capacitors & Inductors', pdf:'Cap.pdf', ppt:null, video:'https://www.youtube.com/embed/tIrANMKAu8w' }]},{ id:'a2', name:'AVO 2 – AC Fundamentals', modules:[{ id:'m4', title:'AC Waveforms & Phase', pdf:'AC.pdf', ppt:'AC.pptx', video:'https://www.youtube.com/embed/vN9aR2C6KPo' },{ id:'m5', title:'Transformers & Rectifiers', pdf:'Trans.pdf', ppt:null, video:null }]}]},
  powerplant: { sections:[{ id:'p1', name:'PWR 1 – Gas Turbine Theory', modules:[{ id:'m6', title:'Thermodynamic Cycle', pdf:'Thermo.pdf', ppt:null, video:'https://www.youtube.com/embed/KjiUUJdPGX0' },{ id:'m7', title:'Compressor Types', pdf:'Comp.pdf', ppt:'Comp.pptx', video:null }]}]},
  airframe:   { sections:[{ id:'f1', name:'AFR 1 – Aircraft Systems', modules:[{ id:'m8', title:'Hydraulic Systems Overview', pdf:'Hyd.pdf', ppt:null, video:'https://www.youtube.com/embed/HzDe2YNYB5E' }]}]},
  structure:  { sections:[{ id:'s1', name:'STR 1 – Composite Materials', modules:[{ id:'m9', title:'Carbon Fiber Fundamentals', pdf:'Carbon.pdf', ppt:null, video:null }]}]},
  gc:         { sections:[{ id:'g1', name:'GCC 1 – Aviation Fundamentals', modules:[{ id:'m10', title:'History of Aviation', pdf:'Hist.pdf', ppt:'Hist.pptx', video:'https://www.youtube.com/embed/nRU5OcAXfuo' },{ id:'m11', title:'Principles of Flight', pdf:'Flight.pdf', ppt:null, video:'https://www.youtube.com/embed/Gg0TXNXgz-w' }]}]},
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────

function Stripe() {
  return (
    <div style={{ display:'flex', height:4 }}>
      <div style={{ flex:1, background:'#2b8a2b' }} />
      <div style={{ flex:1, background:'#ffc72c' }} />
      <div style={{ flex:1, background:'#c8102e' }} />
    </div>
  )
}

function Logo({ h=30, dark=false }) {
  const [err, setErr] = useState(false)
  if (err) return <span style={{ color: dark ? '#2b8a2b' : '#fff', fontWeight:900, fontSize:14, letterSpacing:2 }}>ETHIOPIAN</span>
  return (
    <img
      src={ET_LOGO}
      alt="Ethiopian Airlines"
      style={{ height:h, objectFit:'contain', filter: dark ? 'none' : 'brightness(0) invert(1)' }}
      onError={() => setErr(true)}
    />
  )
}

function Badge({ children, color='green' }) {
  const map = {
    green:  { bg:'#e8f5e9', text:'#1b5e20' },
    yellow: { bg:'#fff8e1', text:'#f57f17' },
    red:    { bg:'#ffebee', text:'#b71c1c' },
    gray:   { bg:'#f5f5f5', text:'#616161' },
    blue:   { bg:'#e3f2fd', text:'#0d47a1' },
  }
  const { bg, text } = map[color] || map.gray
  return (
    <span style={{ background:bg, color:text, padding:'2px 8px', borderRadius:3, fontSize:11, fontWeight:700, letterSpacing:'.04em', textTransform:'uppercase', display:'inline-flex', alignItems:'center' }}>
      {children}
    </span>
  )
}

function statusBadge(status) {
  if (status === 'approved') return <Badge color="green">{status}</Badge>
  if (status === 'pending')  return <Badge color="yellow">{status}</Badge>
  if (status === 'disabled') return <Badge color="gray">{status}</Badge>
  return <Badge color="red">{status}</Badge>
}

function Btn({ children, variant='green', sm=false, onClick, disabled, style={} }) {
  const base = { display:'inline-flex', alignItems:'center', gap:6, border:'none', cursor:disabled?'not-allowed':'pointer', fontFamily:'inherit', fontWeight:700, borderRadius:4, transition:'all .15s', opacity:disabled?.45:1, ...style }
  const size = sm ? { padding:'6px 12px', fontSize:12 } : { padding:'9px 20px', fontSize:13 }
  const colors = {
    green:    { background:'#2b8a2b', color:'#fff' },
    red:      { background:'#c8102e', color:'#fff' },
    yellow:   { background:'#ffc72c', color:'#212121' },
    danger:   { background:'#d32f2f', color:'#fff' },
    ghost:    { background:'#f5f5f5', color:'#424242', border:'1px solid #e0e0e0' },
    'outline-g': { background:'#fff', color:'#2b8a2b', border:'1.5px solid #2b8a2b' },
    'outline-w': { background:'transparent', color:'#fff', border:'1.5px solid rgba(255,255,255,.65)' },
  }
  return <button style={{ ...base, ...size, ...colors[variant] }} onClick={onClick} disabled={disabled}>{children}</button>
}

function Input({ label, ...props }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      {label && <label style={{ fontSize:11, fontWeight:700, color:'#616161', textTransform:'uppercase', letterSpacing:'.06em' }}>{label}</label>}
      <input
        style={{ padding:'10px 13px', border:'1.5px solid #e0e0e0', borderRadius:4, fontFamily:'inherit', fontSize:14, color:'#212121', background:'#fff', outline:'none', width:'100%' }}
        onFocus={e => e.target.style.borderColor = '#2b8a2b'}
        onBlur={e => e.target.style.borderColor = '#e0e0e0'}
        {...props}
      />
    </div>
  )
}

function Select({ label, children, ...props }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      {label && <label style={{ fontSize:11, fontWeight:700, color:'#616161', textTransform:'uppercase', letterSpacing:'.06em' }}>{label}</label>}
      <select style={{ padding:'10px 13px', border:'1.5px solid #e0e0e0', borderRadius:4, fontFamily:'inherit', fontSize:14, color:'#212121', background:'#fff', outline:'none', width:'100%', appearance:'none' }} {...props}>
        {children}
      </select>
    </div>
  )
}

function Toast({ msg, type, onClose }) {
  useState(() => { const t = setTimeout(onClose, 3800); return () => clearTimeout(t) })
  const icon = type==='success'?'✓':type==='error'?'✕':'ℹ'
  const border = type==='success'?'#4caf50':type==='error'?'#c8102e':'#ffc72c'
  return (
    <div style={{ position:'fixed', bottom:20, right:20, background:'#212121', color:'#fff', padding:'12px 18px', borderRadius:8, zIndex:9999, fontFamily:'sans-serif', fontSize:13, fontWeight:500, display:'flex', alignItems:'center', gap:8, boxShadow:'0 8px 32px rgba(0,0,0,.25)', borderLeft:`4px solid ${border}`, maxWidth:300 }}>
      {icon} {msg}
    </div>
  )
}

function TopNav({ onEnter, showBack, onBack }) {
  const G = '#2b8a2b', G2 = '#1a5e1a'
  return (
    <div style={{ position:'sticky', top:0, zIndex:500, boxShadow:'0 2px 6px rgba(0,0,0,.2)' }}>
      <div style={{ background:G, height:44, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px' }}>
        <div style={{ cursor:'pointer' }} onClick={showBack ? onBack : onEnter}><Logo h={28} /></div>
        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          {showBack
            ? <button onClick={onBack} style={{ background:'transparent', border:'none', color:'rgba(255,255,255,.85)', fontFamily:'inherit', fontSize:13, fontWeight:500, padding:'0 12px', height:44, cursor:'pointer' }}>← Home</button>
            : <>
                {['About EAU','Programs'].map(l => <button key={l} style={{ background:'transparent', border:'none', color:'rgba(255,255,255,.85)', fontFamily:'inherit', fontSize:13, fontWeight:500, padding:'0 12px', height:44, cursor:'pointer' }}>{l}</button>)}
                <button onClick={onEnter} style={{ background:'transparent', border:'none', color:'rgba(255,255,255,.85)', fontFamily:'inherit', fontSize:13, fontWeight:500, padding:'0 12px', height:44, cursor:'pointer' }}>Sign In</button>
                <button onClick={onEnter} style={{ background:'#c8102e', border:'none', color:'#fff', fontFamily:'inherit', fontSize:13, fontWeight:700, padding:'0 16px', height:36, cursor:'pointer', borderRadius:4, marginLeft:4 }}>Enroll Now</button>
              </>
          }
        </div>
      </div>
      <div style={{ background:G2, height:38, display:'flex', alignItems:'center', padding:'0 20px', gap:2, borderTop:'1px solid rgba(255,255,255,.1)' }}>
        {['Book','Information','Services','Learning Portal'].map((l,i) => (
          <button key={l} style={{ background: i===3 ? 'rgba(255,255,255,.15)' : 'transparent', border:'none', borderBottom: i===3 ? '3px solid #ffc72c' : 'none', color: i===3 ? '#fff' : 'rgba(255,255,255,.75)', fontFamily:'inherit', fontSize:13, fontWeight:500, padding:'0 16px', height:38, cursor:'pointer' }}>{l}</button>
        ))}
      </div>
    </div>
  )
}

function Sidebar({ user, active, setActive, onLogout }) {
  const navMap = {
    admin:     [['dashboard','📊','Overview'],['users','👥','Manage Users'],['content','📁','Content Manager'],['upload','⬆️','Upload & Create'],['logs','📋','Audit Logs']],
    registrar: [['dashboard','⏳','Pending Approvals'],['students','🎓','All Students']],
    student:   [['dashboard','🏠','Dashboard'],['search','🔍','Search'],['recent','🕒','Recently Viewed']],
  }
  const items = navMap[user.role] || navMap.student
  return (
    <div style={{ width:230, flexShrink:0, background:'#fff', borderRight:'1px solid #e0e0e0', display:'flex', flexDirection:'column', position:'sticky', top:0, height:'100vh', overflowY:'auto' }}>
      <div style={{ background:'#2b8a2b' }}>
        <div style={{ padding:'12px 16px' }}><Logo h={24} /></div>
        <div style={{ background:'rgba(0,0,0,.2)', padding:'10px 16px' }}>
          <div style={{ color:'#fff', fontSize:13, fontWeight:700 }}>{user.name}</div>
          <div style={{ color:'rgba(255,255,255,.65)', fontSize:11, marginTop:2 }}>{user.role}{user.department ? ` · ${user.department}` : ''}</div>
        </div>
      </div>
      <Stripe />
      <nav style={{ padding:8, flex:1 }}>
        <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:'#9e9e9e', padding:'10px 8px 4px' }}>Navigation</div>
        {items.map(([id,icon,label]) => (
          <button key={id} onClick={() => setActive(id)}
            style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 10px', borderRadius:4, cursor:'pointer', fontSize:13, fontWeight: active===id ? 700 : 500, color: active===id ? '#fff' : '#424242', background: active===id ? '#2b8a2b' : 'transparent', border:'none', width:'100%', textAlign:'left', transition:'all .15s' }}>
            <span style={{ width:18, textAlign:'center' }}>{icon}</span>{label}
          </button>
        ))}
      </nav>
      <div style={{ padding:8, borderTop:'1px solid #e0e0e0' }}>
        <button onClick={onLogout} style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 10px', borderRadius:4, cursor:'pointer', fontSize:13, color:'#c8102e', background:'transparent', border:'none', width:'100%', textAlign:'left' }}>
          <span style={{ width:18, textAlign:'center' }}>🚪</span>Sign Out
        </button>
      </div>
    </div>
  )
}

function MainHeader({ title, sub, extra }) {
  return (
    <div style={{ background:'#fff', borderBottom:'1px solid #e0e0e0', padding:'12px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, boxShadow:'0 1px 4px rgba(0,0,0,.06)' }}>
      <div>
        <div style={{ fontWeight:700, fontSize:15 }}>{title}</div>
        {sub && <div style={{ fontSize:12, color:'#9e9e9e', marginTop:1 }}>{sub}</div>}
      </div>
      {extra || <Logo h={26} dark />}
    </div>
  )
}

function Table({ cols, rows, rowKey, renderRow }) {
  return (
    <div style={{ borderRadius:8, border:'1px solid #e0e0e0', overflow:'auto', boxShadow:'0 1px 4px rgba(0,0,0,.06)' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', background:'#fff' }}>
        <thead>
          <tr>{cols.map(c => <th key={c} style={{ background:'#f5f5f5', padding:'10px 14px', textAlign:'left', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'#2b8a2b', borderBottom:'2px solid #2b8a2b' }}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row,i) => (
            <tr key={rowKey ? row[rowKey] : i} style={{ background: row._pending ? '#fffde7' : '#fff' }}>
              {renderRow(row)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatCard({ icon, label, val, color }) {
  return (
    <div style={{ background:'#fff', borderRadius:8, padding:16, border:'1px solid #e0e0e0', boxShadow:'0 1px 3px rgba(0,0,0,.06)', borderLeft:`4px solid ${color}` }}>
      <div style={{ fontSize:22, marginBottom:8 }}>{icon}</div>
      <div style={{ fontFamily:'serif', fontSize:30, fontWeight:900, color }}>{val}</div>
      <div style={{ fontSize:11, textTransform:'uppercase', letterSpacing:'.07em', color:'#9e9e9e', marginTop:4, fontWeight:700 }}>{label}</div>
    </div>
  )
}

function Panel({ children, style={} }) {
  return <div style={{ background:'#fff', border:'1px solid #e0e0e0', borderRadius:8, padding:16, ...style }}>{children}</div>
}

function SectionTitle({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, fontFamily:'serif', fontSize:20, fontWeight:700, color:'#212121', marginBottom:6 }}>
      <span style={{ width:4, height:22, background:'#2b8a2b', borderRadius:2, display:'block', flexShrink:0 }} />
      {children}
    </div>
  )
}

function EmptyState({ icon, title, sub }) {
  return (
    <div style={{ textAlign:'center', padding:'48px 24px', color:'#9e9e9e' }}>
      <div style={{ fontSize:40, marginBottom:12 }}>{icon}</div>
      <div style={{ fontSize:15, fontWeight:700, color:'#424242', marginBottom:6 }}>{title}</div>
      <div style={{ fontSize:13 }}>{sub}</div>
    </div>
  )
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({ onEnter }) {
  return (
    <div>
      <TopNav onEnter={onEnter} />
      <Stripe />
      {/* Hero */}
      <div style={{ position:'relative', minHeight:420, display:'flex', alignItems:'flex-end', background:'#1a5e1a', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:"url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80')", backgroundSize:'cover', backgroundPosition:'center', opacity:.35 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,rgba(27,94,32,.96) 0%,rgba(27,94,32,.6) 45%,rgba(0,0,0,.1) 100%)' }} />
        <div style={{ position:'relative', zIndex:1, padding:'48px 48px 56px', maxWidth:660 }}>
          <div style={{ fontSize:12, color:'#ffc72c', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:10, display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ width:24, height:2, background:'#ffc72c', display:'block' }} />The New Spirit of Africa
          </div>
          <h1 style={{ fontFamily:'serif', fontSize:'clamp(22px,3.5vw,38px)', fontWeight:900, color:'#fff', lineHeight:1.15, marginBottom:10 }}>
            Ethiopian Aviation University<br />
            <span style={{ color:'#ffc72c' }}>Digital Learning Platform</span>
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.72)', lineHeight:1.7, marginBottom:28, maxWidth:440 }}>
            Empowering the next generation of aviation maintenance technicians with ICAO-accredited education.
          </p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:32 }}>
            <Btn variant="yellow" onClick={onEnter} style={{ padding:'12px 28px', fontSize:15 }}>Access Platform →</Btn>
            <Btn variant="outline-w" onClick={onEnter}>Student Sign In</Btn>
          </div>
          <div style={{ display:'flex', gap:32, flexWrap:'wrap', paddingTop:20, borderTop:'1px solid rgba(255,255,255,.2)' }}>
            {[['4+','Departments'],['500+','Students'],['200+','Modules'],['ICAO','Accredited']].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily:'serif', fontSize:26, fontWeight:900, color:'#ffc72c' }}>{v}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.5)', textTransform:'uppercase', letterSpacing:'.08em', marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Depts */}
      <div style={{ padding:'40px 20px', maxWidth:1100, margin:'0 auto' }}>
        <SectionTitle>Learning Departments</SectionTitle>
        <div style={{ fontSize:13, color:'#757575', marginBottom:20, paddingLeft:14 }}>Select a department to explore courses</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:16 }}>
          {DEPTS.map(d => (
            <div key={d.id} onClick={onEnter}
              style={{ position:'relative', borderRadius:8, overflow:'hidden', aspectRatio:'4/3', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,.12)', border:'1px solid #e0e0e0', transition:'transform .22s,box-shadow .22s' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,.15)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,.12)' }}>
              <img src={d.img} alt={d.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} onError={e => { e.currentTarget.style.display='none' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(0,0,0,.75) 0%,rgba(0,0,0,.2) 55%,rgba(0,0,0,0) 100%)' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:14, color:'#fff' }}>
                <div style={{ fontSize:20, marginBottom:5 }}>{d.icon}</div>
                <div style={{ fontWeight:700, fontSize:14 }}>{d.name}</div>
                <div style={{ fontSize:11, opacity:.65, marginTop:3, lineHeight:1.4 }}>{d.desc}</div>
                <div style={{ display:'flex', height:3, gap:2, marginTop:10, borderRadius:2, overflow:'hidden' }}>
                  <span style={{ flex:1, background:'#2b8a2b' }} /><span style={{ flex:1, background:'#ffc72c' }} /><span style={{ flex:1, background:'#c8102e' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background:'#1a1a1a', color:'#fff', padding:'32px 20px', marginTop:40 }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', flexWrap:'wrap', gap:32 }}>
          <div>
            <Logo h={30} /><p style={{ fontSize:12, color:'rgba(255,255,255,.4)', lineHeight:1.8, marginTop:12 }}>Ethiopian Aviation University<br />Digital Learning Platform</p>
          </div>
          {[['Quick Links',['Departments','Programs','About EAU']],['Contact',['admissions@eau.edu.et','📍 Addis Ababa, Ethiopia']]].map(([t,ls]) => (
            <div key={t}>
              <div style={{ fontWeight:700, fontSize:12, color:'rgba(255,255,255,.45)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:12 }}>{t}</div>
              {ls.map(l => <div key={l} style={{ fontSize:13, color:'rgba(255,255,255,.6)', marginBottom:7 }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ maxWidth:1100, margin:'20px auto 0', borderTop:'1px solid rgba(255,255,255,.1)', paddingTop:14, fontSize:12, color:'rgba(255,255,255,.28)' }}>
          © 2026 Ethiopian Aviation University. All rights reserved.
        </div>
      </div>
    </div>
  )
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function AuthPage({ users, setUsers, onAuth, onBack }) {
  const [tab, setTab]     = useState('login')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ text:'', ok:false })
  const [form, setForm]   = useState({ email:'', password:'', name:'', studentId:'', department:'' })
  const upd = (k,v) => setForm(f => ({ ...f, [k]:v }))

  const login = () => {
    setAlert({ text:'', ok:false })
    const em = form.email.trim().toLowerCase()
    if (!em || !form.password) { setAlert({ text:'Please enter your email and password.', ok:false }); return }
    const u = users.find(x => x.email.trim().toLowerCase() === em && x.password === form.password)
    if (!u)                   { setAlert({ text:'Incorrect email or password.', ok:false }); return }
    if (u.status==='pending') { setAlert({ text:'Your account is pending registrar approval.', ok:false }); return }
    if (u.status==='rejected'){ setAlert({ text:'Your registration was rejected. Contact admissions.', ok:false }); return }
    if (u.status==='disabled'){ setAlert({ text:'Your account has been disabled.', ok:false }); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); onAuth(u) }, 600)
  }

  const signup = () => {
    setAlert({ text:'', ok:false })
    if (!form.name||!form.email||!form.password||!form.studentId||!form.department) { setAlert({ text:'All fields are required.', ok:false }); return }
    if (form.password.length < 6) { setAlert({ text:'Password must be at least 6 characters.', ok:false }); return }
    const em = form.email.trim().toLowerCase()
    if (users.find(u => u.email.trim().toLowerCase()===em)) { setAlert({ text:'This email is already registered.', ok:false }); return }
    const nu = { id:Date.now(), name:form.name.trim(), email:form.email.trim(), password:form.password, role:'student', status:'pending', department:form.department, studentId:form.studentId.trim() }
    setUsers(prev => [...prev, nu])
    setLoading(true)
    setTimeout(() => { setLoading(false); setTab('login'); setForm(f=>({...f,email:form.email.trim(),password:'',name:'',studentId:'',department:''})); setAlert({ text:'Account created! Awaiting registrar approval.', ok:true }) }, 700)
  }

  const onKey = e => { if (e.key==='Enter') tab==='login' ? login() : signup() }

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <TopNav showBack onBack={onBack} />
      <Stripe />
      <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 1fr' }}>
        {/* Left */}
        <div style={{ background:'#2b8a2b', position:'relative', display:'flex', flexDirection:'column', justifyContent:'center', padding:48, overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:"url('https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=900&q=60')", backgroundSize:'cover', opacity:.12 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(150deg,rgba(43,138,43,.65) 0%,rgba(20,70,20,.97) 100%)' }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <Logo h={44} /><br /><br />
            <h2 style={{ fontFamily:'serif', color:'#fff', fontSize:22, fontWeight:900, lineHeight:1.25, marginBottom:10 }}>Ethiopian Aviation University</h2>
            <p style={{ color:'rgba(255,255,255,.65)', fontSize:13, lineHeight:1.8, marginBottom:20 }}>Africa's leading aviation maintenance training institution. ICAO accredited. Internationally recognised.</p>
            <Stripe />
            <div style={{ background:'rgba(255,199,44,.1)', border:'1px solid rgba(255,199,44,.3)', borderRadius:8, padding:14, marginTop:20 }}>
              <div style={{ color:'#ffc72c', fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10 }}>⚡ Demo Credentials</div>
              {[{r:'Admin',e:'admin@eau.edu.et',p:'admin123',n:'Full access'},{r:'Registrar',e:'registrar@eau.edu.et',p:'reg123',n:'Approve students'},{r:'Student ✓',e:'abebe@student.eau.et',p:'pass123',n:'Pre-approved'}].map(x => (
                <div key={x.r} style={{ background:'rgba(0,0,0,.2)', borderRadius:4, padding:'8px 10px', marginBottom:6 }}>
                  <div style={{ color:'#ffc72c', fontSize:11, fontWeight:700 }}>{x.r} <span style={{ color:'rgba(255,255,255,.4)', fontWeight:400 }}>— {x.n}</span></div>
                  <div style={{ color:'rgba(255,255,255,.65)', fontSize:11, fontFamily:'monospace', marginTop:2 }}>{x.e}</div>
                  <div style={{ color:'rgba(255,255,255,.5)', fontSize:11, fontFamily:'monospace' }}>Password: {x.p}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:40, background:'#fff', borderLeft:'1px solid #e0e0e0', overflowY:'auto' }}>
          <div style={{ width:'100%', maxWidth:380 }}>
            <Logo h={38} dark /><br />
            <h1 style={{ fontFamily:'serif', fontSize:22, fontWeight:900, color:'#212121', marginBottom:4, marginTop:16 }}>{tab==='login' ? 'Sign In to Your Account' : 'Create New Account'}</h1>
            <p style={{ color:'#9e9e9e', fontSize:13, marginBottom:20 }}>{tab==='login' ? 'Access your aviation learning dashboard.' : 'Register as a new aviation student.'}</p>

            <div style={{ display:'flex', borderBottom:'2px solid #e0e0e0', marginBottom:24 }}>
              {['login','signup'].map(t => (
                <button key={t} onClick={() => { setTab(t); setAlert({text:'',ok:false}) }}
                  style={{ flex:1, padding:10, border:'none', background:'transparent', fontFamily:'inherit', fontSize:14, fontWeight: tab===t ? 700 : 500, color: tab===t ? '#2b8a2b' : '#9e9e9e', cursor:'pointer', borderBottom: tab===t ? '2px solid #2b8a2b' : 'none', marginBottom:-2 }}>
                  {t==='login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            {alert.text && (
              <div style={{ background: alert.ok ? '#e8f5e9' : '#ffebee', border:`1px solid ${alert.ok?'#a5d6a7':'#ef9a9a'}`, borderRadius:4, padding:'12px 16px', color: alert.ok ? '#1b5e20' : '#b71c1c', fontSize:13, marginBottom:16, display:'flex', alignItems:'flex-start', gap:8, lineHeight:1.5 }}>
                <span style={{ flexShrink:0 }}>{alert.ok ? '✓' : '✕'}</span>{alert.text}
              </div>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {tab==='signup' && (
                <>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    <Input label="Full Name" placeholder="Abebe Girma" value={form.name} onChange={e=>upd('name',e.target.value)} onKeyDown={onKey} />
                    <Input label="Student ID" placeholder="EAU-2024-XXX" value={form.studentId} onChange={e=>upd('studentId',e.target.value)} onKeyDown={onKey} />
                  </div>
                  <Select label="Department" value={form.department} onChange={e=>upd('department',e.target.value)}>
                    <option value="">— Select Department —</option>
                    {['Avionics','Power Plant','Airframe','Structure','AMT'].map(d => <option key={d} value={d}>{d}</option>)}
                  </Select>
                </>
              )}
              <Input label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={e=>upd('email',e.target.value)} onKeyDown={onKey} autoComplete="email" />
              <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={e=>upd('password',e.target.value)} onKeyDown={onKey} autoComplete={tab==='login'?'current-password':'new-password'} />
              <button
                onClick={tab==='login' ? login : signup}
                disabled={loading}
                style={{ background:'#2b8a2b', color:'#fff', border:'none', borderRadius:4, padding:'11px', fontFamily:'inherit', fontSize:14, fontWeight:700, cursor:loading?'not-allowed':'pointer', opacity:loading?.7:1, width:'100%', marginTop:4 }}>
                {loading ? '⏳ Please wait…' : tab==='login' ? 'Sign In to Platform' : 'Create Account →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PENDING SCREEN ───────────────────────────────────────────────────────────
function PendingScreen({ user, onLogout }) {
  return (
    <div style={{ minHeight:'100vh', background:'#f5f5f5', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#2b8a2b', padding:'12px 20px' }}><Logo h={28} /></div>
      <Stripe />
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ background:'#fff', borderRadius:8, border:'1px solid #e0e0e0', boxShadow:'0 2px 8px rgba(0,0,0,.12)', maxWidth:440, width:'100%', overflow:'hidden', borderTop:'4px solid #ffc72c' }}>
          <div style={{ background:'#2b8a2b', padding:'18px 24px' }}><Logo h={28} /></div>
          <Stripe />
          <div style={{ padding:28, textAlign:'center' }}>
            <div style={{ width:64, height:64, background:'#fff8e1', border:'2px solid #ffc72c', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, margin:'0 auto 16px' }}>⏳</div>
            <h2 style={{ fontFamily:'serif', fontSize:20, marginBottom:10 }}>Account Under Review</h2>
            <p style={{ color:'#424242', fontSize:13, lineHeight:1.75, marginBottom:20 }}>
              Hello <strong>{user.name}</strong>, your application for <strong>{user.department}</strong> is under review by the registrar office.
            </p>
            <div style={{ background:'#f5f5f5', border:'1px solid #e0e0e0', borderRadius:4, padding:'12px 14px', textAlign:'left', marginBottom:20 }}>
              {[['Name',user.name],['Student ID',user.studentId],['Department',user.department]].map(([l,v]) => (
                <div key={l} style={{ fontSize:13, marginBottom:4 }}><span style={{ color:'#9e9e9e' }}>{l}: </span><strong>{v}</strong></div>
              ))}
              <div style={{ fontSize:13 }}><span style={{ color:'#9e9e9e' }}>Status: </span><Badge color="yellow">Pending Approval</Badge></div>
            </div>
            <Btn variant="outline-g" onClick={onLogout}>← Back to Sign In</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── MODULE VIEWER ────────────────────────────────────────────────────────────
function ModViewer({ dept, sec, mod, onBack, toast }) {
  const firstTab = mod.pdf ? 'pdf' : mod.ppt ? 'ppt' : 'video'
  const [tab, setTab] = useState(firstTab)
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#f5f5f5' }}>
      <div style={{ background:'#2b8a2b', color:'#fff', padding:'12px 20px', display:'flex', alignItems:'center', gap:12 }}>
        <Btn variant="outline-w" sm onClick={onBack}>← Back</Btn>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:'rgba(255,255,255,.6)', marginBottom:2 }}>{dept.name} › {sec.name}</div>
          <div style={{ fontWeight:700, fontSize:14 }}>{mod.title}</div>
        </div>
        <Logo h={24} />
      </div>
      <Stripe />
      <div style={{ display:'flex', background:'#fff', borderBottom:'1px solid #e0e0e0' }}>
        {mod.pdf   && <button onClick={()=>setTab('pdf')}   style={{ padding:'10px 20px', border:'none', background:'transparent', fontFamily:'inherit', fontSize:13, fontWeight:600, color:tab==='pdf'?'#2b8a2b':'#9e9e9e', cursor:'pointer', borderBottom:tab==='pdf'?'3px solid #2b8a2b':'none' }}>📄 PDF Material</button>}
        {mod.ppt   && <button onClick={()=>setTab('ppt')}   style={{ padding:'10px 20px', border:'none', background:'transparent', fontFamily:'inherit', fontSize:13, fontWeight:600, color:tab==='ppt'?'#2b8a2b':'#9e9e9e', cursor:'pointer', borderBottom:tab==='ppt'?'3px solid #2b8a2b':'none' }}>📊 PowerPoint</button>}
        {mod.video && <button onClick={()=>setTab('video')} style={{ padding:'10px 20px', border:'none', background:'transparent', fontFamily:'inherit', fontSize:13, fontWeight:600, color:tab==='video'?'#2b8a2b':'#9e9e9e', cursor:'pointer', borderBottom:tab==='video'?'3px solid #2b8a2b':'none' }}>🎬 Video</button>}
      </div>
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        {(tab==='pdf'||tab==='ppt') && (
          <div style={{ width:'100%', maxWidth:640 }}>
            <div style={{ background:'#fff', border:'1px solid #e0e0e0', borderRadius:4, padding:40, boxShadow:'0 4px 24px rgba(0,0,0,.14)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, paddingBottom:14, borderBottom:'3px solid #2b8a2b', marginBottom:18 }}>
                <Logo h={34} dark />
                <div>
                  <div style={{ fontSize:10, color:'#9e9e9e', textTransform:'uppercase', letterSpacing:'.07em' }}>Ethiopian Aviation University</div>
                  <div style={{ fontSize:12, fontWeight:600, color:'#424242' }}>{dept.name} — {sec.name}</div>
                </div>
              </div>
              <h2 style={{ fontFamily:'serif', fontSize:20, marginBottom:14 }}>{mod.title}</h2>
              <p style={{ fontSize:14, lineHeight:1.85, color:'#424242', marginBottom:12 }}>
                This is a demonstration of the EAU built-in {tab==='ppt'?'PowerPoint':'PDF'} viewer. In production, authenticated documents are securely rendered via cloud storage with role-based access control.
              </p>
              <p style={{ fontSize:14, lineHeight:1.85, color:'#424242', marginBottom:12 }}>
                The curriculum adheres to ICAO Doc 9379, EASA Part-66 standards, and Ethiopian CAA regulations for aviation maintenance training.
              </p>
              <div style={{ textAlign:'center', fontSize:11, color:'#9e9e9e', marginTop:20, paddingTop:12, borderTop:'1px solid #e0e0e0', fontFamily:'monospace' }}>
                Page 1 of 14 · {tab==='ppt'?mod.ppt:mod.pdf}
              </div>
            </div>
            <div style={{ display:'flex', gap:10, justifyContent:'center', marginTop:16 }}>
              <Btn variant="green" sm onClick={()=>toast('Opening full screen…','info')}>📂 Full Screen</Btn>
              <Btn variant="ghost" sm onClick={()=>toast(`Downloading ${tab==='ppt'?mod.ppt:mod.pdf}`,'success')}>⬇ Download</Btn>
            </div>
          </div>
        )}
        {tab==='video' && mod.video && (
          <div style={{ width:'100%', maxWidth:860 }}>
            <div style={{ borderRadius:8, overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,.18)', border:'1px solid #e0e0e0' }}>
              <iframe width="100%" height="460" src={mod.video} title={mod.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ display:'block' }} />
            </div>
            <p style={{ color:'#9e9e9e', fontSize:12, textAlign:'center', marginTop:10 }}>{mod.title} — {dept.name}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── STUDENT DASH ─────────────────────────────────────────────────────────────
function DeptView({ dept, content, onBack, onMod }) {
  const [open, setOpen] = useState({})
  const toggle = id => setOpen(o => ({ ...o, [id]:!o[id] }))
  const deptContent = content[dept.id]
  return (
    <div style={{ padding:24, maxWidth:860, margin:'0 auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#9e9e9e', marginBottom:18 }}>
        <a onClick={onBack} style={{ color:'#2b8a2b', cursor:'pointer', fontWeight:600, textDecoration:'none' }}>Dashboard</a>
        <span>›</span><span>{dept.name}</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24, paddingBottom:16, borderBottom:'2px solid #2b8a2b' }}>
        <div style={{ width:48, height:48, background:'#2b8a2b', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{dept.icon}</div>
        <div>
          <h1 style={{ fontFamily:'serif', fontSize:22, fontWeight:900 }}>{dept.name}</h1>
          <p style={{ color:'#757575', fontSize:13 }}>{dept.desc}</p>
        </div>
      </div>
      {deptContent ? deptContent.sections.map(sec => (
        <div key={sec.id} style={{ border:'1px solid #e0e0e0', borderRadius:8, overflow:'hidden', marginBottom:10, background:'#fff', boxShadow:'0 1px 3px rgba(0,0,0,.06)' }}>
          <div onClick={()=>toggle(sec.id)}
            style={{ padding:'13px 16px', background: open[sec.id] ? '#e8f5e8' : '#f5f5f5', borderBottom: open[sec.id] ? '1px solid #2b8a2b' : '1px solid #e0e0e0', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', userSelect:'none' }}>
            <div style={{ fontWeight:700, fontSize:13.5, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ color:'#2b8a2b' }}>▸</span>{sec.name}
              <Badge color="green">{sec.modules.length}</Badge>
            </div>
            <span style={{ color:'#9e9e9e', fontSize:12, transform: open[sec.id]?'rotate(180deg)':'none', display:'inline-block', transition:'transform .2s' }}>▼</span>
          </div>
          {open[sec.id] && (
            <div style={{ padding:6 }}>
              {sec.modules.map((m,i) => (
                <div key={m.id} onClick={()=>onMod(dept,sec,m)}
                  style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderRadius:4, cursor:'pointer', transition:'background .15s', gap:12 }}
                  onMouseEnter={e=>e.currentTarget.style.background='#f5f5f5'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{ fontSize:13, fontWeight:500, color:'#424242', display:'flex', alignItems:'center', gap:8, flex:1 }}>
                    <span style={{ width:22, height:22, borderRadius:3, background:'#e8f5e8', border:'1px solid #b2ddb2', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#1f6e1f', flexShrink:0 }}>{i+1}</span>
                    {m.title}
                  </div>
                  <div style={{ display:'flex', gap:4 }}>
                    {m.pdf   && <span style={{ background:'#fde8ea', color:'#c8102e', padding:'2px 7px', borderRadius:3, fontSize:10, fontWeight:700, textTransform:'uppercase' }}>PDF</span>}
                    {m.ppt   && <span style={{ background:'#fff3e0', color:'#e65100', padding:'2px 7px', borderRadius:3, fontSize:10, fontWeight:700, textTransform:'uppercase' }}>PPT</span>}
                    {m.video && <span style={{ background:'#e8f5e8', color:'#1f6e1f', padding:'2px 7px', borderRadius:3, fontSize:10, fontWeight:700, textTransform:'uppercase' }}>VID</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )) : <EmptyState icon="📭" title="No content yet" sub="The admin has not added modules to this department yet." />}
    </div>
  )
}

function StudentDash({ user, content, toast }) {
  const [view,setView]     = useState('dashboard')
  const [dept,setDept]     = useState(null)
  const [mod,setMod]       = useState(null)
  const [recent,setRecent] = useState([])
  const [query,setQuery]   = useState('')
  const [results,setResults] = useState([])
  const logout = () => window.location.reload()
  const switchView = v => { setView(v); setDept(null) }
  const openMod = (d,s,m) => {
    setMod({ dept:d, sec:s, mod:m })
    setRecent(r => [{ dept:d, sec:s, mod:m, time:Date.now() }, ...r.filter(x=>x.mod.id!==m.id)].slice(0,12))
  }
  const doSearch = val => {
    setQuery(val)
    if (!val.trim()) { setResults([]); return }
    const found = []
    DEPTS.forEach(d => (content[d.id]?.sections||[]).forEach(s => s.modules.forEach(m => {
      if (m.title.toLowerCase().includes(val.toLowerCase()) || s.name.toLowerCase().includes(val.toLowerCase()))
        found.push({ dept:d, sec:s, mod:m })
    })))
    setResults(found)
  }
  if (mod) return <ModViewer dept={mod.dept} sec={mod.sec} mod={mod.mod} onBack={()=>setMod(null)} toast={toast} />
  if (dept) return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      <Sidebar user={user} active="dashboard" setActive={switchView} onLogout={logout} />
      <div style={{ flex:1, background:'#f5f5f5', overflowY:'auto' }}>
        <MainHeader title={`${dept.icon} ${dept.name}`} sub={dept.desc} />
        <DeptView dept={dept} content={content} onBack={()=>setDept(null)} onMod={openMod} />
      </div>
    </div>
  )
  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      <Sidebar user={user} active={view} setActive={switchView} onLogout={logout} />
      <div style={{ flex:1, background:'#f5f5f5', overflowY:'auto' }}>
        <MainHeader title="Student Learning Portal" sub={`Welcome back, ${user.name.split(' ')[0]} · ${user.department} · ${user.studentId}`} />
        <div style={{ padding:24, maxWidth:1060 }}>
          {view==='dashboard' && (
            <>
              <SectionTitle>My Departments</SectionTitle>
              <div style={{ fontSize:13, color:'#757575', marginBottom:20, paddingLeft:14 }}>Select a department to access your learning materials</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:16 }}>
                {DEPTS.map(d => (
                  <div key={d.id} onClick={()=>setDept(d)}
                    style={{ position:'relative', borderRadius:8, overflow:'hidden', aspectRatio:'4/3', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,.12)', border:'1px solid #e0e0e0', transition:'transform .22s' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                    <img src={d.img} alt={d.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} onError={e=>{e.currentTarget.style.display='none'}} />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(0,0,0,.75) 0%,rgba(0,0,0,.2) 55%,rgba(0,0,0,0) 100%)' }} />
                    <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:14, color:'#fff' }}>
                      <div style={{ fontSize:20, marginBottom:5 }}>{d.icon}</div>
                      <div style={{ fontWeight:700, fontSize:14 }}>{d.name}</div>
                      <div style={{ fontSize:11, opacity:.65, marginTop:3, lineHeight:1.4 }}>{d.desc}</div>
                      <div style={{ display:'flex', height:3, gap:2, marginTop:10, borderRadius:2, overflow:'hidden' }}>
                        <span style={{ flex:1, background:'#2b8a2b' }} /><span style={{ flex:1, background:'#ffc72c' }} /><span style={{ flex:1, background:'#c8102e' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {view==='search' && (
            <>
              <SectionTitle>Search Materials</SectionTitle>
              <input
                style={{ width:'100%', padding:'12px 14px', border:'1.5px solid #e0e0e0', borderRadius:4, fontFamily:'inherit', fontSize:15, marginBottom:16, outline:'none' }}
                placeholder="Search modules, sections, departments…"
                value={query} onChange={e=>doSearch(e.target.value)}
                onFocus={e=>e.target.style.borderColor='#2b8a2b'}
                onBlur={e=>e.target.style.borderColor='#e0e0e0'}
              />
              {results.length > 0
                ? results.map((r,i) => (
                    <div key={i} onClick={()=>openMod(r.dept,r.sec,r.mod)}
                      style={{ border:'1px solid #e0e0e0', borderRadius:8, background:'#fff', marginBottom:8, cursor:'pointer', overflow:'hidden' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#f9fff9'}
                      onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
                      <div style={{ padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <span>{r.dept.icon}</span>
                          <div>
                            <div style={{ fontWeight:700 }}>{r.mod.title}</div>
                            <div style={{ fontSize:12, color:'#9e9e9e', marginTop:2 }}>{r.dept.name} › {r.sec.name}</div>
                          </div>
                        </div>
                        <div style={{ display:'flex', gap:4 }}>
                          {r.mod.pdf   && <span style={{ background:'#fde8ea', color:'#c8102e', padding:'2px 7px', borderRadius:3, fontSize:10, fontWeight:700, textTransform:'uppercase' }}>PDF</span>}
                          {r.mod.ppt   && <span style={{ background:'#fff3e0', color:'#e65100', padding:'2px 7px', borderRadius:3, fontSize:10, fontWeight:700, textTransform:'uppercase' }}>PPT</span>}
                          {r.mod.video && <span style={{ background:'#e8f5e8', color:'#1f6e1f', padding:'2px 7px', borderRadius:3, fontSize:10, fontWeight:700, textTransform:'uppercase' }}>VID</span>}
                        </div>
                      </div>
                    </div>
                  ))
                : query ? <EmptyState icon="🔍" title="No results found" sub="Try a different keyword." /> : null}
            </>
          )}
          {view==='recent' && (
            <>
              <SectionTitle>Recently Viewed</SectionTitle>
              {recent.length===0
                ? <EmptyState icon="🕒" title="No history yet" sub="Open a module to see it here." />
                : recent.map((r,i) => (
                    <div key={i} onClick={()=>openMod(r.dept,r.sec,r.mod)}
                      style={{ border:'1px solid #e0e0e0', borderRadius:8, background:'#fff', marginBottom:8, cursor:'pointer', padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#f9fff9'}
                      onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span>{r.dept.icon}</span>
                        <div>
                          <div style={{ fontWeight:700, fontSize:13 }}>{r.mod.title}</div>
                          <div style={{ fontSize:12, color:'#9e9e9e', marginTop:2 }}>{r.dept.name} › {r.sec.name}</div>
                        </div>
                      </div>
                      <span style={{ fontSize:12, color:'#9e9e9e' }}>{Math.max(1,Math.round((Date.now()-r.time)/60000))}m ago</span>
                    </div>
                  ))
              }
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── ADMIN DASH ───────────────────────────────────────────────────────────────
function AdminDash({ user, users, setUsers, content, setContent, toast }) {
  const [view,setView]   = useState('dashboard')
  const [deptF,setDeptF] = useState('')
  const [ns,setNs] = useState({ dept:'', name:'' })
  const [nm,setNm] = useState({ dept:'', section:'', title:'' })

  const students = users.filter(u=>u.role==='student')
  const pending  = students.filter(u=>u.status==='pending')
  const approved = students.filter(u=>u.status==='approved')
  const totalMods = Object.values(content).reduce((a,d)=>a+(d?.sections?.reduce((b,s)=>b+s.modules.length,0)||0),0)

  const approve = (id,status) => { setUsers(u=>u.map(x=>x.id===id?{...x,status}:x)); toast(`Student ${status==='approved'?'approved ✓':'rejected'}`, status==='approved'?'success':'error') }
  const toggleRole = id => { setUsers(u=>u.map(x=>x.id===id&&x.role!=='admin'?{...x,role:x.role==='registrar'?'student':'registrar'}:x)); toast('Role updated','success') }
  const toggleDisable = id => { setUsers(u=>u.map(x=>x.id===id?{...x,status:x.status==='disabled'?'approved':'disabled'}:x)); toast('Account updated','success') }
  const addSec = () => {
    if(!ns.dept||!ns.name){toast('Fill all fields','error');return}
    setContent(c=>({...c,[ns.dept]:{...c[ns.dept],sections:[...(c[ns.dept]?.sections||[]),{id:'s'+Date.now(),name:ns.name,modules:[]}]}}))
    setNs({dept:'',name:''}); toast('Section created','success')
  }
  const addMod = () => {
    if(!nm.dept||!nm.section||!nm.title){toast('Fill all fields','error');return}
    const m={id:'m'+Date.now(),title:nm.title,pdf:null,ppt:null,video:null}
    setContent(c=>({...c,[nm.dept]:{...c[nm.dept],sections:c[nm.dept].sections.map(s=>s.id===nm.section?{...s,modules:[...s.modules,m]}:s)}}))
    setNm({dept:'',section:'',title:''}); toast('Module added','success')
  }
  const delMod = (dId,sId,mId) => { setContent(c=>({...c,[dId]:{...c[dId],sections:c[dId].sections.map(s=>s.id===sId?{...s,modules:s.modules.filter(m=>m.id!==mId)}:s)}})); toast('Deleted','success') }

  const filtered = users.filter(u=>u.role!=='admin'&&(!deptF||u.department===deptF))
  const logout = () => window.location.reload()

  const Td = ({children,style={}}) => <td style={{ padding:'11px 14px', fontSize:13, borderBottom:'1px solid #eeeeee', color:'#424242', verticalAlign:'middle', ...style }}>{children}</td>
  const Th = ({children}) => <th style={{ background:'#f5f5f5', padding:'10px 14px', textAlign:'left', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'#2b8a2b', borderBottom:'2px solid #2b8a2b' }}>{children}</th>

  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      <Sidebar user={user} active={view} setActive={setView} onLogout={logout} />
      <div style={{ flex:1, background:'#f5f5f5', overflowY:'auto' }}>
        <MainHeader
          title="Administration Panel"
          sub="Ethiopian Aviation University — System Admin"
          extra={<div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {pending.length>0 && <Badge color="yellow">⏳ {pending.length} Pending</Badge>}
            <Logo h={26} dark />
          </div>}
        />
        <div style={{ padding:24, maxWidth:1060 }}>

          {/* OVERVIEW */}
          {view==='dashboard' && (
            <>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))', gap:14, marginBottom:24 }}>
                <StatCard icon="🎓" label="Total Students"   val={students.length} color="#2b8a2b" />
                <StatCard icon="⏳" label="Pending Approval" val={pending.length}  color="#e65100" />
                <StatCard icon="✅" label="Approved"         val={approved.length} color="#2b8a2b" />
                <StatCard icon="📚" label="Total Modules"    val={totalMods}       color="#c8102e" />
              </div>

              {/* PENDING */}
              <div style={{ background:'#fff', borderRadius:8, border:'1px solid #e0e0e0', boxShadow:'0 1px 4px rgba(0,0,0,.06)', overflow:'hidden', marginBottom:24, borderLeft:'4px solid #ffc72c' }}>
                <div style={{ padding:'12px 16px', borderBottom:'1px solid #e0e0e0', background:'#f5f5f5', display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontWeight:700, fontSize:13 }}>⏳ Pending Student Approvals</span>
                  {pending.length>0 && <Badge color="yellow">{pending.length} awaiting</Badge>}
                </div>
                {pending.length===0
                  ? <div style={{ padding:'14px 20px', background:'#e8f5e9', border:'1px solid #a5d6a7', display:'flex', alignItems:'center', gap:8, color:'#1b5e20', fontSize:13 }}>✅ All clear — no pending approvals.</div>
                  : <div style={{ overflowX:'auto' }}><table style={{ width:'100%', borderCollapse:'collapse', background:'#fff' }}>
                      <thead><tr><Th>Student</Th><Th>ID</Th><Th>Department</Th><Th>Actions</Th></tr></thead>
                      <tbody>{pending.map(u => (
                        <tr key={u.id} style={{ background:'#fffde7' }}>
                          <Td><div style={{ fontWeight:700 }}>{u.name}</div><div style={{ fontSize:12, color:'#9e9e9e' }}>{u.email}</div></Td>
                          <Td><code style={{ fontSize:12, background:'#f5f5f5', padding:'2px 6px', borderRadius:3 }}>{u.studentId||'—'}</code></Td>
                          <Td><span style={{ fontWeight:600 }}>{DEPTS.find(d=>d.name===u.department)?.icon||'🎓'} {u.department||'—'}</span></Td>
                          <Td><div style={{ display:'flex', gap:6 }}><Btn variant="green" sm onClick={()=>approve(u.id,'approved')}>✓ Approve</Btn><Btn variant="danger" sm onClick={()=>approve(u.id,'rejected')}>✕ Reject</Btn></div></Td>
                        </tr>
                      ))}</tbody>
                    </table></div>
                }
              </div>

              <SectionTitle>All Students</SectionTitle>
              <div style={{ borderRadius:8, border:'1px solid #e0e0e0', overflow:'auto', boxShadow:'0 1px 4px rgba(0,0,0,.06)', marginTop:12 }}>
                <table style={{ width:'100%', borderCollapse:'collapse', background:'#fff' }}>
                  <thead><tr><Th>Name</Th><Th>Department</Th><Th>Status</Th></tr></thead>
                  <tbody>{students.map(u => (
                    <tr key={u.id}>
                      <Td><div style={{ fontWeight:600 }}>{u.name}</div><div style={{ fontSize:12, color:'#9e9e9e' }}>{u.email}</div></Td>
                      <Td>{u.department}</Td>
                      <Td>{statusBadge(u.status)}</Td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </>
          )}

          {/* USERS */}
          {view==='users' && (
            <>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
                <SectionTitle>Manage Users</SectionTitle>
                <select style={{ padding:'8px 12px', border:'1.5px solid #e0e0e0', borderRadius:4, fontFamily:'inherit', fontSize:13 }} value={deptF} onChange={e=>setDeptF(e.target.value)}>
                  <option value="">All Departments</option>
                  {['Avionics','Power Plant','Airframe','Structure','AMT'].map(d=><option key={d}>{d}</option>)}
                </select>
              </div>
              <div style={{ borderRadius:8, border:'1px solid #e0e0e0', overflow:'auto', boxShadow:'0 1px 4px rgba(0,0,0,.06)' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', background:'#fff' }}>
                  <thead><tr><Th>User</Th><Th>ID</Th><Th>Dept/Role</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
                  <tbody>{filtered.map(u => (
                    <tr key={u.id} style={{ background: u.status==='pending' ? '#fffde7' : '#fff' }}>
                      <Td><div style={{ fontWeight:600 }}>{u.name}</div><div style={{ fontSize:12, color:'#9e9e9e' }}>{u.email}</div></Td>
                      <Td><code style={{ fontSize:12 }}>{u.studentId||'—'}</code></Td>
                      <Td>{u.department||u.role}</Td>
                      <Td>{statusBadge(u.status)}</Td>
                      <Td><div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                        {u.status==='pending'&&<><Btn variant="green" sm onClick={()=>approve(u.id,'approved')}>✓ Approve</Btn><Btn variant="danger" sm onClick={()=>approve(u.id,'rejected')}>✕ Reject</Btn></>}
                        {u.status==='approved'&&u.role==='student'&&<Btn variant="ghost" sm onClick={()=>toggleRole(u.id)}>↑ Registrar</Btn>}
                        {u.role==='registrar'&&<Btn variant="ghost" sm onClick={()=>toggleRole(u.id)}>↓ Remove</Btn>}
                        {(u.status==='approved'||u.status==='disabled')&&<Btn variant="ghost" sm onClick={()=>toggleDisable(u.id)}>{u.status==='disabled'?'Enable':'Disable'}</Btn>}
                      </div></Td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </>
          )}

          {/* CONTENT */}
          {view==='content' && (
            <>
              <SectionTitle>Content Manager</SectionTitle>
              <div style={{ marginTop:16 }}>{DEPTS.map(d => (
                <div key={d.id} style={{ background:'#fff', borderRadius:8, border:'1px solid #e0e0e0', overflow:'hidden', marginBottom:12 }}>
                  <div style={{ padding:'12px 16px', borderBottom:'2px solid #2b8a2b', background:'#f5f5f5', display:'flex', alignItems:'center', gap:8 }}>
                    <span>{d.icon}</span><span style={{ fontWeight:700, fontSize:13 }}>{d.name}</span>
                    <Badge color="green">{content[d.id]?.sections?.length||0} sections</Badge>
                  </div>
                  <div style={{ padding:10 }}>
                    {(content[d.id]?.sections||[]).map(sec => (
                      <div key={sec.id} style={{ background:'#f5f5f5', borderRadius:6, padding:10, marginBottom:8, border:'1px solid #e0e0e0' }}>
                        <div style={{ fontWeight:700, fontSize:12, color:'#2b8a2b', marginBottom:6 }}>📂 {sec.name}</div>
                        {sec.modules.map(m => (
                          <div key={m.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'6px 10px', background:'#fff', border:'1px solid #e0e0e0', borderRadius:4, marginBottom:4 }}>
                            <span style={{ fontSize:13, fontWeight:500 }}>{m.title}</span>
                            <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                              {m.pdf&&<span style={{ background:'#fde8ea', color:'#c8102e', padding:'2px 7px', borderRadius:3, fontSize:10, fontWeight:700, textTransform:'uppercase' }}>PDF</span>}
                              {m.ppt&&<span style={{ background:'#fff3e0', color:'#e65100', padding:'2px 7px', borderRadius:3, fontSize:10, fontWeight:700, textTransform:'uppercase' }}>PPT</span>}
                              {m.video&&<span style={{ background:'#e8f5e8', color:'#1f6e1f', padding:'2px 7px', borderRadius:3, fontSize:10, fontWeight:700, textTransform:'uppercase' }}>VID</span>}
                              <Btn variant="ghost" sm onClick={()=>delMod(d.id,sec.id,m.id)}>🗑</Btn>
                            </div>
                          </div>
                        ))}
                        {!sec.modules.length&&<div style={{ fontSize:12, color:'#9e9e9e', fontStyle:'italic' }}>No modules yet</div>}
                      </div>
                    ))}
                    {!content[d.id]?.sections?.length&&<div style={{ fontSize:12, color:'#9e9e9e', fontStyle:'italic', padding:'4px 2px' }}>No sections yet.</div>}
                  </div>
                </div>
              ))}</div>
            </>
          )}

          {/* UPLOAD */}
          {view==='upload' && (
            <>
              <SectionTitle>Upload & Create Content</SectionTitle>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:16 }}>
                <Panel>
                  <div style={{ fontWeight:700, marginBottom:14 }}>➕ Add New Section</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                    <Select label="Department" value={ns.dept} onChange={e=>setNs(s=>({...s,dept:e.target.value}))}>
                      <option value="">Select Department</option>
                      {DEPTS.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
                    </Select>
                    <Input label="Section Name" placeholder="e.g. AVO 8 – Advanced Nav" value={ns.name} onChange={e=>setNs(s=>({...s,name:e.target.value}))} />
                    <Btn variant="green" onClick={addSec}>Create Section</Btn>
                  </div>
                </Panel>
                <Panel>
                  <div style={{ fontWeight:700, marginBottom:14 }}>➕ Add Module to Section</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                    <Select label="Department" value={nm.dept} onChange={e=>setNm(m=>({...m,dept:e.target.value,section:''}))}>
                      <option value="">Select</option>
                      {DEPTS.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
                    </Select>
                    <Select label="Section" value={nm.section} onChange={e=>setNm(m=>({...m,section:e.target.value}))} disabled={!nm.dept}>
                      <option value="">Select</option>
                      {(content[nm.dept]?.sections||[]).map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
                    </Select>
                    <Input label="Module Title" placeholder="e.g. Autopilot Systems" value={nm.title} onChange={e=>setNm(m=>({...m,title:e.target.value}))} />
                    <Btn variant="red" onClick={addMod}>Add Module</Btn>
                  </div>
                </Panel>
              </div>
              <Panel style={{ marginTop:14 }}>
                <div style={{ fontWeight:700, marginBottom:12 }}>📎 Attach Files to Module</div>
                <div style={{ background:'#e8f5e8', border:'2px dashed #81c784', borderRadius:8, padding:36, textAlign:'center' }}>
                  <div style={{ fontSize:36, marginBottom:10 }}>☁️</div>
                  <div style={{ fontWeight:700, marginBottom:4 }}>Drag & Drop Files Here</div>
                  <div style={{ fontSize:13, color:'#9e9e9e', marginBottom:14 }}>Supports PDF, PPTX, or YouTube URL</div>
                  <Btn variant="green" sm onClick={()=>toast('File upload active in production','info')}>Choose Files</Btn>
                </div>
              </Panel>
            </>
          )}

          {/* LOGS */}
          {view==='logs' && (
            <>
              <SectionTitle>Audit Logs</SectionTitle>
              <div style={{ borderRadius:8, border:'1px solid #e0e0e0', overflow:'auto', boxShadow:'0 1px 4px rgba(0,0,0,.06)', marginTop:16 }}>
                <table style={{ width:'100%', borderCollapse:'collapse', background:'#fff' }}>
                  <thead><tr><Th>Timestamp</Th><Th>Action</Th><Th>Actor</Th><Th>Details</Th></tr></thead>
                  <tbody>{[
                    { t:'Today 10:42',a:'User Approved',  ac:'Admin User',      d:'Abebe Girma — Avionics' },
                    { t:'Today 10:38',a:'Module Created', ac:'Admin User',      d:'DC Circuit Analysis Lab' },
                    { t:'Today 09:55',a:'File Uploaded',  ac:'Admin User',      d:'AC_Waveforms.pdf → AVO 2' },
                    { t:'Today 09:30',a:'User Rejected',  ac:'Registrar Staff', d:'Applicant — Power Plant' },
                  ].map((r,i) => (
                    <tr key={i}>
                      <Td><code style={{ fontSize:12 }}>{r.t}</code></Td>
                      <Td><Badge color="blue">{r.a}</Badge></Td>
                      <Td style={{ fontWeight:600 }}>{r.ac}</Td>
                      <Td style={{ color:'#616161' }}>{r.d}</Td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── REGISTRAR DASH ───────────────────────────────────────────────────────────
function RegistrarDash({ user, users, setUsers, toast }) {
  const [view,setView]   = useState('dashboard')
  const [deptF,setDeptF] = useState('')
  const update = (id,status) => { setUsers(u=>u.map(x=>x.id===id?{...x,status}:x)); toast(`Student ${status==='approved'?'approved ✓':'rejected'}`,status==='approved'?'success':'error') }
  const pending = users.filter(u=>u.role==='student'&&u.status==='pending'&&(!deptF||u.department===deptF))
  const all     = users.filter(u=>u.role==='student'&&(!deptF||u.department===deptF))
  const list    = view==='dashboard' ? pending : all
  const logout = () => window.location.reload()
  const Th = ({children}) => <th style={{ background:'#f5f5f5', padding:'10px 14px', textAlign:'left', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'#2b8a2b', borderBottom:'2px solid #2b8a2b' }}>{children}</th>
  const Td = ({children,style={}}) => <td style={{ padding:'11px 14px', fontSize:13, borderBottom:'1px solid #eeeeee', color:'#424242', verticalAlign:'middle', ...style }}>{children}</td>
  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      <Sidebar user={user} active={view} setActive={setView} onLogout={logout} />
      <div style={{ flex:1, background:'#f5f5f5', overflowY:'auto' }}>
        <MainHeader
          title="Registrar Office"
          sub="Student Enrollment Management"
          extra={<div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {pending.length>0&&<Badge color="yellow">⏳ {pending.length} Pending</Badge>}
            <Logo h={26} dark />
          </div>}
        />
        <div style={{ padding:24, maxWidth:1060 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <SectionTitle>{view==='dashboard'?'Pending Approvals':'All Students'}</SectionTitle>
            <select style={{ padding:'8px 12px', border:'1.5px solid #e0e0e0', borderRadius:4, fontFamily:'inherit', fontSize:13 }} value={deptF} onChange={e=>setDeptF(e.target.value)}>
              <option value="">All Departments</option>
              {['Avionics','Power Plant','Airframe','Structure','AMT'].map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
          {list.length===0
            ? <EmptyState icon={view==='dashboard'?'🎉':'📭'} title={view==='dashboard'?'All caught up!':'No students found'} sub={view==='dashboard'?'No pending approvals.':'Try adjusting the filter.'} />
            : <div style={{ borderRadius:8, border:'1px solid #e0e0e0', overflow:'auto', boxShadow:'0 1px 4px rgba(0,0,0,.06)' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', background:'#fff' }}>
                  <thead><tr>
                    <Th>Student</Th><Th>Student ID</Th><Th>Department</Th><Th>Status</Th>
                    {view==='dashboard'&&<Th>Actions</Th>}
                  </tr></thead>
                  <tbody>{list.map(u => (
                    <tr key={u.id} style={{ background: u.status==='pending'?'#fffde7':'#fff' }}>
                      <Td><div style={{ fontWeight:700 }}>{u.name}</div><div style={{ fontSize:12, color:'#9e9e9e' }}>{u.email}</div></Td>
                      <Td><code style={{ fontSize:12 }}>{u.studentId||'—'}</code></Td>
                      <Td><span style={{ fontWeight:600 }}>{DEPTS.find(d=>d.name===u.department)?.icon||'🎓'} {u.department||'—'}</span></Td>
                      <Td>{statusBadge(u.status)}</Td>
                      {view==='dashboard'&&<Td><div style={{ display:'flex', gap:6 }}><Btn variant="green" sm onClick={()=>update(u.id,'approved')}>✓ Approve</Btn><Btn variant="danger" sm onClick={()=>update(u.id,'rejected')}>✕ Reject</Btn></div></Td>}
                    </tr>
                  ))}</tbody>
                </table>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,setPage]       = useState('landing')
  const [currentUser,setCurrentUser] = useState(null)
  const [users,setUsers]     = useState(USERS)
  const [content,setContent] = useState(CONTENT)
  const [toastData,setToastData] = useState(null)

  const toast = (msg, type='info') => {
    setToastData({ msg, type, key:Date.now() })
    setTimeout(() => setToastData(null), 4500)
  }
  const onAuth   = u => { setCurrentUser(u); setPage('app') }
  const onLogout = () => { setCurrentUser(null); setPage('landing') }

  return (
    <div style={{ fontFamily:"'Roboto',system-ui,sans-serif" }}>
      {page==='landing' && <Landing onEnter={()=>setPage('auth')} />}
      {page==='auth'    && <AuthPage users={users} setUsers={setUsers} onAuth={onAuth} onBack={()=>setPage('landing')} />}
      {page==='app' && currentUser && (
        <>
          {currentUser.role==='student'   && currentUser.status==='approved' && <StudentDash user={currentUser} content={content} toast={toast} />}
          {currentUser.role==='student'   && currentUser.status!=='approved' && <PendingScreen user={currentUser} onLogout={onLogout} />}
          {currentUser.role==='admin'     && <AdminDash user={currentUser} users={users} setUsers={setUsers} content={content} setContent={setContent} toast={toast} />}
          {currentUser.role==='registrar' && <RegistrarDash user={currentUser} users={users} setUsers={setUsers} toast={toast} />}
        </>
      )}
      {toastData && <Toast key={toastData.key} msg={toastData.msg} type={toastData.type} onClose={()=>setToastData(null)} />}
    </div>
  )
}
