import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="notch" role="navigation" aria-label="Primary">
        <Link to="/" className="nav-brand" aria-label="Incogra home">
          <img src="/brand/logo-dark.png" alt="Incogra" />
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/extension">Extension</NavLink>
          <NavLink to="/app">App</NavLink>
          <a href="/#faq">FAQ</a>
          <NavLink to="/investors">For Investors</NavLink>
        </nav>

        <div className="nav-end">
          <Link to="/get-started" className="nav-cta">Join</Link>
          <button
            className="nav-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav-drawer">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/extension">Extension</NavLink>
          <NavLink to="/app">App</NavLink>
          <NavLink to="/investors">For Investors</NavLink>
          <NavLink to="/privacy">Privacy</NavLink>
          <Link to="/get-started" className="btn btn-accent">Join</Link>
        </div>
      )}
    </header>
  )
}
