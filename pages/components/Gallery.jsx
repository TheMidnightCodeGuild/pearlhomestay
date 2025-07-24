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

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

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
        className="py-6 xs:py-8 sm:py-10 md:py-12 bg-[#C6A38D] border-l-[10px] border-r-[10px] border-[#ffffff]"
      >
        <div
          ref={sectionRef}
          className="w-full lg:max-w-[1300px] mx-auto px-2 xs:px-3 sm:px-4 md:px-6"
        >
          <header className="text-center mb-4 xs:mb-6 sm:mb-8">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4 text-neutral-800">
              Our <span className="text-[#8B593E]">Gallery</span>
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-neutral-900 max-w-4xl leading-relaxed mx-auto px-2">
              Take a visual journey through our elegant spaces and discover the
              perfect setting for your stay.
            </p>
          </header>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 15,
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
            className="[&_.swiper-pagination-bullet]:bg-[#8B593E] [&_.swiper-pagination-bullet]:w-1.5 [&_.swiper-pagination-bullet]:h-1.5 [&_.swiper-pagination-bullet]:mx-1 
                     [&_.swiper-pagination-bullet-active]:bg-[#8B593E] [&_.swiper-pagination-bullet-active]:w-2 [&_.swiper-pagination-bullet-active]:h-2"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-[250px] xs:h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-lg overflow-hidden border-2 xs:border-3 sm:border-4 border-[#8B593E] cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, (max-width: 768px) 360px, (max-width: 1024px) 400px, 450px"
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
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-[60vh] xs:h-[70vh] sm:h-[80vh] max-w-6xl">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="(max-width: 480px) 90vw, (max-width: 768px) 85vw, 80vw"
              priority
              quality={100}
            />
            <button
              className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 text-white bg-black bg-opacity-50 rounded-full p-1.5 xs:p-2 hover:bg-opacity-75"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6"
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
