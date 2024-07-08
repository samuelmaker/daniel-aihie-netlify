import Layout from "@/components/Layout";
import { socialItems } from "@/libs/socialItems";
import homeBg from "@public/assets/images/home-bg.jpg";
import Link from "next/link";

const Home = async () => {
  return (
    <Layout isHeader={false} className="bg-primary text-white">
      <div
        style={{
          backgroundImage: `url(${homeBg.src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="max-w-6xl mx-auto px-5 h-screen"
      >
        <div className="h-full">
          <nav className="flex flex-wrap items-center justify-center gap-2 md:justify-end py-2 md:py-4">
            <ul className="flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-8 text-base  md:text-xl">
              {socialItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white cursor-pointer"
                  >
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="h-[90%] flex flex-col justify-center items-center relative">
            <h3 className="mb-1 sm:mb-3 inline-block px-4 md:px-8 md:py-2 bg-white border-[4px] md:border-[6px] border-black rounded-md md:rounded-[10px] font-bold font-bloctext-base sm:text-2xl lg:text-4xl text-black uppercase">
              Daniel Aihie
            </h3>
            <div className="flex flex-col justify-center items-center rotate-1">
              <h3 className="mb-2 inline-block px-4 md:px-8 md:py-2 bg-white border-b-[4px] md:border-b-[6px] border-black rounded-md md:rounded-2xl font-bloc font-bold text-base sm:text-2xl lg:text-4xl text-black uppercase z-50">
                Multidisciplinary
              </h3>
              <h3 className="mb-2 inline-block px-4 md:px-8 md:py-2 bg-white border-b-[4px] md:border-b-[6px] border-black rounded-md md:rounded-2xl font-bloc font-bold text-base sm:text-2xl lg:text-4xl text-black uppercase -mt-2 md:-mt-4 z-0">
                Creative
              </h3>
            </div>
            {/* link bubbles */}
            <div className="absolute left-[-1%] top-[38%] sm:left-[5%] sm:top-[37%] md:top-[30%] lg:left-[5%] lg:top-[20%]">
              <Link
                href="/creative"
                className="inline-block px-2 md:px-8 md:py-2 bg-white border-[4px] md:border-[6px] border-black rounded-[10px] font-bloc font-bold text-base sm:text-2xl lg:text-4xl text-black uppercase"
              >
                Creative
              </Link>
            </div>
            <div className="absolute right-[10%] top-[40%] sm:right-[7%] sm:top-[38%] md:top-[32%] lg:right-[7%] lg:top-[25%]">
              <Link
                href="/edits"
                className="inline-block px-2 md:px-8 md:py-2 bg-white border-[4px] md:border-[6px] border-black rounded-[10px] font-bloc font-bold text-base sm:text-2xl lg:text-4xl text-black uppercase"
              >
                Edit
              </Link>
            </div>
            <div className="absolute left-[2%] bottom-[42%] sm:bottom-[40%]  md:bottom-[35%]">
              <Link
                href="/about-me"
                className="inline-block px-2 md:px-8 md:py-2 bg-white border-[4px] md:border-[6px] border-black rounded-[10px] font-bloc font-bold text-base sm:text-2xl lg:text-4xl text-black uppercase"
              >
                About Me
              </Link>
            </div>
            <div className="absolute left-[8%] bottom-[37%] sm:bottom-[32%] md:bottom-[25%] lg:bottom-[22%]">
              <Link
                href="/contact"
                className="inline-block px-2 md:px-8 md:py-2 bg-white border-[4px] md:border-[6px] border-black rounded-[10px] font-bloc font-bold text-base sm:text-2xl lg:text-4xl text-black uppercase"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
