import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

type social = {
  href: string;
  icon: JSX.Element;
};

export const socialItems: social[] = [
  {
    href: "https://www.instagram.com/danielaihie/",
    icon: <FaInstagram />,
  },
  // {
  //   href: "https://www.facebook.com/danielaihie/",
  //   icon: <FaFacebookF />,
  // },
  // {
  //   href: "https://twitter.com/danielaihie",
  //   icon: <FaTwitter />,
  // },
];
