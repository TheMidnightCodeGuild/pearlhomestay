"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Gallery = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const section = sectionRef.current;
    
    gsap.fromTo(section, {
      opacity: 0,
      y: 100
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  const images = [
    {
      src: "/images/img1.png",
      alt: "Hotel Exterior View"
    },
    {
      src: "/images/img1.png", 
      alt: "Deluxe Room"
    },
    {
      src: "/images/img1.png",
      alt: "Restaurant Area"
    },
    {
      src: "/images/img1.jpg",
      alt: "Lobby"
    },
    {
      src: "/images/img1.jpg",
      alt: "Suite Room"
    },
    {
      src: "/images/img1.jpg",
      alt: "Garden View"
    }
  ];

  return (
    <section id="gallery" className="py-12 md:py-12 bg-[#C6A38D] border-l-[10px] border-r-[10px] border-[#ffffff] ">
      <div ref={sectionRef} className="w-full lg:max-w-[1300px] mx-auto px-4 md:px-6 ">
        <header className="text-center mb-8 md:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4 md:mb-2 text-neutral-800 text-center">
            Our <span className="text-[#8B593E]">Gallery</span>
          </h2>
          <p className="text-base md:text-base text-neutral-900 max-w-4xl leading-relaxed text-center mx-auto">
            Take a visual journey through our elegant spaces and discover the perfect setting for your stay.
          </p>
        </header>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={15}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 25
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            },
          }}
          className="[&_.swiper-pagination-bullet]:bg-[#8B593E] [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:mx-1.5 
                     [&_.swiper-pagination-bullet-active]:bg-[#8B593E] [&_.swiper-pagination-bullet-active]:w-2.5 [&_.swiper-pagination-bullet-active]:h-2.5
                     sm:[&_.swiper-pagination-bullet]:w-1.5 sm:[&_.swiper-pagination-bullet]:h-1.5 sm:[&_.swiper-pagination-bullet]:mx-1
                     sm:[&_.swiper-pagination-bullet-active]:w-2 sm:[&_.swiper-pagination-bullet-active]:h-2"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[500px] rounded-lg overflow-hidden border-4 border-[#8B593E]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;
