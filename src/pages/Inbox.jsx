import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

function formatWhen(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString()
}

function EntryList({ rows, empty, kind }) {
  if (!rows.length) return <p className="form-note">{empty}</p>
  return (
    <ul className="inbox-list">
      {rows.map((row) => (
        <li key={row.id || `${row.email}-${row.created_at}`}>
          <div className="inbox-row-top">
            <strong>{row.name}</strong>
            <span>{formatWhen(row.created_at)}</span>
          </div>
          <a href={`mailto:${row.email}`}>{row.email}</a>
          {kind === 'waitlist' && row.role ? <p>Mostly {row.role}</p> : null}
          {kind === 'investors' && row.firm ? <p>{row.firm}</p> : null}
          {kind === 'investors' && row.note ? <p className="inbox-note">{row.note}</p> : null}
        </li>
      ))}
    </ul>
  )
}

export default function Inbox() {
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    document.title = 'Inbox — Incogra'
    return () => { document.title = 'Incogra — What you catch should stay yours.' }
  }, [])

  async function openInbox(e) {
    e.preventDefault()
    setError('')
    if (!supabase) {
      setError('Supabase is not configured.')
      return
    }
    if (!pass.trim()) {
      setError('Enter the inbox password.')
      return
    }
    setLoading(true)
    const { data: payload, error: rpcError } = await supabase.rpc('get_incogra_inbox', { pass: pass.trim() })
    setLoading(false)
    if (rpcError) {
      setError('That password didn’t work.')
      setData(null)
      return
    }
    setData({
      waitlist: payload?.waitlist || [],
      investors: payload?.investors || []
    })
  }

  return (
    <div className="page inbox-page">
      <header className="page-hero">
        <p className="eyebrow">Private</p>
        <h1>Inbox.</h1>
        <p className="lede">Waitlist and investor notes land here. Not linked from the public site.</p>
      </header>

      {!data ? (
        <form className="waitlist-card inbox-gate" onSubmit={openInbox}>
          <p className="kicker">Open</p>
          <h3>Password.</h3>
          <label>
            Inbox password
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="btn btn-accent" type="submit" disabled={loading}>
            {loading ? 'Opening…' : 'Open inbox'}
          </button>
        </form>
      ) : (
        <div className="inbox-board">
          <section className="waitlist-card">
            <p className="kicker">Waitlist</p>
            <h3>{data.waitlist.length} {data.waitlist.length === 1 ? 'person' : 'people'}</h3>
            <EntryList
              kind="waitlist"
              rows={data.waitlist}
              empty="Nobody on the waitlist yet."
            />
          </section>
          <section className="waitlist-card">
            <p className="kicker">Investors</p>
            <h3>{data.investors.length} {data.investors.length === 1 ? 'note' : 'notes'}</h3>
            <EntryList
              kind="investors"
              rows={data.investors}
              empty="No investor notes yet."
            />
          </section>
        </div>
      )}
    </div>
  )
}
