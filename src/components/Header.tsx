import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

type Props = {
  className?: string;
};

type item = {
  label: string;
  href: string;
};

type social = {
  href: string;
  icon: JSX.Element;
};

const menuItems: item[] = [
  {
    label: "All",
    href: "/",
  },
  {
    label: "Creative",
    href: "/creative",
  },
  {
    label: "Edits",
    href: "/edits",
  },
  {
    label: "About Me",
    href: "/about-me",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const socialItems: social[] = [
  {
    href: "https://www.instagram.com/danielaihie/",
    icon: <FaInstagram />,
  },
  {
    href: "https://www.facebook.com/danielaihie/",
    icon: <FaFacebookF />,
  },
  {
    href: "https://twitter.com/danielaihie",
    icon: <FaTwitter />,
  },
];

const Header = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className="max-w-6xl mx-auto mb-0 px-5">
        <nav className="layout flex flex-wrap items-center justify-center gap-2 md:justify-between py-2 md:py-4">
          <ul className="flex flex-wrap items-center justify-center md:justify-between gap-2 md:gap-4 text-base  md:text-xl">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:underline uppercase font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-8 text-base  md:text-xl">
            {socialItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white cursor-pointer "
                >
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
