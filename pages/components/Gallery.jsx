import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";

const Gallery = () => {
  const sectionRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  // Add effect to handle body scroll
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const images = [
    {
      src: "/images/img1.png",
      alt: "Pearl Homestay Ujjain - Exterior View",
    },
    {
      src: "/images/img2.jpg",
      alt: "Pearl Homestay Ujjain - Lobby Area",
    },
    {
      src: "/images/img3.jpg",
      alt: "Pearl Homestay Ujjain - Deluxe Room",
    },
    {
      src: "/images/img4.jpg",
      alt: "Pearl Homestay Ujjain - Family Suite",
    },
    {
      src: "/images/img5.jpg",
      alt: "Pearl Homestay Ujjain - Dining Area",
    },
    {
      src: "/images/img6.jpg",
      alt: "Pearl Homestay Ujjain - Modern Bathroom",
    },
    {
      src: "/images/img7.jpg",
      alt: "Pearl Homestay Ujjain - Living Room",
    },
    {
      src: "/images/img8.jpg",
      alt: "Pearl Homestay Ujjain - Kitchen Facilities",
    },
    {
      src: "/images/img9.jpg",
      alt: "Pearl Homestay Ujjain - Garden View",
    },
    {
      src: "/images/img10.jpg",
      alt: "Pearl Homestay Ujjain - Balcony View",
    },
    {
      src: "/images/img11.jpg",
      alt: "Pearl Homestay Ujjain - Common Area",
    },
    {
      src: "/images/img12.jpg",
      alt: "Pearl Homestay Ujjain - Guest Room",
    },
    {
      src: "/images/img13.jpg",
      alt: "Pearl Homestay Ujjain - Premium Suite",
    },
    {
      src: "/images/img14.jpg",
      alt: "Pearl Homestay Ujjain - Reception Area",
    },
    {
      src: "/images/img15.jpg",
      alt: "Pearl Homestay Ujjain - Parking Space",
    },
    {
      src: "/images/img16.jpg",
      alt: "Pearl Homestay Ujjain - Building Exterior",
    },
  ];

  return (
    <>
      <section
        id="gallery"
        className="py-12 md:py-12 bg-[#C6A38D] border-l-[10px] border-r-[10px] border-[#ffffff] "
      >
        <div
          ref={sectionRef}
          className="w-full lg:max-w-[1300px] mx-auto px-4 md:px-6 "
        >
          <header className="text-center mb-8 md:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4 md:mb-2 text-neutral-800 text-center">
              Our <span className="text-[#8B593E]">Gallery</span>
            </h2>
            <p className="text-base md:text-base text-neutral-900 max-w-4xl leading-relaxed text-center mx-auto">
              Take a visual journey through our elegant spaces and discover the
              perfect setting for your stay.
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
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="[&_.swiper-pagination-bullet]:bg-[#8B593E] [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:mx-1.5 
                     [&_.swiper-pagination-bullet-active]:bg-[#8B593E] [&_.swiper-pagination-bullet-active]:w-2.5 [&_.swiper-pagination-bullet-active]:h-2.5
                     sm:[&_.swiper-pagination-bullet]:w-1.5 sm:[&_.swiper-pagination-bullet]:h-1.5 sm:[&_.swiper-pagination-bullet]:mx-1
                     sm:[&_.swiper-pagination-bullet-active]:w-2 sm:[&_.swiper-pagination-bullet-active]:h-2"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-[600px] sm:h-[400px] md:h-[500px] lg:h-[500px] rounded-lg overflow-hidden border-4 border-[#8B593E] cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover h-full w-full sm:h-[500px] md:h-[500px] lg:h-[800px] "
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                    priority={index < 4}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-6xl h-[80vh]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
              quality={100}
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
