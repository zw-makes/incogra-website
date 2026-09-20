import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CountUp from '../components/CountUp.jsx'
import { HeroMock, HoverSaveMock, ProductShot, PopupMock, WebshotMock } from '../components/Mockups.jsx'
import ShotCarousel from '../components/ShotCarousel.jsx'
import BlurMock from '../components/BlurMock.jsx'
import { FEATURES, STEPS, FAQS } from '../data/content.js'

function FaqItem({ item, open, onToggle }) {
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button type="button" onClick={onToggle} aria-expanded={open}>
        <span>{item.q}</span>
        <i />
      </button>
      {open && <p>{item.a}</p>}
    </div>
  )
}

export default function Home() {
  const [faq, setFaq] = useState(0)
  const statsRef = useRef(null)
  const [statsPlay, setStatsPlay] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsPlay(true)
      },
      { threshold: 0.55, rootMargin: '0px 0px -18% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">The extension and the studio</p>
        <h1>
          What you catch<br /> should stay<br /> <em>yours.</em>
        </h1>
        <p className="lede">
          Save stills, video, or text from any page — or capture the whole thing in one click. Then blur it, share it, or lock it away.
        </p>
        <div className="btn-row">
          <Link to="/get-started" className="btn btn-accent">Get the launch link</Link>
          <Link to="/#web-app" className="btn btn-ghost">See the studio</Link>
        </div>
        <HeroMock />
        <div className="review-strip">
          <blockquote>
            <p>“I used to screenshot everything into my camera roll and then never find it. Last week I sent my editor a whole board in one click and she asked who my assistant was.”</p>
            <cite>Lila Brooks · YouTuber</cite>
          </blockquote>
          <blockquote>
            <p>“The blurring tools are the whole reason I kept it. Select, draw, pencil, auto, censor, shapes — I use all six before I go live. Faces, names, anything I don’t want on stream, gone. Then I hit private and just keep going.”</p>
            <cite>Harper Quinn · Streamer</cite>
          </blockquote>
          <blockquote>
            <p>“I grab career pages for research. Full page capture is the thing I didn’t know I needed. Folder’s locked so nobody on the team wanders in.”</p>
            <cite>Sadie Cole · HR</cite>
          </blockquote>
        </div>
      </section>

      <section className="stats" id="stats" ref={statsRef}>
        <p className="kicker">Incogra works on</p>
        <ul>
          <li>
            <strong><CountUp to={1000000} suffix="+" play={statsPlay} /></strong>
            <span>sites</span>
          </li>
          <li>
            <strong>Full-page</strong>
            <span>captures</span>
          </li>
          <li>
            <strong>Your</strong>
            <span>folders</span>
          </li>
          <li>
            <strong><CountUp to={6} suffix="+" play={statsPlay} /></strong>
            <span>blurring tools</span>
          </li>
          <li>
            <strong>And</strong>
            <span>much more</span>
          </li>
        </ul>
      </section>

      <section className="feature-block" id="save">
        <div className="feature-copy">
          <p className="kicker">{FEATURES[0].kicker}</p>
          <h2>Hover. <em>Collect.</em> Done.</h2>
          <p>{FEATURES[0].body}</p>
          <ul className="check-list">
            {FEATURES[0].points.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <Link to="/#extension" className="text-link">See the extension →</Link>
        </div>
        <div className="feature-media frame-accent">
          <HoverSaveMock />
        </div>
      </section>

      <section className="feature-block reverse">
        <div className="feature-copy">
          <p className="kicker">{FEATURES[1].kicker}</p>
          <h2>Blur what should<br /> <em>never</em> travel.</h2>
          <p>{FEATURES[1].body}</p>
          <ul className="check-list">
            {FEATURES[1].points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div className="feature-media frame-accent">
          <BlurMock />
        </div>
      </section>

      <section className="feature-block">
        <div className="feature-copy">
          <p className="kicker">{FEATURES[2].kicker}</p>
          <h2>A gallery that behaves like a <em>studio.</em></h2>
          <p>{FEATURES[2].body}</p>
          <ul className="check-list">
            {FEATURES[2].points.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <Link to="/#web-app" className="text-link">See the studio →</Link>
        </div>
        <div className="feature-media frame-accent">
          <ProductShot
            src="/screens/collected.jpg"
            alt="Incogra collected board"
            url="app.incogra / collected"
          />
        </div>
      </section>

      <section className="feature-block reverse">
        <div className="feature-copy">
          <p className="kicker">{FEATURES[3].kicker}</p>
          <h2>The whole page.<br /> <em>One click.</em></h2>
          <p>{FEATURES[3].body}</p>
          <ul className="check-list">
            {FEATURES[3].points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div className="feature-media frame-accent">
          <WebshotMock />
        </div>
      </section>

      <section className="split-products">
        <article id="extension">
          <p className="kicker">The extension</p>
          <h2>Lives in the tab.</h2>
          <p>Hover to save. Capture the whole page. Six redaction tools when something shouldn’t travel. Then a one-click jump into the studio.</p>
          <div className="mini-frame">
            <PopupMock />
          </div>
        </article>
        <article id="web-app">
          <p className="kicker">The web app</p>
          <h2>Lives in the library.</h2>
          <p>Folders of your own. A private mode with a passcode. Share a collection in a single click, or keep it behind the door. The place saves go when Downloads isn’t a system.</p>
          <ShotCarousel />
        </article>
      </section>

      <section className="steps">
        <p className="kicker center">How it works</p>
        <h2 className="center">Three moves. That’s the whole product.</h2>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <article key={s.n}>
              <span>{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial">
        <p>It’s private, or it isn’t yours.</p>
        <p className="editorial-sub">That’s where we come in.</p>
      </section>

      <section className="quiet-grid">
        <article>
          <h3>The whole page, once</h3>
          <p>Need the long scroll as it lived? Capture the entire website in one click and file it beside everything else you saved.</p>
        </article>
        <article>
          <h3>Share without an account</h3>
          <p>One click hands someone a collection. The link can expire. They never need your login.</p>
        </article>
        <article>
          <h3>Private is actually private</h3>
          <p>A passcode sits in the doorway. Turn private mode on and the rest of the room goes quiet.</p>
        </article>
      </section>

      <section className="voices">
        <p className="kicker center">From people who live in their browser</p>
        <h2 className="center italic-head">A few of the first ones in</h2>
        <div className="voices-grid">
          <blockquote>
            <p>I go live four days a week. Used to spend ten minutes closing tabs first. Now I hit private and just… keep going.</p>
            <cite>Harper Quinn · Streamer</cite>
          </blockquote>
          <blockquote>
            <p>I grab career pages for research. Full page capture is the thing I didn’t know I needed. Folder’s locked so nobody on the team wanders in.</p>
            <cite>Sadie Cole · HR</cite>
          </blockquote>
          <blockquote>
            <p>I’ll hover-save a product page while I’m on a call and forget I even did it. Used to lose those. I don’t anymore.</p>
            <cite>Paige Bennett · YouTuber</cite>
          </blockquote>
          <blockquote>
            <p>I collect examples before I write job posts. Blur the names, share the folder, done. Boring. That’s why I kept it.</p>
            <cite>Tessa Morgan · Recruiter</cite>
          </blockquote>
          <blockquote>
            <p>I steal layouts from other people’s sales pages. Don’t @ me. Blur tools mean I can actually show my students the example.</p>
            <cite>Brooke Ellis · Course creator</cite>
          </blockquote>
          <blockquote>
            <p>I research guests with like 15 tabs open. Private mode during recording is… yeah. That’s the whole review.</p>
            <cite>Maddie Voss · Podcast host</cite>
          </blockquote>
          <blockquote>
            <p>My client used to send me 40 screenshots in Slack. Now I share a folder. She thinks I’m organized. I’m not. This is.</p>
            <cite>Chloe Hart · Virtual assistant</cite>
          </blockquote>
          <blockquote>
            <p>We do weekly reviews on a shared screen. I used to have a whole ritual of hiding stuff. Now I don’t.</p>
            <cite>Avery Lane · Ops</cite>
          </blockquote>
          <blockquote>
            <p>Someone in the Discord asked how I keep references without a messy drive. I just sent them the link.</p>
            <cite>Jordan Hale · Community manager</cite>
          </blockquote>
          <blockquote>
            <p>I clip stills off pages while I edit. Full page capture saved me twice this month when a site changed overnight.</p>
            <cite>Riley Fox · Editor</cite>
          </blockquote>
        </div>
      </section>

      <section className="pricing" id="beta">
        <p className="kicker">Pricing</p>
        <h2>Three ways in. One <em>library.</em></h2>
        <p className="pricing-lede">Start free. Grow into Curator. Buy Studio once if you want it forever.</p>
        <div className="plan-grid">
          <article className="plan">
            <h3>Free</h3>
            <ul>
              <li>Up to 49 collected visual clips</li>
              <li>Standard webpage &amp; image capture</li>
              <li>Full smart blur &amp; censor tool suite</li>
              <li>Basic lightbox visual preview</li>
              <li>Default collection folders</li>
            </ul>
            <div className="plan-foot">
              <p><strong>$0</strong><span>/forever</span></p>
              <Link to="/get-started" className="plan-cta">Start now</Link>
            </div>
          </article>
          <article className="plan plan-curator">
            <h3>Curator</h3>
            <ul>
              <li>Unlimited visual clips &amp; captures</li>
              <li>Private folders with passcode lock</li>
              <li>3D DriftWall spatial canvas</li>
              <li>High-res HD media exports</li>
              <li>Exclusive “Incogra Curator” badge</li>
            </ul>
            <div className="plan-foot">
              <p><strong>$4.99</strong><span>/month</span></p>
              <Link to="/get-started" className="plan-cta">Start now</Link>
            </div>
          </article>
          <article className="plan plan-studio">
            <h3>Studio</h3>
            <ul>
              <li>Pay once for lifetime access</li>
              <li>Custom branding on shared boards</li>
              <li>Priority cloud sync &amp; early drops</li>
              <li>Everything in Curator included</li>
              <li>Elite “Studio Master” VIP badge</li>
            </ul>
            <div className="plan-foot">
              <p><strong>$149.99</strong><span>one-time</span></p>
              <Link to="/get-started" className="plan-cta">Start now</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="faq" id="faq">
        <p className="kicker">Before you install</p>
        <h2>Questions, answered without a <em>help center</em>.</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <FaqItem key={item.q} item={item} open={faq === i} onToggle={() => setFaq(faq === i ? -1 : i)} />
          ))}
        </div>
      </section>
    </div>
  )
}
