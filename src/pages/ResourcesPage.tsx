import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CircleHelp,
} from "lucide-react";
import {
  Button,
  FinalCTA,
  PageHero,
} from "../components";
import { guides } from "../content";

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
