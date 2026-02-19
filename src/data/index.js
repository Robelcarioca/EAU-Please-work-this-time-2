export const ET_LOGO = 'https://assets.airtrfx.com/media-em/et/logos/et-large-default.svg'

export const INITIAL_USERS = [
  { id:1, name:'Admin User',      email:'admin@eau.edu.et',       password:'admin123', role:'admin',     status:'approved', department:null,          studentId:null },
  { id:2, name:'Registrar Staff', email:'registrar@eau.edu.et',   password:'reg123',   role:'registrar', status:'approved', department:null,          studentId:null },
  { id:3, name:'Abebe Girma',     email:'abebe@student.eau.et',   password:'pass123',  role:'student',   status:'approved', department:'Avionics',    studentId:'EAU-2024-001' },
  { id:4, name:'Tigist Haile',    email:'tigist@student.eau.et',  password:'pass123',  role:'student',   status:'pending',  department:'Power Plant', studentId:'EAU-2024-002' },
  { id:5, name:'Dawit Tadesse',   email:'dawit@student.eau.et',   password:'pass123',  role:'student',   status:'pending',  department:'Airframe',    studentId:'EAU-2024-003' },
  { id:6, name:'Hana Bekele',     email:'hana@student.eau.et',    password:'pass123',  role:'student',   status:'rejected', department:'Structure',   studentId:'EAU-2024-004' },
]

export const DEPTS = [
  { id:'avionics',   name:'Avionics',    icon:'📡', desc:'Aircraft Electronic Systems & Navigation', img:'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=600&q=80' },
  { id:'powerplant', name:'Power Plant', icon:'⚙️', desc:'Turbine Engines & Propulsion Systems',    img:'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=600&q=80' },
  { id:'airframe',   name:'Airframe',    icon:'✈️', desc:'Aircraft Structure & Systems',             img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80' },
  { id:'structure',  name:'Structure',   icon:'🔩', desc:'Composite Materials & Structural Repair',  img:'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600&q=80' },
  { id:'gc',         name:'GC Course',   icon:'📚', desc:'General Course – Freshman Foundation',     img:'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80' },
]

export const INITIAL_CONTENT = {
  avionics: { sections: [
    { id:'a1', name:'AVO 1 – DC Fundamentals', modules: [
      { id:'m1', title:'Introduction to DC Circuits',   pdf:'DC_Circuits.pdf', ppt:null,        video:'https://www.youtube.com/embed/F_vLWkkNbKY' },
      { id:'m2', title:"Ohm's Law & Kirchhoff's Laws",  pdf:'Ohms_Law.pdf',   ppt:'Ohms.pptx', video:null },
      { id:'m3', title:'Capacitors & Inductors',         pdf:'Cap_Ind.pdf',    ppt:null,        video:'https://www.youtube.com/embed/tIrANMKAu8w' },
      { id:'m4', title:'DC Circuit Analysis Lab',        pdf:'Lab_DC.pdf',     ppt:null,        video:null },
    ]},
    { id:'a2', name:'AVO 2 – AC Fundamentals', modules: [
      { id:'m5', title:'AC Waveforms & Phase',           pdf:'AC_Wave.pdf',    ppt:'AC.pptx',   video:'https://www.youtube.com/embed/vN9aR2C6KPo' },
      { id:'m6', title:'Transformers & Rectifiers',      pdf:'Trans.pdf',      ppt:null,        video:null },
    ]},
    { id:'a3', name:'AVO 3 – Digital Electronics', modules: [
      { id:'m7', title:'Logic Gates & Boolean Algebra',  pdf:'Logic.pdf',      ppt:'Log.pptx',  video:null },
      { id:'m8', title:'Microprocessor Fundamentals',    pdf:'Micro.pdf',      ppt:null,        video:'https://www.youtube.com/embed/AkFi90lZmXA' },
    ]},
  ]},
  powerplant: { sections: [
    { id:'p1', name:'PWR 1 – Gas Turbine Theory', modules: [
      { id:'m9',  title:'Thermodynamic Cycle',           pdf:'Thermo.pdf',     ppt:null,        video:'https://www.youtube.com/embed/KjiUUJdPGX0' },
      { id:'m10', title:'Compressor Types',              pdf:'Comp.pdf',       ppt:'Comp.pptx', video:null },
    ]},
    { id:'p2', name:'PWR 2 – Engine Maintenance', modules: [
      { id:'m11', title:'Engine Inspection Procedures',  pdf:'Inspect.pdf',    ppt:null,        video:null },
    ]},
  ]},
  airframe: { sections: [
    { id:'f1', name:'AFR 1 – Aircraft Systems', modules: [
      { id:'m12', title:'Hydraulic Systems Overview',    pdf:'Hydraulic.pdf',  ppt:null,        video:'https://www.youtube.com/embed/HzDe2YNYB5E' },
      { id:'m13', title:'Fuel System Architecture',      pdf:'Fuel.pdf',       ppt:'Fuel.pptx', video:null },
    ]},
  ]},
  structure: { sections: [
    { id:'s1', name:'STR 1 – Composite Materials', modules: [
      { id:'m14', title:'Carbon Fiber Fundamentals',     pdf:'Carbon.pdf',     ppt:null,        video:null },
    ]},
  ]},
  gc: { sections: [
    { id:'g1', name:'GCC 1 – Aviation Fundamentals', modules: [
      { id:'m15', title:'History of Aviation',           pdf:'AvHist.pdf',     ppt:'Hist.pptx', video:'https://www.youtube.com/embed/nRU5OcAXfuo' },
      { id:'m16', title:'Principles of Flight',          pdf:'PoFlight.pdf',   ppt:null,        video:'https://www.youtube.com/embed/Gg0TXNXgz-w' },
    ]},
    { id:'g2', name:'GCC 2 – Mathematics for Aviation', modules: [
      { id:'m17', title:'Trigonometry Essentials',       pdf:'Trig.pdf',       ppt:null,        video:null },
      { id:'m18', title:'Physics for Mechanics',         pdf:'Physics.pdf',    ppt:'Phys.pptx', video:'https://www.youtube.com/embed/ZM8ECpBuQYE' },
    ]},
  ]},
}

export const AUDIT_LOGS = [
  { t:'Today 10:42', a:'User Approved',  ac:'Admin User',      d:'Abebe Girma — Avionics' },
  { t:'Today 10:38', a:'Module Created', ac:'Admin User',      d:'DC Circuit Analysis Lab' },
  { t:'Today 09:55', a:'File Uploaded',  ac:'Admin User',      d:'AC_Waveforms.pdf → AVO 2' },
  { t:'Today 09:30', a:'User Rejected',  ac:'Registrar Staff', d:'Applicant — Power Plant' },
  { t:'Today 09:12', a:'Section Created',ac:'Admin User',      d:'PWR 3 – Turbine Inspection' },
  { t:'Today 08:50', a:'Login',          ac:'Admin User',      d:'admin@eau.edu.et' },
]
