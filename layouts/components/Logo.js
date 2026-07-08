import config from "@config/config.json";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ src }) => {
  const { logo, logo_width, logo_height, logo_text, title } = config.site;

  return (
    <Link
      href="/"
      className="navbar-brand inline-flex items-center py-1"
      aria-label={`${title} — Accueil`}
      style={{
        height: logo_height.replace("px", "") + "px",
        width: logo_width.replace("px", "") + "px",
      }}
    >
      {src || logo ? (
        <Image
          width={logo_width.replace("px", "") * 3}
          height={logo_height.replace("px", "") * 3}
          src={src ? src : logo}
          alt={`${title} — logo`}
          priority
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </Link>
  );
};

export default Logo;
