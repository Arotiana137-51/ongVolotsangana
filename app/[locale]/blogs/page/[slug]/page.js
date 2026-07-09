import Pagination from "@components/Pagination";
import config from "@config/config.json";
import { routing } from "@i18n/routing";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { buildMetadata } from "@lib/seo/getMetadata";
import { markdownify } from "@lib/utils/textConverter";
import Posts from "@partials/Posts";
import { setRequestLocale } from "next-intl/server";
const { blog_folder } = config.settings;

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const postIndex = await getListPage(`content/${blog_folder}/_index.md`, locale);
  const { frontmatter } = postIndex;
  const currentPage = parseInt(slug || 1);
  return buildMetadata({
    title: `${frontmatter.title} – page ${currentPage}`,
    description: frontmatter.description,
    path: `/${blog_folder}/page/${currentPage}`,
    locale,
  });
}

const BlogPagination = async ({ params }) => {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const currentPage = parseInt(slug || 1);
  const { pagination } = config.settings;
  const posts = await getSinglePage(`content/${blog_folder}`, locale).sort(
    (post1, post2) =>
      new Date(post2.frontmatter.date) - new Date(post1.frontmatter.date),
  );
  const postIndex = await getListPage(`content/${blog_folder}/_index.md`, locale);
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const { frontmatter } = postIndex;
  const { title } = frontmatter;

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "h1 text-center font-secondary text-h1-sm md:text-h1")}
        <Posts posts={currentPosts} />
        <Pagination
          section={blog_folder}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
};

export default BlogPagination;

export async function generateStaticParams() {
  const getAllSlug = await getSinglePage(`content/${blog_folder}`);
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  const paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({ slug: (i + 1).toString() });
  }

  return routing.locales.flatMap((locale) =>
    paths.map((p) => ({ locale, ...p })),
  );
}
