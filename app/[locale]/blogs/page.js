import SeoMeta from "@layouts/SeoMeta";
import Posts from "@partials/Posts";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { markdownify } from "@lib/utils/textConverter";

export default async function BlogPage({ params }) {
  const locale = params.locale || "fr";

  const blogPage = await getListPage("content/blogs/_index.md", locale);
  const posts = await getSinglePage("content/blogs", locale);
  const { title } = blogPage.frontmatter;

  return (
    <>
      <SeoMeta {...blogPage.frontmatter} />
      <section className="section">
        <div className="container">
          {markdownify(title, "h1", "h1 text-center font-normal text-[56px]")}
          <Posts posts={posts} />
        </div>
      </section>
    </>
  );
}