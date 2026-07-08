import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const NotFound = ({ data }) => {
  const { frontmatter, content } = data;

  return (
    <section className="section">
      <div className="container">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="text-center">
            <p className="eyebrow mb-4">Erreur 404</p>
            <h1 className="font-secondary text-h1-sm md:text-h1">
              {frontmatter.title}
            </h1>
            {markdownify(content, "div", "content mx-auto max-w-xl mt-6")}
            <Link href="/" className="btn btn-primary mt-8">
              Retour à l&apos;accueil
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
