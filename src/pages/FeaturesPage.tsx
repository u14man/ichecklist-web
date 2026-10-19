import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  ChartNoAxesCombined,
  Check,
  CheckCheck,
  CircleCheck,
  Clock3,
  Layers,
  LockKeyhole,
  MousePointer2,
  Search,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import {
  Button,
  FAQ,
} from "../components";
import { features } from "../content";

const featureHighlights = [
  "organized-checklists",
  "mandatory-items",
  "completion-locking",
] as const;

const featureModules = [
  {
    slug: "organized-checklists",
    eyebrow: "ORGANIZE THE WORK",
    title: "Less scrolling. More structure.",
    description:
      "Give design, development, and release QA a named checklist inside the same issue. Switch between tabs and a full list, then drag items into the order the work needs.",
    cta: "Explore organized checklists",
    kind: "tabs",
  },
  {
    slug: "mandatory-items",
    eyebrow: "A REAL CHECKPOINT",
    title: "Done should mean nothing was missed.",
    description:
      "Flag essential checks with an asterisk. Completion lists every open Mandatory Item and jumps to the first one. The gate applies to the checklist, not Jira issue transitions.",
    cta: "See mandatory items",
    kind: "mandatory",
  },
  {
    slug: "completion-locking",
    eyebrow: "A FINISH THAT STAYS PUT",
    title: "Complete it, then keep it that way.",
    description:
      "Resolve the mandatory checks, then lock edits, additions, and reordering. The banner records who completed the checklist and when. Reopening takes a deliberate confirmation.",
    cta: "See completion and locking",
    kind: "locked",
  },
] as const;

const featureCatalog = [
  {
    title: "Core",
    items: [
      {
        slug: "organized-checklists",
        title: "Organized checklists",
        text: "A named place for each kind of work.",
        icon: Layers,
      },
      {
        slug: "mandatory-items",
        title: "Mandatory items",
        text: "Essential checks before completion.",
        icon: ShieldCheck,
      },
      {
        slug: "completion-locking",
        title: "Completion and locking",
        text: "A read-only finish, with a clear reopen.",
        icon: LockKeyhole,
      },
      {
        slug: "progress-tracking",
        title: "Progress tracking",
        text: "Shared totals that stay steady while filtering.",
        icon: CheckCheck,
      },
    ],
  },
  {
    title: "Checklist items",
    items: [
      {
        slug: "bulk-actions",
        title: "Bulk actions",
        text: "Update status, assignee, priority, or due date together.",
        icon: MousePointer2,
      },
      {
        slug: "flexible-views",
        title: "Views and filters",
        text: "Search, sort, and keep the columns you need.",
        icon: Search,
      },
      {
        slug: "native-experience",
        title: "Item details",
        text: "Status, priority, due dates, tags, and descriptions.",
        icon: Clock3,
      },
      {
        slug: "organized-checklists",
        title: "Drag to reorder",
        text: "Put items in the sequence the work needs.",
        icon: Layers,
      },
    ],
  },
  {
    title: "Working in Jira",
    items: [
      {
        slug: "native-experience",
        title: "Made for Jira",
        text: "Issue context stays beside the checklist.",
        icon: CircleCheck,
      },
      {
        slug: "native-experience",
        title: "Assign Jira users",
        text: "Hand a check to someone already on the issue.",
        icon: User,
      },
      {
        slug: "native-experience",
        title: "Inline creation",
        text: "Type an item, press Enter, and keep going.",
        icon: Asterisk,
      },
      {
        slug: "native-experience",
        title: "Light and dark mode",
        text: "Readable contrast in either theme.",
        icon: Star,
      },
    ],
  },
  {
    title: "Personal and privacy",
    items: [
      {
        slug: "personal-checklists",
        title: "Personal checklists",
        text: "A private corner of the same issue.",
        icon: User,
      },
      {
        slug: "personal-checklists",
        title: "Only you can see it",
        text: "Collaborators do not see your private items.",
        icon: LockKeyhole,
      },
      {
        slug: "personal-checklists",
        title: "One per person",
        text: "A single personal checklist on each issue.",
        icon: CircleCheck,
      },
      {
        slug: "personal-checklists",
        title: "Out of team progress",
        text: "Personal items never change Overall Progress.",
        icon: ShieldCheck,
      },
    ],
  },
  {
    title: "Reporting",
    items: [
      {
        slug: "dashboards",
        title: "Dashboards",
        text: "Checklist progress, owners, and open gates in one view.",
        icon: ChartNoAxesCombined,
      },
    ],
  },
];

const featureOutcomes = [
  {
    icon: ShieldCheck,
    title: "Fewer missed handoffs",
    text: "Mandatory items make the non-negotiable checks visible where the work happens, not in a comment someone has to find.",
  },
  {
    icon: CheckCheck,
    title: "Progress you can trust",
    text: "Done and Skipped count toward shared progress. Personal items do not, and filters do not rewrite the total.",
  },
  {
    icon: Layers,
    title: "No extra issue to manage",
    text: "Create, assign, filter, and complete checks inside the Jira issue, so the team does not leave the work to track the work.",
  },
];

function FeaturePreview({ kind }: { kind: (typeof featureModules)[number]["kind"] }) {
  if (kind === "tabs") {
    return (
      <div className="feat-collage">
        <div className="feat-window">
          <div className="feat-tabs" aria-hidden="true">
            <span className="is-active">Design</span>
            <span>Development</span>
            <span>Release QA</span>
          </div>
          <PreviewRows
            rows={[
              ["Review empty states", "done"],
              ["Check dark-mode contrast", "open"],
              ["Confirm icon sizes", "open"],
            ]}
          />
        </div>
        <aside className="feat-float">
          <strong>3</strong>
          <span>named checklists in this issue</span>
        </aside>
      </div>
    );
  }

  if (kind === "mandatory") {
    return (
      <div className="feat-collage">
        <div className="feat-window">
          <p className="feat-window-label">Release checklist</p>
          <PreviewRows
            rows={[
              ["Acceptance criteria reviewed", "done"],
              ["Regression notes attached", "required"],
              ["Release owner assigned", "required"],
            ]}
          />
        </div>
        <aside className="feat-notice">
          <Asterisk size={16} aria-hidden="true" />
          <span>2 mandatory items still open</span>
        </aside>
      </div>
    );
  }

  return (
    <div className="feat-collage">
      <div className="feat-window">
        <div className="feat-lock-banner">
          <LockKeyhole size={16} aria-hidden="true" />
          <span>Completed and locked</span>
        </div>
        <PreviewRows
          rows={[
            ["QA sign-off", "locked"],
            ["Changelog updated", "locked"],
            ["Rollback noted", "locked"],
          ]}
        />
      </div>
      <aside className="feat-float">
        <strong>100%</strong>
        <span>shared items resolved</span>
      </aside>
    </div>
  );
}

function PreviewRows({
  rows,
}: {
  rows: [string, "done" | "open" | "required" | "locked"][];
}) {
  return (
    <ul className="feat-rows">
      {rows.map(([name, state]) => (
        <li key={name} data-state={state}>
          <span className="feat-row-mark" aria-hidden="true">
            {state === "done" || state === "locked" ? <Check size={12} /> : null}
          </span>
          <span>{name}</span>
          {state === "required" ? <em>Required</em> : null}
        </li>
      ))}
    </ul>
  );
}

export function FeaturesPage() {
  const highlights = featureHighlights.flatMap((slug) => {
    const feature = features.find((item) => item.slug === slug);
    return feature ? [feature] : [];
  });

  return (
    <div className="feat-page">
      <section className="feat-hero bg-gradient-blue" aria-labelledby="features-title">
        <div className="container feat-hero-copy">
          <span className="feat-eyebrow">CHECKLISTS, INSIDE THE ISSUE</span>
          <h1 id="features-title">Every little step, clearly in place.</h1>
          <p>
            Structure, accountability, and a finish line your team can trust.
            All inside the Jira issue you are already working in.
          </p>
          <Button to="/demo" variant="dark">
            See it in action
            <ArrowUpRight size={17} aria-hidden="true" />
          </Button>
          <p className="feat-hero-note">
            <Check size={15} aria-hidden="true" />
            Interactive demo. No Jira site connection.
          </p>
        </div>
        <div className="container feat-highlights">
          {highlights.map((feature, index) => (
            <Link
              className="feat-highlight"
              to={`/features/${feature.slug}`}
              key={feature.slug}
            >
              <span className="feat-highlight-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <feature.icon size={22} aria-hidden="true" />
              </span>
              <h2>{feature.title}</h2>
              <p>{feature.short}</p>
              <span className="feat-highlight-link">
                Learn more
                <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {featureModules.map((module) => (
        <section
          className="feat-module container"
          id={module.slug}
          key={module.slug}
          aria-labelledby={`${module.slug}-title`}
        >
          <header className="feat-module-copy">
            <span className="feat-eyebrow">{module.eyebrow}</span>
            <h2 id={`${module.slug}-title`}>{module.title}</h2>
            <p>{module.description}</p>
          </header>
          <div className="feat-stage">
            <FeaturePreview kind={module.kind} />
            <Button to={`/features/${module.slug}`} variant="dark">
              {module.cta}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </section>
      ))}

      <section
        className="feat-catalog-section container"
        id="all-features"
        aria-labelledby="feature-catalog-title"
      >
        <header className="feat-module-copy">
          <span className="feat-eyebrow">EVERY DETAIL, ACCOUNTED FOR</span>
          <h2 id="feature-catalog-title">The checklist, all the way down.</h2>
          <p>
            From a private reminder to a locked release check, each part links
            to the feature it belongs to.
          </p>
        </header>
        <div className="feat-catalog">
          {featureCatalog.map((group) => (
            <section
                key={group.title}
                aria-labelledby={`catalog-${group.title.toLowerCase().replaceAll(" ", "-")}`}
              >
                <h3 id={`catalog-${group.title.toLowerCase().replaceAll(" ", "-")}`}>
                  {group.title}
                </h3>
              <div className="feat-catalog-list">
                {group.items.map((item) => (
                  <Link
                    className="feat-catalog-item"
                    to={`/features/${item.slug}`}
                    key={item.title}
                  >
                    <span className="feat-catalog-icon">
                      <item.icon size={18} aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section
        className="feat-outcomes-section"
        aria-labelledby="feature-outcomes-title"
      >
        <div className="container">
          <header className="feat-module-copy">
            <span className="feat-eyebrow">WHY TEAMS USE IT</span>
            <h2 id="feature-outcomes-title">Small checks. Clearer delivery.</h2>
          </header>
          <div className="feat-outcomes">
            {featureOutcomes.map((outcome) => (
              <article key={outcome.title}>
                <span className="feat-catalog-icon">
                  <outcome.icon size={18} aria-hidden="true" />
                </span>
                <h3>{outcome.title}</h3>
                <p>{outcome.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      <section className="feat-close container" aria-labelledby="features-close-title">
        <h2 id="features-close-title">Make room for great work.</h2>
        <p>
          The details can live on the issue. Try the interactive demo with
          sample data.
        </p>
        <div className="button-row">
          <Button to="/demo" variant="dark">
            See it in action
            <ArrowUpRight size={17} aria-hidden="true" />
          </Button>
          <Link className="text-link" to="/contact">
            Talk to us
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
