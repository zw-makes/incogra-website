import { Link } from 'react-router-dom'
import { useTheme } from '../theme.jsx'

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 1.4v1.7M8 12.9v1.7M1.4 8h1.7M12.9 8h1.7M3.1 3.1l1.2 1.2M11.7 11.7l1.2 1.2M3.1 12.9l1.2-1.2M11.7 4.3l1.2-1.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M13.3 10.1A5.5 5.5 0 0 1 5.9 2.7 6.1 6.1 0 1 0 13.3 10.1Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      <button
        type="button"
        className={theme === 'light' ? 'on' : ''}
        aria-pressed={theme === 'light'}
        onClick={() => setTheme('light')}
      >
        <SunIcon />
        Light
      </button>
      <button
        type="button"
        className={theme === 'dark' ? 'on' : ''}
        aria-pressed={theme === 'dark'}
        onClick={() => setTheme('dark')}
      >
        <MoonIcon />
        Dark
      </button>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <p className="kicker light">Launching soon</p>
        <h2>
          Catch the page.<br />
          Soften the secret.<br />
          Keep it yours.
        </h2>
        <div className="btn-row">
          <Link to="/get-started" className="btn btn-light">Get the launch link</Link>
          <Link to="/#web-app" className="btn btn-ghost-light">See the studio</Link>
        </div>
      </div>

      <div className="footer-body">
        <div className="footer-grid">
          <div>
            <img src="/brand/logo-dark.png" alt="Incogra" className="footer-logo" />
            <p className="footer-lede">
              Extension and studio. Save, capture, redact, and share — from any page, into a library that is yours.
            </p>
          </div>
          <div>
            <h3>Product</h3>
            <Link to="/#extension">Extension</Link>
            <Link to="/#web-app">Web app</Link>
            <Link to="/get-started">Get started</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link to="/investors">For Investors</Link>
            <Link to="/privacy">Privacy</Link>
            <a href="mailto:zwmakes@gmail.com">zwmakes@gmail.com</a>
          </div>
        </div>

        <p className="footer-wordmark" aria-hidden="true">Incogra</p>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Incogra. All rights reserved.</span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
