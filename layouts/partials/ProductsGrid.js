"use client";

import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { urlFor } from "../../sanity";

const ProductsGrid = ({ title, products }) => {
  if (!products?.length) return null;

  // une slide par image, toutes les images de tous les produits
  const slides = products.flatMap((product) =>
    (product.images || []).map((image, i) => ({
      key: image._key || `${product._id}-${i}`,
      src: urlFor(image.asset || image).url(),
      title: product.title,
    }))
  );

  return (
    <section className="section">
      <div className="w-full px-4">
        <div className="mb-8 text-center">
          {markdownify(title, "h2", "font-bold leading-[44px]")}
        </div>
        <div className="service-carousel">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation
            loop={slides.length > 4}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={16}
            slidesPerView={2}
            slidesPerGroup={2}
            breakpoints={{
              768: { slidesPerView: 3, slidesPerGroup: 3 },
              1024: { slidesPerView: 4, slidesPerGroup: 4 },
            }}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.key}>
                <div className="relative aspect-square w-full overflow-hidden rounded bg-theme-light">
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-center font-semibold">{slide.title}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
