"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import BambooLoader from "./BambooLoader";

const LoaderContext = createContext(() => {});

export function useGlobalLoader() {
  return useContext(LoaderContext);
}

const SAFETY_TIMEOUT = 3000; // filet de sécurité : jamais bloqué plus de 3s

export default function GlobalLoaderProvider({ children }) {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const safetyTimer = useRef(null);

  const showLoader = () => {
    setShow(true);
    clearTimeout(safetyTimer.current);
    safetyTimer.current = setTimeout(() => setShow(false), SAFETY_TIMEOUT);
  };

  // ✅ Chargement initial du site : uniquement si la page n'est pas déjà
  // complètement chargée au moment où ce composant démarre (sinon on
  // affichait puis cachait le bambou en un instant, pour rien — c'était
  // l'appel superflu au démarrage).
  useEffect(() => {
    if (document.readyState === "complete") return;

    setShow(true);
    const hide = () => setShow(false);
    window.addEventListener("load", hide);
    safetyTimer.current = setTimeout(hide, SAFETY_TIMEOUT);
    return () => window.removeEventListener("load", hide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Dès que l'URL change (navigation terminée, quel que soit le bouton
  // qui l'a déclenchée), on masque le loader.
  useEffect(() => {
    setShow(false);
    clearTimeout(safetyTimer.current);
  }, [pathname]);

  // ✅ Détection globale : clic sur n'importe quel lien interne du site →
  // affichage immédiat, sans attendre le début réel de la navigation.
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      const isExternal =
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.target === "_blank";
      if (isExternal) return;

      // 🔧 Si le lien pointe vers la page où on est déjà, il n'y aura
      // aucun changement d'URL — donc aucun signal pour cacher le loader
      // ensuite. Sans ce garde-fou, il restait affiché jusqu'au filet de
      // sécurité (c'était le "long chargement qui ne mène nulle part").
      const targetPath = href.split("?")[0].split("#")[0];
      if (targetPath === window.location.pathname) return;

      showLoader();
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoaderContext.Provider value={showLoader}>
      {children}
      {show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/20 backdrop-blur-[1px]">
          <BambooLoader />
        </div>
      )}
    </LoaderContext.Provider>
  );
}