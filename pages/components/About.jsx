"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";

const About = () => {
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

  return (
    <>
      <Head>
        <title>
          About Pearl Homestay - Your Gateway to Mahakal Temple in Ujjain
        </title>
        <meta
          name="description"
          content="Experience divine comfort at Pearl Homestay, located near Mahakaleshwar Temple in Ujjain. Perfect accommodation for pilgrims visiting the sacred Jyotirlinga."
        />
        <meta
          name="keywords"
          content="Pearl Homestay, Ujjain accommodation, Mahakal Temple stay, pilgrim homestay Ujjain, Mahakaleshwar Temple accommodation"
        />
        <meta
          property="og:title"
          content="About Pearl Homestay - Your Gateway to Mahakal Temple in Ujjain"
        />
        <meta
          property="og:description"
          content="Experience divine comfort at Pearl Homestay, located near Mahakaleshwar Temple in Ujjain. Perfect accommodation for pilgrims visiting the sacred Jyotirlinga."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://pearlhomestayujjain.in/components/About"
        />
        <meta
          property="og:image"
          content="https://pearlhomestayujjain.in/images/about.png"
        />
      </Head>
      <section
        id="about"
        className="w-full min-h-screen bg-[#C6A38D]  px-4 border-l-[10px] border-r-[10px] border-[#ffffff] py-24 md:py-12 "
      >
        <div ref={sectionRef} className="max-w-7xl mx-auto">
          <div className="bg-[#fffff0]  rounded-4xl shadow-xl overflow-hidden  transition-all duration-300 hover:shadow-2xl">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6 md:p-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  About Pearl Homestay: The Perfect Stay for Spiritual
                  Experience Near Mahakal Temple
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold text-[#8B593E] mb-4">
                  Dedicated to Pilgrims and Travelers Seeking Comfort and
                  Spirituality
                </h3>
                <p className="text-[#8B593E] font-medium mb-6 uppercase tracking-wider text-sm md:text-base">
                  About Us
                </p>
                <div className="md:block hidden">
                  <p className="text-base text-gray-700 leading-relaxed mb-6 pb-4 border-b border-[#8B593E]/20">
                    Experience the divine aura of Mahakaleshwar Temple with a
                    comfortable stay at Pearl Homestay in Ujjain. Our
                    thoughtfully designed accommodation offers pilgrims and
                    tourists the perfect retreat after visiting one of India's
                    most revered Jyotirlingas.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed mb-6 pb-4 border-b border-[#8B593E]/20">
                    Located in close proximity to the sacred Mahakal Temple, our
                    homestay provides a serene environment where you can reflect
                    on your spiritual journey while enjoying modern comforts. We
                    understand the significance of this pilgrimage and strive to
                    enhance your divine experience in the holy city of Ujjain.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed pb-4 border-b border-[#8B593E]/20">
                    Our homestay was established to provide pilgrims with a
                    restful sanctuary after participating in the powerful Bhasma
                    Aarti and other rituals at the Mahakal Temple.
                  </p>
                </div>
                <div className="md:hidden block">
                  <p className="text-sm text-gray-700 leading-relaxed mb-4 pb-4 border-b border-[#8B593E]/20">
                    Experience the divine aura of Mahakaleshwar Temple with a
                    comfortable stay at Pearl Homestay in Ujjain. Our
                    thoughtfully designed accommodation offers pilgrims the
                    perfect retreat.
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed pb-4 border-b border-[#8B593E]/20">
                    Located near the sacred Mahakal Temple, our homestay
                    provides a serene environment where you can reflect on your
                    spiritual journey while enjoying modern comforts.
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
                <Image
                  src="/images/about.png"
                  alt="Pearl Homestay Exterior View - Accommodation near Mahakal Temple"
                  className="w-full h-full object-cover"
                  width={600}
                  height={500}
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
