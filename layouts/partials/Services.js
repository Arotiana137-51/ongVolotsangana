"use client";

import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

const ServiceContent = ({ service, isOdd }) => (
  <div className={`service-content mt-5 md:mt-0 ${!isOdd && "md:order-1"}`}>
    <h2 className={`font-bold leading-[40px] ${isOdd && "text-white"}`}>{service?.title}</h2>
    <p className={`mb-2 mt-4 ${isOdd && "text-white"}`}>{markdownify(service?.content)}</p>
    {service.button.enable && (
      <Link
        href={service?.button.link}
        className={`cta-link inline-flex items-center text-green-800 ${isOdd && "text-white"}`}
      >
        {service?.button.label}
        <Image className="ml-1" src="/images/arrow-right.svg" width={18} height={14} alt="arrow" />
      </Link>
    )}
  </div>
);

const VideoService = ({ service, isOdd }) => (
  <section className={`section ${isOdd && "bg-lime-700"}`}>
    <div className="w-full px-4">
      <div className="items-stretch gap-8 md:grid md:grid-cols-2">
        <div className={`md:h-full md:min-h-[400px] ${!isOdd && "md:order-2"}`}>
          <video
            src={service.video}
            className="h-full max-h-[80vh] w-full rounded-[4px] object-cover"
            controls
            playsInline
            preload="metadata"
          />
        </div>
        <ServiceContent service={service} isOdd={isOdd} />
      </div>
    </div>
  </section>
);

const ImageService = ({ service, isOdd }) => (
  <section className={`section ${isOdd && "bg-lime-700"}`}>
    <div className="container">
      <div className="items-center gap-8 md:grid md:grid-cols-2">
        <div className={`service-carousel ${!isOdd && "md:order-2"}`}>
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={service.images.length > 1 ? { clickable: true } : false}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
            init={service?.images > 1 ? false : true}
          >
            {/* object-contain garde les proportions réelles de chaque photo */}
            {service?.images.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-theme-light">
                  <Image
                    src={slide}
                    alt="bamboo activity"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <ServiceContent service={service} isOdd={isOdd} />
      </div>
    </div>
  </section>
);

const Services = ({ services }) => {
  return services.map((service, index) => {
    const isOdd = index % 2 > 0;
    const props = { service, isOdd };
    return service.video ? (
      <VideoService key={`service-${index}`} {...props} />
    ) : (
      <ImageService key={`service-${index}`} {...props} />
    );
  });
};

export default Services;
