"use client";
import { socialItems } from "@/libs/socialItems";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

type item = {
  label: string;
  href: string;
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

const Header = ({ className }: Props) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("gotrue.user");
      setUser(storedUser);
    }
  }, []);

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
            {user && (
              <li>
                <Link
                  href="/admin#"
                  className="hover:underline uppercase font-semibold"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
          <ul className="flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-8 text-base  md:text-xl">
            {socialItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white cursor-pointer "
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
