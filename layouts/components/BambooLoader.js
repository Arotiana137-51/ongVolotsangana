"use client";

const BambooLoader = ({ label = "Chargement…", compact = false }) => {
  const size = compact ? { width: 48, height: 128 } : { width: 260, height: 567 };

  return (
    <div
      className={
        compact
          ? "flex w-full items-center justify-center py-8"
          : "flex min-h-[60vh] w-full flex-col items-center justify-center gap-4"
      }
    >
      <svg
        width={size.width}
        height={size.height}
        viewBox="0 0 110 240"
        role="img"
        style={compact ? undefined : { maxWidth: "80vw", maxHeight: "70vh" }}
      >
        <title>{label}</title>
        <desc>
          Une tige de bambou avec des feuilles éparpillées qui se remplit de vert
          du bas vers le haut, avec deux noeuds marron marquant trois étapes, en
          boucle.
        </desc>

        {/* Feuilles éparpillées sur toute la hauteur de la tige */}
        <ellipse
          cx="33"
          cy="35"
          rx="15"
          ry="5"
          fill="#eaf3de"
          stroke="#4d7c0f"
          strokeWidth="1.5"
          transform="rotate(-28 33 35)"
        />
        <ellipse
          cx="77"
          cy="60"
          rx="16"
          ry="5.2"
          fill="#eaf3de"
          stroke="#4d7c0f"
          strokeWidth="1.5"
          transform="rotate(30 77 60)"
        />
        <ellipse
          cx="30"
          cy="95"
          rx="14"
          ry="4.6"
          fill="#eaf3de"
          stroke="#4d7c0f"
          strokeWidth="1.5"
          transform="rotate(-38 30 95)"
        />
        <ellipse
          cx="80"
          cy="130"
          rx="14"
          ry="4.6"
          fill="#eaf3de"
          stroke="#4d7c0f"
          strokeWidth="1.5"
          transform="rotate(35 80 130)"
        />
        <ellipse
          cx="32"
          cy="160"
          rx="13"
          ry="4.3"
          fill="#eaf3de"
          stroke="#4d7c0f"
          strokeWidth="1.5"
          transform="rotate(-25 32 160)"
        />

        {/* Tige (contour + fond clair) */}
        <rect x="44" y="25" width="22" height="175" rx="11" fill="#eef5e4" stroke="#4d7c0f" strokeWidth="2" />

        {/* Remplissage animé, du bas vers le haut */}
        <rect
          x="44"
          y="25"
          width="22"
          height="175"
          rx="11"
          fill="#4d7c0f"
          className="bamboo-loader-fill"
        />

        {/* Noeuds marron marquant les 3 temps, calés exactement sur la largeur de la tige */}
        <rect x="44" y="82" width="22" height="9" rx="3" fill="#8a5a2b" />
        <rect x="44" y="140" width="22" height="9" rx="3" fill="#8a5a2b" />

        {!compact && (
          <text x="55" y="225" textAnchor="middle" fontSize="13" fontWeight="500" fill="#4d7c0f">
            {label}
          </text>
        )}
      </svg>

      <style jsx>{`
        .bamboo-loader-fill {
          transform-box: fill-box;
          transform-origin: bottom;
          animation: bambooFillStalk 4s ease-in-out infinite;
        }

        @keyframes bambooFillStalk {
          0% {
            transform: scaleY(0);
          }
          18% {
            transform: scaleY(0.33);
          }
          26% {
            transform: scaleY(0.33);
          }
          44% {
            transform: scaleY(0.66);
          }
          52% {
            transform: scaleY(0.66);
          }
          70% {
            transform: scaleY(1);
          }
          88% {
            transform: scaleY(1);
          }
          100% {
            transform: scaleY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BambooLoader;