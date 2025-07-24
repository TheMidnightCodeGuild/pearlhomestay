"use client";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";

export default function GoogleReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;

    if (section) {
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
    }
  }, []);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section
        id="google-reviews"
        className="py-16 bg-[#C6A38D] border-l-[10px] border-r-[10px] border-[#ffffff]"
      >
        <div ref={sectionRef} className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4 text-neutral-800">
              What Our <span className="text-[#8B593E]">Google Guests</span> Say
            </h2>
            <p className="text-base md:text-base text-neutral-900 max-w-4xl mx-auto">
              See what guests are saying about us on Google
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-lg text-neutral-800">Loading reviews...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-neutral-800 text-lg">
                No reviews available at the moment.
              </p>
            </div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              autoplay={{
                delay: 3500,
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
              {reviews.map((review, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden h-[300px] border-2 border-[#8B593E] flex flex-col">
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div className="flex items-center mb-4">
                        {review.profile_photo_url ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-12 h-12 text-[#8B593E]"
                          >
                            <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                          </svg>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-[#C6A38D] flex items-center justify-center text-[#8B593E] font-bold text-xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-8 h-8"
                            >
                              <path
                                fill="#8B593E"
                                d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-lg font-medium text-[#4A2511]">
                            {review.author_name}
                          </div>
                          {review.date && (
                            <div className="text-xs text-[#8B593E]">
                              {review.date}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        {review.rating && review.rating > 0 && (
                          <div className="flex items-center">
                            <span className="text-yellow-500 text-xl mr-1">
                              ★
                            </span>
                            <span className="text-[#8B593E] font-semibold">
                              {review.rating}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-gray-700 italic flex-grow overflow-y-auto">
                        {review.text ? (
                          <span>&quot;{review.text}&quot;</span>
                        ) : (
                          <span className="text-gray-500 italic">
                            No review text available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </>
  );
}
