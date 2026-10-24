import { useParams } from "react-router-dom";
import { blogCategories } from "../blog";
import { BlogIndex } from "./BlogPage";
import { NotFound } from "./NotFound";

export function BlogCategoryPage() {
  const { slug = "" } = useParams();
  const category = blogCategories.find((item) => item.slug === slug);
  if (!category) return <NotFound />;

  return <BlogIndex categorySlug={category.slug} />;
}
