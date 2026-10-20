import { Link } from "react-router-dom";
import { blogCategories, blogPosts, postsInCategory, type BlogPost } from "../blog";

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <span className="blog-meta">
      <span className="blog-avatar" aria-hidden="true">{post.author.slice(0, 1)}</span>
      {post.author}
      <span aria-hidden="true">·</span>
      {post.date}
    </span>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <Link to={`/blog/${post.slug}`}>
        <img src={post.image} alt="" />
        <div>
          <span className="blog-pill">{post.category}</span>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <PostMeta post={post} />
        </div>
      </Link>
    </article>
  );
}

export function BlogIndex({ categorySlug }: { categorySlug?: string }) {
  const category = blogCategories.find((item) => item.slug === categorySlug);
  const posts = postsInCategory(categorySlug);
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post.slug !== featured?.slug);

  return (
    <div className="blog-page">
      <header className="blog-hero container">
        <h1>{category?.title ?? "Blog"}</h1>
        <p>{category?.description ?? "Notes on checklists, Jira workflows, and the details that decide whether work is actually done."}</p>
      </header>

      {!category && (
        <section className="container blog-categories" aria-label="Blog categories">
          {blogCategories.map((item) => (
            <Link key={item.slug} to={`/blog/category/${item.slug}`}>
              <img src={item.image} alt="" />
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
            </Link>
          ))}
        </section>
      )}

      {featured && (
        <section className="container">
          <article className="blog-featured">
            <Link to={`/blog/${featured.slug}`}>
              <img src={featured.image} alt="" />
              <div>
                <span className="blog-pill">{featured.category}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <PostMeta post={featured} />
              </div>
            </Link>
          </article>
        </section>
      )}

      {rest.length > 0 && (
        <section className="container blog-grid" aria-label="More articles">
          {rest.map((post) => <BlogCard key={post.slug} post={post} />)}
        </section>
      )}

      {posts.length === 0 && (
        <p className="container blog-empty">No articles in this category yet. <Link to="/blog">Back to the blog</Link></p>
      )}
    </div>
  );
}

export function BlogPage() {
  return <BlogIndex />;
}
