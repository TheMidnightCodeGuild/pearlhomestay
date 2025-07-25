import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const HomePage = () => {
  const desktopImageRef = useRef(null);
  const mobileImageRef = useRef(null);

  useEffect(() => {
    const images = [desktopImageRef.current, mobileImageRef.current];

    // Reset initial position before animation
    images.forEach((image) => {
      if (image) {
        // Different initial states for desktop and mobile
        if (image === desktopImageRef.current) {
          gsap.set(image, {
            x: "-100%",
            rotation: 360,
            filter: "blur(10px)",
          });
        } else {
          gsap.set(image, {
            x: "-100%",
            filter: "blur(10px)",
          });
        }
      }
    });

    // Check if animation has been shown before
    const hasAnimated = sessionStorage.getItem("homeAnimationShown");

    if (!hasAnimated) {
      // First time visit - delay animation by 3 seconds
      setTimeout(() => {
        images.forEach((image) => {
          if (image) {
            if (image === desktopImageRef.current) {
              gsap.to(image, {
                duration: 1.5,
                x: "0%",
                rotation: 0,
                filter: "blur(0px)",
                ease: "power2.out",
              });
            } else {
              gsap.to(image, {
                duration: 1.5,
                x: "0%",
                filter: "blur(0px)",
                ease: "power2.out",
              });
            }
          }
        });
        sessionStorage.setItem("homeAnimationShown", "true");
      }, 3000);
    } else {
      // Subsequent visits - run animation immediately
      images.forEach((image) => {
        if (image) {
          if (image === desktopImageRef.current) {
            gsap.to(image, {
              duration: 1.5,
              x: "0%",
              rotation: 0,
              filter: "blur(0px)",
              ease: "power2.out",
            });
          } else {
            gsap.to(image, {
              duration: 1.5,
              x: "0%",
              filter: "blur(0px)",
              ease: "power2.out",
            });
          }
        }
      });
    }
  }, []);

  return (
    <>
      <section className="flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-80px)] p-4 md:p-8 sm:mt-[80px] mt-[40px] bg-[#C6A38D] border-r-[10px] border-l-[10px] border-[#ffffff]">
        <div className="w-full md:w-1/2 px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <div className="md:mb-2 mt-2 sm:mt-4 md:mt-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-[59px] font-extralight text-[#4A2511] uppercase font-masiku md:bg-transparent p-2 rounded-lg">
              Welcome to{" "}
              <span className="text-[#8B593E] animate-pulse font-masiku">
                Pearl Homestay
              </span>
            </h1>
          </div>

          <div className="block md:hidden mt-4 sm:mt-6" ref={mobileImageRef}>
            <Image
              src="/images/home.png"
              alt="Pearl Homestay Ujjain - Luxury Accommodation Near Mahakal Temple"
              width={500}
              height={300}
              className="object-cover rounded-lg w-full h-auto"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <p className="text-sm sm:text-base md:text-lg text-[#4A2511]/90 mt-4 sm:mt-6 max-w-lg mx-auto md:mx-0 italic md:bg-transparent rounded-lg mb-4 font-bold text-center px-2 sm:px-4">
            &quot;Experience comfort, warmth, and tranquility at our family-run
            homestay. Nestled in nature, our cozy rooms and personalized service
            make you feel right at home.&quot;
          </p>

          <div className="flex justify-center md:justify-start mt-4 sm:mt-6">
            <Link
              href="/booking"
              target="_blank"
              className="relative inline-flex items-center justify-start px-4 sm:px-5 py-2 sm:py-3 overflow-hidden font-bold rounded-full group hover:scale-105 transition-transform bg-[#4A2511]"
              aria-label="Book your stay at Pearl Homestay"
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-[#F5EBE0] opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-[#F5EBE0] opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-sm sm:text-base text-white text-left transition-colors duration-200 ease-in-out group-hover:text-[#4A2511]">
                Book Now
              </span>
              <span className="absolute inset-0 border-2 border-[#4A2511] rounded-full"></span>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 px-4 py-4 sm:py-6 md:py-8 justify-center items-center">
          <div className="w-full max-w-xl relative" ref={desktopImageRef}>
            <Image
              src="/images/home.png"
              alt="Pearl Homestay Ujjain - Luxury Accommodation Near Mahakal Temple"
              width={800}
              height={600}
              className="object-cover rounded-lg w-full h-auto"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
