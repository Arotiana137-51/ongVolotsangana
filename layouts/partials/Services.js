"use client";

import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Services = ({ services }) => {
  return services.map((service, index) => {
    const isOdd = index % 2 > 0;
    return (
      <section
        key={`service-${index}`}
        className={`section ${isOdd ? "bg-theme-light" : "bg-body"}`}
      >
        <div className="container-editorial">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
            {/* Carousel */}
            <div className={`md:col-span-7 ${!isOdd ? "md:order-2" : ""}`}>
              <div className="relative overflow-hidden rounded-[4px] bg-theme-light">
                <Swiper
                  modules={[Pagination]}
                  pagination={service.images.length > 1 ? { clickable: true } : false}
                  spaceBetween={0}
                  speed={500}
                  init={service?.images > 1 ? false : true}
                  className="service-carousel"
                >
                  {service?.images.map((slide, i) => (
                    <SwiperSlide key={i}>
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={slide}
                          alt={`${service.title} — vue ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 60vw"
                          className="object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Content */}
            <div className={`md:col-span-5 ${!isOdd ? "md:order-1" : ""}`}>
              <span className="eyebrow mb-5">
                Pilier {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="font-secondary text-h2-sm md:text-h2 leading-tight text-ink">
                {service?.title}
              </h2>
              <div className="mt-5 text-base md:text-lg leading-relaxed text-text">
                {markdownify(service?.content, "p")}
              </div>
              {service.button?.enable && (
                <Link href={service?.button.link} className="cta-link mt-7">
                  {service?.button.label}
                  <span aria-hidden="true" className="arrow">→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  });
};

export default Services;
