import WaitlistForm from '../components/WaitlistForm.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Join the beta',
    body: 'Leave your email. We’ll send the Chrome install when it’s ready — and warn you before anything ever costs money.'
  },
  {
    n: '02',
    title: 'Get the extension',
    body: 'A normal Chrome install, in your inbox. No developer mode. No folders. Nothing unpacked on your machine.'
  },
  {
    n: '03',
    title: 'Open the studio',
    body: 'The gallery is open now. Hover to save, capture a page, redact, then find it in your folders.'
  }
]

export default function GetStarted() {
  return (
    <div className="page get-started">
      <header className="page-hero">
        <p className="eyebrow">Get started</p>
        <h1>Join the beta.<br /><em>Open the studio.</em></h1>
        <p className="lede">Leave your email. We’ll send the Chrome extension when it’s yours to install. The studio is open in the meantime.</p>
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

      <WaitlistForm />
    </div>
  )
}
