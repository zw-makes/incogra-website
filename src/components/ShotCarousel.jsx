import { useEffect, useState } from 'react'

const SHOTS = [
  { src: '/screens/r3-home.jpg', label: 'Home' },
  { src: '/screens/r1-folders.jpg', label: 'Folders' },
  { src: '/screens/r2-collected.jpg', label: 'Collected' },
  { src: '/screens/r4-folder.jpg', label: 'New folder' },
  { src: '/screens/r5-share.jpg', label: 'Share' },
  { src: '/screens/r6-save.jpg', label: 'Save from the page' }
]

export default function ShotCarousel() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setI((n) => (n + 1) % SHOTS.length), 5200)
    return () => clearInterval(id)
  }, [paused])

  const prev = () => setI((n) => (n - 1 + SHOTS.length) % SHOTS.length)
  const next = () => setI((n) => (n + 1) % SHOTS.length)
  const shot = SHOTS[i]

  return (
    <div
      className="shot-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="shot-stage">
        {SHOTS.map((s, n) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.label}
            className={n === i ? 'is-on' : ''}
          />
        ))}
        <button type="button" className="shot-nav prev" onClick={prev} aria-label="Previous">
          ‹
        </button>
        <button type="button" className="shot-nav next" onClick={next} aria-label="Next">
          ›
        </button>
      </div>
      <div className="shot-meta">
        <p>{shot.label}</p>
        <div className="shot-dots">
          {SHOTS.map((s, n) => (
            <button
              key={s.src}
              type="button"
              className={n === i ? 'on' : ''}
              onClick={() => setI(n)}
              aria-label={s.label}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
