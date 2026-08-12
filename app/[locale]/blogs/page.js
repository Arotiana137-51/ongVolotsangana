import SeoMeta from "@layouts/SeoMeta";
import BlogList from "@layouts/BlogList";
import { getListPage, getSinglePage } from "@lib/contentParser";

export default async function BlogPage({ params }) {
  const locale = params.locale || "fr";
  
  const blogPage = await getListPage("content/blogs/_index.md", locale);
  const posts = await getSinglePage("content/blogs", locale);

  // On combine le tout dans un seul objet "data" comme l'attend le composant BlogList
  const data = {
    ...blogPage,
    posts,
  };

  return (
    <>
      <SeoMeta {...blogPage.frontmatter} />
      <BlogList data={data} />
    </>
  );
}