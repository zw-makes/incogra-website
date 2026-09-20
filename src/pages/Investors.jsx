import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const KEY = 'incogra-investor-inquiries'

const BETS = [
  {
    kicker: 'The leak',
    title: 'Redact before a file exists.',
    body: 'Every screenshot is a copy that travels. Faces, names, plates, client work. Six tools live in the tab so the version that leaves is already safe — and the original stays with you.'
  },
  {
    kicker: 'The pile',
    title: 'Downloads is not a system.',
    body: 'People already collect the web. It lands in camera rolls, desktops, and Slack threads of forty images. The studio is folders, a gallery, and a passcode in the doorway.'
  },
  {
    kicker: 'The share',
    title: 'One click. No extra account.',
    body: 'Hand someone a collection. Time-box the link so it does not live on the internet forever. Recipients never need a login. Sharing should feel like sending a file, not running a product.'
  },
  {
    kicker: 'The model',
    title: 'The library is the product.',
    body: 'Free forever for up to 49 clips. Curator is $4.99 a month for unlimited saves and private folders. Studio is $149.99 once, lifetime. Grow with the vault, not with ads against it.'
  }
]

const NOW = [
  {
    title: 'The browser is the desk',
    body: 'Research, reference, and work already happen in the tab. Capture that belongs anywhere else is a copy of a copy.'
  },
  {
    title: 'Collection is a habit',
    body: 'Moodboards, competitor pages, stills, long scrolls. The behavior is proven. The place it lives is still a mess.'
  },
  {
    title: 'Privacy is the wedge',
    body: 'Boards exist. Extensions that save exist. Almost none redact on the page, then lock the room behind a passcode.'
  }
]

function InvestorForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [firm, setFirm] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(() => {
    try {
      return Boolean(localStorage.getItem('incogra-investor-sent'))
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
      const entry = {
        name: name.trim(),
        email: cleanEmail,
        firm: firm.trim(),
        note: note.trim(),
        at: new Date().toISOString()
      }
      const next = existing.filter((x) => x.email !== cleanEmail).concat(entry)
      localStorage.setItem(KEY, JSON.stringify(next))
      localStorage.setItem('incogra-investor-sent', JSON.stringify(entry))
    } catch {
      setError('Couldn’t save just now. Try again, or email us directly.')
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="waitlist-card success">
        <p className="kicker">Received</p>
        <h3>We’ll write back.</h3>
        <p>If you want the same note in our inbox today, send it to zwmakes@gmail.com with the subject “Investor”.</p>
        <a className="btn btn-accent" href="mailto:zwmakes@gmail.com?subject=Investor">Email zwmakes@gmail.com</a>
      </div>
    )
  }

  return (
    <form className="waitlist-card" onSubmit={submit}>
      <p className="kicker">Start a conversation</p>
      <h3>Write to the people building it.</h3>
      <div className="field-row">
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada" autoComplete="name" />
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ada@fund.com" type="email" autoComplete="email" />
        </label>
      </div>
      <label>
        Firm
        <input value={firm} onChange={(e) => setFirm(e.target.value)} placeholder="Optional" autoComplete="organization" />
      </label>
      <label>
        Note
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What you want to talk about"
          rows={4}
        />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button className="btn btn-accent" type="submit">Send note</button>
      <p className="form-note">Stored locally on this device until a backend is wired. Prefer mail? zwmakes@gmail.com</p>
    </form>
  )
}

export default function Investors() {
  useEffect(() => {
    const prev = document.title
    document.title = 'For Investors — Incogra'
    return () => { document.title = prev }
  }, [])

  return (
    <div className="page investors">
      <header className="page-hero">
        <p className="eyebrow">For investors</p>
        <h1>The capture layer for a <em>private</em> internet.</h1>
        <p className="lede">
          Incogra is a Chrome extension and a studio. Collect stills, video, and text from any page — or the whole scroll in one click — then blur it, share it, or lock it away.
        </p>
        <div className="btn-row">
          <a className="btn btn-accent" href="#investors-contact">Get in touch</a>
          <Link className="btn btn-ghost" to="/#web-app">See the studio</Link>
        </div>
      </header>

      <p className="investors-thesis">
        People already steal from the web. They screenshot it into a graveyard. Incogra puts that capture on the page, with redaction before a file exists anywhere else, and a library that can be shared in one click or closed behind a passcode. The thesis is simple: it’s private, or it isn’t yours.
      </p>

      <section className="investors-grid">
        {BETS.map((item) => (
          <article key={item.title}>
            <p className="kicker">{item.kicker}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="editorial">
        <p>It’s private, or it isn’t yours.</p>
        <p className="editorial-sub">That’s the company.</p>
      </section>

      <section className="quiet-grid investors-now">
        {NOW.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="investors-model">
        <p className="kicker">How it pays</p>
        <h2>Three ways in. One <em>library.</em></h2>
        <div className="plan-grid">
          <article className="plan">
            <h3>Free</h3>
            <p>Up to 49 clips, capture, and the full blur suite. The habit starts here.</p>
            <p className="investors-price"><strong>$0</strong><span>/forever</span></p>
          </article>
          <article className="plan plan-curator">
            <h3>Curator</h3>
            <p>Unlimited saves, private folders, HD export. The monthly vault.</p>
            <p className="investors-price"><strong>$4.99</strong><span>/month</span></p>
          </article>
          <article className="plan plan-studio">
            <h3>Studio</h3>
            <p>Lifetime access, branded boards, priority sync. Pay once. Keep it.</p>
            <p className="investors-price"><strong>$149.99</strong><span>one-time</span></p>
          </article>
        </div>
        <p className="form-note investors-disclaimer">
          We’re about to launch. This page is the thesis, not a data room — no vanity metrics, no invented raise. Product, pricing, and the conversation live here; terms live in the email that follows.
        </p>
      </section>

      <section className="investors-cta" id="investors-contact">
        <div className="investors-cta-copy">
          <p className="kicker">The conversation</p>
          <h2>If the thesis lands, <em>write.</em></h2>
          <p>
            We are building the extension that lives in the tab and the studio that keeps what it catches. If you fund tools people actually keep open, start here.
          </p>
          <ul className="check-list">
            <li>Chrome extension plus a private web studio</li>
            <li>Freemium with a clear lifetime SKU</li>
            <li>Privacy as the product, not a policy PDF</li>
          </ul>
        </div>
        <InvestorForm />
      </section>
    </div>
  )
}
