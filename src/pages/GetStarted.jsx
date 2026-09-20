import WaitlistForm from '../components/WaitlistForm.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Leave your email',
    body: 'That’s how we know where to send the link when Incogra launches.'
  },
  {
    n: '02',
    title: 'We publish the beta',
    body: 'The product is ready. Launch is next. You won’t have to hunt for it.'
  },
  {
    n: '03',
    title: 'You try it first',
    body: 'The moment we publish, you get the link first — before we open it up.'
  }
]

export default function GetStarted() {
  return (
    <div className="page get-started">
      <header className="page-hero">
        <p className="eyebrow">Get started</p>
        <h1>Be first when Incogra <em>launches.</em></h1>
        <p className="lede">Leave your email. When we publish the beta, you get the link first so you can try it before everyone else.</p>
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
