"use client";

import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  const { footer } = menu;
  const pathname = usePathname();

  // Fonction qui retourne les 3 parties du texte (intro, liste, outro)
  const getFooterData = () => {
    const outro = `<strong>N’hésitez pas à nous contacter au :</strong>`;

    // Page Formation
    if (pathname?.startsWith("/formation")) {
      return {
        intro: "L’ONG Volotsangana est ouvert à des demandes de formation sur les métiers du bambou pour la promotion de la chaîne de valeur bambou à Madagascar.",
        list: null, // Pas de liste pour la formation
        outro: outro,
      };
    }

    // Page Produits
    if (pathname?.startsWith("/produits") || pathname?.startsWith("/products")) {
      return {
        intro: "L’ONG Volotsangana est ouvert à toutes propositions :",
        list: "- de commandes de produits en bambou<br>- de commandes de produits personnalisés en bambou",
        outro: outro,
      };
    }

    // Page d'Accueil (par défaut)
    return {
      intro: "L’ONG Volotsangana est ouvert à toutes propositions :",
      list: "- de commandes de produits en bambou<br>- de commandes de produits personnalisés en bambou<br>- et à des demandes de formation sur les métiers du bambou.",
      outro: outro,
    };
  };

  const data = getFooterData();

  return (
    <footer className="section bg-theme-light pb-0">
      <div className="container">

        {/* Texte d'introduction avec alignement mixte */}
        <div className="row mb-12">
          <div className="col-12">
            <div className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">

              {/* 1. Introduction : CENTRÉE */}
              <p className="text-center mb-2">{data.intro}</p>

              {/* 2. Liste à tirets : ALIGNÉE À GAUCHE mais prend TOUTE la largeur pour ne pas couper le texte */}
              {data.list && (
                <div className="text-left w-full my-3">
                  <div dangerouslySetInnerHTML={{ __html: data.list }} />
                </div>
              )}

              {/* 3. Conclusion : CENTRÉE */}
              <p className="text-center mt-2" dangerouslySetInnerHTML={{ __html: data.outro }} />

            </div>
          </div>
        </div>

        {/* Menu footer et logo */}
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

        {/* Copyright */}
        <div className="border-t border-border py-6">
          {markdownify(copyright, "p", "text-sm text-center")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
