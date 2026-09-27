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
          These Terms of Service form a binding agreement between you and Incogra. By accessing or using the Service, you agree to them. If you do not agree, do not use Incogra.
        </p>
      </header>

      <div className="legal-body">
        <p className="form-note">Effective date: September 20, 2026 · Last updated: September 20, 2026</p>

        <h2>1. The Service</h2>
        <p>
          Incogra provides a Chrome extension and a web studio that allow you to save, capture, redact, organize, and share material from pages you visit (the “Service”), together with this website. We may add, change, or remove features. Descriptions on the website are for general information and do not modify these Terms.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          You must be at least 13 years old, or the minimum age required in your country if higher. If you use the Service on behalf of an organization, you represent that you have authority to bind that organization, and “you” includes that organization.
        </p>

        <h2>3. Accounts</h2>
        <p>
          You must provide accurate information and keep it current. You are responsible for all activity under your account and for keeping your password, passcodes, and devices secure. Notify us promptly at <a href="mailto:support@incogra.live">support@incogra.live</a> if you believe your account has been compromised. We may refuse, suspend, or reclaim usernames or accounts that violate these Terms.
        </p>

        <h2>4. Your content</h2>
        <p>
          You retain whatever rights you already have in content you save, capture, redact, or upload (“Your Content”). You grant Incogra a worldwide, non-exclusive, royalty-free license to host, store, transmit, display, and otherwise process Your Content solely to operate, maintain, and provide the Service you request, including sync, private folders, backups, and share links you create. This license ends when Your Content is deleted from our systems, except for residual copies in backups that are overwritten in the ordinary course, or copies you have already shared with others.
        </p>
        <p>
          You represent that you have all rights needed to save and share Your Content, and that Your Content and your use of the Service do not violate law or anyone else’s rights. You are solely responsible for Your Content and for complying with the terms of websites you capture from.
        </p>

        <h2>5. Acceptable use</h2>
        <p>You agree not to, and not to allow others to:</p>
        <ul>
          <li>Use the Service in violation of applicable law, including privacy, intellectual property, computer-misuse, export, and sanctions laws.</li>
          <li>Save, share, or store content that you are not allowed to possess or distribute.</li>
          <li>Infringe, misappropriate, or violate intellectual property, privacy, or publicity rights.</li>
          <li>Attempt to access another user’s account, library, or private folder without authorization, or circumvent technical protections, rate limits, or share-link controls.</li>
          <li>Probe, scan, reverse engineer (except to the extent this restriction is prohibited by law), overload, or disrupt the Service or its infrastructure.</li>
          <li>Upload malware, or use the Service to send spam or unsolicited messages.</li>
          <li>Impersonate Incogra or misrepresent your affiliation with us.</li>
          <li>Resell, sublicense, or provide the Service to third parties except as we expressly allow.</li>
        </ul>
        <p>We may remove content or suspend accounts that, in our reasonable judgment, violate these Terms or create risk for Incogra or others.</p>

        <h2>6. Plans, limits, and payment</h2>
        <p>
          The Service is offered in plans. Unless we state otherwise at checkout: Free includes up to 49 collected clips; Curator is USD $4.99 per month and includes up to 1,500 collected clips; Studio is USD $149.99 paid once for lifetime access to the Studio plan then offered, also up to 1,500 collected clips. Plan features, limits, and prices may change; the terms shown at the time you purchase or renew control that purchase.
        </p>
        <p>
          Paid plans are billed in advance. By providing a payment method, you authorize us and our payment processor to charge all applicable fees and taxes. Fees are non-refundable except where required by law or where we state otherwise in writing. If a payment fails, we may suspend paid features until it is resolved. Lifetime access means access to the Studio plan for as long as Incogra offers the Service, not a guarantee that the Service will exist forever or that every current feature will remain unchanged.
        </p>

        <h2>7. Sharing and private folders</h2>
        <p>
          If you create a share link, you are responsible for who receives it. Anyone with the link may view that collection until it expires or you disable it. Private folders are protected by a passcode you choose. We are not responsible for access that results from a link or passcode you disclose, or from a device you leave unlocked.
        </p>

        <h2>8. Intellectual property</h2>
        <p>
          The Service, including software, design, text, graphics, and the Incogra name and marks, is owned by Incogra or its licensors and is protected by intellectual property laws. These Terms do not grant you any right to use our marks without prior written permission. Except for Your Content and rights that cannot be waived by law, we reserve all rights not expressly granted.
        </p>
        <p>
          If you believe content on the Service infringes your copyright, send a notice to <a href="mailto:support@incogra.live">support@incogra.live</a> with: (a) your signature; (b) identification of the copyrighted work; (c) identification of the material and its location; (d) your contact information; (e) a statement that you have a good-faith belief the use is not authorized; and (f) a statement, under penalty of perjury, that the notice is accurate and that you are the owner or authorized to act.
        </p>

        <h2>9. Third-party services and websites</h2>
        <p>
          The extension operates on pages you already opened in your browser. Those websites and any third-party services you connect are not under our control. Your use of them is governed by their terms and privacy policies. Incogra is not responsible for third-party content, availability, or practices, or for your decision to capture material from them.
        </p>

        <h2>10. Disclaimer of warranties</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” INCOGRA DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR THAT CONTENT WILL NOT BE LOST. YOU USE THE SERVICE AT YOUR OWN RISK. SOME JURISDICTIONS DO NOT ALLOW CERTAIN DISCLAIMERS, SO SOME OF THE ABOVE MAY NOT APPLY TO YOU.
        </p>

        <h2>11. Limitation of liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, INCOGRA AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS, ARISING OUT OF OR RELATED TO THE SERVICE OR THESE TERMS, WHETHER BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR OTHERWISE, EVEN IF ADVISED OF THE POSSIBILITY.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THE SERVICE OR THESE TERMS IS LIMITED TO THE GREATER OF (A) THE AMOUNTS YOU PAID TO INCOGRA FOR THE SERVICE IN THE TWELVE (12) MONTHS BEFORE THE CLAIM OR (B) FIFTY U.S. DOLLARS (USD $50).
        </p>
        <p>
          Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law, including liability for fraud or for death or personal injury caused by negligence where such a limit is prohibited.
        </p>

        <h2>12. Indemnity</h2>
        <p>
          You will defend, indemnify, and hold harmless Incogra and its personnel from and against any claims, damages, losses, and expenses (including reasonable legal fees) arising out of Your Content, your use of the Service, or your violation of these Terms or of any law or third-party right, except to the extent caused by our willful misconduct.
        </p>

        <h2>13. Suspension and termination</h2>
        <p>
          You may stop using the Service at any time and may request account deletion via the product or <a href="mailto:support@incogra.live">support@incogra.live</a>. We may suspend or terminate access immediately if you materially breach these Terms, if required by law, if your use creates security or legal risk, or if we discontinue the Service. Upon termination, your license to use the Service ends. Sections that by their nature should survive (including 4, 8, 10–12, 14–16) will survive.
        </p>

        <h2>14. Changes</h2>
        <p>
          We may modify these Terms. We will post the updated Terms on this page and update the date above. If a change is material, we will provide reasonable notice (for example by email or in the product). Your continued use after the effective date constitutes acceptance. If you do not agree, you must stop using the Service and may delete your account.
        </p>

        <h2>15. General</h2>
        <p>
          These Terms are the entire agreement between you and Incogra regarding the Service and supersede prior agreements on that subject. If a provision is held unenforceable, it will be modified to the minimum extent necessary, and the rest will remain in effect. You may not assign these Terms without our consent; we may assign them in connection with a merger, acquisition, or sale of assets. Our failure to enforce a provision is not a waiver. There are no third-party beneficiaries except as expressly stated.
        </p>
        <p>
          Except where prohibited by mandatory law of your country of residence, these Terms are governed by the laws of the State of California, United States, without regard to conflict-of-law rules, and courts located in California shall have exclusive jurisdiction, except that you and Incogra may still seek injunctive relief in any competent court. If you are a consumer in a jurisdiction that does not allow that choice of law or venue, the mandatory laws and courts of your place of residence apply instead.
        </p>

        <h2>16. Contact</h2>
        <p>
          Help: <a href="mailto:help@incogra.live">help@incogra.live</a><br />
          Support and legal notices: <a href="mailto:support@incogra.live">support@incogra.live</a>
        </p>
        <p>
          See also our <Link to="/privacy">Privacy Policy</Link>, which explains how we handle personal information.
        </p>
      </div>
    </div>
  )
}
