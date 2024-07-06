import Layout from "@/components/Layout";
import aboutBg from "@public/assets/images/about-bg.jpg";

const AboutMe = () => {
  return (
    <Layout className="bg-secondary text-black">
      <div className="max-w-6xl mx-auto px-5 h-screen">
        <div
          style={{
            backgroundImage: `url(${aboutBg.src})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="h-[50%] md:h-full"
        >
          <div className="h-full">
            <div className="h-full flex flex-col justify-center items-center relative">
              <h3 className="mb-1 sm:mb-3 inline-block px-4 md:px-8 md:py-2 bg-white border-[4px] md:border-[6px] border-black rounded-md md:rounded-2xl font-bloc  text-base sm:text-2xl lg:text-4xl text-black uppercase">
                Daniel Aihie
              </h3>
              <div className="flex flex-col justify-center items-center rotate-1">
                <h3 className="mb-2 inline-block px-4 md:px-8 md:py-2 bg-white border-b-[4px] md:border-b-[6px] border-black rounded-md md:rounded-2xl font-bloc text-base sm:text-2xl lg:text-4xl text-black uppercase z-50">
                  Multidisciplinary
                </h3>
                <h3 className="mb-2 inline-block px-4 md:px-8 md:py-2 bg-white border-b-[4px] md:border-b-[6px] border-black rounded-md md:rounded-2xl font-bloc text-base sm:text-2xl lg:text-4xl text-black uppercase -mt-2 md:-mt-4 z-0">
                  Creative
                </h3>
              </div>
              <p className=" hidden md:block mt-4 w-[80%] mx-auto px-4 md:px-8 md:py-2 bg-white border-[4px] md:border-[6px] border-black rounded-md md:rounded-2xl font-bloc font-bold text-base sm:text-2xl lg:text-[28px] text-black -rotate-1">
                I am a multidisciplinary creative and video editor with roots in
                Nigeria and a heart nurtured in London. My work spans multiple
                disciplines, allowing me to seamlessly integrate different
                mediums and techniques to produce high-quality, engaging
                projects. I bring fresh, inclusive ideas to every project,
                always aiming to connect with audiences.
              </p>
            </div>
          </div>
        </div>
        <div className="h-[50%] overflow-y-auto block md:hidden max-w-6xl mx-auto px-5 text-center">
          <p className=" px-4 md:px-8 md:py-2 font-bloc font-bold text-sm sm:text-2xl lg:text-4xl text-black ">
            I am a multidisciplinary creative and video editor with roots in
            Nigeria and a heart nurtured in London. My work spans multiple
            disciplines, allowing me to seamlessly integrate different mediums
            and techniques to produce high-quality, engaging projects. I bring
            fresh, inclusive ideas to every project, always aiming to connect
            with audiences.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutMe;
