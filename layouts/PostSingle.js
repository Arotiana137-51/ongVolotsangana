import { ArticleJsonLd, BreadcrumbJsonLd } from "@layouts/components/JsonLd";
import { markdownify } from "@lib/utils/textConverter";
import MDXContent from "app/helper/MDXContent";
import Image from "next/image";

const PostSingle = ({ frontmatter, content, slug }) => {
  let { description, title, image, date, author } = frontmatter;
  description = description ? description : String(content).slice(0, 160);

  return (
    <>
      <ArticleJsonLd
        title={title}
        description={description}
        image={image}
        datePublished={date}
        authorName={author}
        url={`/blogs/${slug || ""}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Blog", url: "/blogs" },
          { name: title, url: `/blogs/${slug || ""}` },
        ]}
      />
      <section className="section">
        <div className="container">
          <div className="row">
            <article className="col-12 mx-auto md:col-9">
              {image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src={image}
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    alt={title}
                    priority
                    className="object-cover"
                  />
                </div>
              )}
              {markdownify(title, "h1", "mb-6 mt-8 font-secondary")}
              {date && (
                <p className="mb-8 text-sm uppercase tracking-wider text-light">
                  {new Date(date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}

              <div className="content mb-16">
                <MDXContent content={content} />
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSingle;
