import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";

const Testimonial = () => {
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

  const TestimonialData = [
    {
      id: 1,
      content:
        "Our stay at this homestay was beyond amazing! The hosts were incredibly welcoming, and the ambiance made us feel at home. We loved waking up to the scenic views and peaceful environment every day.",
      name: "Ram Chaturvedi",
      role: "Guest from Lucknow",
    },
    {
      id: 2,
      content:
        "The homestay was perfect for our family vacation. The rooms were cozy, and the food was delicious. The kids especially enjoyed the garden and outdoor activities. Definitely coming back!",
      name: "Rajesh Kumar",
      role: "Family Guest",
    },
    {
      id: 3,
      content:
        "I had an unforgettable experience at this homestay. The personalized service, attention to detail, and the warmth of the hosts made all the difference. Highly recommend.",
      name: "Krish Gupta",
      role: "Solo Traveler",
    },
    {
      id: 4,
      content:
        "The perfect escape from city life! The homestay offered serene views, excellent hospitality, and a truly relaxing environment. It was exactly what we needed for our weekend retreat.",
      name: "Arjun Srivastav & Tapasya Srivastav",
      role: "Couple from New Delhi",
    },
  ];

  return (
    <>
      <section
        id="testimonials"
        className="py-16 bg-[#C6A38D] border-l-[10px] border-r-[10px] border-[#ffffff]"
      >
        <div ref={sectionRef} className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4 text-neutral-800">
              What Our <span className="text-[#8B593E]">Guests</span> Say
            </h2>
            <p className="text-base md:text-base text-neutral-900 max-w-4xl mx-auto">
              Discover the experiences of those who&apos;ve stayed with us
            </p>
          </div>

          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="swiper-container"
          >
            {TestimonialData.map((data) => (
              <SwiperSlide key={data.id}>
                <div className="bg-white rounded-lg shadow-xl overflow-hidden h-[300px] border-2 border-[#8B593E]">
                  <div className="p-6 flex flex-col justify-between h-full">
                    <div className="text-gray-600 italic mb-4 flex-grow overflow-y-auto">
                      &quot;{data.content}&quot;
                    </div>
                    <div className="flex items-center mt-auto">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="w-12 h-12 text-[#8B593E]"
                        >
                          <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-medium text-[#4A2511]">
                          {data.name}
                        </div>
                        <div className="text-sm text-[#8B593E]">
                          {data.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
