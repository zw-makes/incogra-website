import { useEffect, useRef, useState } from 'react'

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

const TOOLS = [
  { id: 'auto', name: 'Auto', icon: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.4 5.7 20.8 8 13.6 2 9.2h7.6z" /></svg> },
  { id: 'select', name: 'Select', icon: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M4 3.2 18.8 12.4l-6.6 1.2-2.6 7.2z" /></svg> },
  { id: 'pencil', name: 'Pencil', icon: <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><path d="M12 20l7-7 3 3-7 7-3-3z" /><path d="M18 13L8.5 3.5 2 2l1.5 6.5L13 18" /></svg> },
  { id: 'draw', name: 'Draw', icon: <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><path d="M6 2v14a2 2 0 0 0 2 2h14" /><path d="M18 22V8a2 2 0 0 0-2-2H2" /></svg> },
  { id: 'censor', name: 'Censor', icon: <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 4v16" /></svg> },
  { id: 'shapes', name: 'Shapes', icon: <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg> }
]

const AUTO_OPTS = [
  { id: 'images', label: 'Blur Images' },
  { id: 'videos', label: 'Blur Videos' },
  { id: 'emails', label: 'Blur Emails' },
  { id: 'phones', label: 'Blur Phone Numbers' },
  { id: 'cards', label: 'Blur Credit Cards' }
]

export default function BlurMock() {
  const boardRef = useRef(null)
  const toolRefs = useRef({})
  const [pos, setPos] = useState({ x: 50, y: 94 })
  const [down, setDown] = useState(false)
  const [tool, setTool] = useState('select')
  const [on, setOn] = useState({ select: false, draw: false, pencil: false, auto: false, censor: false, shapes: false })
  const [drawBox, setDrawBox] = useState(0)
  const [autoOpen, setAutoOpen] = useState(false)
  const [toggles, setToggles] = useState({})
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTool('select')
      setOn({ select: true, draw: true, pencil: true, auto: true, censor: true, shapes: true })
      setDrawBox(1)
      setToggles({ images: true, videos: true, emails: true, phones: true, cards: true })
      setCursorOn(false)
      return
    }

    let stop = false
    let cur = { x: 50, y: 94 }

    function rel(el, ox = 0.5, oy = 0.55) {
      const board = boardRef.current
      if (!board || !el) return cur
      const b = board.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      return {
        x: ((r.left + r.width * ox - b.left) / b.width) * 100,
        y: ((r.top + r.height * oy - b.top) / b.height) * 100
      }
    }

    function moveTo(to, ms) {
      const from = { ...cur }
      return new Promise((resolve) => {
        const t0 = performance.now()
        const tick = (now) => {
          if (stop) return resolve()
          const p = Math.min(1, (now - t0) / ms)
          const e = easeInOutCubic(p)
          cur = { x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e }
          setPos({ ...cur })
          if (p < 1) requestAnimationFrame(tick)
          else resolve()
        }
        requestAnimationFrame(tick)
      })
    }

    const pause = (ms) => new Promise((r) => setTimeout(r, ms))

    async function clickEl(el) {
      if (!el) return
      await moveTo(rel(el), 1300)
      await pause(350)
      setDown(true)
      await pause(160)
      setDown(false)
      await pause(280)
    }

    async function dragBox(from, to, ms) {
      await moveTo(from, 1200)
      await pause(250)
      setDown(true)
      const t0 = performance.now()
      const start = { ...cur }
      await new Promise((resolve) => {
        const tick = (now) => {
          if (stop) return resolve()
          const p = Math.min(1, (now - t0) / ms)
          const e = easeInOutCubic(p)
          cur = { x: start.x + (to.x - start.x) * e, y: start.y + (to.y - start.y) * e }
          setPos({ ...cur })
          setDrawBox(e)
          if (p < 1) requestAnimationFrame(tick)
          else resolve()
        }
        requestAnimationFrame(tick)
      })
      setDown(false)
    }

    async function loop() {
      while (!stop) {
        setOn({ select: false, draw: false, pencil: false, auto: false, censor: false, shapes: false })
        setDrawBox(0)
        setTool('select')
        setAutoOpen(false)
        setToggles({})
        cur = { x: 50, y: 94 }
        setPos(cur)
        await pause(900)
        if (stop) break

        await clickEl(toolRefs.current.auto)
        setTool('auto')
        setAutoOpen(true)
        await pause(500)
        for (const opt of AUTO_OPTS) {
          if (stop) break
          await pause(300)
          setToggles((t) => ({ ...t, [opt.id]: true }))
        }
        setOn((s) => ({ ...s, auto: true }))
        await pause(1200)
        setAutoOpen(false)
        await pause(400)
        if (stop) break

        await clickEl(toolRefs.current.select)
        setTool('select')
        await pause(350)
        await moveTo({ x: 28, y: 58 }, 1200)
        await pause(200)
        setDown(true)
        await pause(160)
        setDown(false)
        setOn((s) => ({ ...s, select: true }))
        await pause(800)
        if (stop) break

        await clickEl(toolRefs.current.pencil)
        setTool('pencil')
        await pause(350)
        await moveTo({ x: 22, y: 56 }, 1100)
        setOn((s) => ({ ...s, pencil: true }))
        await moveTo({ x: 40, y: 60 }, 1600)
        await pause(700)
        if (stop) break

        await clickEl(toolRefs.current.draw)
        setTool('draw')
        await pause(350)
        await dragBox({ x: 20, y: 26 }, { x: 46, y: 41 }, 1300)
        setOn((s) => ({ ...s, draw: true }))
        await pause(800)
        if (stop) break

        await clickEl(toolRefs.current.censor)
        setTool('censor')
        await pause(350)
        await moveTo({ x: 84, y: 60 }, 1200)
        setDown(true)
        await pause(180)
        setDown(false)
        setOn((s) => ({ ...s, censor: true }))
        await pause(800)
        if (stop) break

        await clickEl(toolRefs.current.shapes)
        setTool('shapes')
        await pause(350)
        await moveTo({ x: 74, y: 34 }, 1200)
        setOn((s) => ({ ...s, shapes: true }))
        await pause(2000)
        if (stop) break
        await moveTo({ x: 50, y: 94 }, 1300)
        await pause(800)
      }
    }

    loop()
    return () => { stop = true }
  }, [])

  return (
    <div className="crm-demo" ref={boardRef} aria-hidden="true">
      <div className="crm-page">
      <header className="crm-top">
        <strong>Atlas</strong>
        <span>Revenue</span>
        <em>Live</em>
      </header>
      <div className="crm-metrics">
        <article>
          <p>Annual recurring</p>
          <b className={on.draw ? 'is-redacted' : ''}>$1,248,900</b>
        </article>
        <article>
          <p>Open pipeline</p>
          <b className={on.shapes ? 'is-redacted' : ''}>$86,400</b>
        </article>
      </div>
      <table className="crm-table">
        <thead>
          <tr><th>Account</th><th>Email</th><th>Deal</th><th>Card</th></tr>
        </thead>
        <tbody>
          <tr className={on.select ? 'is-picked' : ''}>
            <td><i>ML</i> <span className={on.pencil ? 'is-redacted' : ''}>Meridian Labs</span></td>
            <td className={on.auto ? 'is-redacted' : ''}>nina@meridian.co</td>
            <td>$48,200</td>
            <td className={on.auto || on.censor ? 'is-redacted-bar' : ''}>Visa ••4242</td>
          </tr>
          <tr>
            <td><i>CP</i> Cove &amp; Pine</td>
            <td className={on.auto ? 'is-redacted' : ''}>hale@covepine.com</td>
            <td>$12,400</td>
            <td className={on.auto ? 'is-redacted-bar' : ''}>Amex ••1005</td>
          </tr>
        </tbody>
      </table>

      <div className={`crm-drawbox ${on.draw ? 'on' : ''}`} style={{ transform: `scale(${Math.max(drawBox, on.draw ? 1 : 0)})` }}>
        <i className="h nw" /><i className="h ne" /><i className="h se" /><i className="h sw" />
      </div>
      <svg className={`crm-pencil-stroke ${on.pencil ? 'on' : ''}`} viewBox="0 0 180 36" preserveAspectRatio="none">
        <path d="M4 20 C 18 8, 32 28, 48 14 S 78 8, 96 22 S 128 30, 152 12 S 168 18, 176 16" />
      </svg>
      <div className={`crm-shape ${on.shapes ? 'on' : ''}`} />
      </div>

      <div className="incogra-bar">
        <span className="bar-grip" aria-hidden="true" />
        <span className="bar-intensity"><b /><em>6</em></span>
        <div className="bar-tools">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              type="button"
              ref={(el) => { toolRefs.current[t.id] = el }}
              className={tool === t.id ? 'on' : ''}
            >
              {t.icon}
              <span>{t.name}</span>
            </button>
          ))}
        </div>
        <span className="bar-split" />
        <button type="button" className="bar-icon" aria-label="Save">
          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>
        </button>
        <button type="button" className="bar-icon danger" aria-label="Delete">
          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
        </button>
        <button type="button" className="bar-icon" aria-label="Close">
          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
        {autoOpen && (
          <div className="auto-menu">
            {AUTO_OPTS.map((opt) => (
              <div key={opt.id} className="auto-row">
                <span>{opt.label}</span>
                <i className={toggles[opt.id] ? 'on' : ''} />
              </div>
            ))}
          </div>
        )}
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
