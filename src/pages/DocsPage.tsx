import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  LifeBuoy,
  Search,
  User,
  X,
} from "lucide-react";
import {
  FinalCTA,
  PageHero,
} from "../components";
import { guideSections, type GuideSection } from "../docs-guide";

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
