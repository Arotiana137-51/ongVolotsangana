"use client";

import Logo from "@components/Logo";
import LangSwitcher from "@layouts/components/LangSwitcher";
import menu from "@config/menu.json";
import config from "@config/config.json";
import { Link, usePathname } from "@i18n/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const NAV_KEYS = {
  "/": "home",
  "/produits": "produits",
  "/formation": "formation",
  "/contact": "contact",
};

const Header = () => {
  const pathname = usePathname();
  const t = useTranslations("header");
  const tNav = useTranslations("nav");
  const tProduct = useTranslations("product");
  const { main } = menu;
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  const { logo } = config.site;
  const { enable, link } = config.nav_button;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu mobile lors d'un changement de route
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setNavOpen(false);
  }

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <nav
        className="navbar container-editorial !px-4 md:!px-6"
        aria-label={t("navAria")}
      >
        <div className="order-0">
          <Logo src={logo} />
        </div>

        <button
          id="show-button"
          className="order-2 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border/60 text-ink md:order-1 md:hidden"
          onClick={() => setNavOpen(!navOpen)}
          aria-expanded={navOpen}
          aria-controls="nav-menu"
          aria-label={navOpen ? t("closeMenu") : t("openMenu")}
          style={{ transition: "background-color var(--dur) var(--ease-out)" }}
        >
          {navOpen ? (
            <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)"
              />
            </svg>
          ) : (
            <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          )}
        </button>

        <div
          id="nav-menu"
          className={`order-3 md:order-1 ${navOpen ? "max-h-[1000px]" : "max-h-0"}`}
        >
          <ul className="navbar-nav block w-full md:flex md:w-auto lg:space-x-1">
            {main.map((menuItem, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menuItem.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span className="nav-link inline-flex items-center gap-1">
                      {menuItem.name}
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                      {menuItem.children.map((child, j) => (
                        <li className="nav-dropdown-item" key={`children-${j}`}>
                          <Link href={child.url} className="nav-dropdown-link block">
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      href={menuItem.url}
                      onClick={() => setNavOpen(false)}
                      className={`nav-link block ${
                        pathname === menuItem.url ? "nav-link-active" : ""
                      }`}
                      aria-current={pathname === menuItem.url ? "page" : undefined}
                    >
                      {NAV_KEYS[menuItem.url]
                        ? tNav(NAV_KEYS[menuItem.url])
                        : menuItem.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
            {enable && (
              <li className="mt-3 md:hidden">
                <Link className="btn btn-primary w-full" href={link}>
                  {tProduct("quote")}
                </Link>
              </li>
            )}
            {/* ✅ BOUTON DE LANGUE (Menu Mobile) */}
            <li className="mt-3 md:hidden">
              <LangSwitcher />
            </li>
          </ul>
        </div>

        {/* ✅ C'est ici que se trouve le bloc exact que tu as demandé pour le Desktop */}
        <div className="order-1 ml-auto hidden items-center gap-3 md:order-2 md:ml-0 md:flex">
          {/* ✅ BOUTON DE LANGUE (Menu Desktop) */}
          <LangSwitcher /> 
          
          {enable && (
            <Link className="btn btn-primary" href={link}>
              {tProduct("quote")}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;