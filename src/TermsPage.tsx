import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "1-terms",
    title: "1. Terms",
    body: (
      <>
        <p>
          Please read these Terms of Service (&quot;Terms&quot;) before using the
          iChecklist website and interactive demo (the &quot;Service&quot;)
          operated by iChecklist (&quot;iChecklist&quot;, &quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;).
        </p>
        <p className="terms-caps">
          These Terms are an agreement between you and iChecklist. They cover
          access to this website, the sample workspace, and any related pages we
          publish. If you do not accept them, do not use the Service.
        </p>
        <p>
          The Service is a product preview. Sample people, issues, and completion
          times are illustrations, not customer results. A paid production
          offering needs its own reviewed agreement before it goes live.
        </p>
      </>
    ),
  },
  {
    id: "2-access",
    title: "2. Access to and use of the service",
    body: (
      <>
        <p>
          We grant you a limited, non-exclusive, revocable right to browse the
          site and try the demo for evaluation. You may not copy the interface
          for a competing product, scrape it at scale, or interfere with how it
          is hosted.
        </p>
        <p>You agree not to:</p>
        <ul>
          <li>Probe, scan, or test the vulnerability of the Service.</li>
          <li>Upload malware, or attempt to gain access you were not given.</li>
          <li>Use the demo to store passwords, tokens, or confidential issue data.</li>
          <li>Misrepresent your affiliation with iChecklist or with Atlassian.</li>
        </ul>
        <p>
          Jira and Atlassian are trademarks of their owner. iChecklist is an
          independent product and does not claim an official Marketplace listing
          or endorsement.
        </p>
      </>
    ),
  },
  {
    id: "3-communications",
    title: "3. Communications",
    body: (
      <>
        <p>
          If you write to us through the contact page, you agree we may reply
          about that inquiry. This preview does not send marketing mail and does
          not subscribe you to a list.
        </p>
        <p>
          The contact form prepares a message in your browser. Copying places it
          on your clipboard; downloading saves a text file on your device. Do not
          include credentials or private customer data in that message.
        </p>
      </>
    ),
  },
  {
    id: "4-payment",
    title: "4. Payment, and Subscription",
    body: (
      <>
        <p>
          The pricing page describes how a future plan might be structured. It
          does not start a subscription, charge a card, or create an invoice.
          Billing preferences you select are inquiry context only.
        </p>
        <p>
          If a paid plan is offered later, the price, billing period, taxes, and
          cancellation rules will be stated at checkout and will control that
          purchase. Until then, nothing on this site is an offer to sell.
        </p>
      </>
    ),
  },
  {
    id: "5-content",
    title: "5. Content",
    body: (
      <>
        <p>
          Checklist items you type into the demo stay in your browser for that
          session. We do not receive them, and they are discarded when you leave
          or reload the page. You are responsible for what you type.
        </p>
        <p>
          Do not enter personal information you do not want copied or downloaded,
          and do not enter content you do not have the right to use. We may
          remove or refuse material that is unlawful or that disrupts the
          Service, where we actually host it.
        </p>
      </>
    ),
  },
  {
    id: "6-accounts",
    title: "6. Accounts",
    body: (
      <>
        <p>
          This preview does not create user accounts, passwords, or workspaces
          tied to an identity. If accounts are added later, you will be
          responsible for the credentials you choose and for activity under that
          account.
        </p>
        <p>
          Tell us promptly if you believe an account you control has been used
          without permission. We may suspend access that we reasonably believe
          violates these Terms.
        </p>
      </>
    ),
  },
  {
    id: "7-ip",
    title: "7. Intellectual Property",
    body: (
      <>
        <p>
          The site design, copy, illustrations, and software are owned by
          iChecklist or its licensors and are protected by intellectual-property
          laws. These Terms do not transfer any of that ownership to you.
        </p>
        <p>
          You may share a link to a public page. You may not republish the site,
          remove credits, or use our name or logo in a way that suggests we
          endorse you, except with written permission.
        </p>
      </>
    ),
  },
  {
    id: "8-links",
    title: "8. Links To Other Web Sites",
    body: (
      <>
        <p>
          The Service may link to third-party sites, including Atlassian
          documentation. Those sites have their own terms and privacy practices.
          A link is not an endorsement, and we are not responsible for their
          content or availability.
        </p>
      </>
    ),
  },
  {
    id: "9-cancellation",
    title: "9. Cancellation & Termination",
    body: (
      <>
        <p>
          You may stop using the Service at any time. Because this preview does
          not create a paid subscription, there is nothing to cancel and no
          refund to request.
        </p>
        <p>
          We may suspend or discontinue the preview, or any page of it, without
          notice. Sections that by their nature should survive — including
          intellectual property, disclaimers, and limits of liability — continue
          after you stop using the Service.
        </p>
      </>
    ),
  },
  {
    id: "10-indemnification",
    title: "10. Indemnification",
    body: (
      <>
        <p>
          You will defend and hold harmless iChecklist and its contributors from
          claims, losses, and reasonable expenses arising out of your use of the
          Service, content you submit, or your breach of these Terms, to the
          extent permitted by law.
        </p>
      </>
    ),
  },
  {
    id: "11-liability",
    title: "11. Limitation Of Liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by law, iChecklist is not liable for
          indirect, incidental, special, consequential, or punitive damages, or
          for lost profits, data, or goodwill, arising from your use of the
          Service.
        </p>
        <p>
          Our total liability for any claim relating to the Service is limited to
          the amount you paid us for it in the three months before the claim. For
          this preview, that amount is zero. Some jurisdictions do not allow
          these limits, so they apply only where they are allowed.
        </p>
      </>
    ),
  },
  {
    id: "12-disclaimer",
    title: "12. Disclaimer",
    body: (
      <>
        <p>
          The Service is provided &quot;as is&quot; and &quot;as available&quot;,
          without warranties of merchantability, fitness for a particular
          purpose, or non-infringement. We do not warrant that the preview will
          be uninterrupted, accurate, or suitable for a production Jira workflow.
        </p>
        <p>
          Marketing pages describe the intended product. They are not a promise
          that every illustrated control ships, or that checklist completion
          blocks a Jira status transition.
        </p>
      </>
    ),
  },
  {
    id: "13-law",
    title: "13. Governing Law",
    body: (
      <>
        <p>
          These Terms are governed by the laws of the jurisdiction where
          iChecklist is established, excluding conflict-of-law rules. Courts in
          that jurisdiction have exclusive venue, except where applicable law
          gives you a non-waivable right to bring a claim elsewhere.
        </p>
        <p>
          If a provision is found unenforceable, the rest of the Terms remain in
          effect. A failure to enforce a provision is not a waiver.
        </p>
      </>
    ),
  },
  {
    id: "14-changes",
    title: "14. Changes",
    body: (
      <>
        <p>
          We may update these Terms as the product changes. The date at the top
          of this page is the date of the latest version. Continued use after an
          update means you accept the revised Terms. If you do not agree, stop
          using the Service.
        </p>
      </>
    ),
  },
  {
    id: "15-contact",
    title: "15. Contact Us",
    body: (
      <>
        <p>
          Questions about these Terms can be sent through the{" "}
          <Link to="/contact">contact page</Link>. Please do not include
          passwords, API tokens, or confidential issue data in your message.
        </p>
        <p>
          Our approach to information on this preview is described in the{" "}
          <Link to="/privacy">privacy notice</Link>.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <article className="terms-page">
      <div className="terms-page-inner">
        <div className="terms-hero">
          <Link className="terms-pill" to="/privacy">
            Legal
          </Link>
          <h1>Terms of Service</h1>
        </div>

        <div className="terms-layout">
          <nav className="terms-toc" aria-label="Contents">
            <p>Contents</p>
            <ul>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="terms-prose">
            <p className="terms-updated">
              <em>Last updated: Oct 19, 2026</em>
            </p>
            <p>
              Welcome to iChecklist. These Terms govern your use of our website
              and interactive demo. By using the Service, you agree to them. If
              you do not agree, do not use the Service.
            </p>
            {sections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.body}
              </section>
            ))}
          </div>

          <aside className="terms-promo">
            <div className="terms-promo-card">
              <img src="/features/dashboards/cta-board.png" alt="" />
              <p>Free trial</p>
              <h2>Get started with iChecklist</h2>
              <Link to="/demo">Try the demo</Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
