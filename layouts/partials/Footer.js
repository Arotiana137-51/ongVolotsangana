import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  const { footer } = menu;

  // Texte à afficher au centre du footer
  const footerIntroText = `Nous sommes disponibles!<br><br>
  Pour toutes commandes de ces produits en bambou ou pour des commandes personnalisées n'hésitez pas à nous contacter.<br><br>
  Notre équipe de l'ONG Volotsangana est dédiée à promouvoir des produits écologiques et innovants pour un avenir meilleur. Vous pouvez nous joindre par:`;

  return (
    <footer className="section bg-theme-light pb-0">
      <div className="container">

        {/* Texte d'introduction centré - NOUVEAU */}
        <div className="row mb-12">
          <div className="col-12 text-center">
            <div
              className="text-center max-w-3xl mx-auto text-lg leading-relaxed text-gray-700"
              dangerouslySetInnerHTML={{ __html: footerIntroText }}
            />
          </div>
        </div>

        {/* footer menu */}
        <div className="row">
          {footer.map((col) => {
            return (
              <div className="mb-12 sm:col-6 lg:col-3" key={col.name}>
                {markdownify(col.name, "h2", "h4")}
                <ul className="mt-6">
                  {col?.menu.map((item) => (
                    <li className="mb-1" key={item.text}>
                      <Link href={item.url} rel="ngo services">
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* social icons */}
          <div className="md-12 sm:col-6 lg:col-3">
            <Link href="/" aria-label="ngo volotsangana lobo">
              <Image
                src={config.site.logo}
                width={config.site.logo_width}
                height={config.site.logo_height}
                alt="logo ngo volotsangana"
              />
            </Link>
            {markdownify(footer_content, "p", "mt-3 mb-6 text-sm")}
          </div>
        </div>

        {/* copyright */}
        <div className="border-t border-border py-6">
          {markdownify(copyright, "p", "text-sm text-center")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
