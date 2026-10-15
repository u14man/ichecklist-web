import {
  ArrowRight,
  ArrowUpRight,
  Copy,
  Filter,
  LayoutDashboard,
  LockKeyhole,
  MousePointer2,
  Share2,
  ShieldCheck,
  Star,
  TimerReset,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button, FAQ } from "./components";
import { features } from "./content";

const stories = [
  {
    eyebrow: "ACT WHERE YOU SEE IT",
    title: "Find the stuck check and move it forward.",
    text: "Open mandatory items, waiting owners, and blocked releases stay on the same screen. Update the item or jump into the issue without rebuilding the picture in a spreadsheet.",
    image: "/features/dashboards/action.png",
    alt: "A checklist item open beside a progress dashboard",
  },
  {
    eyebrow: "ONE VIEW, SEVERAL CUTS",
    title: "Slice the work by team, project, or customer.",
    text: "Named checklists already keep design, development, and release QA apart. Dashboards let you compare those groups without changing the shared progress total.",
    image: "/features/dashboards/flexible.png",
    alt: "Dashboard cards filtered by team, project, and customer",
  },
  {
    eyebrow: "SHARE THE PICTURE",
    title: "Show progress without opening the workspace.",
    text: "Send a read-only view to someone who needs the status, not the issue history. Personal checklists stay out of that view.",
    image: "/features/dashboards/share.png",
    alt: "A read-only share panel over a checklist dashboard",
  },
  {
    eyebrow: "ACROSS EVERY DASHBOARD",
    title: "Ask once. See the open work everywhere.",
    text: "Search owners, overdue checks, and unfinished gates across the dashboards you can already access. The answer links back to the issue, not to another tool.",
    image: "/features/dashboards/answers.png",
    alt: "Search results pointing to checklist progress and open gates",
  },
  {
    eyebrow: "STATUS WITHOUT THE SCRAMBLE",
    title: "Let the weekly note assemble itself.",
    text: "A scheduled report can collect completion, open mandatory items, and the checks still waiting on an owner. Review it, then send it. No fresh export required.",
    image: "/features/dashboards/reports.png",
    alt: "A weekly checklist status report ready to send",
  },
] as const;

const capabilities = [
  {
    icon: MousePointer2,
    title: "Actionable",
    text: "See a late check and assign it, update it, or open the issue from the same view.",
  },
  {
    icon: LayoutDashboard,
    title: "Project overview",
    text: "Completion, owners, and open gates for the checklists that belong to one body of work.",
  },
  {
    icon: Copy,
    title: "Templates",
    text: "Start from a release, QA, or handoff layout instead of arranging the same cards again.",
  },
  {
    icon: Filter,
    title: "Filters",
    text: "Narrow the view by team, status, or owner. Filtering does not rewrite Overall Progress.",
  },
  {
    icon: Share2,
    title: "Shared view",
    text: "A read-only link for people who need the status, without access to the Jira workspace.",
  },
  {
    icon: TimerReset,
    title: "Current totals",
    text: "Done and Skipped count. Personal items do not. The total stays steady while you filter.",
  },
] as const;

const relatedSlugs = [
  "organized-checklists",
  "mandatory-items",
  "progress-tracking",
  "completion-locking",
  "personal-checklists",
  "bulk-actions",
  "flexible-views",
  "native-experience",
] as const;

const dashboardFaqs = [
  {
    question: "Does a dashboard change the Jira issue status?",
    answer:
      "No. Dashboards report checklist progress. Completing or reopening a checklist is still a checklist action, not a Jira workflow transition.",
  },
  {
    question: "Will a shared view include Personal Checklists?",
    answer:
      "No. Personal Checklists stay visible only to the person who created them, and they do not change Overall Progress.",
  },
  {
    question: "Do filters change the progress total?",
    answer:
      "No. A filter changes what you are looking at. Done and Skipped still count toward the shared total, and personal items still do not.",
  },
  {
    question: "Can I update a Checklist Item from the dashboard?",
    answer:
      "Yes. An open item can be assigned or updated from the view, and it links back to the issue where the checklist lives.",
  },
  {
    question: "Who can open a shared dashboard?",
    answer:
      "Only people with access to the underlying Jira work can build the dashboard. A shared link is read-only and does not grant workspace access.",
  },
];

export default function DashboardsPage() {
  const related = relatedSlugs.flatMap((slug) => {
    const feature = features.find((item) => item.slug === slug);
    return feature ? [feature] : [];
  });

  return (
    <div className="dashboards-page">
      <section className="dashboards-hero container">
        <p className="dashboards-kicker">Dashboards</p>
        <h1>See every checklist before the release meeting.</h1>
        <p>
          Bring owners, open mandatory items, and completion into one view.
          The little steps stay on the issue. The picture of them does not
          have to live in a spreadsheet.
        </p>
        <div className="button-row dashboards-actions">
          <Button to="/demo">
            Try the demo
            <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
          <Button to="/contact" variant="outline">
            Talk to us
          </Button>
        </div>
        <p className="dashboards-note">
          The interactive demo uses sample checklist data. No account needed.
        </p>
        <div className="dashboards-proof">
          <img src="/hero/faces.png" alt="" />
          <div>
            <span className="dashboards-stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={14} fill="currentColor" />
              ))}
            </span>
            <small>loved by 30+ customers</small>
          </div>
        </div>
      </section>

      <div className="dashboards-hero-shot">
        <img
          src="/features/dashboards/hero.png"
          alt="Checklist dashboard with completion, open gates, and a progress table"
        />
      </div>

      <section className="dashboards-compare-block" aria-labelledby="dashboard-compare-title">
        <div className="dashboards-compare-title">
          <h2 id="dashboard-compare-title">
            See the open work,
            <br />
            then move it from the same screen.
          </h2>
        </div>
        <div className="dashboards-compare">
          <article>
            <h3>Without Dashboards</h3>
            <div className="dashboards-compare-list is-before">
              <ul>
                <li>Status is rebuilt from comments before the meeting.</li>
                <li>One change means leaving the issue for a sheet.</li>
                <li>Totals drift once they leave the checklist.</li>
                <li>The same question returns before every release.</li>
              </ul>
            </div>
            <span className="dashboards-compare-dot is-tl" aria-hidden="true" />
            <span className="dashboards-compare-dot is-tr" aria-hidden="true" />
            <span className="dashboards-compare-dot is-bl" aria-hidden="true" />
            <span className="dashboards-compare-dot is-br" aria-hidden="true" />
          </article>
          <article>
            <h3>With Dashboards</h3>
            <div className="dashboards-compare-list is-after">
              <ul>
                <li>The view changes when a checklist item does.</li>
                <li>Assign or update an item without leaving the screen.</li>
                <li>Progress stays on the issue, not in an export.</li>
                <li>A shared link answers the question in advance.</li>
              </ul>
            </div>
            <span className="dashboards-compare-dot is-tl" aria-hidden="true" />
            <span className="dashboards-compare-dot is-tr" aria-hidden="true" />
            <span className="dashboards-compare-dot is-bl" aria-hidden="true" />
            <span className="dashboards-compare-dot is-br" aria-hidden="true" />
          </article>
        </div>
      </section>

      <section className="container dashboards-stories" aria-labelledby="dashboard-stories-title">
        <header className="dashboards-stories-heading">
          <h2 id="dashboard-stories-title">
            Reporting that works the way your team works.
          </h2>
          <p>Actionable. Flexible. Shareable.</p>
        </header>
        {stories.map((story, index) => (
          <section
            className={`dashboards-story ${index % 2 ? "is-reverse" : ""}`}
            key={story.title}
          >
            <div className="dashboards-story-copy">
              <p className="dashboards-kicker">{story.eyebrow}</p>
              <h2>{story.title}</h2>
              <p>{story.text}</p>
            </div>
            <div className="dashboards-story-visual">
              <img src={story.image} alt={story.alt} />
            </div>
          </section>
        ))}
      </section>

      <section className="container dashboards-quote" aria-labelledby="dashboard-quote-title">
        <h2 id="dashboard-quote-title">
          The release picture should not take a meeting to assemble.
        </h2>
        <Button to="/demo" variant="white">
          Try the demo
          <ArrowUpRight size={16} aria-hidden="true" />
        </Button>
      </section>

      <section className="container dashboards-block" aria-labelledby="dashboard-capabilities-title">
        <header className="dashboards-heading">
          <p className="dashboards-kicker">WHAT YOU CAN DO</p>
          <h2 id="dashboard-capabilities-title">
            A view you can use, not another report to maintain.
          </h2>
        </header>
        <div className="dashboards-capabilities">
          {capabilities.map((item) => (
            <article key={item.title}>
              <span>
                <item.icon size={18} aria-hidden="true" />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container dashboards-block" aria-labelledby="dashboard-related-title">
        <header className="dashboards-heading">
          <p className="dashboards-kicker">STILL ON THE ISSUE</p>
          <h2 id="dashboard-related-title">
            The dashboard reads the checks. It does not replace them.
          </h2>
        </header>
        <div className="dashboards-related">
          {related.map((feature) => (
            <Link key={feature.slug} to={`/features/${feature.slug}`}>
              <span className={`dashboards-related-icon ${feature.color}`}>
                <feature.icon size={18} aria-hidden="true" />
              </span>
              <span>
                <strong>{feature.title}</strong>
                <small>{feature.short}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container dashboards-security" aria-labelledby="dashboard-security-title">
        <div>
          <p className="dashboards-kicker">ACCESS</p>
          <h2 id="dashboard-security-title">
            Shared status. Private checks stay private.
          </h2>
          <p>
            Dashboards follow the work people can already see. They do not
            create a second permission system, and this page does not claim
            certifications the product has not earned.
          </p>
        </div>
        <ul>
          <li>
            <ShieldCheck size={18} aria-hidden="true" />
            <span>A shared link is read-only and does not open the Jira workspace.</span>
          </li>
          <li>
            <LockKeyhole size={18} aria-hidden="true" />
            <span>Personal Checklists never appear in a shared or team view.</span>
          </li>
          <li>
            <Filter size={18} aria-hidden="true" />
            <span>Filters change the view, not who is allowed to see the work.</span>
          </li>
        </ul>
      </section>

      <FAQ items={dashboardFaqs} />

      <section className="dashboards-close-wrapper" aria-labelledby="dashboard-close-title">
        <div className="dashboards-close-card">
          <div className="dashboards-close-content">
            <div className="dashboards-close-brand">
              <img src="/logo.svg" alt="" aria-hidden="true" />
              <span>iChecklist</span>
            </div>
            <h2 id="dashboard-close-title" className="dashboards-close-title">
              See every checklist before the release meeting.
            </h2>
            <p className="dashboards-close-desc">
              Everything you need to stay organized and get work done.
            </p>
            <Link className="dashboards-close-btn" to="/demo">
              Try iChecklist free
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <div className="dashboards-close-media">
            <picture className="dashboards-close-accent dashboards-close-accent-desktop">
              <img
                src="https://clickup.com/assets/glows/glow-vector.png"
                height="464"
                width="727"
                alt="Accent"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <picture className="dashboards-close-accent dashboards-close-accent-desktop">
              <img
                src="https://clickup.com/assets/glows/warm-vector.png"
                height="464"
                width="627"
                alt="Accent"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div
              className="dashboards-close-noise dashboards-close-accent"
              data-testid="ui-noise"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.5%22%20numOctaves%3D%225%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%20opacity%3D%220.5%22%2F%3E%3C%2Fsvg%3E")',
              }}
            />
            <picture className="dashboards-close-accent dashboards-close-accent-mobile">
              <img
                src="https://clickup.com/assets/glows/glow-vector-mobile.png"
                height="464"
                width="727"
                alt="Accent"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <picture className="dashboards-close-accent dashboards-close-accent-mobile">
              <img
                src="https://clickup.com/assets/glows/warm-vector-mobile.png"
                height="464"
                width="627"
                alt="Accent"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <picture className="dashboards-close-frame">
              <img src="/features/dashboards/cta-board.png" alt="Board view preview" />
            </picture>
          </div>
        </div>
      </section>
    </div>
  );
}
