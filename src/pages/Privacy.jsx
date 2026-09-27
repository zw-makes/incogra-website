import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Privacy() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Privacy Policy — Incogra'
    return () => { document.title = prev }
  }, [])

  return (
    <div className="page legal">
      <header className="page-hero">
        <p className="eyebrow">Privacy Policy</p>
        <h1>Your library is not our <em>product.</em></h1>
        <p className="lede">
          This policy explains what Incogra collects, why, and how you can ask us to change or delete it. It covers this website now, and the extension and studio when they launch.
        </p>
      </header>

      <div className="legal-body">
        <p className="form-note">Effective September 20, 2026 · Last updated September 20, 2026</p>

        <h2>Who we are</h2>
        <p>
          Incogra is operated by the team behind this site at <a href="https://z-w.live">z-w.live</a>. Questions go to <a href="mailto:zwmakes@gmail.com">zwmakes@gmail.com</a>.
        </p>

        <h2>What this policy covers</h2>
        <p>This website (including the waitlist, investor notes, and inbox for our own use), and the Incogra Chrome extension and web studio when they are published.</p>

        <h2>What we collect</h2>
        <h3>On this website today</h3>
        <ul>
          <li>Waitlist: name, email, and what you mostly do, if you submit the form.</li>
          <li>Investor notes: name, email, firm, and the message you write, if you submit that form.</li>
          <li>Theme preference (light or dark) stored in your browser.</li>
        </ul>
        <p>We do not run ads on this site. We do not sell lists. We do not buy extra tracking pixels for the waitlist.</p>

        <h3>When the product launches</h3>
        <ul>
          <li>Account details you type, such as name and email.</li>
          <li>Clips you explicitly save or capture, plus the source URL of that save.</li>
          <li>Folder names, share settings, private-mode flags, and redactions you apply.</li>
        </ul>
        <p>The extension needs the current tab so hover-save and redaction can run on the page you are looking at. It does not silently scrape the web. Saves happen because you clicked.</p>

        <h2>How we use it</h2>
        <ul>
          <li>To send you the launch link if you joined the waitlist.</li>
          <li>To reply if you wrote as an investor.</li>
          <li>To operate, secure, and improve Incogra when the product is live.</li>
          <li>To honor a share link you created, for the folder and time window you chose.</li>
        </ul>
        <p>We do not sell your library. We do not use your saves to train models. We do not run ads against your vault.</p>

        <h2>Where it lives</h2>
        <p>
          Waitlist and investor notes are stored in our database (Supabase). Theme choice stays on your device. When the studio launches, signed-in libraries sync to Incogra cloud storage so only you can see your rows. Local mode keeps data on the machine you chose. Private folders are gated by a passcode you set.
        </p>

        <h2>Sharing</h2>
        <p>
          We share data with the infrastructure that hosts the site and database, only to run the service. We may disclose information if the law requires it.
        </p>
        <p>
          If you create a share link in the product, that link exposes only the collection you chose, and can be time-boxed. Recipients do not get your account. Treat share links like files: anyone with the link can view that collection until it expires.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Waitlist and investor notes stay until you ask us to delete them, or until we no longer need them to launch or reply. Product libraries stay until you delete them or close the account. You can email us to request deletion.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>Do not submit a form if you do not want that data stored.</li>
          <li>Email <a href="mailto:zwmakes@gmail.com">zwmakes@gmail.com</a> to access, correct, or delete waitlist or investor notes we hold.</li>
          <li>When the product is live, you can delete clips, folders, and your account from the studio, or ask us to do it.</li>
        </ul>

        <h2>Children</h2>
        <p>Incogra is not directed at children under 13. We do not knowingly collect their information. If you think we have, write to us and we will delete it.</p>

        <h2>Changes</h2>
        <p>If this policy changes in a material way, we will update this page and the date above. Continued use of the site after that date means you have read the new version.</p>

        <h2>Contact</h2>
        <p>
          Questions about a save, a deletion, or this policy: <a href="mailto:zwmakes@gmail.com">zwmakes@gmail.com</a>.
        </p>
        <p>
          See also our <Link to="/terms">Terms of Service</Link>.
        </p>
      </div>
    </div>
  )
}
