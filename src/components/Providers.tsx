"use client";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useEffect } from "react";
// ..
const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      disable: "mobile",
    });
  }, []);
  return <div>{children}</div>;
};

export default Providers;
