import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TOOLS } from '../data/content.js'
import { PopupMock } from '../components/Mockups.jsx'

const SAMPLE = '/gallery/architecture.jpg'

export default function Extension() {
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const [tool, setTool] = useState('censor')
  const [intensity, setIntensity] = useState(18)
  const [marks, setMarks] = useState([
    { type: 'censor', x: 0.18, y: 0.72, w: 0.42, h: 0.08 },
    { type: 'auto', x: 0.62, y: 0.28, r: 0.09 }
  ])
  const drag = useRef(null)

  function redraw() {
    const canvas = canvasRef.current
    const image = imgRef.current
    if (!canvas || !image || !image.complete) return
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(image, 0, 0, width, height)

    marks.forEach((m) => {
      if (m.type === 'censor') {
        ctx.fillStyle = '#0c0b0a'
        ctx.fillRect(m.x * width, m.y * height, m.w * width, m.h * height)
      } else if (m.type === 'auto' || m.type === 'shapes') {
        const r = (m.r || 0.08) * Math.min(width, height)
        const x = m.x * width
        const y = m.y * height
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.clip()
        ctx.filter = `blur(${intensity}px)`
        ctx.drawImage(image, 0, 0, width, height)
        ctx.restore()
      } else {
        const x = m.x * width
        const y = m.y * height
        const w = (m.w || 0.22) * width
        const h = (m.h || 0.16) * height
        ctx.save()
        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.clip()
        ctx.filter = `blur(${intensity}px)`
        ctx.drawImage(image, 0, 0, width, height)
        ctx.restore()
      }
    })
  }

  useEffect(() => { redraw() }, [marks, intensity, tool])

  function onImg(e) {
    const image = e.currentTarget
    imgRef.current = image
    const canvas = canvasRef.current
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    redraw()
  }

  function pos(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    }
  }

  function down(e) {
    const p = pos(e)
    if (tool === 'censor') {
      drag.current = { type: 'censor', x: p.x, y: p.y, w: 0.02, h: 0.04 }
    } else if (tool === 'auto' || tool === 'shapes') {
      setMarks((m) => m.concat({ type: tool, x: p.x, y: p.y, r: 0.08 }))
      return
    } else if (tool === 'pencil' || tool === 'draw') {
      drag.current = { type: 'select', x: p.x - 0.04, y: p.y - 0.03, w: 0.08, h: 0.06 }
      setMarks((m) => m.concat(drag.current))
      drag.current = null
      return
    } else {
      drag.current = { type: 'select', x: p.x, y: p.y, w: 0.01, h: 0.01 }
    }
    if (drag.current) setMarks((m) => m.concat(drag.current))
  }

  function move(e) {
    if (!drag.current) return
    const p = pos(e)
    const next = {
      ...drag.current,
      w: Math.max(0.04, p.x - drag.current.x),
      h: Math.max(0.04, p.y - drag.current.y)
    }
    drag.current = next
    setMarks((m) => m.slice(0, -1).concat(next))
  }

  function up() {
    drag.current = null
  }

  return (
    <div className="page extension-page">
      <header className="page-hero">
        <p className="eyebrow">The extension</p>
        <h1>Redact in the tab.<br /><em>Save when it’s safe.</em></h1>
        <p className="lede">
          Incogra sits in Chrome. Hover to collect a still, a clip, a line of text — or take the entire page in one click. Open the six tools when a face, a name, or a plate shouldn’t leave with it.
        </p>
        <div className="btn-row">
          <Link to="/get-started" className="btn btn-accent">Install</Link>
          <Link to="/app" className="btn btn-ghost">Open the app</Link>
        </div>
      </header>

      <section className="playground">
        <div className="play-stage">
          <img src={SAMPLE} alt="" onLoad={onImg} className="sr-only-img" />
          <canvas
            ref={canvasRef}
            onMouseDown={down}
            onMouseMove={move}
            onMouseUp={up}
            onMouseLeave={up}
          />
          <p className="play-hint">Click the image to apply <strong>{tool}</strong>. Drag for a box.</p>
        </div>
        <aside>
          <p className="kicker">Blur tools</p>
          <div className="tool-switch">
            {TOOLS.map((t) => (
              <button key={t.id} type="button" className={tool === t.id ? 'on' : ''} onClick={() => setTool(t.id)}>
                <strong>{t.name}</strong>
                <span>{t.desc}</span>
              </button>
            ))}
          </div>
          <label className="intensity">
            Intensity · {intensity}px
            <input type="range" min="6" max="36" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} />
          </label>
          <button type="button" className="btn btn-ghost" onClick={() => setMarks([])}>Clear marks</button>
        </aside>
      </section>

      <section className="ext-split">
        <div>
          <p className="kicker">The popup</p>
          <h2>A small panel. The whole kit.</h2>
          <p>
            Sign-in status, recent saves, theme, hover toolbar toggle, and a jump into the gallery.
            Tools are grouped the way you reach for them: select and draw first, auto and censor when you need to be sure.
          </p>
          <ul className="check-list">
            <li>Dark, light, and pinkish themes</li>
            <li>Auto-connect to Incogra cloud</li>
            <li>Show or hide the on-page toolbar</li>
          </ul>
        </div>
        <div className="mini-frame large">
          <PopupMock />
        </div>
      </section>
    </div>
  )
}
