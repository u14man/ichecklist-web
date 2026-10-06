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
} from "lucide-react";
import {
  Button,
  FAQ,
  FeatureCard,
  FinalCTA,
  MiniVisual,
  SectionHeading,
} from "./components";
import { features, guides, solutions } from "./content";

const quotes = [
  {
    src: "/hero/quote-1.jpg",
    name: "Jackson Schaal",
    text: "I love how simple Supahub makes it for our users and for admins to manage user feedback and changelog.",
  },
  {
    src: "/hero/quote-2.jpg",
    name: "Anant Dubey",
    text: "I dig this concept - Supahub helped us out a ton with prioritizing customer feedback!",
  },
  {
    src: "/hero/quote-3.jpg",
    name: "Emily Studer",
    text: "Our Support team loves having a place to direct customers where they can feel like their voice is heard.",
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

function Sparkle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 1.6 13.55 8.9 20.8 10.45 13.55 12 12 19.3 10.45 12 3.2 10.45 10.45 8.9Z"
      />
      <circle cx="18.6" cy="5.2" r="1.35" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const [role, setRole] = useState(0);
  const selected = solutions[role];
  return (
    <>
      <section className="supa-hero">
        <div className="supa-copy">
          <p className="supa-kicker">Customer Feedback & Feature Request Tool</p>
          <h1>Central hub to collect feedback & announce product updates</h1>
          <p>
            Supahub your all-in-one solution for customer feedback management
            and feature request prioritization.
          </p>
          <div className="supa-actions">
            <Link className="supa-btn supa-btn-dark" to="/demo">
              <Sparkle />
              Sign up for free
            </Link>
            <Link className="supa-btn supa-btn-light" to="/demo">
              See Supahub Demo
            </Link>
          </div>
          <div className="supa-proof">
            <img src="/hero/faces.png" alt="" />
            <div>
              <GoldStars />
              <p>loved by 300+ customers</p>
            </div>
          </div>
        </div>
        <div className="supa-stage">
          <img className="supa-orb" src="/hero/orb.jpg" alt="" />
          <img
            className="supa-modules"
            src="/hero/modules.png"
            alt="Feedback portal, changelog, and roadmap"
          />
        </div>
      </section>
      <section className="supa-quotes">
        {quotes.map((quote) => (
          <figure key={quote.name}>
            <img src={quote.src} alt="" />
            <blockquote>
              <p>&ldquo;{quote.text}&rdquo;</p>
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
      <section className="section feature-overview container">
        <SectionHeading
          eyebrow="A SMALL ADDITION. A BIG DIFFERENCE."
          title={
            <>
              Everything you need.
              <br />
              Nothing in your way.
            </>
          }
          description="The structure your work deserves, without the overhead it doesn’t."
        />
        <div className="home-feature-grid">
          {[
            features[0],
            features[1],
            features[3],
            features[4],
            features[2],
          ].map((feature, index) => (
            <div
              className={index < 2 ? "wide-feature" : "small-feature"}
              key={feature.slug}
            >
              <FeatureCard feature={feature} visual />
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
      <section className="section solutions-section container">
        <SectionHeading
          eyebrow="DIFFERENT HATS. THE SAME ATTENTION TO DETAIL."
          title={
            <>
              However you work,
              <br />
              make it a little smoother.
            </>
          }
          description="From the first line of code to the last release check. A place for your part."
        />
        <div className="role-tabs" role="tablist" aria-label="Team workflows">
          {solutions.map((solution, index) => (
            <button
              key={solution.slug}
              role="tab"
              aria-selected={role === index}
              aria-controls="role-panel"
              onClick={() => setRole(index)}
              className={role === index ? "active" : ""}
            >
              <solution.icon size={17} />
              {solution.role}
            </button>
          ))}
        </div>
        <div className="role-panel" id="role-panel" role="tabpanel">
          <div className="role-panel-copy">
            <span className="eyebrow">{selected.role.toUpperCase()}</span>
            <h3>{selected.headline.replace("\n", " ")}</h3>
            <p>{selected.description}</p>
            <Link className="text-link" to={`/solutions/${selected.slug}`}>
              A closer look for {selected.role.toLowerCase()}
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className={`role-checklist ${selected.color}`}>
            <div className="workflow-window">
              <div className="workflow-heading">
                <span>
                  <selected.icon size={18} />
                  {selected.checklist}
                </span>
                <span className="workflow-count">2/4</span>
              </div>
              {selected.items.map((item, index) => (
                <div key={item} className="workflow-item">
                  <span
                    className={`mini-checkbox ${index < 2 ? "checked" : ""}`}
                  >
                    {index < 2 && <Check size={12} />}
                  </span>
                  <span className={index < 2 ? "mini-done" : ""}>{item}</span>
                  {index === 0 && <em>*</em>}
                  <span className={`tiny-avatar tone-${index}`}>
                    {index % 2 ? "AL" : "JD"}
                  </span>
                </div>
              ))}
              <div className="workflow-footer">
                <ShieldCheck size={12} />
                Every step, a little more confidence.
              </div>
            </div>
          </div>
        </div>
      </section>
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
      <FinalCTA />
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
