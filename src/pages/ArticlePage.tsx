import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import {
  FinalCTA,
} from "../components";
import { guides } from "../content";

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
