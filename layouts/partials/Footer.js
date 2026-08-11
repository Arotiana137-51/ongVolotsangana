"use client";

import config from "@config/config.json";
import menu from "@config/menu.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  const { footer } = menu;
  const pathname = usePathname();
  
  const tFooter = useTranslations("footer");

  const isFormation = pathname?.includes("/formation");
  const isProduits = pathname?.includes("/produits") || pathname?.includes("/products");

  return (
    <footer className="section bg-theme-light pb-0">
      <div className="container">
        <div className="row mb-12">
          <div className="col-12">
            <div className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
              
              <p className="text-center mb-2">
                {isFormation ? tFooter("intro_formation_title") : tFooter("intro_home_title")}
              </p>

              {!isFormation && (
                <div className="text-left w-full my-3 whitespace-pre-line">
                  {isProduits ? tFooter("intro_products_list") : tFooter("intro_home_list")}
                </div>
              )}

              <p className="text-center mt-2 font-bold">
                {isFormation ? tFooter("intro_formation_outro") : tFooter("intro_home_outro")}
              </p>

            </div>
          </div>
        </div>

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
            <Link href="/" aria-label="ngo volotsangana logo">
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

        <div className="border-t border-border py-6">
          {markdownify(copyright, "p", "text-sm text-center")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;