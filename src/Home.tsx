import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  Code2,
  FileText,
  GitBranch,
  LockKeyhole,
  ShieldCheck,
  Star,
  Sparkles,
} from "lucide-react";
import {
  Button,
  FAQ,
  FinalCTA,
  MiniVisual,
  SectionHeading,
} from "./components";
import { features, guides, solutions } from "./content";

const quotes = [
  {
    src: "/hero/quote-1.jpg",
    name: "Developers",
    text: "The little steps stay on the issue, not buried in the comments.",
  },
  {
    src: "/hero/quote-2.jpg",
    name: "QA teams",
    text: "Every test point has an owner, a status, and a clear outcome.",
  },
  {
    src: "/hero/quote-3.jpg",
    name: "Release teams",
    text: "Release day starts from a list, not from memory.",
  },
];

function GoldStars({ size = 16 }: { size?: number }) {
  return (
    <span className="hub-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

const homeBentoRows = [
  [features[0], features[1]],
  [features[3], features[4]],
  [features[2], features[5], features[6]],
];

function HomeBentoCard({
  feature,
}: {
  feature: (typeof features)[number];
}) {
  return (
    <Link className="home-bento-card" to={`/features/${feature.slug}`}>
      <div className="home-bento-copy">
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
      <div className="home-bento-media">
        <MiniVisual kind={feature.slug} />
      </div>
    </Link>
  );
}

export default function Home() {
  const [role, setRole] = useState(0);
  const selected = solutions[role];
  return (
    <>
      <section className="ichecklist-hero">
        <div className="ichecklist-hero-container">
          <p className="ichecklist-kicker">Checklists for every Jira Work Items</p>
          <h1>Put delivery standards into every step that ships.</h1>
          <p>
            Organize the little steps, keep the team aligned, and know what done
            looks like — without leaving Jira.
          </p>
          <div className="ichecklist-actions">
            <Link className="ichecklist-btn ichecklist-btn-dark" to="/demo">
              <Sparkles size={20} />
              Try the demo
            </Link>
            <Link className="ichecklist-btn ichecklist-btn-light" to="/features">
              See how it works
            </Link>
          </div>
          <div className="ichecklist-proof">
            <img src="/hero/faces.png" alt="" />
            <div>
              <GoldStars />
              <p>loved by 30+ customers</p>
            </div>
          </div>
        </div>
        <div className="ichecklist-stage">
          <img className="ichecklist-orb" src="/hero/orb.jpg" alt="" />
          <img
            className="ichecklist-modules"
            src="/hero/modules.png"
            alt="Named checklists, progress, and ownership on a Jira issue"
          />
        </div>
      </section>
      <section className="ichecklist-quotes">
        {quotes.map((quote) => (
          <figure key={quote.name}>
            <img src={quote.src} alt="" />
            <blockquote>
              <p>{quote.text}</p>
            </blockquote>
            <GoldStars size={18} />
            <figcaption>{quote.name}</figcaption>
          </figure>
        ))}
      </section>
      <section className="team-strip container">
        <p>FOR THE PEOPLE WHO BRING GREAT WORK TO LIFE</p>
        <div>
          {solutions.map((solution) => (
            <Link to={`/solutions/${solution.slug}`} key={solution.slug}>
              <solution.icon size={23} strokeWidth={1.65} />
              {solution.role}
            </Link>
          ))}
          <span className="team-strip-final">
            <CheckCheck size={24} />
            And every detail in between.
          </span>
        </div>
      </section>
      <div className="home-section-order">
        <section className="section home-bento container" aria-labelledby="home-bento-title">
        <h2 id="home-bento-title" className="home-bento-title">
          Everything you need.
          <br />
          Nothing in your way.
        </h2>
        <div className="home-bento-rows">
          {homeBentoRows.map((row, rowIndex) => (
            <div
              className={`home-bento-row ${
                rowIndex === 0 ? "is-60-40" : rowIndex === 1 ? "is-40-60" : "is-thirds"
              }`}
              key={row.map((feature) => feature.slug).join("-")}
            >
              {row.map((feature) => (
                <HomeBentoCard feature={feature} key={feature.slug} />
              ))}
            </div>
          ))}
        </div>
        <div className="center-link">
          <Link className="text-link" to="/features">
            There’s more in the details. Explore all features
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <section className="progress-band">
        <div className="container split-section">
          <div>
            <span className="eyebrow">LESS “WHERE ARE WE?”</span>
            <h2>
              A little clarity.
              <br />
              For the whole team.
            </h2>
            <p>
              Know what’s checked, what’s next, and what needs a hand. Real-time
              progress keeps everyone on the same page, even when they’re
              working on different details.
            </p>
            <ul className="check-list">
              <li>
                <Check size={16} />
                Overall and per-checklist progress
              </li>
              <li>
                <Check size={16} />
                Numbers that stay consistent when you filter
              </li>
              <li>
                <Check size={16} />
                Personal reminders stay out of team metrics
              </li>
            </ul>
            <Button to="/features/progress-tracking" variant="dark">
              See the bigger picture
              <ArrowRight size={17} />
            </Button>
          </div>
          <div className="progress-band-visual">
            <MiniVisual kind="progress-tracking" />
            <div className="progress-floating-note">
              <span className="avatar avatar-purple">JD</span>
              <span>One less thing to ask in standup.</span>
              <CheckCheck size={17} />
            </div>
          </div>
        </div>
      </section>
      <section className="section solutions-section container" aria-labelledby="solutions-title">
        <h2 id="solutions-title" className="solutions-title">
          However you work,
          <br />
          make it a little smoother.
        </h2>
        <p className="solutions-subtitle">
          From the first line of code to the last release check. A place for your part.
        </p>
        <div className="solutions-pills" role="tablist" aria-label="Team workflows">
          {solutions.map((solution, index) => (
            <button
              key={solution.slug}
              role="tab"
              type="button"
              aria-selected={role === index}
              aria-controls="role-panel"
              onClick={() => setRole(index)}
              className={role === index ? "is-active" : ""}
            >
              {solution.role}
            </button>
          ))}
          <Link className="solutions-pill-link" to="/solutions">
            See all teams
          </Link>
        </div>
        <div className="solutions-panel" id="role-panel" role="tabpanel">
          <div className="solutions-copy">
            <h3>
              {selected.headline.split("\n")[0]}
              <br />
              <span>{selected.headline.split("\n")[1]}</span>
            </h3>
            <p>{selected.description}</p>
            <div className="solutions-replaces">
              <span>Replaces</span>
              <FileText size={16} aria-hidden="true" />
              <GitBranch size={16} aria-hidden="true" />
              <CheckCheck size={16} aria-hidden="true" />
            </div>
            <ul>
              {selected.details.map((detail) => (
                <li key={detail}>
                  <Check size={16} aria-hidden="true" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
          <div className="solutions-stack">
            {selected.items.map((item, index) => (
              <article key={item}>
                <img
                  src={quotes[index % quotes.length].src}
                  alt=""
                />
                <p>{item}</p>
              </article>
            ))}
            <Link className="solutions-cta" to={`/solutions/${selected.slug}`}>
              Explore solution
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      </div>
      <section className="comparison-section section container">
        <SectionHeading
          eyebrow="THE RIGHT SIZE FOR THE SMALL STUFF"
          title={
            <>
              Not another issue.
              <br />
              Just a better way to finish one.
            </>
          }
          description="Some work needs a whole issue. Some work just needs a check."
        />
        <div className="comparison-grid">
          <article>
            <span className="comparison-icon">
              <FileText size={24} />
            </span>
            <h3>A line in the description</h3>
            <p>Easy to write. Easy to overlook.</p>
            <ul>
              <li>Static text, without individual ownership</li>
              <li>No item-level progress or due dates</li>
              <li>Acceptance criteria can get lost</li>
            </ul>
            <span className="comparison-bottom">Good for context.</span>
          </article>
          <article>
            <span className="comparison-icon">
              <GitBranch size={24} />
            </span>
            <h3>Another Jira sub-task</h3>
            <p>Useful structure. Sometimes too much.</p>
            <ul>
              <li>A whole issue for a five-minute check</li>
              <li>More movement on the board</li>
              <li>More workflow than the step needs</li>
            </ul>
            <span className="comparison-bottom">
              Good for independent workstreams.
            </span>
          </article>
          <article className="comparison-highlight">
            <span className="comparison-badge">THE SWEET SPOT</span>
            <span className="comparison-icon">
              <CheckCheck size={25} />
            </span>
            <h3>A Checklist Item</h3>
            <p>A little lighter. A lot more intentional.</p>
            <ul>
              <li>
                <Check size={15} />
                Clear status, owner, and due date
              </li>
              <li>
                <Check size={15} />
                Progress that tells the full story
              </li>
              <li>
                <Check size={15} />
                Mandatory checks before completion
              </li>
            </ul>
            <Link className="text-link" to="/resources/checklists-vs-subtasks">
              Just right for the details
              <ArrowUpRight size={16} />
            </Link>
          </article>
        </div>
      </section>
      <section className="native-strip container">
        <div className="native-symbols">
          <img
            className="brand-logo"
            src="/logo.svg"
            alt=""
            aria-hidden="true"
          />
          <span>+</span>
          <span className="native-jira">
            <span className="jira-diamond" />
          </span>
        </div>
        <div>
          <h3>New possibilities. Familiar surroundings.</h3>
          <p>
            Jira users. Jira issues. The way you already work — with the details
            taken care of.
          </p>
        </div>
        <Link className="text-link" to="/features/native-experience">
          Right at home
          <ArrowUpRight size={17} />
        </Link>
      </section>
      <section className="section container">
        <div className="resource-section-heading">
          <SectionHeading
            align="left"
            eyebrow="GOOD THINGS TO KNOW"
            title="A little food for thought."
          />
          <Link className="text-link" to="/resources">
            All guides
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="resource-grid">
          {guides.map((guide, index) => (
            <Link
              to={`/resources/${guide.slug}`}
              className="resource-card"
              key={guide.slug}
            >
              <div className={`resource-art art-${index} ${guide.color}`}>
                <div className="resource-art-label">THE FIELD NOTES</div>
                <guide.icon size={65} strokeWidth={1.4} />
                <span className="resource-art-number">0{index + 1}</span>
                <div className="art-line" />
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
      <FAQ />
      <FinalCTA variant="launch" />
    </>
  );
}

export function WorkflowPrinciples() {
  return (
    <div className="principles-grid">
      {[
        {
          icon: Code2,
          title: "Less ceremony",
          text: "Keep small execution steps lightweight. Save a full issue for work that really needs one.",
        },
        {
          icon: ShieldCheck,
          title: "More intention",
          text: "Make the important checks visible, accountable, and part of a deliberate finish.",
        },
        {
          icon: LockKeyhole,
          title: "A little headspace",
          text: "Give personal reminders their own space without getting in the team’s way.",
        },
      ].map((item) => (
        <article key={item.title}>
          <span className="feature-icon lavender">
            <item.icon size={22} />
          </span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
