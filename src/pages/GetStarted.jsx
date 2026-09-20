import { useState } from 'react'
import { Link } from 'react-router-dom'
import WaitlistForm from '../components/WaitlistForm.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Join the beta',
    body: 'Leave your email so we can send install notes and warn you before anything ever costs money.'
  },
  {
    n: '02',
    title: 'Load the extension',
    body: 'Chrome → Extensions → Developer mode → Load unpacked. Point it at the Incogra extension folder. Pin it.'
  },
  {
    n: '03',
    title: 'Open the app',
    body: 'Sign in to sync, or start locally. Hover to save, capture a page, then find it in your folders.'
  }
]

export default function GetStarted() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText('chrome://extensions')
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="page get-started">
      <header className="page-hero">
        <p className="eyebrow">Get started</p>
        <h1>Install the<br />extension.<br /><em>Open the studio.</em></h1>
        <p className="lede">Three steps. About four minutes. After that, anything you save, capture, or redact can live in Incogra.</p>
      </header>

      <ol className="gs-steps">
        {STEPS.map((s) => (
          <li key={s.n}>
            <span>{s.n}</span>
            <div>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="gs-grid">
        <WaitlistForm />
        <div className="install-card">
          <p className="kicker">Chrome</p>
          <h3>Load unpacked</h3>
          <ol>
            <li>Open <button type="button" className="inline-copy" onClick={copy}>{copied ? 'Copied' : 'chrome://extensions'}</button></li>
            <li>Turn on Developer mode (top right)</li>
            <li>Load unpacked → choose the Incogra <code>extension</code> folder</li>
            <li>Pin Incogra. Hover an image. Save it.</li>
          </ol>
          <p className="form-note">The extension talks to the gallery at this site and at the live app.</p>
          <div className="btn-row">
            <Link className="btn btn-accent" to="/app">Open the app</Link>
            <Link className="btn btn-ghost" to="/extension">Tour the tools</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
