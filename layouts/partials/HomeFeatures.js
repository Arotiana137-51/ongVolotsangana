import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const HomeFeatures = ({ feature }) => {
  return (
    <section className="section bg-lime-700">
      <div className="container">
        <div className="text-center">
          <h2 className="text-white">{markdownify(feature.title)}</h2>
        </div>
        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {feature.features.map((item, i) => (
            <div
              className="feature-card flex min-h-[500px] flex-col rounded-xl bg-white p-5 pb-8 text-center"
              key={`feature-${i}`}
            >
              {item.images && item.images.length > 0 && (
                <div className="mb-4 flex h-[180px] flex-wrap items-center justify-center gap-2 overflow-hidden">
                  {item.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg"
                    >
                      <Image
                        src={img}
                        fill
                        className="object-cover"
                        alt={`${item.name} - ${idx + 1}`}
                        sizes="80px"
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-grow flex-col">
                <div className="mb-3">
                  {markdownify(item.name, "h3", "h5")}
                </div>
                <div className="flex-grow overflow-y-auto text-left">
                  <p className="mt-3">{markdownify(item.content)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
