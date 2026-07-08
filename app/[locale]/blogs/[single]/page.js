import config from "@config/config.json";
import { routing } from "@i18n/routing";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
import { buildMetadata } from "@lib/seo/getMetadata";
import { setRequestLocale } from "next-intl/server";
const { blog_folder } = config.settings;

export async function generateMetadata({ params }) {
  const { single, locale } = params;
  const posts = await getSinglePage(`content/${blog_folder}`, locale);
  const post = posts.find((p) => p.slug === single);
  if (!post)
    return buildMetadata({
      title: "Article introuvable",
      path: `/${blog_folder}/${single}`,
      locale,
    });
  const { frontmatter, content } = post;
  return buildMetadata({
    title: frontmatter.title,
    description: frontmatter.description || String(content).slice(0, 160),
    image: frontmatter.image,
    path: `/${blog_folder}/${single}`,
    type: "article",
    publishedTime: frontmatter.date,
    authors: frontmatter.author ? [{ name: frontmatter.author }] : undefined,
    locale,
  });
}

const Article = async ({ params }) => {
  const { single, locale } = params;
  setRequestLocale(locale);
  const posts = await getSinglePage(`content/${blog_folder}`, locale);
  const post = posts.filter((p) => p.slug == single);
  const { frontmatter, content } = post[0];

  return (
    <PostSingle
      frontmatter={frontmatter}
      content={content}
      slug={single}
      locale={locale}
    />
  );
};

export const generateStaticParams = () => {
  const allSlug = getSinglePage(`content/${blog_folder}`);
  return routing.locales.flatMap((locale) =>
    allSlug.map((item) => ({ locale, single: item.slug })),
  );
};

export default Article;
