import { useEffect, useRef, useState } from 'react'

export default function CountUp({ to, suffix = '', duration = 1600, play = false }) {
  const [n, setN] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!play || started.current) return
    started.current = true
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - (1 - p) ** 3
      setN(Math.round(to * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [play, to, duration])

  return (
    <span>
      {n.toLocaleString()}
      {suffix}
    </span>
  )
}
