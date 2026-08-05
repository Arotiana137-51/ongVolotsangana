import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const HomeFeatures = ({ feature }) => {
  if (!feature) return null;

  // Fonction intelligente : taille uniforme de 160px + mise en forme adaptée au nombre de photos
  const renderSmartImages = (images) => {
    const count = images.length;
    const baseClass = "rounded-lg object-cover shadow-md transition-transform hover:scale-105";

    // CAS 1 : Une seule image (Centrée)
    if (count === 1) {
      return (
        <Image
          src={images[0]}
          width={160}
          height={160}
          className={`${baseClass} mx-auto`}
          alt="Feature icon"
        />
      );
    }

    // CAS 2 : Deux images (Alignées horizontalement)
    if (count === 2) {
      return (
        <div className="flex justify-center gap-4">
          {images.map((img, idx) => (
            <Image key={idx} src={img} width={160} height={160} className={baseClass} alt={`Feature icon ${idx + 1}`} />
          ))}
        </div>
      );
    }

    // CAS 3 : Trois images (PYRAMIDE : 1 en haut, 2 en bas)
    if (count === 3) {
      return (
        <div className="grid grid-cols-2 gap-4 justify-items-center w-fit mx-auto">
          <div className="col-span-2 flex justify-center">
            <Image src={images[0]} width={160} height={160} className={baseClass} alt="Feature icon 1" />
          </div>
          <Image src={images[1]} width={160} height={160} className={baseClass} alt="Feature icon 2" />
          <Image src={images[2]} width={160} height={160} className={baseClass} alt="Feature icon 3" />
        </div>
      );
    }

    // CAS 4 : Quatre images ou plus (Grille 2x2 parfaite)
    return (
      <div className="grid grid-cols-2 gap-4 justify-items-center w-fit mx-auto">
        {images.slice(0, 4).map((img, idx) => (
          <Image key={idx} src={img} width={160} height={160} className={baseClass} alt={`Feature icon ${idx + 1}`} />
        ))}
      </div>
    );
  };

  return (
    <section className="section bg-lime-700">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-white text-3xl md:text-4xl font-bold">{markdownify(feature.title)}</h2>
        </div>

        <div className="mt-8 grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
          {feature.features.map((item, i) => (
            <div
              className="feature-card rounded-xl bg-white p-8 pb-10 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              key={`feature-${i}`}
            >
              {/* Zone images */}
              <div className="mb-6 min-h-[180px] flex items-center justify-center w-full">
                {item.images && item.images.length > 0
                  ? renderSmartImages(item.images)
                  : item.icon ? (
                      <Image src={item.icon} width={160} height={160} className="mx-auto rounded-lg object-cover shadow-md" alt={item.name} />
                    ) : null
                }
              </div>

              {/* Titre centré */}
              <div className="mb-4 text-center w-full">
                {markdownify(item.name, "h3", "h4 font-bold text-gray-800 text-xl")}
              </div>

              {/* Texte avec listes à tirets - Structure intacte */}
              <div className="text-left text-gray-700 text-base leading-relaxed w-full px-2">
                {markdownify(item.content, "div")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
