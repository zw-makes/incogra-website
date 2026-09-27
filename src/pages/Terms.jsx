import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Terms() {
  useEffect(() => {
    const prev = document.title
    document.title = 'Terms of Service — Incogra'
    return () => { document.title = prev }
  }, [])

  return (
    <div className="page legal">
      <header className="page-hero">
        <p className="eyebrow">Terms of Service</p>
        <h1>The rules for using <em>Incogra.</em></h1>
        <p className="lede">
          These terms govern this website and, when it launches, the Incogra Chrome extension and web studio. If you do not agree, do not use the service.
        </p>
      </header>

      <div className="legal-body">
        <p className="form-note">Effective September 20, 2026 · Last updated September 20, 2026</p>

        <h2>1. The service</h2>
        <p>
          Incogra is a Chrome extension and a studio for saving, capturing, redacting, and sharing what you catch from the web. This site also offers a waitlist and an investor contact form. The product is launching soon. Features described on the marketing site may change before or after launch.
        </p>

        <h2>2. Who can use it</h2>
        <p>
          You must be at least 13. If you use Incogra for a company, you confirm you have authority to bind that company to these terms.
        </p>

        <h2>3. Accounts and the waitlist</h2>
        <p>
          Joining the waitlist does not guarantee access, a launch date, or a price. When accounts exist, you are responsible for the email and credentials you use, and for what happens in that account.
        </p>

        <h2>4. Your content</h2>
        <p>
          You keep whatever rights you already have in the clips, captures, and text you save. You grant Incogra a limited license to store, display, and transmit that content only as needed to run the service you asked for — including sync, private folders, and share links you create.
        </p>
        <p>
          You are responsible for what you save and share. Do not use Incogra to collect or publish content you have no right to keep, or to harm someone else.
        </p>

        <h2>5. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Break the law, or save or share material that is illegal to possess.</li>
          <li>Probe, scrape, or disrupt Incogra, its hosts, or other users.</li>
          <li>Circumvent private mode, share links, or access controls.</li>
          <li>Impersonate Incogra or misrepresent a relationship with us.</li>
          <li>Use the service to send spam or malware.</li>
        </ul>

        <h2>6. Plans and payment</h2>
        <p>
          When paid plans are offered, Free is up to 49 collected clips. Curator is $4.99 per month for up to 1,500 clips. Studio is $149.99 once, lifetime, also up to 1,500 clips. Prices and limits can change; we will show the current plan before you pay. Fees are generally non-refundable except where the law requires otherwise.
        </p>

        <h2>7. Pre-release software</h2>
        <p>
          Until we say otherwise, Incogra is pre-release. It may break, lose data, or change behavior. We are not obliged to keep any beta feature in the launched product.
        </p>

        <h2>8. Intellectual property</h2>
        <p>
          Incogra, the name, the mark, the site, and the software are ours. These terms do not give you ownership of them. You may not copy, reverse engineer, or resell the service except as the law allows.
        </p>

        <h2>9. Third-party sites</h2>
        <p>
          The extension works on pages you already opened. Those sites have their own terms. Incogra is not responsible for other people’s pages, or for what you choose to capture from them.
        </p>

        <h2>10. Disclaimer</h2>
        <p>
          The service is provided “as is.” We do not warrant that it will be uninterrupted, error-free, or fit for a particular purpose, to the fullest extent the law allows.
        </p>

        <h2>11. Limitation of liability</h2>
        <p>
          To the fullest extent allowed by law, Incogra is not liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, data, or goodwill, arising from your use of the service. Our total liability for any claim is limited to the amount you paid us in the twelve months before the claim, or fifty U.S. dollars, whichever is greater.
        </p>

        <h2>12. Termination</h2>
        <p>
          You may stop using Incogra at any time. We may suspend or close access if you break these terms, if we have to for legal reasons, or if we shut the service down. We will try to give notice when we reasonably can.
        </p>

        <h2>13. Changes</h2>
        <p>
          We may update these terms. The date at the top will change. If you keep using the site or the product after that, you accept the new terms.
        </p>

        <h2>14. Contact</h2>
        <p>
          <a href="mailto:zwmakes@gmail.com">zwmakes@gmail.com</a>
        </p>
        <p>
          See also our <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
