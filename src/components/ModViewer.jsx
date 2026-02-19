import { useState } from 'react'
import EtStripe from './EtStripe.jsx'
import { ET_LOGO } from '../data/index.js'

export default function ModViewer({ dept, sec, mod, onBack, toast }) {
  const firstTab = mod.pdf ? 'pdf' : mod.ppt ? 'ppt' : 'video'
  const [tab, setTab] = useState(firstTab)

  return (
    <div className="viewer">
      <div className="viewer-header">
        <button className="btn btn-outline-w btn-sm" onClick={onBack}>← Back</button>
        <div style={{ flex: 1, marginLeft: 8 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', marginBottom: 2 }}>
            {dept.name} › {sec.name}
          </div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{mod.title}</div>
        </div>
        <img
          src={ET_LOGO}
          alt="ET"
          style={{ height: 26, filter: 'brightness(0) invert(1)' }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>
      <EtStripe />

      <div className="viewer-tabs">
        {mod.pdf   && <button className={`viewer-tab${tab === 'pdf'   ? ' active' : ''}`} onClick={() => setTab('pdf')}>📄 PDF Material</button>}
        {mod.ppt   && <button className={`viewer-tab${tab === 'ppt'   ? ' active' : ''}`} onClick={() => setTab('ppt')}>📊 PowerPoint</button>}
        {mod.video && <button className={`viewer-tab${tab === 'video' ? ' active' : ''}`} onClick={() => setTab('video')}>🎬 Video Lecture</button>}
      </div>

      <div className="viewer-body">
        {(tab === 'pdf' || tab === 'ppt') && (
          <div style={{ width: '100%', maxWidth: 680 }}>
            <div className="pdf-doc">
              <div className="pdf-doc-header">
                <img src={ET_LOGO} alt="ET" className="pdf-doc-logo" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                <div>
                  <div className="pdf-doc-meta-title">Ethiopian Aviation University</div>
                  <div className="pdf-doc-meta-dept">{dept.name} — {sec.name}</div>
                </div>
              </div>
              <h2>{mod.title}</h2>
              <p>
                This is a demonstration of the EAU built-in{' '}
                {tab === 'ppt' ? 'PowerPoint (converted to PDF)' : 'PDF'} viewer.
                In the production system, authenticated documents are securely rendered
                via cloud storage with role-based access control.
              </p>
              <p>
                The curriculum adheres to ICAO Doc 9379, EASA Part-66 standards, and
                Ethiopian CAA regulations for aviation maintenance training at certificate
                levels A, B1.1, B1.3, and B2.
              </p>
              <p>
                Students must complete all reading materials and module assessments before
                advancing to the next section in <strong>{sec.name}</strong>.
              </p>
              <div className="pdf-doc-footer">
                Page 1 of 14 &nbsp;·&nbsp; {tab === 'ppt' ? mod.ppt : mod.pdf}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
              <button className="btn btn-green btn-sm" onClick={() => toast('Opening full screen viewer…', 'info')}>
                📂 Full Screen
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => toast(`Download started: ${tab === 'ppt' ? mod.ppt : mod.pdf}`, 'success')}>
                ⬇ Download
              </button>
            </div>
          </div>
        )}

        {tab === 'video' && mod.video && (
          <div style={{ width: '100%', maxWidth: 860 }}>
            <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,.18)', border: '1px solid var(--grey2)' }}>
              <iframe
                width="100%"
                height="460"
                src={mod.video}
                title={mod.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ display: 'block' }}
              />
            </div>
            <p style={{ color: 'var(--grey3)', fontSize: 12, textAlign: 'center', marginTop: 10 }}>
              {mod.title} — {dept.name}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
