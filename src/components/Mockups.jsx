import { useEffect, useRef, useState } from 'react'
import { GALLERY, TOOLS } from '../data/content.js'
export { default as BlurMock } from './BlurMock.jsx'

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

export function BrowserFrame({ children, url = 'incogra.app', dark = true }) {
  return (
    <div className={`browser-frame ${dark ? 'dark' : ''}`}>
      <div className="browser-bar">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <div className="browser-url">{url}</div>
      </div>
      <div className="browser-body">{children}</div>
    </div>
  )
}

export function ProductShot({ src, alt, url }) {
  return (
    <BrowserFrame url={url}>
      <img src={src} alt={alt} className="product-shot" />
    </BrowserFrame>
  )
}

export function PopupMock() {
  return (
    <div className="popup-mock">
      <header>
        <span className="gear" />
        <div>
          <img src="/brand/logo-dark.png" alt="Incogra" className="popup-logo" />
          <small>v2.9</small>
        </div>
        <span className="status" />
      </header>
      <p className="popup-label">Blur tools</p>
      <div className="popup-tools">
        {TOOLS.map((t) => (
          <button key={t.id} type="button">{t.name}</button>
        ))}
      </div>
      <div className="popup-recent">
        <p className="popup-label">Recently saved</p>
        <div>
          {GALLERY.slice(0, 4).map((img) => (
            <img key={img.id} src={img.src} alt="" />
          ))}
        </div>
      </div>
      <button className="popup-open" type="button">Open App</button>
    </div>
  )
}

export function HoverSaveMock() {
  const boardRef = useRef(null)
  const pinRef = useRef(null)
  const saveRef = useRef(null)
  const [pos, setPos] = useState({ x: 10, y: 88 })
  const [down, setDown] = useState(false)
  const [hot, setHot] = useState(false)
  const [saved, setSaved] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setHot(true)
      setVisible(false)
      return
    }

    let stop = false

    function rel(el, ox = 0.5, oy = 0.5) {
      const board = boardRef.current
      if (!board || !el) return { x: 50, y: 50 }
      const b = board.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      return {
        x: ((r.left + r.width * ox - b.left) / b.width) * 100,
        y: ((r.top + r.height * oy - b.top) / b.height) * 100
      }
    }

    function moveTo(from, to, ms) {
      return new Promise((resolve) => {
        const t0 = performance.now()
        const tick = (now) => {
          if (stop) return resolve()
          const p = Math.min(1, (now - t0) / ms)
          const e = easeInOutCubic(p)
          setPos({
            x: from.x + (to.x - from.x) * e,
            y: from.y + (to.y - from.y) * e
          })
          if (p < 1) requestAnimationFrame(tick)
          else resolve()
        }
        requestAnimationFrame(tick)
      })
    }

    async function loop() {
      const rest = { x: 12, y: 90 }
      setPos(rest)
      while (!stop) {
        await new Promise((r) => setTimeout(r, 700))
        if (stop) break
        const pin = rel(pinRef.current, 0.45, 0.42)
        const dist = Math.hypot(pin.x - rest.x, pin.y - rest.y)
        await moveTo(rest, pin, Math.min(1300, 500 + dist * 12))
        if (stop) break
        setHot(true)
        await new Promise((r) => setTimeout(r, 520))
        if (stop) break
        const save = rel(saveRef.current, 0.55, 0.55)
        await moveTo(pin, save, 640)
        if (stop) break
        await new Promise((r) => setTimeout(r, 180))
        setDown(true)
        await new Promise((r) => setTimeout(r, 110))
        setDown(false)
        setSaved(true)
        await new Promise((r) => setTimeout(r, 1600))
        if (stop) break
        setSaved(false)
        setHot(false)
        const end = { x: 88, y: 92 }
        await moveTo(save, end, 900)
        if (stop) break
        setPos(rest)
        await new Promise((r) => setTimeout(r, 500))
      }
    }

    loop()
    return () => { stop = true }
  }, [])

  return (
    <div className="pin-board" ref={boardRef} aria-hidden="true">
      <div className="pin-grid">
        {GALLERY.map((img) => {
          const target = img.id === 'coat'
          return (
            <figure key={img.id} ref={target ? pinRef : undefined} className={`pin ${target && hot ? 'is-hot' : ''}`}>
              <img src={img.src} alt="" />
              {target && (
                <div className="pin-overlay">
                  <button type="button" ref={saveRef} className={saved ? 'is-saved' : ''}>
                    {saved ? 'Saved' : 'Save'}
                  </button>
                </div>
              )}
            </figure>
          )
        })}
      </div>
      {saved && <div className="pin-toast">Saved to Designs</div>}
      {visible && (
        <div
          className={`pin-cursor ${down ? 'is-down' : ''}`}
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 3.2 18.8 12.4l-6.6 1.2-2.6 7.2L5 3.2Z" fill="#fff" stroke="#111" strokeWidth="1.35" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  )
}

function UnusedOldBlur() {
  const boardRef = useRef(null)
  const [pos, setPos] = useState({ x: 18, y: 82 })
  const [down, setDown] = useState(false)
  const [tool, setTool] = useState(null)
  const [on, setOn] = useState({ select: false, draw: false, pencil: false, auto: false, censor: false, shapes: false })
  const [selectBox, setSelectBox] = useState({ w: 0, h: 0 })
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTool('censor')
      setOn({ select: true, draw: true, pencil: true, auto: true, censor: true, shapes: true })
      setSelectBox({ w: 100, h: 100 })
      setCursorOn(false)
      return
    }

    let stop = false

    function moveTo(from, to, ms) {
      return new Promise((resolve) => {
        const t0 = performance.now()
        const tick = (now) => {
          if (stop) return resolve()
          const p = Math.min(1, (now - t0) / ms)
          const e = easeInOutCubic(p)
          setPos({ x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e })
          if (p < 1) requestAnimationFrame(tick)
          else resolve()
        }
        requestAnimationFrame(tick)
      })
    }

    const pause = (ms) => new Promise((r) => setTimeout(r, ms))

    async function loop() {
      while (!stop) {
        setOn({ select: false, draw: false, pencil: false, auto: false, censor: false, shapes: false })
        setSelectBox({ w: 0, h: 0 })
        setTool(null)
        setPos({ x: 16, y: 86 })
        await pause(500)
        if (stop) break

        setTool('select')
        await moveTo({ x: 16, y: 86 }, { x: 18, y: 28 }, 700)
        setDown(true)
        const start = { x: 18, y: 28 }
        const end = { x: 46, y: 42 }
        const t0 = performance.now()
        await new Promise((resolve) => {
          const tick = (now) => {
            if (stop) return resolve()
            const p = Math.min(1, (now - t0) / 720)
            const e = easeInOutCubic(p)
            setPos({ x: start.x + (end.x - start.x) * e, y: start.y + (end.y - start.y) * e })
            setSelectBox({ w: e * 100, h: e * 100 })
            if (p < 1) requestAnimationFrame(tick)
            else resolve()
          }
          requestAnimationFrame(tick)
        })
        setDown(false)
        setOn((s) => ({ ...s, select: true }))
        await pause(420)
        if (stop) break

        setTool('draw')
        await moveTo(end, { x: 22, y: 58 }, 500)
        setOn((s) => ({ ...s, draw: true }))
        await moveTo({ x: 22, y: 58 }, { x: 40, y: 62 }, 700)
        await pause(280)
        if (stop) break

        setTool('pencil')
        await moveTo({ x: 40, y: 62 }, { x: 58, y: 58 }, 480)
        setOn((s) => ({ ...s, pencil: true }))
        await pause(380)
        if (stop) break

        setTool('auto')
        await moveTo({ x: 58, y: 58 }, { x: 14, y: 58 }, 560)
        setOn((s) => ({ ...s, auto: true }))
        await pause(420)
        if (stop) break

        setTool('censor')
        await moveTo({ x: 14, y: 58 }, { x: 82, y: 60 }, 640)
        setDown(true)
        await pause(120)
        setDown(false)
        setOn((s) => ({ ...s, censor: true }))
        await pause(420)
        if (stop) break

        setTool('shapes')
        await moveTo({ x: 82, y: 60 }, { x: 72, y: 34 }, 560)
        setOn((s) => ({ ...s, shapes: true }))
        await pause(1600)
        if (stop) break
        await moveTo({ x: 72, y: 34 }, { x: 16, y: 86 }, 700)
        await pause(400)
      }
    }

    loop()
    return () => { stop = true }
  }, [])

  return (
    <div className="crm-demo" ref={boardRef} aria-hidden="true">
      <header className="crm-top">
        <strong>Atlas</strong>
        <span>Revenue</span>
        <em>Live</em>
      </header>
      <div className="crm-metrics">
        <article>
          <p>Annual recurring</p>
          <b>$1,248,900</b>
        </article>
        <article>
          <p>Open pipeline</p>
          <b>$86,400</b>
        </article>
      </div>
      <table className="crm-table">
        <thead>
          <tr><th>Account</th><th>Email</th><th>Deal</th><th>Card</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><i>ML</i> Meridian Labs</td>
            <td>nina@meridian.co</td>
            <td>$48,200</td>
            <td>Visa ••4242</td>
          </tr>
          <tr>
            <td><i>CP</i> Cove &amp; Pine</td>
            <td>hale@covepine.com</td>
            <td>$12,400</td>
            <td>Amex ••1005</td>
          </tr>
        </tbody>
      </table>

      <div className={`crm-select ${on.select ? 'on' : ''}`} style={{ transform: `scale(${Math.max(selectBox.w, on.select ? 100 : 0) / 100})` }} />
      <svg className={`crm-draw ${on.draw ? 'on' : ''}`} viewBox="0 0 160 40" preserveAspectRatio="none">
        <path d="M6 22 C 28 6, 48 34, 72 16 S 120 8, 154 22" />
      </svg>
      <div className={`crm-pencil ${on.pencil ? 'on' : ''}`} />
      <div className={`crm-auto ${on.auto ? 'on' : ''}`} />
      <div className={`crm-censor ${on.censor ? 'on' : ''}`} />
      <div className={`crm-shape ${on.shapes ? 'on' : ''}`} />

      <div className="incogra-dock">
        <img src="/brand/logo-dark.png" alt="" />
        {TOOLS.map((t) => (
          <button key={t.id} type="button" className={tool === t.id ? 'on' : ''}>{t.name}</button>
        ))}
      </div>

      {cursorOn && (
        <div className={`pin-cursor ${down ? 'is-down' : ''}`} style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 3.2 18.8 12.4l-6.6 1.2-2.6 7.2L5 3.2Z" fill="#fff" stroke="#111" strokeWidth="1.35" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  )
}

export function WebshotMock() {
  return (
    <div className="webshot-mock" aria-hidden="true">
      <div className="webshot-chrome">
        <span className="dots"><i /><i /><i /></span>
        <div className="browser-url">atlas.studio / journal</div>
      </div>
      <div className="webshot-page">
        <div className="ws-nav">Atlas Journal</div>
        <div className="ws-hero" />
        <div className="ws-line long" />
        <div className="ws-line" />
        <div className="ws-grid">
          <img src="/gallery/architecture.jpg" alt="" />
          <img src="/gallery/studio.jpg" alt="" />
        </div>
        <div className="ws-line long" />
        <div className="ws-line mid" />
        <div className="ws-line" />
        <img className="ws-wide" src="/gallery/desk.jpg" alt="" />
        <div className="ws-line long" />
        <div className="ws-line mid" />
      </div>
      <div className="webshot-scan" />
      <div className="webshot-toast">Saved full page</div>
    </div>
  )
}

export function HeroMock() {
  return (
    <div className="hero-stage">
      <ProductShot
        src="/screens/folders.jpg"
        alt="Incogra folders home"
        url="app.incogra / folders"
      />
      <div className="hero-float">
        <PopupMock />
      </div>
    </div>
  )
}
