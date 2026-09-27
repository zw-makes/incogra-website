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
          This Privacy Policy describes how Incogra collects, uses, stores, and shares personal information when you use our website, Chrome extension, and web studio.
        </p>
      </header>

      <div className="legal-body">
        <p className="form-note">Effective date: September 20, 2026 · Last updated: September 20, 2026</p>

        <h2>1. Who we are</h2>
        <p>
          Incogra (“Incogra,” “we,” “us,” or “our”) provides a Chrome extension and a web studio that let you save, capture, redact, organize, and share material from the web. Our website is available at <a href="https://z-w.live">z-w.live</a>.
        </p>
        <p>
          Privacy requests: <a href="mailto:support@incogra.live">support@incogra.live</a>. Product help: <a href="mailto:help@incogra.live">help@incogra.live</a>.
        </p>

        <h2>2. Scope</h2>
        <p>
          This policy applies to the Incogra website, the Incogra Chrome extension, the Incogra web studio (the “Service”), and related communications. It does not apply to third-party websites you visit or capture from. Those sites have their own policies.
        </p>

        <h2>3. Information we collect</h2>
        <h3>Information you provide</h3>
        <ul>
          <li>Account details you submit, such as name, email address, and password or other sign-in credentials.</li>
          <li>Profile and settings, including folder names, privacy flags, passcode-protected folders, and display preferences.</li>
          <li>Content you choose to save or capture: images, video, text, full-page captures, source URLs, and redactions you apply.</li>
          <li>Messages you send us, including through forms or email (name, email, and the content of your message).</li>
          <li>Payment details when you buy a paid plan. Card numbers are processed by our payment provider; we do not store full card numbers on our servers.</li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>Device and log data reasonably needed to operate the Service, such as browser type, operating system, IP address, timestamps, and error reports.</li>
          <li>Local preferences stored on your device (for example, light or dark theme).</li>
          <li>Usage data about how you use Incogra features (for example, that a save or share occurred), not the contents of other people’s sites beyond what you explicitly capture.</li>
        </ul>

        <h3>The Chrome extension</h3>
        <p>
          The extension requires permission to run on the tab you have open so it can show save and redaction tools on that page. It does not crawl the web in the background. A save, capture, or redaction is created because you took that action.
        </p>

        <h2>4. How we use information</h2>
        <p>We use personal information to:</p>
        <ul>
          <li>Provide, maintain, and secure the Service, including sync, folders, private mode, and share links you create.</li>
          <li>Create and manage your account, plans, and billing.</li>
          <li>Respond to you at <a href="mailto:help@incogra.live">help@incogra.live</a> or <a href="mailto:support@incogra.live">support@incogra.live</a>.</li>
          <li>Detect, prevent, and investigate abuse, fraud, and security incidents.</li>
          <li>Comply with law and enforce our Terms of Service.</li>
          <li>Improve the Service, using aggregated or de-identified information where practical.</li>
        </ul>
        <p>
          We do not sell your personal information. We do not sell your library. We do not use the content of your saves to train machine-learning models. We do not serve third-party advertising against your vault.
        </p>

        <h2>5. Legal bases (EEA, UK, and similar)</h2>
        <p>Where those laws apply, we process personal information because:</p>
        <ul>
          <li>It is necessary to perform our contract with you (providing the Service you signed up for).</li>
          <li>It is necessary for our legitimate interests in running, securing, and improving Incogra, unless those interests are overridden by your rights.</li>
          <li>We have a legal obligation.</li>
          <li>You have given consent, where we ask for it (you may withdraw consent at any time without affecting processing already carried out).</li>
        </ul>

        <h2>6. How we share information</h2>
        <p>We share personal information only as follows:</p>
        <ul>
          <li><strong>Service providers.</strong> Hosting, database, file storage, email, analytics that we may use to keep the Service running, and payment processors. They may process data only on our instructions.</li>
          <li><strong>Share links you create.</strong> A share link reveals only the collection you chose, for as long as you allow. Anyone with the link can view that collection until it expires or you revoke it. Recipients do not receive your account credentials.</li>
          <li><strong>Legal and safety.</strong> If we reasonably believe we must disclose information to comply with law, a valid legal request, or to protect Incogra, our users, or the public.</li>
          <li><strong>Business transfers.</strong> If we are involved in a merger, acquisition, or sale of assets, information may transfer as part of that transaction, subject to this policy or notice we provide.</li>
        </ul>
        <p>We do not share personal information with third parties for their own independent marketing.</p>

        <h2>7. Where information is stored</h2>
        <p>
          We use cloud infrastructure that may process data in the United States and other countries. If you access the Service from another country, your information may be transferred to those locations. Where required, we use appropriate safeguards for such transfers (such as standard contractual clauses used by our providers).
        </p>
        <p>
          Signed-in libraries are stored in Incogra’s cloud with access controls so other customers cannot read your rows. You may also keep material locally on a device you control. Private folders are gated by a passcode you set; we cannot recover a passcode you forget if we do not store it in recoverable form.
        </p>

        <h2>8. Retention</h2>
        <p>
          We keep personal information for as long as your account is active and as needed to provide the Service. After you delete content or close your account, we delete or de-identify it within a reasonable period, except where we must retain it for legal, tax, security, or dispute-resolution reasons (in which case we limit further use). Backups may persist for a limited time until they cycle out.
        </p>

        <h2>9. Security</h2>
        <p>
          We use administrative, technical, and organizational measures designed to protect personal information, including encryption in transit, access controls, and isolation of customer libraries. No method of transmission or storage is completely secure. You are responsible for keeping your credentials and folder passcodes confidential.
        </p>

        <h2>10. Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access, correct, delete, or export personal information; to object to or restrict certain processing; to withdraw consent; and to lodge a complaint with a supervisory authority. California residents may also have the right to know what we collect, to delete it, to correct it, and to opt out of “sale” or “sharing” as those terms are defined by California law. We do not sell or share personal information as those terms are defined in the California Consumer Privacy Act.
        </p>
        <p>
          To exercise these rights, email <a href="mailto:support@incogra.live">support@incogra.live</a>. We may need to verify your request. You may use the Service tools to delete clips, folders, or your account. You will not be discriminated against for exercising privacy rights.
        </p>

        <h2>11. Cookies and similar technologies</h2>
        <p>
          We use essential storage to keep you signed in, remember theme and similar preferences, and operate the Service. We do not use third-party advertising cookies. You can clear local storage and cookies in your browser; some features may stop working if you do.
        </p>

        <h2>12. Children</h2>
        <p>
          The Service is not directed to children under 13, and we do not knowingly collect personal information from them. If you are a parent or guardian and believe a child has provided information, contact <a href="mailto:support@incogra.live">support@incogra.live</a> and we will delete it. In some regions the minimum age may be 16; do not use the Service if you are under the age required in your country.
        </p>

        <h2>13. Do not track</h2>
        <p>
          There is no consistent industry standard for Do Not Track browser signals. We do not respond to them at this time. We still do not sell your information or use it for third-party ads.
        </p>

        <h2>14. Changes</h2>
        <p>
          We may update this policy. We will post the revised version on this page and change the “Last updated” date. If changes are material, we will provide additional notice (for example, by email or an in-product notice) where required. Continued use of the Service after the effective date means you acknowledge the updated policy.
        </p>

        <h2>15. Contact</h2>
        <p>
          Privacy and data requests: <a href="mailto:support@incogra.live">support@incogra.live</a><br />
          Product help: <a href="mailto:help@incogra.live">help@incogra.live</a>
        </p>
        <p>
          See also our <Link to="/terms">Terms of Service</Link>.
        </p>
      </div>
    </div>
  )
}
