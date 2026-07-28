"use client";

import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

const HomeBanner = ({ banner }) => {
  // fall back to the single legacy image if no slides are provided
  const slides = banner.images?.length ? banner.images : [banner.image];

  return (
    <section className="section pb-[50px]">
      <div className="container">
        <div className="items-center gap-8 md:grid md:grid-cols-5">
          <div className="service-carousel md:order-2 md:col-span-3">
            <Swiper
              modules={[Autoplay, Pagination]}
              loop={slides.length > 1}
              pagination={slides.length > 1 ? { clickable: true } : false}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
            >
              {/* object-contain garde les proportions réelles de chaque photo */}
              {slides.map((slide, i) => (
                <SwiperSlide key={i}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-theme-light">
                    <Image
                      src={slide}
                      alt="produit bambou"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain"
                      priority={i === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-5 md:col-span-2 md:mt-0">
            <h1 className="font-primary font-bold">{markdownify(banner.title)}</h1>
            {markdownify(banner.content, "div", "mt-4 text-justify")}
            {banner.button.enable && (
              <Link
                className="btn btn-primary mt-4"
                href={banner.button.link}
                rel={banner.button.rel}
              >
                {banner.button.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
