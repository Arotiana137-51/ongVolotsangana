import { notFound } from "next/navigation";
import SeoMeta from "@layouts/SeoMeta";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";

export default async function PostSinglePage({ params }) {
  const locale = params.locale || "fr";
  const { single } = params;
  
  const posts = await getSinglePage("content/blogs", locale);
  const postData = posts.find((post) => post.slug === single);

  if (!postData) {
    return notFound();
  }

  return (
    <>
      <SeoMeta {...postData.frontmatter} />
      <PostSingle data={postData} />
    </>
  );
}