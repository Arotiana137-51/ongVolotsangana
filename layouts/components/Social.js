import {
  IoCall,
  IoGlobeOutline,
  IoLocation,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoWhatsapp,
  IoLogoYoutube,
  IoMail,
} from "react-icons/io5";

const Social = ({ source, className }) => {
  const {
    facebook,
    instagram,
    youtube,
    linkedin,
    whatsapp,
    email,
    phone,
    phone2,
    address,
    website,
  } = source;
  return (
    <ul className={className}>
      {facebook.url && (
        <li>
          <a
            aria-label="facebook"
            href={facebook.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-block whitespace-nowrap"
          >
            <IoLogoFacebook /> 
          </a>
          
        </li>
      )}
      {instagram.url && (
        <li >
          <a
            aria-label="instagram"
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoInstagram />
          </a>
        </li>
      )}
      {youtube.url && (
        <li >
          <a
            aria-label="youtube"
            href={youtube.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoYoutube />
          </a>
        </li>
      )}
      {linkedin.url && (
        <li >
          <a
            aria-label="linkedin"
            href={linkedin.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoLinkedin />
          </a>
        </li>
      )}
      {whatsapp.url && (
        <li >
          <a
            aria-label="whatsapp"
            href={whatsapp.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLogoWhatsapp />
          </a>
        </li>
      )}
      {website.url && (
        <li >
          <a
            aria-label="website"
            href={website.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoGlobeOutline />
          </a>
        </li>
      )}
      {email.url && (
        <li >
          <a aria-label="email" href={`mailto:${email.url}`}>
            <IoMail /> 
          </a>
        </li>
      )}
      {phone.url && (
        <li >
          <a aria-label="telephone" href={`tel:${phone.url}`}>
            <IoCall />
          </a>
        </li>
      )}
      {phone2.url && (
        <li >
          <a aria-label="telephone" href={`tel:${phone2.url}`}>
            <IoCall />
          </a>
        </li>
      )}
      {address.url && (
        <li >
          <a
            aria-label="location"
            href={address.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <IoLocation />
          </a>
        </li>
      )}
    </ul>
  );
};

export default Social;
