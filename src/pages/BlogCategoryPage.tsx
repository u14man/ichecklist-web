import { Link, useParams } from "react-router-dom";
import { blogCategories } from "../blog";
import { BlogIndex } from "./BlogPage";
import { NotFound } from "./NotFound";

export function BlogCategoryPage() {
  const { slug = "" } = useParams();
  const category = blogCategories.find((item) => item.slug === slug);
  if (!category) return <NotFound />;

  return (
    <>
      <p className="container blog-back"><Link to="/blog">All articles</Link></p>
      <BlogIndex categorySlug={category.slug} />
    </>
  );
}
