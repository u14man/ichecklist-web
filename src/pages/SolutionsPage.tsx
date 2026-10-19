import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
} from "lucide-react";
import {
  Button,
  FinalCTA,
  SectionHeading,
} from "../components";
import { solutions, guides } from "../content";

export function SolutionsPage() {
  return (
    <>
      <section className="teams-hero">
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
          <Button to="/demo" className="ichecklist-btn ichecklist-btn-dark" variant="dark">
            Start for free
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
