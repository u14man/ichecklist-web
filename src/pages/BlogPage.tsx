import { Link } from "react-router-dom";
import { blogCategories, blogPosts, postsInCategory, type BlogPost } from "../blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <Link to={`/blog/${post.slug}`}>
        <img src={post.image} alt="" />
        <div>
          <span className="blog-kicker">
            <span className="blog-pill">{post.category}</span>
            <span className="blog-kicker-line" aria-hidden="true" />
            <time>{post.date}</time>
          </span>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}

export function BlogIndex({ categorySlug }: { categorySlug?: string }) {
  const category = blogCategories.find((item) => item.slug === categorySlug);
  const posts = postsInCategory(categorySlug);
  const featured = blogPosts.filter((post) => post.featured);
  const recent = blogPosts.filter((post) => !post.featured);

  if (category) {
    const [lead, ...rest] = posts;
    return (
      <div className="blog-page">
        <div className="blog-hero-band bg-gradient-primary-light">
          <header className="blog-hero blog-category-hero container">
            <span className="blog-category-pill">Category</span>
            <h1>{category.title}</h1>
            <p>{category.description}</p>
          </header>
        </div>
        {lead ? (
          <div className="container blog-category-posts">
            <article className="blog-category-lead">
              <Link to={`/blog/${lead.slug}`}>
                <img src={lead.image} alt="" />
                <div>
                  <span className="blog-kicker">
                    <span className="blog-pill">{lead.category}</span>
                    <span className="blog-kicker-line" aria-hidden="true" />
                    <time>{lead.date}</time>
                  </span>
                  <h2>{lead.title}</h2>
                  <p>{lead.excerpt}</p>
                </div>
              </Link>
            </article>
            {rest.length > 0 && (
              <div className="blog-grid">
                {rest.map((post) => <BlogCard key={post.slug} post={post} />)}
              </div>
            )}
          </div>
        ) : (
          <p className="container blog-empty">No articles in this category yet. <Link to="/blog">Back to the blog</Link></p>
        )}
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-hero-band bg-gradient-primary-light">
        <header className="blog-hero container">
          <p className="blog-eyebrow">Blogs</p>
          <h1>Notes on checklists, workflows, and release readiness</h1>
        </header>
        <section className="container blog-block" aria-labelledby="read-by-category">
          <h2 id="read-by-category" className="blog-section-title">Read by Category</h2>
          <div className="blog-categories">
            {blogCategories.map((item) => (
              <Link key={item.slug} to={`/blog/category/${item.slug}`}>
                <img src={item.image} alt="" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="container blog-block" aria-labelledby="featured-blogs">
        <h2 id="featured-blogs" className="blog-section-title">Featured blogs</h2>
        <div className="blog-grid">
          {featured.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>
      </section>

      <section className="container blog-block" aria-labelledby="recent-posts">
        <h2 id="recent-posts" className="blog-section-title">Recent posts</h2>
        <div className="blog-grid">
          {recent.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>
      </section>
    </div>
  );
}

export function BlogPage() {
  return <BlogIndex />;
}
