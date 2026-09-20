import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FOLDERS, GALLERY } from '../data/content.js'

const STORE = 'incogra-beta-app-v2'
const PASS = 'incogra-beta-pass'

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (name === 'home') return <svg {...common}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 10v10h14V10" /></svg>
  if (name === 'folders') return <svg {...common}><path d="M3 7h6l2 2h10v10H3z" /><path d="M3 7V5h5l2 2" /></svg>
  if (name === 'collected') return <svg {...common}><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M5 21h14" /></svg>
  if (name === 'search') return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></svg>
  if (name === 'lock') return <svg {...common}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
  if (name === 'plus') return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>
  if (name === 'crown') return <svg {...common}><path d="m3 8 4 3 5-6 5 6 4-3v10H3z" /></svg>
  if (name === 'camera') return <svg {...common} width="42" height="42" strokeWidth="1.5"><path d="M4 8h4l2-3h4l2 3h4v12H4z" /><circle cx="12" cy="13" r="3.2" /></svg>
  if (name === 'aperture') return <svg {...common} width="42" height="42" strokeWidth="1.5"><circle cx="12" cy="12" r="8" /><path d="m12 4 3 7M20 8l-7 3M20 16l-7-3M12 20l-3-7M4 16l7-3M4 8l7 3" /></svg>
  return null
}

function MacFolder({ color, icon, star, plus }) {
  return (
    <div className={`mac-folder ${plus ? 'is-plus' : ''}`} style={{ '--fc': color }}>
      <span className="mac-tab" />
      <span className="mac-body">
        {plus ? <Icon name="plus" /> : icon ? <Icon name={icon} /> : null}
        {star && <i className="mac-star" aria-hidden="true">★</i>}
      </span>
    </div>
  )
}

function load() {
  try {
    const raw = localStorage.getItem(STORE)
    if (raw) return JSON.parse(raw)
  } catch {}
  return {
    folders: FOLDERS,
    saved: GALLERY.map((g) => ({ ...g })),
    privateOn: false
  }
}

export default function AppDemo() {
  const [state, setState] = useState(load)
  const [view, setView] = useState('folders')
  const [nav, setNav] = useState('folders')
  const [folderId, setFolderId] = useState('all')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)
  const [navOpen, setNavOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [passOpen, setPassOpen] = useState(false)
  const [pass, setPass] = useState('')
  const [passError, setPassError] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(STORE, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get('view')
    if (v === 'collected') {
      setNav('collected')
      setView('collected')
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const q = query.trim().toLowerCase()
  const visibleFolders = useMemo(() => {
    if (!q) return state.folders
    return state.folders.filter((f) => f.name.toLowerCase().includes(q))
  }, [state.folders, q])

  const items = useMemo(() => {
    return state.saved.filter((img) => {
      if (view === 'collected') return true
      if (folderId !== 'all' && img.folder !== folderId) return false
      if (!q) return true
      return (img.title + img.prompt + img.folder).toLowerCase().includes(q)
    })
  }, [state.saved, view, folderId, q])

  function countFor(id) {
    if (id === 'all') return state.saved.length
    return state.saved.filter((img) => img.folder === id).length
  }

  function openFolder(id) {
    setFolderId(id)
    setView('inside')
    setNav('folders')
    setNavOpen(false)
  }

  function go(next) {
    setNav(next)
    setView(next === 'collected' ? 'collected' : 'folders')
    setFolderId('all')
    setNavOpen(false)
  }

  function createFolder(e) {
    e.preventDefault()
    const name = newName.trim()
    if (!name) return
    const id = name.toLowerCase().replace(/\s+/g, '-').slice(0, 24) + '-' + Date.now().toString(36)
    const colors = ['#f472b6', '#3b82f6', '#f5c518', '#34d399', '#a78bfa']
    setState((s) => ({
      ...s,
      folders: s.folders.concat({ id, name, color: colors[s.folders.length % colors.length], icon: null })
    }))
    setNewName('')
    setCreating(false)
  }

  function togglePrivate() {
    if (!state.privateOn) {
      setPassOpen(true)
      return
    }
    setState((s) => ({ ...s, privateOn: false }))
  }

  function unlock(e) {
    e.preventDefault()
    const expected = localStorage.getItem(PASS) || '0000'
    if (pass !== expected) {
      setPassError('Wrong passcode. Default is 0000.')
      return
    }
    setState((s) => ({ ...s, privateOn: true }))
    setPassOpen(false)
    setPass('')
    setPassError('')
  }

  const currentFolder = state.folders.find((f) => f.id === folderId)
  const title = view === 'folders' ? 'Folders' : view === 'collected' ? 'Collected' : (currentFolder?.name || 'Folder')
  const subtitle = view === 'folders'
    ? `Organize your collections (${state.folders.length} folders)`
    : `Your visual inspiration board (${items.length} items)`

  return (
    <div className="ig-app">
      <aside className={`ig-aside ${navOpen ? 'open' : ''}`}>
        <Link to="/" className="ig-logo" aria-label="Incogra">
          <img src="/brand/logo-dark.png" alt="Incogra" />
        </Link>
        <label className="ig-search">
          <Icon name="search" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
          />
          <kbd>Ctrl+K</kbd>
        </label>
        <nav>
          <button type="button" className={nav === 'home' ? 'on' : ''} onClick={() => go('home')}>
            <Icon name="home" /> Home
          </button>
          <button type="button" className={nav === 'folders' ? 'on' : ''} onClick={() => go('folders')}>
            <Icon name="folders" /> Folders
          </button>
          <button type="button" className={nav === 'collected' ? 'on' : ''} onClick={() => go('collected')}>
            <Icon name="collected" /> Collected
          </button>
        </nav>
        <div className="ig-aside-end">
          <Link to="/get-started" className="ig-upgrade">
            <Icon name="crown" /> Upgrade
          </Link>
          <div className="ig-member">
            <span>Free member · Incogra</span>
          </div>
        </div>
      </aside>

      <section className="ig-stage">
        <header className="ig-stage-top">
          <button className="ig-menu" type="button" onClick={() => setNavOpen((v) => !v)}>Menu</button>
          <button type="button" className="ig-pill" onClick={() => setCreating(true)}>New Folder</button>
          <button type="button" className={`ig-pill ig-private ${state.privateOn ? 'on' : ''}`} onClick={togglePrivate}>
            <Icon name="lock" /> Private
          </button>
        </header>

        <div className="ig-stage-body">
          <div className="ig-heading">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          {view === 'folders' ? (
            <div className="ig-folder-row">
              {visibleFolders.map((f) => (
                <button key={f.id} type="button" className="ig-folder-card" onClick={() => openFolder(f.id)}>
                  <MacFolder color={f.color} icon={f.icon} star={f.star} />
                  <strong>{f.name}</strong>
                  <span>{countFor(f.id)} {countFor(f.id) === 1 ? 'item' : 'items'}</span>
                </button>
              ))}
              <button type="button" className="ig-folder-card" onClick={() => setCreating(true)}>
                <MacFolder color="#3a3a3a" plus />
                <strong>New Folder</strong>
                <span>Create collection</span>
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="ig-empty">
              <p>Nothing in here yet.</p>
              <button type="button" onClick={() => go('folders')}>Back to folders</button>
            </div>
          ) : (
            <div className="ig-masonry">
              {items.map((img) => (
                <button key={img.id} type="button" className="ig-tile" onClick={() => setActive(img)}>
                  <img src={img.src} alt={img.title} />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {creating && (
        <div className="lightbox" onClick={() => setCreating(false)}>
          <form className="pass-card" onClick={(e) => e.stopPropagation()} onSubmit={createFolder}>
            <p className="kicker">New folder</p>
            <h2>Name this collection</h2>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Web Snaps" autoFocus />
            <div className="btn-row">
              <button className="btn btn-accent" type="submit">Create</button>
              <button className="btn btn-ghost" type="button" onClick={() => setCreating(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
            <img src={active.src} alt={active.title} />
            <div>
              <p className="kicker">{active.source}</p>
              <h2>{active.title}</h2>
              <p>{active.prompt}</p>
              <div className="btn-row">
                <button type="button" className="btn btn-ghost" onClick={() => setActive(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {passOpen && (
        <div className="lightbox" onClick={() => setPassOpen(false)}>
          <form className="pass-card" onClick={(e) => e.stopPropagation()} onSubmit={unlock}>
            <p className="kicker">Private mode</p>
            <h2>Enter passcode</h2>
            <p>Default is <code>0000</code>.</p>
            <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Passcode" autoFocus />
            {passError && <p className="form-error">{passError}</p>}
            <div className="btn-row">
              <button className="btn btn-accent" type="submit">Unlock</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
