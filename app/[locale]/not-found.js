import { Link } from "@i18n/navigation"; // ✅ CORRECT : avec les accolades {}

export default function NotFound() {
  return (
    <section className="section-sm text-center">
      <div className="container">
        <div className="row justify-center">
          <div className="sm:col-10 md:col-8 lg:col-6">
            <div className="text-center">
              <h1 className="mb-4 text-9xl font-bold text-dark dark:text-darkmode-dark">404</h1>
              <h2 className="mb-8 text-2xl font-bold text-dark dark:text-darkmode-dark">Page not found</h2>
              <Link href="/" className="btn btn-primary">Back to home</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}