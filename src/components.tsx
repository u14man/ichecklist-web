import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  FileText,
  Instagram,
  Linkedin,
  LayoutList,
  LockKeyhole,
  Menu,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { features, solutions, faqs } from "./content";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Jira Checklist home"
    >
      <img className="brand-logo" src="/logo.svg" alt="" aria-hidden="true" />
      <span>
        iChecklist<span className="brand-jira">for Jira</span>
      </span>
    </Link>
  );
}

export function Button({
  to,
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  to?: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "dark" | "white";
  className?: string;
  onClick?: () => void;
}) {
  const classes = `button button-${variant} ${className}`;
  return to ? (
    <Link className={classes} to={to}>
      {children}
    </Link>
  ) : (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

export function Header() {
  const [announcement, setAnnouncement] = useState(true);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    setMenu(null);
    setMobile(false);
  }, [location.pathname]);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node))
        setMenu(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(null);
        setMobile(false);
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <>
      {announcement && (
        <div className="announcement">
          <div className="announcement-inner">
            <p>
              <Bell
                className="announcement-bell"
                size={16}
                aria-hidden="true"
              />
              Mandatory gates are live: an open mandatory item cannot mark the
              checklist complete.
              <Link
                className="announcement-cta"
                to="/features/mandatory-items"
              >
                See the gate
              </Link>
            </p>
          </div>
          <button
            className="announcement-dismiss"
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setAnnouncement(false)}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}
      <header className="site-header" ref={navRef}>
        <div className="nav-container">
          <Brand />
          <nav
            aria-label="Main navigation"
            className={`main-nav ${mobile ? "is-open" : ""}`}
          >
            {["Features", "Solutions"].map((label) => (
              <div className="nav-item" key={label}>
                <button
                  className={`nav-link ${menu === label || location.pathname.startsWith(label === "Features" ? "/features" : "/solutions") ? "active" : ""}`}
                  aria-expanded={menu === label}
                  aria-controls={`menu-${label}`}
                  onClick={() => setMenu(menu === label ? null : label)}
                >
                  {label}
                  <ChevronDown
                    size={14}
                    className={menu === label ? "rotated" : ""}
                  />
                </button>
                {menu === label && (
                  <div className="nav-dropdown mega-dropdown" id={`menu-${label}`}>
                    <Link
                      className={`mega-promo ${label === "Features" ? "bg-gradient-purple" : "bg-gradient-blue"}`}
                      to={label === "Features" ? "/features" : "/solutions"}
                    >
                      <strong>
                        {label === "Features" ? "All Features" : "All Teams"}
                      </strong>
                      <p>
                        {label === "Features"
                          ? "Every detail, organized and accountable — right inside the issue."
                          : "One well-checked finish, whatever your role on the team."}
                      </p>
                    </Link>
                    <div className="mega-list">
                      {(label === "Features"
                        ? features.filter((feature) =>
                            [
                              "organized-checklists",
                              "mandatory-items",
                              "personal-checklists",
                              "completion-locking",
                              "bulk-actions",
                            ].includes(feature.slug),
                          )
                        : solutions
                      ).map((item) => (
                        <Link
                          key={item.slug}
                          to={`/${label === "Features" ? "features" : "solutions"}/${item.slug}`}
                        >
                          <span className={`mega-icon ${item.color}`}>
                            <item.icon size={18} />
                          </span>
                          <span>
                            <strong>{item.title}</strong>
                            <small>
                              {"short" in item ? item.short : item.benefit}
                            </small>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="nav-item">
              <button
                className={`nav-link ${menu === "Resources" ? "active" : ""}`}
                aria-expanded={menu === "Resources"}
                aria-controls="menu-resources"
                onClick={() =>
                  setMenu(menu === "Resources" ? null : "Resources")
                }
              >
                Resources
                <ChevronDown size={14} />
              </button>
              {menu === "Resources" && (
                <div
                  className="nav-dropdown resource-dropdown"
                  id="menu-resources"
                >
                  {[
                    {
                      title: "Guides & insights",
                      text: "Make the little things work better.",
                      href: "/resources",
                      icon: FileText,
                    },
                    {
                      title: "Help center",
                      text: "A clearer answer, a little faster.",
                      href: "/docs",
                      icon: CircleHelp,
                    },
                    {
                      title: "Product notes",
                      text: "A closer look at the capabilities.",
                      href: "/changelog",
                      icon: Sparkles,
                    },
                    {
                      title: "About us",
                      text: "Why we care about the details.",
                      href: "/about",
                      icon: CheckCheck,
                    },
                  ].map((item) => (
                    <Link key={item.href} to={item.href}>
                      <span className="dropdown-icon">
                        <item.icon size={19} />
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.text}</small>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <NavLink className="nav-link" to="/demo">
              Demo
            </NavLink>
            <NavLink className="nav-link" to="/pricing">
              Pricing
            </NavLink>
            <Link className="mobile-contact nav-link" to="/contact">
              Contact us
            </Link>
          </nav>
          <div className="nav-actions">
            <Link className="contact-nav" to="/contact">
              Contact sales
            </Link>
            <a
              className="button button-primary nav-cta"
              href="https://marketplace.atlassian.com/apps/1361881358"
              target="_blank"
              rel="noreferrer"
            >
              Install from Marketplace
              <ArrowUpRight size={16} />
            </a>
          </div>
          <button
            className="mobile-toggle"
            onClick={() => setMobile(!mobile)}
            aria-expanded={mobile}
            aria-label={mobile ? "Close navigation" : "Open navigation"}
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}

const footerPhrases = [
  "Organize Checklists",
  "Track Progress",
  "Lock Completion",
  "Personal Checklists",
  "Bulk Actions",
  "Views & Filters",
];

const footerColumns = [
  {
    title: "Product",
    links: [
      ["Pricing", "/pricing"],
      ["View Demo", "/demo"],
      ["Changelog", "/changelog"],
      ["About Us", "/about"],
    ],
  },
  {
    title: "Features",
    links: [
      ["Organized Checklists", "/features/organized-checklists"],
      ["Mandatory Items", "/features/mandatory-items"],
      ["Progress Tracking", "/features/progress-tracking"],
      ["All Features", "/features"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Guides & Insights", "/resources"],
      ["Help Center", "/docs"],
      ["Contact Us", "/contact"],
      ["For Developers", "/solutions/developers"],
    ],
  },
  {
    title: "Policies",
    links: [
      ["Privacy Policy", "/privacy"],
      ["Terms of Service", "/terms"],
    ],
  },
  {
    title: "Compare",
    links: [
      ["Checklists vs Sub-tasks", "/resources/checklists-vs-subtasks"],
      ["Definition of Done", "/resources/definition-of-done"],
      ["Release Readiness", "/resources/release-readiness"],
      ["For QA Teams", "/solutions/qa-teams"],
      ["For Release Teams", "/solutions/release-teams"],
    ],
  },
];

function FooterMarquee() {
  return (
    <div className="footer-marquee masked-overflow" aria-hidden="true">
      <div className="footer-marquee-track">
        {[0, 1].map((copy) => (
          <p className="footer-marquee-line" key={copy}>
            {footerPhrases.map((phrase) => (
              <span key={phrase}>
                {phrase}
                <i>✦</i>
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer-supa">
      <div className="container footer-supa-inner">
        <FooterMarquee />
        <hr className="footer-rule" />
        <div className="footer-intro">
          <div className="footer-intro-copy">
            <Link to="/" aria-label="iChecklist home">
              <img src="/logo.svg" alt="" />
            </Link>
            <p>
              iChecklist is a checklist for Jira that keeps the little steps on
              the issue, so the team can see what done looks like.
            </p>
          </div>
          <Link className="footer-cta" to="/demo">
            Try the demo
          </Link>
        </div>
        <hr className="footer-rule" />
        <nav className="footer-cols" aria-label="Footer">
          {footerColumns.map((column) => (
            <div className="footer-col" key={column.title}>
              <span className="footer-label">{column.title}</span>
              <ul>
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link to={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="footer-legal">
          <p>
            <span aria-hidden="true">✦</span>
            Copyright © {new Date().getFullYear()} iChecklist. All rights
            reserved.
          </p>
          <div className="footer-social" aria-hidden="true">
            <X size={18} />
            <span aria-hidden="true">/</span>
            <Instagram size={18} />
            <span aria-hidden="true">/</span>
            <Linkedin size={18} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`section-heading ${align === "left" ? "left" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  gradient = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  gradient?: boolean;
}) {
  const content = (
    <>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </>
  );
  if (gradient) {
    return (
      <section className={`hero-gradient bg-gradient-blue`}>
        <div className="container">
          <div className="page-hero">{content}</div>
        </div>
      </section>
    );
  }
  return (
    <section className="page-hero container">{content}</section>
  );
}

function CtaSparkle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 1.6 13.55 8.9 20.8 10.45 13.55 12 12 19.3 10.45 12 3.2 10.45 10.45 8.9Z"
      />
      <circle cx="18.6" cy="5.2" r="1.35" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

export function FinalCTA() {
  return (
    <section className="cta-banner">
      <div className="cta-banner-card">
        <img src="/cta/banner-bg.png" alt="" />
        <div className="cta-banner-copy">
          <span className="cta-banner-kicker">
            Small checks. Big peace of mind.
          </span>
          <h2>
            Make room for great work.
            <br />
            We’ll help with the details.
          </h2>
          <p>Your next release deserves a little less guesswork.</p>
        </div>
        <div className="cta-banner-actions">
          <div className="cta-banner-buttons">
            <Link className="cta-banner-btn cta-banner-btn-solid" to="/demo">
              <CtaSparkle />
              Give it a try
            </Link>
            <Link className="cta-banner-btn cta-banner-btn-outline" to="/contact">
              Let’s talk
            </Link>
          </div>
          <p className="cta-banner-note">
            <Check size={16} />
            Interactive demo. No account needed.
          </p>
        </div>
      </div>
    </section>
  );
}

export function FAQ({
  items = faqs,
  compact = false,
}: {
  items?: typeof faqs;
  compact?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      className={`faq-section container section ${compact ? "faq-compact" : ""}`}
    >
      <div>
        <span className="eyebrow">A LITTLE MORE CLARITY</span>
        <h2>
          Good questions.
          <br />
          Straight answers.
        </h2>
        <p>Have something else on your mind?</p>
        <Link className="text-link" to="/contact">
          Let’s talk
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="faq-list">
        {items.map((item, i) => (
          <div
            className={`faq-item ${open === i ? "open" : ""}`}
            key={item.question}
          >
            <h3>
              <button
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.question}
                {open === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
            </h3>
            <div id={`faq-answer-${i}`} hidden={open !== i}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const modal = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusables = modal.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href], input, select, textarea, [tabindex="0"]',
        );
        if (!focusables?.length) return;
        const first = focusables[0],
          last = focusables[focusables.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === modal.current)
        ) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", keydown);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        ref={modal}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        <div className="modal-heading">
          <h2>{title}</h2>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function MiniVisual({
  kind = "organized-checklists",
  className = "",
}: {
  kind?: string;
  className?: string;
}) {
  return (
    <div className={`mini-visual ${className}`} aria-hidden="true">
      {kind === "mandatory-items" ? (
        <div className="mini-window gate-window">
          <div className="mini-icon mint">
            <ShieldCheck size={23} />
          </div>
          <h3>
            The important things?
            <br />
            Non-negotiable.
          </h3>
          <div className="mini-row">
            <span className="mini-checkbox checked">
              <Check size={12} />
            </span>
            Acceptance criteria reviewed<em>*</em>
          </div>
          <div className="mini-row">
            <span className="mini-checkbox" />
            Security checks complete<em>*</em>
          </div>
          <div className="mini-notice">
            <ShieldCheck size={15} />
            <span>1 Mandatory Item needs your attention</span>
          </div>
          <div className="mini-action">
            View incomplete items
            <ArrowRight size={14} />
          </div>
        </div>
      ) : kind === "personal-checklists" ? (
        <div className="mini-window personal-window">
          <div className="mini-window-label">
            <LockKeyhole size={15} />
            <span>Personal Checklist</span>
            <span className="private-tag">Only you</span>
          </div>
          <p>A little headspace, right here.</p>
          <div className="mini-row">
            <span className="mini-checkbox checked">
              <Check size={12} />
            </span>
            <s>Check that idea from standup</s>
          </div>
          <div className="mini-row">
            <span className="mini-checkbox" />
            Revisit the empty state
          </div>
          <div className="mini-row">
            <span className="mini-checkbox" />
            Try the alternative approach
          </div>
          <div className="mini-footer">
            <LockKeyhole size={12} /> Yours alone. Never part of team progress.
          </div>
        </div>
      ) : kind === "completion-locking" ? (
        <div className="mini-window lock-window">
          <span className="large-check">
            <CheckCheck size={32} />
          </span>
          <h3>A job well checked.</h3>
          <p>This checklist is completed and locked.</p>
          <div className="completion-person">
            <span className="avatar avatar-purple">JD</span>
            <span>
              <strong>Completed by Jamie</strong>
              <small>Today at 10:42 AM · Example</small>
            </span>
            <LockKeyhole size={17} />
          </div>
          <div className="mini-footer">
            <ShieldCheck size={14} /> Details protected. Handoff ready.
          </div>
        </div>
      ) : kind === "bulk-actions" ? (
        <div className="mini-window bulk-window">
          <div className="mini-window-label">
            <MousePointerIcon />
            <span>Goodbye, repetitive clicks.</span>
          </div>
          {[
            "Review empty states",
            "Test keyboard navigation",
            "Check error messages",
          ].map((text) => (
            <div className="mini-row selected" key={text}>
              <span className="mini-checkbox checked">
                <Check size={12} />
              </span>
              {text}
              <span className="tiny-avatar">JD</span>
            </div>
          ))}
          <div className="mini-bulk-bar">
            <strong>3 selected</strong>
            <span>
              Status
              <ChevronDown size={11} />
            </span>
            <span>
              Assignee
              <ChevronDown size={11} />
            </span>
            <X size={13} />
          </div>
        </div>
      ) : kind === "progress-tracking" ? (
        <div className="mini-window progress-window">
          <div className="mini-window-label">
            <CircleCheck size={17} />
            <span>The bigger picture</span>
          </div>
          <div className="big-progress">
            <strong>
              75<span>%</span>
            </strong>
            <p>
              A little closer
              <br />
              to ready.
            </p>
          </div>
          <div className="mini-progress-track">
            <span />
          </div>
          <div className="progress-mini-stats">
            <span>
              <i />6 Done
            </span>
            <span>
              <i />1 In Progress
            </span>
            <span>
              <i />1 To Do
            </span>
          </div>
          <div className="mini-footer">
            Shared work only. Always the full picture.
          </div>
        </div>
      ) : kind === "flexible-views" ? (
        <div className="mini-window">
          <div className="mini-window-label">
            <LayoutList size={16} />
            <span>Make space for your focus.</span>
          </div>
          <div className="filter-pills">
            <span>
              My items
              <Check size={12} />
            </span>
            <span>
              In Progress
              <ChevronDown size={12} />
            </span>
          </div>
          {[
            "Verify the onboarding flow",
            "Review the final details",
            "Check the edge cases",
          ].map((text, i) => (
            <div className="mini-row" key={text}>
              <span className={`mini-checkbox ${i === 0 ? "checked" : ""}`}>
                {i === 0 && <Check size={12} />}
              </span>
              {text}
              <span className="tiny-avatar">JD</span>
            </div>
          ))}
          <div className="mini-footer">Your view. Your fields. Your flow.</div>
        </div>
      ) : kind === "native-experience" ? (
        <div className="mini-window native-window">
          <span className="jira-diamond" />
          <h3>Right at home in Jira.</h3>
          <p>The details belong with the work.</p>
          <div className="mini-row">
            <span className="mini-checkbox checked">
              <Check size={12} />
            </span>
            Familiar by design
          </div>
          <div className="mini-row">
            <span className="mini-checkbox" />
            Add the next little check<span className="keycap">↵</span>
          </div>
          <div className="mini-footer">Light mode. Dark mode. Your mode.</div>
        </div>
      ) : (
        <div className="mini-window">
          <div className="mini-tabs">
            <span className="active">
              Development <small>3/4</small>
            </span>
            <span>
              QA <small>1/3</small>
            </span>
            <Plus size={14} />
          </div>
          <div className="mini-checklist-title">
            <LayoutList size={16} />
            The details, all together.<span>3/4</span>
          </div>
          {[
            "Review acceptance criteria",
            "Cover the edge cases",
            "Run unit tests",
            "One last look before the PR",
          ].map((text, i) => (
            <div className="mini-row" key={text}>
              <span className={`mini-checkbox ${i < 3 ? "checked" : ""}`}>
                {i < 3 && <Check size={12} />}
              </span>
              <span className={i < 3 ? "mini-done" : ""}>{text}</span>
              {i === 0 && <em>*</em>}
              <span className={`mini-status ${i < 3 ? "done" : ""}`}>
                {i < 3 ? "Done" : "To Do"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MousePointerIcon() {
  return <ChevronRight size={17} />;
}

export function FeatureCard({
  feature,
  visual = false,
}: {
  feature: (typeof features)[number];
  visual?: boolean;
}) {
  return (
    <Link
      className={`feature-card ${visual ? "with-visual" : ""}`}
      to={`/features/${feature.slug}`}
    >
      {visual && (
        <div className={`feature-card-visual ${feature.color}`}>
          <MiniVisual kind={feature.slug} />
        </div>
      )}
      <div className="feature-card-copy">
        <span className={`feature-icon ${feature.color}`}>
          <feature.icon size={22} />
        </span>
        <h3>{feature.title}</h3>
        <p>{feature.short}</p>
        <span className="text-link">
          Take a closer look
          <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
