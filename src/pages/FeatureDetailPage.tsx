import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleCheck,
} from "lucide-react";
import {
  Button,
  FeatureCard,
  FinalCTA,
  MiniVisual,
  SectionHeading,
} from "../components";
import { features } from "../content";

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
