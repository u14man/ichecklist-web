import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCheck,
  HeartHandshake,
  Layers,
  ShieldCheck,
} from "lucide-react";
import {
  Button,
  FinalCTA,
  PageHero,
  SectionHeading,
} from "../components";
import { features } from "../content";

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
