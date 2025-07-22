"use client";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function NearbyAtraction() {
  const [selectedImage, setSelectedImage] = useState(null);
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

  const openImage = (src) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const attractionImages = [
    {
      src: "/images/nearby/mahakaltemple.jpg",
      alt: "Mahakaleshwar Temple - One of the twelve Jyotirlingas in Ujjain",
      title: "Mahakaleshwar Temple",
      description:
        "One of the twelve Jyotirlingas, this temple houses a self-manifested Shivalinga and is dedicated to Lord Shiva as the ruler of time.",
      link: "https://en.wikipedia.org/wiki/Mahakaleshwar_Jyotirlinga",
    },
    {
      src: "/images/nearby/harsiddhi-temple.png.webp",
      alt: "Harsiddhi Temple - Ancient Shakti Peetha in Ujjain",
      title: "Harsiddhi Temple",
      description:
        "Known as a Shakti Peetha, this temple is linked to the story of Sati and showcases centuries of devotion through its Maratha-era renovations.",
      link: "https://ujjain.nic.in/en/tourist-place/harsiddhi/",
    },
    {
      src: "/images/nearby/Chintaman-Ganesh.jpg",
      alt: "Chintaman Ganesh Temple - Historic 1000-year-old temple in Ujjain",
      title: "Chintaman Mandir",
      description:
        "This 1,000-year-old temple on the Shipra River's banks is dedicated to Lord Ganesh, believed to remove worries and bestow prosperity.",
      link: "https://en.wikipedia.org/wiki/Chintaman_Ganesh_Temple,_Ujjain",
    },
    {
      src: "/images/nearby/kal-bhairav.png",
      alt: "Kal Bhairav Temple - Guardian deity temple of Ujjain",
      title: "Kal Bhairav Temple",
      description:
        "Dedicated to Ujjain's guardian deity, Kal Bhairav, this temple is famous for its unique ritual of offering liquor to the deity.",
      link: "https://en.wikipedia.org/wiki/Kal_Bhairav_Temple,_Ujjain",
    },
    {
      src: "/images/nearby/ramghat.jpg",
      alt: "Ram Ghat - Sacred bathing ghat on Shipra River in Ujjain",
      title: "Ram Ghat",
      description:
        "A sacred bathing ghat on the Shipra River, Ram Ghat is renowned for its spiritual significance and as a key venue for the Kumbh Mela.",
      link: "https://en.wikipedia.org/wiki/Shipra_River",
    },
    {
      src: "/images/nearby/Iskon.jpg",
      alt: "ISKCON Temple Ujjain - Spiritual center for Krishna devotees",
      title: "ISKCON Temple",
      description:
        "This beautiful temple dedicated to Lord Krishna offers spiritual enlightenment and promotes Bhakti Yoga in a serene environment.",
      link: "https://en.wikipedia.org/wiki/International_Society_for_Krishna_Consciousness",
    },
  ];

  const moreAttractionImages = [
    {
      src: "/images/nearby/gopal-mandir.png",
      alt: "Gopal Mandir - Historic Krishna temple in Ujjain",
      title: "Gopal Mandir",
      description:
        "A historic temple dedicated to Lord Krishna, Gopal Mandir is celebrated for its architectural beauty and religious importance.",
      link: "https://en.wikipedia.org/wiki/Gopal_Mandir",
    },
    {
      src: "/images/nearby/Mahakallok.png",
      alt: "Mahakal Lok - Newly developed spiritual corridor in Ujjain",
      title: "Mahakal Lok",
      description:
        "A newly developed corridor around Mahakaleshwar Temple, showcasing Ujjain's rich cultural and spiritual heritage through various attractions.",
      link: "https://hi.wikipedia.org/wiki/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80_%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%95%E0%A4%BE%E0%A4%B2_%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B2%E0%A5%8B%E0%A4%95",
    },
    {
      src: "/images/nearby/Baglamukhi-mandir.png",
      alt: "Baglamukhi Mata Temple - Sacred Shakti temple in Ujjain",
      title: "Baglamukhi Mata Mandir",
      description:
        "This temple, dedicated to Goddess Baglamukhi, is known for its spiritual power and unique rituals that attract devotees from far and wide.",
      link: "https://en.wikipedia.org/wiki/Bagalamukhi_Temple,_Nalkheda",
    },
    {
      src: "/images/nearby/Dewas-tekri.png",
      alt: "Dewas Tekri - Hilltop temples with panoramic views near Ujjain",
      title: "Dewas Tekri",
      description:
        "A hilltop offering panoramic views of Ujjain, Dewas Tekri houses temples dedicated to Chamunda Mata and Tulja Bhavani.",
      link: "https://en.wikipedia.org/wiki/Dewas_Tekri",
    },
    {
      src: "/images/nearby/Mangalnathtemple.jpeg",
      alt: "Mangalnath Temple - Ancient astrological temple in Ujjain",
      title: "Mangalnath Temple",
      description:
        "Believed to be the birthplace of Mars (Mangal), this temple is an important astrological and spiritual site attracting many visitors.",
      link: "https://en.wikipedia.org/wiki/Mangalnath_Temple",
    },
    {
      src: "/images/nearby/sandipani.jpg",
      alt: "Sandipani Ashram - Ancient learning center of Lord Krishna in Ujjain",
      title: "Sandipani Ashram",
      description:
        "An ancient hermitage where Lord Krishna and Sudama are said to have received their education from the revered Sage Sandipani.",
      link: "https://ujjain.nic.in/tourist-place/%E0%A4%B8%E0%A4%BE%E0%A4%82%E0%A4%A6%E0%A5%80%E0%A4%AA%E0%A4%A8%E0%A4%BF-%E0%A4%86%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A4%AE/",
    },
  ];

  return (
    <>
      <Head>
        <title>
          Sacred Attractions Near Pearl Homestay Ujjain - Religious & Cultural
          Sites
        </title>
        <meta
          name="description"
          content="Explore famous religious and cultural attractions near Pearl Homestay Ujjain including Mahakaleshwar Temple, Harsiddhi Temple, Ram Ghat and other sacred sites."
        />
        <meta
          name="keywords"
          content="Ujjain attractions, Mahakaleshwar Temple, Harsiddhi Temple, Ram Ghat, religious sites Ujjain, cultural places Ujjain, places to visit near Pearl Homestay"
        />
      </Head>

      <section
        id="nearbyAttraction"
        className="py-24 md:py-12 bg-[#C6A38D] border-l-[10px] border-r-[10px] border-[#ffffff]"
      >
        <div
          ref={sectionRef}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <header className="text-center pb-10">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#000000] mb-4">
              Spiritual Temples and Sacred Destinations Near Pearl Homestay
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-[#8B593E] mb-4">
              Explore the Perfect Stay for Pilgrims and Spiritual Seekers
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-[#5C3D2E]/80">
              Explore the rich spiritual and cultural heritage of Ujjain with
              these nearby attractions:
            </p>
          </header>

          <Swiper
            modules={[Navigation, Autoplay, Pagination, Parallax]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="swiper-container mb-8"
          >
            {attractionImages.map((attraction, index) => (
              <SwiperSlide key={index}>
                <div className="h-full flex flex-col bg-white/90 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex-grow flex flex-col p-4">
                    <div className="relative w-full h-40 sm:h-48 mb-4 overflow-hidden rounded-md">
                      <Image
                        src={attraction.src}
                        alt={attraction.alt}
                        width={800}
                        height={600}
                        className="rounded-md cursor-pointer object-cover hover:scale-105 transition-transform duration-300"
                        onClick={() => openImage(attraction.src)}
                      />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 text-[#5C3D2E]">
                      {attraction.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C3D2E]/70 flex-grow mb-4">
                      {attraction.description}
                    </p>
                    <div className="flex justify-end">
                      <Link href={attraction.link}>
                        <button className="bg-[#8B593E] text-white rounded-full p-2 hover:bg-[#5C3D2E] transition-colors">
                          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            modules={[Navigation, Autoplay, Pagination, Parallax]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="swiper-container"
          >
            {moreAttractionImages.map((attraction, index) => (
              <SwiperSlide key={index}>
                <div className="h-full flex flex-col bg-white/90 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex-grow flex flex-col p-4">
                    <div className="relative w-full h-40 sm:h-48 mb-4 overflow-hidden rounded-md">
                      <Image
                        priority
                        width={800}
                        height={600}
                        src={attraction.src}
                        alt={attraction.alt}
                        className="rounded-md cursor-pointer object-cover hover:scale-105 transition-transform duration-300"
                        onClick={() => openImage(attraction.src)}
                      />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 text-[#5C3D2E]">
                      {attraction.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C3D2E]/70 flex-grow mb-4">
                      {attraction.description}
                    </p>
                    <div className="flex justify-end">
                      <Link href={attraction.link}>
                        <button className="bg-[#8B593E] text-white rounded-full p-2 hover:bg-[#5C3D2E] transition-colors">
                          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Full-screen image modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={closeImage}
          >
            <Image
              src={selectedImage}
              alt="Full-screen view of attraction"
              width={1920}
              height={1080}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        )}
      </section>
    </>
  );
}

const PlusIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
};
