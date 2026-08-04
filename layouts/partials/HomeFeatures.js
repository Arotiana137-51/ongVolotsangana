import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const HomeFeatures = ({ feature }) => {
  if (!feature) return null;

  // Fonction pour générer le layout intelligent avec des images AGRANDIES (120px)
  const renderSmartImages = (images) => {
    const count = images.length;
    const baseClass = "rounded-lg object-cover shadow-md transition-transform hover:scale-105";

    if (count === 1) {
      return <Image src={images[0]} width={120} height={120} className={`mx-auto ${baseClass}`} alt="Feature icon" />;
    }
    if (count === 2) {
      return (
        <div className="flex justify-center gap-4">
          {images.map((img, idx) => (
            <Image key={idx} src={img} width={120} height={120} className={baseClass} alt={`Feature icon ${idx + 1}`} />
          ))}
        </div>
      );
    }
    if (count === 3) {
      return (
        <div className="grid grid-cols-2 gap-3 justify-items-center w-fit mx-auto">
          <div className="col-span-2"><Image src={images[0]} width={120} height={120} className={baseClass} alt="Feature icon 1" /></div>
          <Image src={images[1]} width={120} height={120} className={baseClass} alt="Feature icon 2" />
          <Image src={images[2]} width={120} height={120} className={baseClass} alt="Feature icon 3" />
        </div>
      );
    }
    if (count >= 4) {
      return (
        <div className="grid grid-cols-2 gap-3 justify-items-center w-fit mx-auto">
          {images.slice(0, 4).map((img, idx) => (
            <Image key={idx} src={img} width={120} height={120} className={baseClass} alt={`Feature icon ${idx + 1}`} />
          ))}
        </div>
      );
    }
  };

  return (
    <section className="section bg-lime-700">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-white text-3xl md:text-4xl font-bold">{markdownify(feature.title)}</h2>
        </div>

        <div className="mt-8 grid gap-x-8 gap-y-10 grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
          {feature.features.map((item, i) => (
            <div
              className="feature-card rounded-xl bg-white p-8 pb-10 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              key={`feature-${i}`}
            >
              {/* Zone images */}
              <div className="mb-6 min-h-[150px] flex items-center justify-center w-full">
                {item.images && item.images.length > 0
                  ? renderSmartImages(item.images)
                  : item.icon ? (
                      <Image src={item.icon} width={120} height={120} className="mx-auto rounded-lg object-cover shadow-md" alt={item.name} />
                    ) : null
                }
              </div>

              {/* Titre centré */}
              <div className="mb-4 text-center w-full">
                {markdownify(item.name, "h3", "h4 font-bold text-gray-800 text-xl")}
              </div>

              {/* CORRECTION ICI : J'ai retiré 'mt-auto' pour que le texte ne soit plus collé tout en bas */}
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
