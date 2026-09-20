import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Extension from './pages/Extension.jsx'
import AppDemo from './pages/AppDemo.jsx'
import GetStarted from './pages/GetStarted.jsx'
import Privacy from './pages/Privacy.jsx'
import Investors from './pages/Investors.jsx'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return true
        }
        return false
      }
      if (scrollToHash()) return
      const id = requestAnimationFrame(scrollToHash)
      return () => cancelAnimationFrame(id)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isApp = pathname === '/app'

  return (
    <>
      <ScrollToTop />
      {!isApp && <Nav />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/extension" element={<Extension />} />
          <Route path="/app" element={<AppDemo />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      {!isApp && <Footer />}
    </>
  )
}
