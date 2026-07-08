import Cta from "@layouts/components/Cta";
import CraftStory from "@layouts/partials/CraftStory";
import FeaturedProducts from "@layouts/partials/FeaturedProducts";
import HomeBanner from "@layouts/partials/HomeBanner";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import Materials from "@layouts/partials/Materials";
import Services from "@layouts/partials/Services";
import Workflow from "@layouts/partials/Workflow";
import { buildMetadata } from "@lib/seo/getMetadata";
import { getListPage } from "@lib/contentParser";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const homePage = await getListPage("content/_index.md", locale);
  const { frontmatter } = homePage;
  const { banner, seo } = frontmatter;
  return buildMetadata({
    title: seo?.title || banner?.title,
    description: seo?.description || banner?.content,
    image: banner?.image,
    path: "/",
    keywords: seo?.keywords,
    locale,
  });
}

const Home = async ({ params }) => {
  const { locale } = params;
  setRequestLocale(locale);
  const homePage = await getListPage("content/_index.md", locale);
  const { frontmatter } = homePage;
  const { banner, feature, services, workflow, call_to_action, craft_story } =
    frontmatter;

  return (
    <>
      <HomeBanner banner={banner} />
      <FeaturedProducts />
      {craft_story && (
        <CraftStory
          image={craft_story.image}
          title={craft_story.title}
          body={craft_story.body || []}
        />
      )}
      <HomeFeatures feature={feature} />
      <Materials />
      <Services services={services} />
      <Workflow workflow={workflow} />
      <Cta cta={call_to_action} />
    </>
  );
};

export default Home;
