import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
} from "lucide-react";
import {
  FinalCTA,
  PageHero,
} from "../components";
import { features } from "../content";

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
