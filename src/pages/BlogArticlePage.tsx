import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../blog";
import { BlogCard } from "./BlogPage";
import { NotFound } from "./NotFound";

export function BlogArticlePage() {
  const { slug = "" } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);
  const [active, setActive] = useState(post?.sections[0]?.id ?? "");
  const lockedId = useRef<string | null>(null);

  useEffect(() => {
    if (!post) return;
    const offset = 150;
    let settleTimer = 0;

    const updateActive = () => {
      if (lockedId.current) {
        setActive(lockedId.current);
        window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(() => {
          lockedId.current = null;
          updateActive();
        }, 150);
        return;
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (nearBottom) {
        setActive(post.sections[post.sections.length - 1]?.id ?? "");
        return;
      }

      let current = post.sections[0]?.id ?? "";
      for (const section of post.sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top - offset <= 0) {
          current = section.id;
        }
      }
      setActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("hashchange", updateActive);
    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, [post]);

  if (!post) return <NotFound />;
  const related = blogPosts.filter((item) => item.categorySlug === post.categorySlug && item.slug !== post.slug).slice(0, 2);

  return (
    <article className="blog-article">
      <header className="blog-article-hero">
        <div className="container blog-article-intro">
          <Link className="blog-article-category" to={`/blog/category/${post.categorySlug}`}>{post.category}</Link>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="blog-article-author">
            <span className="blog-avatar" aria-hidden="true">{post.author.slice(0, 1)}</span>
            <span>
              <strong>{post.author}</strong>
              <small>Updated on {post.date}</small>
            </span>
          </div>
        </div>
        <div className="container blog-article-banner">
          <img src={post.image} alt="" />
        </div>
      </header>
      <div className="container blog-article-layout">
        <nav className="blog-toc" aria-label="On this page">
          <strong>On this page</strong>
          {post.sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active === section.id ? "true" : undefined}
              onClick={() => {
                lockedId.current = section.id;
                setActive(section.id);
              }}
            >
              {section.title}
            </a>
          ))}
        </nav>
        <div className="blog-prose">
          {post.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.image && (
                <figure className="blog-inline-figure">
                  <img src={section.image} alt={section.imageAlt ?? ""} loading="lazy" />
                  {section.imageCaption && <figcaption>{section.imageCaption}</figcaption>}
                </figure>
              )}
            </section>
          ))}
          {post.sources && post.sources.length > 0 && (
            <section className="blog-sources" aria-labelledby="blog-sources-title">
              <h2 id="blog-sources-title">Sources & further reading</h2>
              <ul>
                {post.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
      {related.length > 0 && (
        <section className="container blog-related">
          <h2>Related articles</h2>
          <div className="blog-grid">
            {related.map((item) => <BlogCard key={item.slug} post={item} />)}
          </div>
        </section>
      )}
    </article>
  );
}
