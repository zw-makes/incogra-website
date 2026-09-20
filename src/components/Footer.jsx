import { Link } from 'react-router-dom'

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
          <span>Coming soon</span>
        </div>
      </div>
    </footer>
  )
}
