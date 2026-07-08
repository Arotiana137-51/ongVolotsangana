import { markdownify } from "@lib/utils/textConverter";

function Faq({ data }) {
  const { frontmatter } = data;
  const { title, faqs } = frontmatter;
  return (
    <section className="section">
      <div className="container">
        <div className="text-center">
          <span className="eyebrow mb-4">FAQ</span>
          {markdownify(title, "h1", "font-secondary text-h1-sm md:text-h1")}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              tabIndex={0}
              className="rounded-2xl border border-border/60 bg-white p-8 shadow-soft transition-shadow duration-300 ease-out hover:shadow-leaf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              <div className="faq-head relative pl-10">
                {markdownify(faq.title, "h4", "font-secondary text-dark")}
              </div>
              {markdownify(faq.answer, "p", "faq-body mt-4 text-text")}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
