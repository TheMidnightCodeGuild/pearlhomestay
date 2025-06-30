import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const HomePage = () => {
  const desktopImageRef = useRef(null);
  const mobileImageRef = useRef(null);

  useEffect(() => {
    const images = [desktopImageRef.current, mobileImageRef.current];
    
    setTimeout(() => {
      images.forEach(image => {
        if (image) {
          gsap.from(image, {
            duration: 1.5,
            x: "-100%",
            rotation: 360,
            ease: "power2.out",
          });
        }
      });
    }, 3000);
  }, []);

  return (
    <section className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4 md:p-8 mt-2 bg-[#C6A38D] border-[10px] border-[#8B593E]">
      <div className="w-full md:w-1/2 px-4 py-8 sm:px-6 lg:px-8 md:pr-12 ">
        <div className="md:mb-2 mt-5 sm:mt-10 text-center md:text-left sm:mx-5 mx-0">
          <h1 className="text-[31px] sm:text-4xl md:text-[59px] font-extralight text-[#4A2511] uppercase font-masiku md:bg-transparent p-2 rounded-lg ">
            <span className="sm:mx-10  mx-0 font-masiku"> Welcome to </span>
            <br />
            <span className="text-[#8B593E] animate-pulse font-masiku">
              Pearl Homestay
            </span>
          </h1>
        </div>

        <div className="md:hidden" ref={mobileImageRef}>
          <Image
            src="/images/home.png"
            alt="Pearl Homestay"
            width={500}
            height={300}
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <p className="text-[13px] sm:text-base md:text-base text-[#4A2511]/90 mt-4 max-w-lg mx-auto md:mx-0 italic  md:bg-transparent  rounded-lg mb-5 font-bold text-center">
          &quot;Experience comfort, warmth, and tranquility at our family-run
          homestay. Nestled in nature, our cozy rooms and personalized service
          make you feel right at home.&quot;
        </p>

        <div className="flex justify-center md:justify-start sm:mx-48 mx-0">
          <Link
            href="/booking"
            target="_blank"
            className="w-28 sm:w-auto  py-2 sm:px-4 sm:py-1.5  bg-[#8B593E] text-[#F2E2D7] rounded-full font-semibold text-base sm:text-lg shadow-md hover:bg-[#6B4530] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B593E]/50"
          >
            Book Now
          </Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 px-4 py-8 sm:px-6 lg:px-8 hidden md:flex justify-center items-center md:pl-12">
        <div className="w-full max-w-xl relative mt-10" ref={desktopImageRef}>
          <Image
            src="/images/home.png"
            alt="Pearl Homestay"
            width={800}
            height={600}
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
