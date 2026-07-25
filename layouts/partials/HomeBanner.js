import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const HomeBanner = ({ banner }) => {
  return (
    <section className="section pb-[50px]">
      <div className="container">
        <div className="row text-center">
        <h1 className="font-primary font-bold">{ markdownify(banner.title)}</h1>
          <div className="mx-auto lg:col-10">
            <div className="flex-container">
              <div className="row columns-md">
             
              <p className="mt-4 text-justify">{markdownify(banner.content)}</p>
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
              
              <Image
                className="banner-image h-auto w-full max-w-[450px]"
                src={banner.image}
                width={450}
                height={338}
                alt="banner image"
                priority
              />
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
