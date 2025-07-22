"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";
import ac from "../../public/icons/air-conditioner.png";
import bathroom from "../../public/icons/male-and-female.png";
import family from "../../public/icons/parents.png";
import hotwater from "../../public/icons/hot-water.png";
import security from "../../public/icons/security.png";
import tea from "../../public/icons/coffee-cup.png";
import generator from "../../public/icons/generator.png";
import wifi from "../../public/icons/travel.png";

const Amenities = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;

    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const services = [
    { id: "1", text: "Luxurious Air Conditioning", icon: ac },
    { id: "2", text: "Modern Clean Bathrooms", icon: bathroom },
    { id: "3", text: "Hot Water Available", icon: hotwater },
    { id: "4", text: "High-Speed Internet", icon: wifi },
    { id: "5", text: "24/7 Power Backup", icon: generator },
    { id: "6", text: "Welcoming Family Space", icon: family },
    { id: "7", text: "24/7 Security", icon: security },
    { id: "8", text: "Food Service Available", icon: tea },
  ];

  return (
    <>
      <Head>
        <title>
          Premium Amenities at Pearl Homestay Ujjain - Luxury Stay Near Mahakal
          Temple
        </title>
        <meta
          name="description"
          content="Enjoy premium amenities at Pearl Homestay including AC, hot water, WiFi, power backup, security and food service. Experience comfortable accommodation near Mahakaleshwar Temple."
        />
        <meta
          name="keywords"
          content="Pearl Homestay amenities, Ujjain hotel facilities, Mahakal Temple accommodation, luxury stay Ujjain, AC rooms near Mahakaleshwar"
        />
      </Head>
      <section
        id="amenities"
        className="py-24 md:py-12 bg-[#C6A38D] border-l-[10px] border-r-[10px] border-[#ffffff]"
      >
        <div
          ref={sectionRef}
          className="lg:max-w-[1300px] mx-auto px-4 sm:px-6"
        >
          <header className="text-center mb-8 md:mb-10 lg:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 text-neutral-800">
              Premium Amenities for a Perfect Stay at Pearl Homestay
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-[#8B593E] mb-4">
              Experience Comfort, Security, and Spiritual Tranquility
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed px-4">
              Experience luxury and comfort with our carefully curated selection
              of premium amenities designed to make your stay exceptional.
            </p>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="rounded-full p-3 sm:p-4 md:p-6 mb-2 sm:mb-3 md:mb-4 bg-white shadow-lg group-hover:shadow-xl group-hover:bg-primary/10 transition-all duration-300 border-4 sm:border-6 border-[#8B593E]">
                  <Image
                    src={service.icon}
                    alt={service.text}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover group-hover:scale-110 transition-transform duration-300"
                    width={48}
                    height={48}
                  />
                </div>
                <p className="text-center text-xs sm:text-sm md:text-base font-medium text-neutral-700 group-hover:text-primary transition-colors duration-300 px-1">
                  {service.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Amenities;
