"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Head from 'next/head';

const HomePage = () => {
  const desktopImageRef = useRef(null);
  const mobileImageRef = useRef(null);

  useEffect(() => {
    const images = [desktopImageRef.current, mobileImageRef.current];
    
    // Reset initial position before animation
    images.forEach(image => {
      if (image) {
        // Different initial states for desktop and mobile
        if (image === desktopImageRef.current) {
          gsap.set(image, {
            x: "-100%",
            rotation: 360,
            filter: "blur(10px)"
          });
        } else {
          gsap.set(image, {
            x: "-100%",
            filter: "blur(10px)"
          });
        }
      }
    });

    // Check if animation has been shown before
    const hasAnimated = sessionStorage.getItem("homeAnimationShown");

    if (!hasAnimated) {
      // First time visit - delay animation by 3 seconds
      setTimeout(() => {
        images.forEach(image => {
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
      images.forEach(image => {
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
      <Head>
        <title>Pearl Homestay Ujjain - Luxury Accommodation Near Mahakal Temple</title>
        <meta name="description" content="Experience luxury stay at Pearl Homestay Ujjain, located near Mahakaleshwar Temple. Enjoy comfortable rooms, modern amenities and warm hospitality. Book your spiritual stay today." />
        <meta name="keywords" content="Pearl Homestay Ujjain, accommodation near Mahakal temple, luxury homestay Ujjain, best place to stay in Ujjain" />
        <meta property="og:title" content="Pearl Homestay Ujjain - Luxury Accommodation Near Mahakal Temple" />
        <meta property="og:description" content="Experience luxury stay at Pearl Homestay Ujjain, located near Mahakaleshwar Temple. Enjoy comfortable rooms, modern amenities and warm hospitality." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pearlhomestayujjain.in" />
        <link rel="canonical" href="https://pearlhomestayujjain.in" />
      </Head>

      <section className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4 md:p-8 mt-5 bg-[#C6A38D] border-r-[10px] border-l-[10px] border-[#ffffff]">
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
              alt="Pearl Homestay Ujjain - Luxury Accommodation Near Mahakal Temple"
              width={500}
              height={300}
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <p className="text-[13px] sm:text-base md:text-base text-[#4A2511]/90 mt-4 max-w-lg mx-auto md:mx-0 italic  md:bg-transparent  rounded-lg mb-4 font-bold text-center">
            &quot;Experience comfort, warmth, and tranquility at our family-run
            homestay. Nestled in nature, our cozy rooms and personalized service
            make you feel right at home.&quot;
          </p>

          <div className="flex justify-center md:justify-start sm:mx-44 mx-4 ">
            <Link
              href="/booking"
              target="_blank"
              className="relative inline-flex items-center justify-start inline-block px-5 sm:py-3 py-2 overflow-hidden font-bold rounded-full group "
              aria-label="Book your stay at Pearl Homestay"
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-[#8B593E] opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-[#8B593E] opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full hover:text-white text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">Book Now</span>
              <span className="absolute inset-0 border-2 border-[#8B593E] rounded-full hover:text-white group-hover:text-white"></span>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4 py-8 sm:px-6 lg:px-8 hidden md:flex justify-center items-center md:pl-12">
          <div className="w-full max-w-xl relative mt-10" ref={desktopImageRef}>
            <Image
              src="/images/home.png"
              alt="Pearl Homestay Ujjain - Luxury Accommodation Near Mahakal Temple"
              width={800}
              height={600}
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
