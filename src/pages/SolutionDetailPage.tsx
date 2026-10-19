import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import {
  Button,
  FAQ,
  FinalCTA,
  MiniVisual,
  SectionHeading,
} from "../components";
import { features, solutions, faqs } from "../content";

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
