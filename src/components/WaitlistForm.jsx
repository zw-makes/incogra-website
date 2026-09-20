import { useEffect, useId, useRef, useState } from 'react'

const KEY = 'incogra-beta-waitlist'

const ROLES = [
  { id: 'streamer', label: 'Stream live' },
  { id: 'youtuber', label: 'Make YouTube videos' },
  { id: 'creator', label: 'Create courses or content' },
  { id: 'editor', label: 'Edit video or stills' },
  { id: 'podcast', label: 'Host a podcast' },
  { id: 'recruiter', label: 'Recruit and hire' },
  { id: 'hr', label: 'Work in HR' },
  { id: 'designer', label: 'Design' },
  { id: 'founder', label: 'Build a product' },
  { id: 'researcher', label: 'Research and collect' },
  { id: 'assistant', label: 'Assist a team' },
  { id: 'ops', label: 'Run operations' },
  { id: 'community', label: 'Run a community' },
  { id: 'student', label: 'Study' },
  { id: 'other', label: 'A bit of everything' }
]

function RoleSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const listId = useId()
  const selected = ROLES.find((r) => r.id === value) || ROLES[0]

  useEffect(() => {
    if (!open) return
    function onDoc(e) {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function pick(id) {
    onChange(id)
    setOpen(false)
  }

  function onButtonKey(e) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div className={`role-select ${open ? 'open' : ''}`} ref={wrapRef}>
      <button
        type="button"
        className="role-select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKey}
      >
        <span>{selected.label}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3.2 5.6 8 10.4l4.8-4.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="role-select-menu" id={listId} role="listbox" aria-label="I mostly">
          {ROLES.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                role="option"
                aria-selected={r.id === value}
                className={r.id === value ? 'on' : ''}
                onClick={() => pick(r.id)}
              >
                {r.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function WaitlistForm({ compact = false }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('streamer')
  const [error, setError] = useState('')
  const [done, setDone] = useState(() => {
    try {
      return Boolean(localStorage.getItem('incogra-beta-joined'))
    } catch {
      return false
    }
  })

  function submit(e) {
    e.preventDefault()
    setError('')
    const cleanEmail = email.trim().toLowerCase()
    if (!name.trim()) {
      setError('Tell us what to call you.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('That email doesn’t look right.')
      return
    }
    try {
      const existing = JSON.parse(localStorage.getItem(KEY) || '[]')
      const entry = { name: name.trim(), email: cleanEmail, role, at: new Date().toISOString() }
      const next = existing.filter((x) => x.email !== cleanEmail).concat(entry)
      localStorage.setItem(KEY, JSON.stringify(next))
      localStorage.setItem('incogra-beta-joined', JSON.stringify(entry))
    } catch {
      setError('Couldn’t save just now. Try again.')
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className={`waitlist-card success ${compact ? 'compact' : ''}`}>
        <p className="kicker">You’re on the list</p>
        <h3>You’ll get the link first.</h3>
        <p>When we publish the beta, we’ll email you so you can try Incogra before we open it up.</p>
      </div>
    )
  }

  return (
    <form className={`waitlist-card ${compact ? 'compact' : ''}`} onSubmit={submit}>
      {!compact && (
        <>
          <p className="kicker">Get the launch link</p>
          <h3>Try Incogra first, when it goes live.</h3>
        </>
      )}
      <div className="field-row">
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada" autoComplete="name" />
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ada@studio.com" type="email" autoComplete="email" />
        </label>
      </div>
      <label>
        I mostly
        <RoleSelect value={role} onChange={setRole} />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button className="btn btn-accent" type="submit">Notify me</button>
      <p className="form-note">No card. We’ll only email you when Incogra launches.</p>
    </form>
  )
}
