import { useState } from 'react'

const KEY = 'incogra-beta-waitlist'

export default function WaitlistForm({ compact = false }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('designer')
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
        <p className="kicker">You’re in</p>
        <h3>Welcome to Incogra Beta.</h3>
        <p>We’ll send install notes to your inbox. You can open the app now and start a local gallery.</p>
        <a className="btn btn-accent" href="/app">Open the app</a>
      </div>
    )
  }

  return (
    <form className={`waitlist-card ${compact ? 'compact' : ''}`} onSubmit={submit}>
      {!compact && (
        <>
          <p className="kicker">Join the beta</p>
          <h3>Free while we’re figuring out the edges.</h3>
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="designer">Design and generate</option>
          <option value="founder">Build products</option>
          <option value="researcher">Research and collect</option>
          <option value="other">Do a bit of everything</option>
        </select>
      </label>
      {error && <p className="form-error">{error}</p>}
      <button className="btn btn-accent" type="submit">Request access</button>
      <p className="form-note">No card. We’ll only email you about Incogra.</p>
    </form>
  )
}
