//import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
// import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  const { footer } = menu;
  return (
    <footer className="section bg-theme-light pb-0">
      <div className="px-8 lg:px-36 ">
        {/* footer menu */}
        <div className="row">
          {footer.map((col) => {
            return (
              <div className="mb-12 sm:col-0 lg:col-2" key={col.name}>
                {markdownify(col.name, "h2", "h4")}
                <ul className="mt-6 mx-8">
                  {col?.menu.map((item) => (
                    <li className="mb-1" key={item.text}>
                      <Link href={item.url} rel="">
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="mb-12 sm:col-0 lg:col-3">
          <Link href="https://www.inbar.int/" aria-label="INBAR">
              <Image
                src={config.inbar.logo}
                width={config.inbar.logo_width}
                height={config.inbar.logo_height}
                alt="bamboo international"
              />
              {markdownify(config.inbar.logo_text, "p", "mt-3 mb-6 mx-4 text-sm")}
            </Link>
            
          </div>
         
          
          <div className=" md-12 sm:col-0 lg:col-3">          
              <Image
                src={config.site.logo}
                width={config.site.logo_width}
                height={config.site.logo_height}
                alt="logo VOLOTSANGANA"
              />
          
            {markdownify(footer_content, "p", "mt-3 mb-3 mx-4 text-sm")}
             {/* social icons  mbola misy amboarina mihintsy ny structure*/}
            {/* <Social source={social.ong} className="social-icons mb-8 " /> */}
        
          </div>
        </div>
        {/* copyright */}
        <div className="border-t border-border py-6">
          {markdownify(copyright, "p", "text-sm text-center")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
