"use client";

import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

const Services = ({ services }) => {
  return services.map((service, index) => {
    const isOdd = index % 2 > 0;
    return (
      <section
        key={`service-${index}`}
        className={`section ${isOdd && "bg-lime-700"}`}
      >
        <div className="container">
          <div className="items-center gap-8 md:grid md:grid-cols-2">
            {/* Carousel */}
            <div className={`service-carousel ${!isOdd && "md:order-2"}`}>
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={
                  service.images.length > 1 ? { clickable: true } : false
                }
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: true,
                }}
                init={service?.images > 1 ? false : true}
           
              >
                {/* Slides */}
                {service?.images.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <Image src={slide} alt="bamboo activity" width={600} height={300}  />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Content */}
            <div
              className={`service-content mt-5 md:mt-0 ${
                !isOdd && "md:order-1"
              }`}
            >
              <h2 className={`font-bold leading-[40px] ${isOdd && "text-white"} `}>{service?.title}</h2>
              <p className={`mb-2 mt-4    ${isOdd && "text-white"} `}>{markdownify(service?.content)}</p>
              {service.button.enable && (
                <Link
                  href={service?.button.link}
                  className={`cta-link inline-flex items-center text-green-800 ${isOdd && "text-white"}`}
                >
                  {service?.button.label}
                  <Image
                    className="ml-1"
                    src="/images/arrow-right.svg"
                    width={18}
                    height={14}
                    alt="arrow"
                  />
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
