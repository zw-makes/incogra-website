export default function Privacy() {
  return (
    <div className="page legal">
      <header className="page-hero">
        <p className="eyebrow">Privacy</p>
        <h1>Your library is not our <em>product.</em></h1>
        <p className="lede">Incogra exists so what you save can be collected, captured, and redacted without leaking. This page is the short version of how that works.</p>
      </header>

      <div className="legal-body">
        <h2>What Incogra is</h2>
        <p>
          Incogra is a Chrome extension and a web app. The extension can save images, video, and text you choose,
          capture a full page, and apply on-page redaction. The app stores your library in folders, including optional private folders.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>Account details you type: name, email, password (handled by the auth provider).</li>
          <li>Images and prompts you explicitly save, plus the source URL of that save.</li>
          <li>Folder names, privacy flags, and settings such as theme and “blur saved images”.</li>
        </ul>
        <p>We do not sell your library. We do not use your saves to train models. We do not run ads against your vault.</p>

        <h2>Where it lives</h2>
        <p>
          Signed-in libraries sync to Incogra cloud storage with row-level access so you only see your rows.
          Local mode keeps data on the machine you chose. Private folders are gated by a passcode you set.
        </p>

        <h2>The extension</h2>
        <p>
          The extension needs access to the current tab so it can offer a hover toolbar and redaction overlays
          on the page you’re looking at. It does not silently scrape the web. Saves happen because you clicked.
        </p>

        <h2>Sharing</h2>
        <p>
          A share link exposes only the folder you chose, and can be time-boxed. Recipients do not get your account.
          Treat share links like files: anyone with the link can view that collection until it expires.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about a save, a deletion, or this policy: <a href="mailto:hello@incogra.app">hello@incogra.app</a>.
        </p>
        <p className="form-note">Last updated September 2026. Beta software — we will update this as the product hardens.</p>
      </div>
    </div>
  )
}
