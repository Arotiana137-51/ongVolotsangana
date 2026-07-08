import NotFound from "@layouts/404";
import { getRegularPage } from "@lib/contentParser";
import { setRequestLocale } from "next-intl/server";

const NotFoundPage = async ({ params }) => {
  const locale = params?.locale || "fr";
  setRequestLocale(locale);
  const notFoundData = await getRegularPage("404", locale);
  return <NotFound data={notFoundData} />;
};

export default NotFoundPage;
