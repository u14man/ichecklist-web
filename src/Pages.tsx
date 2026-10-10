import { useState, type FormEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  BookOpen,
  Flower,
  Flower2,
  Check,
  CheckCheck,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  Clock3,
  Copy,
  Download,
  HeartHandshake,
  Layers,
  LifeBuoy,
  LockKeyhole,
  Mail,
  MessageSquare,
  MousePointer2,
  Search,
  ShieldCheck,
  Star,
  User,
  X,
} from "lucide-react";
import {
  Button,
  FAQ,
  FeatureCard,
  FinalCTA,
  MiniVisual,
  PageHero,
  SectionHeading,
} from "./components";
import { features, solutions, guides, faqs } from "./content";
import { guideSections, type GuideSection } from "./docs-guide";
import ProductDemo from "./ProductDemo";

export function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="THE LITTLE THINGS, TAKEN CARE OF"
        title={
          <>
            A checklist.
            <br />
            <span>A whole lot of possibility.</span>
          </>
        }
        description="Structure, accountability, and a little more focus. All inside the Jira issue you’re already working in."
      >
        <div className="button-row">
          <Button to="/demo">
            See it in action
            <ArrowUpRight size={17} />
          </Button>
          <a href="#all-features" className="button button-outline">
            Find your favorite detail
            <ArrowDown size={16} />
          </a>
        </div>
      </PageHero>
      <div className="container features-intro-strip">
        <span>
          <CheckCheck size={18} />
          Lightweight by design
        </span>
        <span>
          <ShieldCheck size={18} />
          Intentional about completion
        </span>
        <span>
          <LockKeyhole size={18} />
          Personal when you need it
        </span>
      </div>
      <section
        className="container section all-features-grid"
        id="all-features"
      >
        {features.map((feature) => (
          <FeatureCard key={feature.slug} feature={feature} visual />
        ))}
      </section>
      <section className="container details-band">
        <SectionHeading
          eyebrow="IT’S THE LITTLE TOUCHES"
          title="Thoughtful, all the way down."
        />
        <div className="detail-chips">
          {[
            "Inline creation",
            "4 item statuses",
            "5 priority levels",
            "Jira user assignment",
            "Due dates",
            "Colorful tags",
            "Drag to reorder",
            "Rich descriptions",
            "Search & filters",
            "Column preferences",
            "Light & dark mode",
            "Completion timestamps",
          ].map((text) => (
            <span key={text}>
              <Check size={15} />
              {text}
            </span>
          ))}
        </div>
      </section>
      <FAQ />
      <FinalCTA />
    </>
  );
}

export function FeatureDetailPage() {
  const { slug } = useParams();
  const feature = features.find((item) => item.slug === slug);
  if (!feature) return <NotFound />;
  return (
    <>
      <div className="container breadcrumb">
        <Link to="/features">Features</Link>
        <ChevronRight size={13} />
        <span>{feature.title}</span>
      </div>
      <section className="container feature-detail-hero">
        <div>
          <span className="feature-detail-label">
            <feature.icon size={16} />
            {feature.title}
          </span>
          <h1>
            {feature.headline.split("\n").map((line, index) => (
              <span key={line} className={index ? "accent" : ""}>
                {line}
              </span>
            ))}
          </h1>
          <p>{feature.description}</p>
          <div className="button-row">
            <Button to="/demo">
              Try it for yourself
              <ArrowUpRight size={17} />
            </Button>
            <Link className="text-link" to="/contact">
              Talk to us
              <ArrowRight size={16} />
            </Link>
          </div>
          <span className="subtle-note">
            <Check size={13} />
            Explore with sample data. No account needed.
          </span>
        </div>
        <div className={`feature-detail-art ${feature.color}`}>
          <span className="feature-art-caption">
            GOOD WORK, DOWN TO THE DETAILS.
          </span>
          <MiniVisual kind={feature.slug} />
          <div className="art-dot-grid" />
        </div>
      </section>
      <section className="container section feature-explainer">
        <SectionHeading
          align="left"
          eyebrow="A CLOSER LOOK"
          title={feature.detailTitle}
          description={feature.detail}
        />
        <div className="feature-points">
          {feature.points.map((point, i) => (
            <div key={point}>
              <span>0{i + 1}</span>
              <h3>{point}</h3>
              <CircleCheck size={20} />
            </div>
          ))}
        </div>
      </section>
      <section className="feature-details-band">
        <div className="container">
          <div className="three-card-grid">
            {feature.extras.map((extra, i) => (
              <article key={extra.title}>
                <span className="number-chip">0{i + 1}</span>
                <h3>{extra.title}</h3>
                <p>{extra.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="resource-section-heading">
          <SectionHeading
            align="left"
            eyebrow="BETTER TOGETHER"
            title="There’s more to check out."
          />
          <Link className="text-link" to="/features">
            All features
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="three-card-grid">
          {features
            .filter((item) => item.slug !== slug)
            .slice(0, 3)
            .map((item) => (
              <FeatureCard feature={item} key={item.slug} />
            ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

function TeamRings() {
  return (
    <svg className="teams-rings" viewBox="0 0 640 640" aria-hidden="true">
      {[132, 206, 280].map((radius) => (
        <circle
          key={radius}
          cx="320"
          cy="320"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeDasharray="1.4 8"
        />
      ))}
      <circle cx="486" cy="168" r="5" fill="currentColor" />
      <circle cx="168" cy="214" r="8" fill="#fff" stroke="currentColor" />
      <circle cx="214" cy="486" r="4" fill="currentColor" />
      <circle cx="470" cy="438" r="7" fill="#fff" stroke="currentColor" />
    </svg>
  );
}

const orbitPeople = {
  left: [
    {
      src: "/solutions/designer.png",
      label: "Designer",
      top: "24%",
      left: "62%",
    },
    {
      src: "/hero/quote-2.jpg",
      label: "Product",
      top: "48%",
      left: "76%",
      side: "left",
    },
    {
      src: "/solutions/marketer.png",
      label: "Marketer",
      top: "70%",
      left: "34%",
    },
  ],
  right: [
    {
      src: "/solutions/sales.png",
      label: "QA",
      top: "22%",
      left: "28%",
      side: "left",
    },
    {
      src: "/hero/quote-3.jpg",
      label: "Release",
      top: "52%",
      left: "16%",
      side: "left",
    },
    {
      src: "/hero/quote-1.jpg",
      label: "Developer",
      top: "74%",
      left: "58%",
    },
  ],
};

export function SolutionsPage() {
  return (
    <>
      <section className="teams-hero">
        <div className="teams-blob teams-blob-left" aria-hidden="true" />
        <div className="teams-blob teams-blob-right" aria-hidden="true" />
        <div className="teams-orbit teams-orbit-left" aria-hidden="true">
          <TeamRings />
          {orbitPeople.left.map((person) => (
            <figure
              className={`teams-person${person.side ? " side-left" : ""}`}
              style={{ top: person.top, left: person.left }}
              key={person.label}
            >
              <img src={person.src} alt="" />
              <figcaption>{person.label}</figcaption>
            </figure>
          ))}
        </div>
        <div className="teams-orbit teams-orbit-right" aria-hidden="true">
          <TeamRings />
          {orbitPeople.right.map((person) => (
            <figure
              className={`teams-person${person.side ? " side-left" : ""}`}
              style={{ top: person.top, left: person.left }}
              key={person.label}
            >
              <img src={person.src} alt="" />
              <figcaption>{person.label}</figcaption>
            </figure>
          ))}
        </div>
        <div className="teams-hero-copy">
          <h1>
            A checklist
            <br />
            for every team
          </h1>
          <p>
            Keep the small steps on the Jira issue they belong to. Developers,
            QA, product, and release teams each get a clear place for their
            part.
          </p>
          <Button to="/demo" variant="dark">
            Try the demo
            <ArrowRight size={18} />
          </Button>
          <p className="teams-proof">
            <span>
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={15} />
              ))}
            </span>
            Made for the people who finish the details.
          </p>
        </div>
      </section>

      <section className="container teams-group">
        <SectionHeading
          eyebrow="BY TEAM"
          title="However you work, keep the details close."
          description="Start from the workflow that matches your part of the issue."
        />
        <div className="teams-card-grid">
          {solutions.map((solution) => (
            <Link
              className="teams-card"
              to={`/solutions/${solution.slug}`}
              key={solution.slug}
            >
              <span className={`feature-icon ${solution.color}`}>
                <solution.icon size={22} />
              </span>
              <h3>{solution.role}</h3>
              <p>{solution.description}</p>
              <span className="text-link">
                See the workflow
                <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container teams-group">
        <SectionHeading
          eyebrow="BY WORKFLOW"
          title="Proven ways to finish the small things."
          description="Short guides for the checks teams repeat."
        />
        <div className="teams-workflow-grid">
          {guides.slice(0, 3).map((guide) => (
            <Link
              className="teams-card"
              to={`/resources/${guide.slug}`}
              key={guide.slug}
            >
              <span className={`feature-icon ${guide.color}`}>
                <guide.icon size={22} />
              </span>
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <span className="text-link">
                Read the guide
                <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container teams-start-wrap">
        <div className="teams-start">
          <SectionHeading
            eyebrow="START HERE"
            title="Start from a proven checklist."
            description="Try the interactive demo, or read a guide before you bring it into Jira."
          />
          <div className="button-row">
            <Button to="/demo" variant="dark">
              Try the demo
              <ArrowRight size={18} />
            </Button>
            <Button to="/resources" variant="outline">
              Browse guides
            </Button>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

export function SolutionDetailPage() {
  const { slug } = useParams();
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) return <NotFound />;
  return (
    <>
      <div className="container breadcrumb">
        <Link to="/solutions">Solutions</Link>
        <ChevronRight size={13} />
        <span>{solution.role}</span>
      </div>
      <section className="container feature-detail-hero">
        <div>
          <span className="feature-detail-label">
            <solution.icon size={17} />
            {solution.title}
          </span>
          <h1>
            {solution.headline.split("\n").map((line, i) => (
              <span className={i ? "accent" : ""} key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p>{solution.description}</p>
          <Button to="/demo">
            Take it for a spin
            <ArrowUpRight size={17} />
          </Button>
        </div>
        <div className={`feature-detail-art ${solution.color}`}>
          <span className="feature-art-caption">
            YOUR WORKFLOW, A LITTLE CLEARER.
          </span>
          <div className="workflow-window">
            <div className="workflow-heading">
              <span>
                <solution.icon size={18} />
                {solution.checklist}
              </span>
              <span className="workflow-count">2/4</span>
            </div>
            {solution.items.map((item, index) => (
              <div key={item} className="workflow-item">
                <span className={`mini-checkbox ${index < 2 ? "checked" : ""}`}>
                  {index < 2 && <Check size={12} />}
                </span>
                <span className={index < 2 ? "mini-done" : ""}>{item}</span>
                {index === 0 && <em>*</em>}
                <span className="tiny-avatar">JD</span>
              </div>
            ))}
            <div className="workflow-footer">
              <ShieldCheck size={13} />A sample workflow to make your own.
            </div>
          </div>
        </div>
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="A LITTLE LESS FRICTION"
          title={solution.benefit}
        />
        <div className="three-card-grid">
          {solution.details.map((detail, i) => (
            <article className="workflow-step" key={detail}>
              <span className="number-chip">0{i + 1}</span>
              <h3>{detail}</h3>
              <p>
                {
                  [
                    "Start with the work inside the issue. Capture the checks that make the outcome verifiable.",
                    "Give the important details structure and ownership, so the next person knows what needs attention.",
                    "Keep shared work visible and finish deliberately. A clear handoff starts with a clear checklist.",
                  ][i]
                }
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="container solution-feature">
        <div>
          <span className="eyebrow">A FEATURE THAT FITS</span>
          <h2>
            {features.find((item) => item.slug === solution.feature)?.title}
          </h2>
          <p>{features.find((item) => item.slug === solution.feature)?.body}</p>
          <Button to={`/features/${solution.feature}`} variant="dark">
            See how it works
            <ArrowRight size={16} />
          </Button>
        </div>
        <MiniVisual kind={solution.feature} />
      </section>
      <FAQ compact items={faqs.slice(0, 3)} />
      <FinalCTA />
    </>
  );
}

export function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="A LITTLE HANDS-ON TIME"
        title={
          <>
            Less explaining.
            <br />
            <span>More checking things off.</span>
          </>
        }
        description="Click around. Change a status. Make yourself at home. This is a sample workspace, so your real Jira issues stay untouched."
      />
      <div className="container demo-instructions">
        <span>
          <span>1</span>Check off an item
        </span>
        <span>
          <span>2</span>Try a different view
        </span>
        <span>
          <span>3</span>Complete the checklist
        </span>
        <span className="demo-no-account">
          <LockKeyhole size={13} />
          No sign-up. No connection to Jira.
        </span>
      </div>
      <section className="container demo-page-stage">
        <ProductDemo expanded />
      </section>
      <div className="container demo-info-grid">
        <article>
          <MousePointer2 size={21} />
          <h3>Go ahead, explore.</h3>
          <p>
            Click an item’s name to edit it. Use the toolbar for search, status
            filters, bulk editing, and columns.
          </p>
        </article>
        <article>
          <ShieldCheck size={21} />
          <h3>Try the important part.</h3>
          <p>
            Click “Complete checklist” with Mandatory Items still open. The gate
            shows you what needs attention.
          </p>
        </article>
        <article>
          <CheckCheck size={21} />
          <h3>A fresh start, anytime.</h3>
          <p>
            Reset restores the sample. Changes live only in this preview and
            disappear when you leave or reload.
          </p>
        </article>
      </div>
      <FinalCTA />
    </>
  );
}

const MONTHLY_RATE = (users: number) =>
  users <= 10 ? 0 : users <= 100 ? 0.75 : users <= 250 ? 0.55 : 0.3;
const ANNUAL_TIERS: Array<[number, number]> = [
  [10, 0],
  [15, 112.5],
  [25, 187.5],
  [50, 375],
  [100, 750],
  [200, 1300],
  [300, 1725],
  [400, 2025],
  [500, 2325],
  [600, 2625],
  [800, 3225],
  [1000, 3825],
  [1200, 4025],
  [1400, 4225],
  [1600, 4425],
  [1800, 4625],
  [2000, 4825],
  [2250, 5075],
  [2500, 5325],
];
const ANNUAL_PRICE = (users: number) =>
  ANNUAL_TIERS.find(([max]) => users <= max)![1];
const usd = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function PricingPage() {
  const [billing, setBilling] = useState<"Monthly" | "Annual">("Monthly");
  const [teamUsers, setTeamUsers] = useState(25);
  const [orgUsers, setOrgUsers] = useState(500);
  const annual = billing === "Annual";
  const teamPrice = annual ? ANNUAL_PRICE(teamUsers) : teamUsers * MONTHLY_RATE(teamUsers);
  const orgPrice = annual ? ANNUAL_PRICE(orgUsers) : orgUsers * MONTHLY_RATE(orgUsers);
  return (
    <>
      <PageHero
        gradient
        eyebrow="SIMPLE PRICING. EVERY FEATURE. NO SURPRISES."
        title={
          <>
            Free where it counts.
            <br />
            <span>Fair as you grow.</span>
          </>
        }
        description="Every plan includes the full checklist experience. Free for up to 10 users, and priced by team size as you scale — billed through the Atlassian Marketplace."
      />
      <section className="container pricing-page">
        <div className="billing-tabs" role="tablist" aria-label="Billing period">
          <button
            role="tab"
            aria-selected={!annual}
            className={!annual ? "active" : ""}
            onClick={() => setBilling("Monthly")}
          >
            Monthly
          </button>
          <button
            role="tab"
            aria-selected={annual}
            className={annual ? "active" : ""}
            onClick={() => setBilling("Annual")}
          >
            Annual
            <span className="save-tag">SAVE ~17%</span>
          </button>
        </div>
        <div className="plans-grid">
          <article className="plan-card">
            <div className="plan-title-row">
              <span className="plan-glyph free">
                <Asterisk size={24} />
              </span>
              <h3>Free</h3>
            </div>
            <p className="plan-desc">For small teams and startups</p>
            <div className="plan-price">
              <strong>$0</strong>
              <span className="price-unit">/{annual ? "year" : "month"}</span>
            </div>
            <span className="price-sub">Up to 10 users</span>
            <div className="team-size-row">
              <span className="size-label">TEAM SIZE</span>
              <strong>Up to 10 users</strong>
            </div>
            <div className="free-avatars" aria-label="Up to 10 users">
              {Array.from({ length: 10 }).map((_, index) => (
                <span key={index}>
                  <User size={13} />
                </span>
              ))}
            </div>
            <ul className="plan-features">
              <li>
                <Check size={15} />All features included
              </li>
              <li>
                <Check size={15} />No trial expiration
              </li>
              <li>
                <Check size={15} />Billed via Atlassian Marketplace
              </li>
            </ul>
            <Button to="/demo" variant="outline">
              Get Started Free
              <ArrowRight size={16} />
            </Button>
          </article>
          <article className="plan-card plan-featured bg-gradient-black">
            <div className="plan-title-row">
              <span className="plan-glyph team">
                <Flower2 size={24} />
              </span>
              <h3>Team</h3>
              <span className="popular-tag">POPULAR</span>
            </div>
            <p className="plan-desc">For growing teams</p>
            <div className="plan-price">
              <strong>{usd(teamPrice)}</strong>
              <span className="price-unit">/{annual ? "year" : "month"}</span>
            </div>
            <span className="price-sub">
              {usd(MONTHLY_RATE(teamUsers))}/user/month
            </span>
            <div className="team-size-row">
              <span className="size-label">TEAM SIZE</span>
              <strong>{teamUsers} users</strong>
            </div>
            <input
              type="range"
              min={11}
              max={100}
              value={teamUsers}
              aria-label="Team size"
              onChange={(event) => setTeamUsers(Number(event.target.value))}
            />
            <div className="range-bounds">
              <span>11</span>
              <span>100</span>
            </div>
            <ul className="plan-features">
              <li>
                <Check size={15} />All features included
              </li>
              <li>
                <Check size={15} />Same feature set as Free
              </li>
              <li>
                <Check size={15} />Billed via Atlassian Marketplace
              </li>
            </ul>
            <Button
              to={`/contact?topic=Pricing&team=${teamUsers}%20users&billing=${billing}`}
            >
              Start Free Trial
              <ArrowRight size={16} />
            </Button>
          </article>
          <article className="plan-card">
            <div className="plan-title-row">
              <span className="plan-glyph org">
                <Flower size={24} />
              </span>
              <h3>Organization</h3>
            </div>
            <p className="plan-desc">For scaling teams</p>
            <div className="plan-price">
              <strong>{usd(orgPrice)}</strong>
              <span className="price-unit">/{annual ? "year" : "month"}</span>
            </div>
            <span className="price-sub">
              {usd(MONTHLY_RATE(orgUsers))}/user/month
            </span>
            <div className="team-size-row">
              <span className="size-label">TEAM SIZE</span>
              <strong>{orgUsers.toLocaleString("en-US")} users</strong>
            </div>
            <div className="preset-row">
              {[
                [250, "250"],
                [500, "500"],
                [1000, "1K"],
                [2500, "2.5K"],
              ].map(([value, label]) => (
                <button
                  key={label}
                  className={orgUsers === value ? "active" : ""}
                  aria-pressed={orgUsers === value}
                  onClick={() => setOrgUsers(value as number)}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              type="range"
              min={101}
              max={2500}
              value={orgUsers}
              aria-label="Organization size"
              onChange={(event) => setOrgUsers(Number(event.target.value))}
            />
            <div className="range-bounds">
              <span>101</span>
              <span>2,500</span>
            </div>
            <ul className="plan-features">
              <li>
                <Check size={15} />
                Volume discounts applied
              </li>
              <li>
                <Check size={15} />
                All features included
              </li>
              <li>
                <Check size={15} />
                From $0.30/user/month above 250 users
              </li>
            </ul>
            <Button
              to={`/contact?topic=Pricing&team=${orgUsers}%20users&billing=${billing}`}
              variant="outline"
            >
              Talk to Sales
              <ArrowRight size={16} />
            </Button>
          </article>
        </div>
        <p className="pricing-footnote">
          All plans are billed through the Atlassian Marketplace. Annual
          billing saves ~17% (10-month pricing). Prices in USD, excluding tax.
        </p>
      </section>
      <section className="section container included-section">
        <SectionHeading
          eyebrow="NO PREMIUM TIERS. NO FEATURE GATING."
          title="Everything Included"
          description="Every team gets the full Jira Checklist experience — on every plan, at every size."
        />
        <div className="included-grid">
          {features.map((feature) => (
            <div className="included-item" key={feature.slug}>
              <Check size={17} />
              <span>
                <strong>
                  <Link to={`/features/${feature.slug}`}>{feature.title}</Link>
                </strong>
                <small>{feature.short}</small>
              </span>
            </div>
          ))}
          <div className="included-item">
            <Check size={17} />
            <span>
              <strong>1-click Setup</strong>
              <small>Enable on any Jira project in under a minute</small>
            </span>
          </div>
        </div>
      </section>
      <FAQ
        items={[
          {
            question: "How is the price calculated?",
            answer:
              "Monthly billing uses per-user tiers: USD 0.75 per user/month for 11–100 users, USD 0.55 for 101–250, and USD 0.30 above 250. Up to 10 users is completely free. Annual billing uses flat tiers per team size, which saves about 17% (10-month pricing).",
          },
          {
            question: "What does the Free tier include?",
            answer:
              "Everything. Up to 10 users get the full checklist experience free — no trial expiration, no feature gates, nothing held back. It is the standard Atlassian Marketplace model for small teams.",
          },
          {
            question: "How does annual billing work?",
            answer:
              "You pick the tier that matches your team size and pay one flat annual price for everyone in it. If your team grows within the same tier, the price does not change until you cross into the next one.",
          },
          {
            question: "Can I try the experience before buying?",
            answer:
              "Yes. The interactive demo is available without an account. It uses sample Checklist Items and does not connect to your Jira instance.",
          },
        ]}
      />
      <FinalCTA />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="WHY WE CARE ABOUT THE DETAILS"
        title={
          <>
            The little things
            <br />
            <span>are the big things.</span>
          </>
        }
        description="A forgotten check. An unclear handoff. A detail lost in a comment. Good work deserves a better last mile."
      />
      <section className="about-manifesto container">
        <div className="manifesto-art">
          <span className="eyebrow">OUR POINT OF VIEW</span>
          <h2>
            Small steps.
            <br />
            Solid work.
          </h2>
          <div className="manifesto-check">
            <CheckCheck size={120} strokeWidth={1.4} />
          </div>
          <span className="manifesto-caption">Care is in the checking.</span>
        </div>
        <div className="manifesto-copy">
          <span className="eyebrow">LESS FRICTION. MORE FOLLOW-THROUGH.</span>
          <h2>
            Not more work.
            <br />A better home for it.
          </h2>
          <p>
            Jira is where teams plan big things. But the smaller steps — the
            acceptance checks, review points, and last-minute verifications —
            can fall between a description and a full sub-task.
          </p>
          <p>
            Jira Checklist is designed for that space. A way to bring structure
            and ownership to the details, without turning every small step into
            another issue.
          </p>
          <p>
            Our focus is simple: make careful work feel natural. Keep the
            interface familiar. Make completion intentional. And give personal
            reminders a place that is truly personal.
          </p>
          <Link className="text-link" to="/features">
            Explore what that looks like
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="WHAT GUIDES THE PRODUCT"
          title="Thoughtful by design."
        />
        <div className="three-card-grid value-cards">
          {[
            {
              icon: Layers,
              title: "Structure without ceremony",
              text: "A lightweight check should feel lightweight. We focus on inline actions, clear organization, and the right amount of detail.",
            },
            {
              icon: HeartHandshake,
              title: "Clarity over cleverness",
              text: "Clear statuses, real ownership, and progress that means what it says. Helpful software should not need a translation.",
            },
            {
              icon: ShieldCheck,
              title: "Intentional from start to finish",
              text: "Mandatory validation, completion locks, and private space are purposeful boundaries, not more steps for the sake of it.",
            },
          ].map((item) => (
            <article key={item.title}>
              <span className="feature-icon lavender">
                <item.icon size={25} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-note container">
        <img className="brand-logo large" src="/logo.svg" alt="" aria-hidden="true" />
        <h2>
          Built around Jira.
          <br />
          Focused on your team.
        </h2>
        <p>
          We are an independent product, not part of Atlassian. Our job is to
          bring a thoughtful checklist experience to the issues your team
          already calls home.
        </p>
        <Button to="/contact" variant="dark">
          We’d love to hear your perspective
          <ArrowUpRight size={17} />
        </Button>
      </section>
      <FinalCTA />
    </>
  );
}

export function ContactPage() {
  const [params] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState(() => {
    const requested = params.get("team");
    const users = Number(requested?.match(/\d+/)?.[0]);
    if (!users) return "11–50";
    if (users <= 10) return "1–10";
    if (users <= 50) return "11–50";
    if (users <= 100) return "51–100";
    if (users <= 500) return "101–500";
    return "501+";
  });
  const [topic, setTopic] = useState(
    params.get("topic") || "Product questions",
  );
  const [message, setMessage] = useState(
    params.get("billing")
      ? `I would like to discuss pricing for our Jira team. Our preferred billing cadence is ${params.get("billing")?.toLowerCase()}.`
      : "",
  );
  const inquiry = `Jira Checklist inquiry\n\nName: ${name}\nEmail: ${email}\nTeam size: ${team}\nTopic: ${topic}\n\n${message}\n`;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (name.trim() && message.trim()) {
      setSubmitted(true);
      setCopied(false);
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(inquiry);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([inquiry], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "jira-checklist-inquiry.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <>
      <section className="container contact-layout">
        <div className="contact-copy">
          <span className="eyebrow">A GOOD CONVERSATION STARTS HERE</span>
          <h1>
            Let’s get into
            <br />
            <span>the details.</span>
          </h1>
          <p>
            Questions about the product? Thinking about your team’s workflow?
            You’re in the right place.
          </p>
          <div className="contact-options">
            <Link to="/docs">
              <span className="feature-icon lavender">
                <LifeBuoy size={22} />
              </span>
              <div>
                <strong>Looking for a quick answer?</strong>
                <p>Our help center is a good place to start.</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
            <Link to="/demo">
              <span className="feature-icon mint">
                <MousePointer2 size={22} />
              </span>
              <div>
                <strong>Prefer to get a feel for it?</strong>
                <p>Make yourself at home in the live demo.</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
            <Link to="/resources">
              <span className="feature-icon peach">
                <BookOpen size={22} />
              </span>
              <div>
                <strong>A little workflow inspiration?</strong>
                <p>Practical guides for thoughtful teams.</p>
              </div>
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="contact-bottom-note">
            <MessageSquare size={23} />
            <p>
              No complicated pitch.
              <br />
              Just the right next conversation.
            </p>
          </div>
        </div>
        <div className="contact-form-card">
          {submitted ? (
            <div className="contact-success" role="status">
              <span className="success-icon">
                <CircleCheck size={32} />
              </span>
              <span className="eyebrow">ALL THE DETAILS, TOGETHER</span>
              <h2>Your inquiry is ready.</h2>
              <p>
                This website preview doesn’t send messages. Copy or download
                your inquiry to keep it ready for the product team.
              </p>
              <pre>{inquiry}</pre>
              <div className="button-row">
                <button className="button button-primary" onClick={copy}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied to clipboard" : "Copy inquiry"}
                </button>
                <button className="button button-outline" onClick={download}>
                  <Download size={16} />
                  Download
                </button>
              </div>
              {copyError && (
                <p className="form-notice">
                  Clipboard access is unavailable. Please download the inquiry
                  instead.
                </p>
              )}
              <button className="text-link" onClick={() => setSubmitted(false)}>
                Back to your details
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <>
              <div className="form-card-heading">
                <span className="feature-icon lavender">
                  <Mail size={22} />
                </span>
                <div>
                  <h2>What’s on your mind?</h2>
                  <p>A little context goes a long way.</p>
                </div>
              </div>
              <form onSubmit={submit}>
                <div className="form-row">
                  <label>
                    Your name
                    <input
                      required
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Jamie Davis"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </label>
                  <label>
                    Work email
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="jamie@company.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Team size
                    <select
                      value={team}
                      onChange={(event) => setTeam(event.target.value)}
                    >
                      {["1–10", "11–50", "51–100", "101–500", "501+"].map(
                        (size) => (
                          <option key={size}>{size}</option>
                        ),
                      )}
                    </select>
                  </label>
                  <label>
                    I’d like to talk about
                    <select
                      value={topic}
                      onChange={(event) => setTopic(event.target.value)}
                    >
                      {[
                        "Product questions",
                        "Pricing",
                        "Team workflows",
                        "Feedback",
                        "Something else",
                      ].map((value) => (
                        <option key={value}>{value}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label>
                  A little about what you need
                  <textarea
                    rows={5}
                    required
                    minLength={10}
                    maxLength={5000}
                    placeholder="Tell us about your team, your workflow, or the little thing you’d like to make better…"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>
                    I’ve read the <Link to="/privacy">privacy notice</Link>. I
                    won’t include credentials or sensitive issue information.
                  </span>
                </label>
                <button type="submit" className="button button-primary">
                  Prepare my inquiry
                  <ArrowUpRight size={17} />
                </button>
                <p className="form-preview-note">
                  <LockKeyhole size={13} />
                  Preview mode: prepare, copy, or download. Nothing is sent.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
      <section className="contact-footer-note container">
        <CheckCheck size={20} />
        <span>While you’re here, there’s a whole checklist to explore.</span>
        <Link className="text-link" to="/features">
          Meet the features
          <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}

export function ResourcesPage() {
  const [category, setCategory] = useState("All guides");
  const visible = guides.filter(
    (guide) =>
      category === "All guides" ||
      guide.category.toLowerCase() === category.toLowerCase(),
  );
  return (
    <>
      <PageHero
        eyebrow="THE FIELD NOTES"
        title={
          <>
            Good work.
            <br />
            <span>A little better understood.</span>
          </>
        }
        description="Practical ideas for cleaner issues, clearer handoffs, and the details that make the difference."
      />
      <section className="container resource-page">
        <div className="resource-filters">
          {[
            "All guides",
            "Team practices",
            "Working in Jira",
            "Release practices",
          ].map((value) => (
            <button
              className={category === value ? "active" : ""}
              aria-pressed={category === value}
              key={value}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="resource-grid">
          {visible.map((guide) => (
            <Link
              className="resource-card"
              to={`/resources/${guide.slug}`}
              key={guide.slug}
            >
              <div className={`resource-art ${guide.color}`}>
                <span className="resource-art-label">THE FIELD NOTES</span>
                <guide.icon size={67} strokeWidth={1.4} />
                <span className="resource-art-number">
                  0{guides.indexOf(guide) + 1}
                </span>
              </div>
              <div className="resource-card-body">
                <span className="eyebrow">{guide.category}</span>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <span>
                  {guide.time}
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="resource-help-banner container">
        <span className="feature-icon white">
          <CircleHelp size={27} />
        </span>
        <div>
          <h2>Looking for the how-to?</h2>
          <p>Find practical answers in the help center.</p>
        </div>
        <Button to="/docs" variant="dark">
          Get a little guidance
          <ArrowRight size={16} />
        </Button>
      </section>
      <FinalCTA />
    </>
  );
}

export function ArticlePage() {
  const { slug } = useParams();
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return <NotFound />;
  return (
    <>
      <div className="container breadcrumb">
        <Link to="/resources">Guides & insights</Link>
        <ChevronRight size={13} />
        <span>{guide.category.toLowerCase()}</span>
      </div>
      <header className="article-header container">
        <span className="eyebrow">{guide.category}</span>
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
        <div>
          <img className="brand-logo small" src="/logo.svg" alt="" aria-hidden="true" />
          <span>Jira Checklist field notes</span>
          <span className="article-time">
            <Clock3 size={14} />
            {guide.time}
          </span>
        </div>
      </header>
      <div className={`article-cover container ${guide.color}`}>
        <span>THE FIELD NOTES</span>
        <guide.icon size={92} strokeWidth={1.2} />
        <span>Care is in the checking.</span>
      </div>
      <div className="container article-layout">
        <aside>
          <span className="eyebrow">IN THIS GUIDE</span>
          {guide.sections.map((section, i) => (
            <a href={`#section-${i}`} key={section.title}>
              {section.title}
            </a>
          ))}
          <Link className="text-link" to="/demo">
            Try the demo
            <ArrowUpRight size={15} />
          </Link>
        </aside>
        <article className="article-body">
          <p className="article-intro">
            The most useful process is the one your team can actually follow.
            Start with clear expectations, keep the details close to the work,
            and make the final check a deliberate one.
          </p>
          {guide.sections.map((section, i) => (
            <section id={`section-${i}`} key={section.title}>
              <span className="article-section-number">0{i + 1}</span>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <div className="article-takeaway">
            <ShieldCheck size={24} />
            <div>
              <h3>A little takeaway</h3>
              <p>
                Clarity beats complexity. Give the small steps a home, make
                ownership visible, and keep “done” meaningful.
              </p>
            </div>
          </div>
          <Link className="text-link" to="/resources">
            Back to all field notes
            <ArrowRight size={16} />
          </Link>
        </article>
      </div>
      <FinalCTA />
    </>
  );
}

function guideText(section: GuideSection) {
  return [
    section.title,
    section.summary,
    ...section.blocks.flatMap((block) => {
      if (block.type === "p" || block.type === "note") {
        return [block.type === "note" ? block.title : "", block.text];
      }
      if (block.type === "table") return block.rows.flat();
      return block.items;
    }),
  ]
    .join(" ")
    .toLowerCase();
}

export function DocsPage() {
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState(guideSections[0].id);
  const query = search.trim().toLowerCase();
  const results = guideSections.filter(
    (section) => !query || guideText(section).includes(query),
  );

  function openSection(id: string) {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <>
      <PageHero
        eyebrow="JIRA CHECKLIST USER GUIDE"
        title={
          <>
            Every click,
            <br />
            <span>in order.</span>
          </>
        }
        description="Twenty short chapters for the checklist panel: create, edit, complete, and the paths that are not in the product."
      >
        <label className="help-search">
          <Search size={21} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search rename, mandatory, personal…"
            aria-label="Search help center"
          />
          {search && (
            <button onClick={() => setSearch("")} aria-label="Clear search">
              <X size={18} />
            </button>
          )}
          <span className="keycap">Search</span>
        </label>
      </PageHero>
      <section className="container docs-layout">
        <aside className="docs-toc">
          <span className="eyebrow">20 CHAPTERS</span>
          <nav aria-label="Guide chapters">
            {guideSections.map((section) => {
              const visible = results.some((item) => item.id === section.id);
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={activeId === section.id ? "active" : ""}
                  aria-current={activeId === section.id ? "true" : undefined}
                  hidden={!visible}
                  onClick={(event) => {
                    event.preventDefault();
                    openSection(section.id);
                  }}
                >
                  <span>{section.number}</span>
                  {section.title}
                </a>
              );
            })}
          </nav>
          <div className="docs-contact">
            <LifeBuoy size={23} />
            <h3>Still a little stuck?</h3>
            <p>Send feedback from the top ⋯ menu, or write to the team.</p>
            <Link className="text-link" to="/contact">
              Let’s talk
              <ArrowRight size={14} />
            </Link>
          </div>
        </aside>
        <div className="docs-results">
          <div className="docs-result-heading">
            <h2>{query ? `Results for “${search.trim()}”` : "User guide"}</h2>
            <span aria-live="polite">
              {results.length} {results.length === 1 ? "chapter" : "chapters"}
            </span>
          </div>
          {results.length ? (
            results.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="guide-chapter"
              >
                <header>
                  <span>{section.number}</span>
                  <div>
                    <h3>{section.title}</h3>
                    <p>{section.summary}</p>
                  </div>
                </header>
                {section.blocks.map((block, index) => {
                  if (block.type === "p") return <p key={index}>{block.text}</p>;
                  if (block.type === "steps") {
                    return (
                      <ol key={index}>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    );
                  }
                  if (block.type === "list") {
                    return (
                      <ul key={index}>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.type === "note") {
                    return (
                      <aside key={index}>
                        <strong>{block.title}</strong>
                        <p>{block.text}</p>
                      </aside>
                    );
                  }
                  return (
                    <div key={index} className="guide-table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th scope="col">{block.headers[0]}</th>
                            <th scope="col">{block.headers[1]}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row) => (
                            <tr key={row[0]}>
                              <th scope="row">{row[0]}</th>
                              <td>{row[1]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </article>
            ))
          ) : (
            <div className="docs-empty">
              <Search size={28} />
              <h3>No chapters match that search.</h3>
              <p>Try “rename”, “mandatory”, or “personal”.</p>
              <button
                className="button button-outline"
                onClick={() => setSearch("")}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

export function ChangelogPage() {
  const notes = [
    {
      tag: "ORGANIZATION",
      title: "A home for the details",
      text: "Named checklists, List and Tab views, inline creation, drag reordering, and customizable columns bring structure to an issue without creating extra issues.",
      links: features.filter((item) =>
        ["organized-checklists", "flexible-views"].includes(item.slug),
      ),
    },
    {
      tag: "COMPLETION",
      title: "A more deliberate finish",
      text: "Mandatory Item validation makes unresolved checks visible before completion. Completion locks the checklist, records who completed it and when, and supports deliberate reopening.",
      links: features.filter((item) =>
        ["mandatory-items", "completion-locking"].includes(item.slug),
      ),
    },
    {
      tag: "FOCUS",
      title: "Shared progress. Personal space.",
      text: "Overall Progress tracks shared work consistently across filters. Personal Checklists stay visible only to their creator and do not change the team’s progress.",
      links: features.filter((item) =>
        ["progress-tracking", "personal-checklists"].includes(item.slug),
      ),
    },
    {
      tag: "EVERYDAY FLOW",
      title: "Fewer repetitive clicks",
      text: "Multi-select supports changes to status, priority, assignee, due date, and tags, plus duplication and confirmed deletion. Native light and dark mode keep the details comfortable to read.",
      links: features.filter((item) =>
        ["bulk-actions", "native-experience"].includes(item.slug),
      ),
    },
  ];
  return (
    <>
      <PageHero
        eyebrow="PRODUCT NOTES"
        title={
          <>
            Thoughtful details.
            <br />
            <span>Worth a closer look.</span>
          </>
        }
        description="A guided look at the current product capabilities. No invented release dates — just what the checklist can do."
      />
      <section className="container changelog-layout">
        <aside>
          <span className="current-badge">
            <span className="pulse-dot" />
            Current capability set
          </span>
          <p>
            These notes describe the supplied product specification, rather than
            a dated release history.
          </p>
          <Link className="text-link" to="/demo">
            Explore the demo
            <ArrowUpRight size={16} />
          </Link>
        </aside>
        <div className="notes-timeline">
          {notes.map((note, i) => (
            <article key={note.title}>
              <div className="timeline-dot">
                <Check size={13} />
              </div>
              <span className="eyebrow">
                {note.tag} <span className="note-index">/ 0{i + 1}</span>
              </span>
              <h2>{note.title}</h2>
              <p>{note.text}</p>
              <div className="note-links">
                {note.links.map((item) => (
                  <Link to={`/features/${item.slug}`} key={item.slug}>
                    {item.title}
                    <ArrowUpRight size={13} />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

export function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  const sections = privacy
    ? [
        [
          "Scope of this notice",
          "This notice describes the website preview only. It is not a published privacy policy for a live Jira app, and it does not make claims about production hosting, compliance certifications, or data residency.",
        ],
        [
          "Interactive demo",
          "The checklist demo uses sample data held in browser memory. It is not connected to Jira and does not read your Jira issues. Changes are discarded when the demo is unmounted or the page is reloaded.",
        ],
        [
          "Contact and pricing inquiries",
          "The inquiry form prepares text locally in your browser. It does not transmit a message, create a lead, or subscribe you to a mailing list. Copying puts the inquiry in your clipboard; downloading saves a text file on your device. Do not enter credentials or confidential issue content.",
        ],
        [
          "Fonts and tracking",
          "The website serves its display and interface fonts with its own assets, without requests to an external font service. No analytics or advertising trackers have been added to this preview.",
        ],
        [
          "Before production use",
          "A production website and connected Jira app require a reviewed privacy policy covering their actual processing, retention, subprocessors, contact details, and applicable user rights. That information has not been supplied for this preview.",
        ],
      ]
    : [
        [
          "Website preview",
          "This website is a product design and interactive demonstration. Sample workspace names, people, issue content, and completion times illustrate the interface and are not customer endorsements.",
        ],
        [
          "No purchase or service commitment",
          "The pricing page does not publish a price, start a subscription, or process payment. Billing preferences are inquiry context only. Contact forms do not send messages from this preview.",
        ],
        [
          "Product capability boundaries",
          "Marketing content follows the supplied Jira Checklist specification. Checklist completion gates do not claim to block Jira issue status transitions. This website does not claim AI generation, a cross-issue template library, or third-party cloud storage integrations.",
        ],
        [
          "Atlassian trademarks",
          "Jira and Atlassian are trademarks of their respective owner. Jira Checklist is presented as an independent product. This site does not claim endorsement, certification, or an official Marketplace listing.",
        ],
        [
          "Responsible demonstration use",
          "Use sample information only. Do not enter passwords, API tokens, confidential issue data, or personal information you do not want copied or downloaded. Production terms must be separately reviewed before offering a live service.",
        ],
      ];
  return (
    <>
      <PageHero
        eyebrow="CLEAR EXPECTATIONS, DOWN TO THE DETAILS"
        title={
          privacy ? "Privacy for this preview." : "Terms for this preview."
        }
        description="A plain-language explanation of what this website does — and what it doesn’t."
      />
      <article className="legal-content container">
        <div className="legal-notice">
          <ShieldCheck size={22} />
          <span>
            This is a preview-specific notice, not a substitute for reviewed
            production legal documents.
          </span>
        </div>
        {sections.map(([title, text], i) => (
          <section key={title}>
            <h2>
              {i + 1}. {title}
            </h2>
            <p>{text}</p>
          </section>
        ))}
        <Link className="text-link" to="/contact">
          Questions? Start here
          <ArrowRight size={16} />
        </Link>
      </article>
    </>
  );
}

export function NotFound() {
  return (
    <section className="not-found container">
      <span className="not-found-art">
        4
        <span>
          <CheckCheck size={76} />
        </span>
        4
      </span>
      <span className="eyebrow">ONE LITTLE THING WE COULDN’T FIND</span>
      <h1>
        This page slipped
        <br />
        off the checklist.
      </h1>
      <p>Let’s get you back to the good stuff.</p>
      <div className="button-row">
        <Button to="/">
          Back to home
          <ArrowRight size={17} />
        </Button>
        <Button to="/features" variant="outline">
          Explore the features
        </Button>
      </div>
    </section>
  );
}
