import { markdownify } from "@lib/utils/textConverter";
import MDXContent from "app/helper/MDXContent";

const Default = ({ data }) => {
  const { frontmatter, content } = data;
  const { title } = frontmatter;
  return (
    <section className="section">
      <div className="container">
        <header className="mb-10 text-center">
          {markdownify(title, "h1", "font-secondary text-h1-sm md:text-h1")}
        </header>
        <div className="content mx-auto max-w-3xl">
          <MDXContent content={content} />
        </div>
      </div>
    </section>
  );
};

export default Default;
