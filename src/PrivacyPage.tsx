import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    body: (
      <>
        <p>
          This Privacy Policy applies to the iChecklist website and interactive
          demo (the &quot;Service&quot;) published by iChecklist (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;). It explains what information the
          Service handles and how to ask us about it.
        </p>
        <p>
          Please read it with our <Link to="/terms">Terms of Service</Link>. If
          another page points you here, this notice is the one that applies. A
          future production Jira app will need its own reviewed policy before it
          processes customer issue data. This page describes the website you are
          using now.
        </p>
        <p>
          Questions about this notice can be sent from the{" "}
          <Link to="/contact">contact page</Link>. Do not include passwords, API
          tokens, or confidential issue content in that message.
        </p>
      </>
    ),
  },
  {
    id: "definitions",
    title: "2. Definitions",
    body: (
      <>
        <p>In this notice:</p>
        <ul>
          <li>
            <strong>Personal information</strong> means information that
            identifies you or can reasonably be linked to you, such as a name
            or work email.
          </li>
          <li>
            <strong>Service</strong> means this website, the sample workspace,
            and the related pages we publish.
          </li>
          <li>
            <strong>You</strong> means the person browsing the site or trying
            the demo.
          </li>
        </ul>
        <p>
          Sample names and issues shown in the demo are illustrations. They are
          not your personal information and they are not records from your Jira
          site.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "1. What information do we collect?",
    body: (
      <>
        <p>Depending on how you use the site, information can come from:</p>
        <ul>
          <li>
            <strong>Inquiries you type.</strong> The contact and pricing forms
            ask for details such as your name, work email, company, and
            message. In this preview that text stays in your browser. We do not
            receive it, store it, or add you to a mailing list.
          </li>
          <li>
            <strong>The interactive demo.</strong> Checklist changes use sample
            data held in the page. The demo is not connected to Jira and does
            not read your issues. Those changes are discarded when you reload
            or leave the page.
          </li>
          <li>
            <strong>What we do not ask for.</strong> We do not create accounts
            on this preview, and we do not collect passwords, API tokens, or
            Jira credentials.
          </li>
          <li>
            <strong>Connection data.</strong> The host that serves the site may
            keep ordinary server logs, such as IP address, browser type, and
            the page requested. We have not added analytics or advertising
            pixels.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "2. How do we use your information?",
    body: (
      <>
        <p>
          Because the inquiry form does not send a message, we do not use those
          entries to contact you, bill you, or build a profile. If you later
          email us, or send the copied inquiry yourself, we use that message to
          answer you.
        </p>
        <p>
          Sample demo data is used only to show how a checklist works. We do
          not use it to make decisions about you. We do not use personal
          information for advertising on this preview.
        </p>
      </>
    ),
  },
  {
    id: "will-information-be-shared",
    title: "3. Will your information be shared with anyone?",
    body: (
      <>
        <p>
          We do not sell personal information. This preview does not pass form
          entries to a CRM, an email tool, or an advertising network.
        </p>
        <p>
          We may disclose information if the law requires it, or to protect the
          site from abuse. There is no customer database behind the demo for us
          to hand over. If you copy an inquiry and send it yourself, you choose
          who receives it.
        </p>
      </>
    ),
  },
  {
    id: "who-information-is-shared-with",
    title: "4. Who will your information be shared with?",
    body: (
      <>
        <p>The limited parties who may see information are:</p>
        <ul>
          <li>
            The company that hosts the website, so it can deliver the pages you
            request and keep ordinary connection logs.
          </li>
          <li>
            A person you choose, if you copy or download inquiry text and send
            it on.
          </li>
        </ul>
        <p>
          We do not share demo keystrokes with Jira or Atlassian. The demo is
          not connected to your Jira site. Jira and Atlassian are trademarks of
          their owner. This site is an independent product preview.
        </p>
      </>
    ),
  },
  {
    id: "where-we-transfer",
    title: "5. Where do we transfer your personal information?",
    body: (
      <>
        <p>
          The pages are served by our web host. We do not run a separate
          customer database for this preview, and we do not transfer form
          contents because they are not submitted.
        </p>
        <p>
          If you email us, that message travels through the email service you
          use and the inbox that receives it. We do not claim a particular data
          residency or a certified transfer mechanism for a production app that
          does not yet process customer data.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "6. Do we use cookies and other tracking technologies?",
    body: (
      <>
        <p>
          We have not added analytics, advertising, or social-media cookies to
          this preview. Fonts are served with the site&apos;s own assets, not
          from an external font service.
        </p>
        <p>
          A feature may use strictly necessary browser storage to remember a
          choice during your visit. You can block cookies in your browser. The
          public pages should still load. Blocking storage may reset a choice
          the page was holding locally.
        </p>
      </>
    ),
  },
  {
    id: "social-logins",
    title: "7. How do we handle your social logins?",
    body: (
      <>
        <p>
          We do not offer sign-in with Google, GitHub, or any other social
          account. We do not receive a profile, avatar, or friend list from
          those providers, because there is no social login to authorize.
        </p>
        <p>
          If a production account is added later, this section will be updated
          before that sign-in is offered. Until then, do not try to paste a
          third-party token into the demo.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "8. Is your information transferred internationally?",
    body: (
      <>
        <p>
          People can open the site from other countries. Connection logs kept
          by the host may be processed where that host operates. We do not move
          a customer record across borders, because we do not keep one for the
          demo.
        </p>
        <p>
          We do not describe this preview as GDPR-certified, SOC 2 certified,
          or limited to a single region. Those statements would need to match a
          live service and its actual vendors.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "9. How long do we keep your information?",
    body: (
      <>
        <p>
          Demo changes are discarded when you reload or close the page. Inquiry
          text prepared in the browser is not retained by us.
        </p>
        <p>
          If you email us, we keep that correspondence for as long as we need
          to answer it and meet ordinary record-keeping duties, then delete or
          de-identify it when it is no longer needed. Host logs follow the
          host&apos;s own retention period. We do not keep a marketing profile
          from this preview.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "10. How do we keep your information safe?",
    body: (
      <>
        <p>
          Do not type passwords, tokens, or confidential issue content into the
          demo or an inquiry form. We do not want that information, and this
          preview is not a place to store it.
        </p>
        <p>
          The public site is served over the host&apos;s ordinary protections.
          No method of transmission or storage is perfectly secure. If you
          believe something you sent us has been exposed, contact us and tell
          us what to look for. Do not send the secret itself in that report.
        </p>
      </>
    ),
  },
  {
    id: "minors",
    title: "11. Do we collect information from minors?",
    body: (
      <>
        <p>
          The Service is meant for people who use Jira at work. It is not
          directed at children under 16, and we do not knowingly collect
          personal information from them.
        </p>
        <p>
          If you believe a child has sent us information, contact us. We will
          delete what we actually hold. Reloading the demo also clears sample
          changes that never left the browser.
        </p>
      </>
    ),
  },
  {
    id: "privacy-rights",
    title: "12. What are your privacy rights?",
    body: (
      <>
        <p>
          Depending on where you live, you may have the right to ask for
          access, correction, deletion, or a copy of personal information we
          hold, and to object to certain uses. You may also have the right to
          complain to a supervisory authority.
        </p>
        <p>
          Because this preview does not store your form entries or your Jira
          data, there is often nothing for us to retrieve. You can still write
          from the <Link to="/contact">contact page</Link>. We will tell you
          what we have and will not ask you to create an account to make that
          request.
        </p>
      </>
    ),
  },
  {
    id: "do-not-track",
    title: "13. Controls for Do-Not-Track features",
    body: (
      <>
        <p>
          Some browsers send a Do-Not-Track signal. We do not change the page
          in response to that signal, because we do not run cross-site tracking
          on this preview.
        </p>
        <p>
          Browser controls that block cookies or storage still work as your
          browser implements them. They are the practical way to limit what a
          page can keep on your device.
        </p>
      </>
    ),
  },
  {
    id: "california",
    title: "14. Do California residents have specific rights?",
    body: (
      <>
        <p>
          If you are a California resident and a privacy law applies to a
          future production service, you may ask whether we sell or share
          personal information for cross-context advertising, and which
          categories we collect.
        </p>
        <p>
          We do not sell personal information. This preview does not share it
          for advertising. Contact us and we will answer from what the live
          service actually does at that time, not from a category list copied
          from another product.
        </p>
      </>
    ),
  },
  {
    id: "other-websites",
    title: "15. Links to Other Websites",
    body: (
      <>
        <p>
          The site may link to Jira documentation, Atlassian pages, or other
          third-party sites. Those sites have their own privacy notices and
          terms. A link is not an endorsement, and we are not responsible for
          their practices.
        </p>
        <p>
          If you leave this site, read the notice on the site you land on
          before you enter personal information there.
        </p>
      </>
    ),
  },
  {
    id: "updates",
    title: "16. Do we make updates to this notice?",
    body: (
      <>
        <p>
          We may update this notice when the product changes. Examples include
          inquiries starting to be delivered, or a Jira app beginning to
          process issue data. The date at the top of this page will change.
        </p>
        <p>
          Continued use of the site after an update means you have had a chance
          to read the new notice. A production Jira app will not rely on this
          preview notice once it processes customer data. It will need a
          reviewed policy of its own.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "17. How you can contact us about this notice?",
    body: (
      <>
        <p>
          Write to us from the <Link to="/contact">contact page</Link>. Tell us
          which part of this notice your question is about.
        </p>
        <p>
          Please do not include passwords, API tokens, or confidential issue
          content. If you are writing on behalf of someone else, say so, and
          tell us how we can confirm that request.
        </p>
      </>
    ),
  },
  {
    id: "review-update-delete",
    title: "18. How can you review, update, or delete the data we collect from you?",
    body: (
      <>
        <p>
          Use the <Link to="/contact">contact page</Link> to ask what we hold,
          to correct it, or to delete it. We will respond to requests we can
          verify. We may decline a request that is unlawful, that would expose
          someone else&apos;s information, or that we cannot match to any
          record.
        </p>
        <p>
          For this preview, reloading the demo clears sample changes on your
          device, and unsent inquiry text never reaches us. You do not need an
          account to make a request, because this preview does not create one.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const offset = 140;

    const updateActive = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;
      if (nearBottom) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      let current = sections[0].id;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top - offset <= 0) {
          current = section.id;
        }
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("hashchange", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, []);

  return (
    <article className="terms-page">
      <div className="terms-page-inner">
        <div className="terms-hero">
          <Link className="terms-pill" to="/terms">
            Legal
          </Link>
          <h1>Privacy Policy</h1>
        </div>

        <div className="terms-layout">
          <nav className="terms-toc" aria-label="Contents">
            <p>Contents</p>
            <ul>
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={activeId === section.id ? "is-active" : undefined}
                    aria-current={activeId === section.id ? "location" : undefined}
                    onClick={() => setActiveId(section.id)}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="terms-prose">
            <p className="terms-updated">
              <em>Last updated: Oct 19, 2026</em>
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
