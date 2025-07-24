"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Head from "next/head";

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "enquiries"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        createdAt: new Date(),
      });

      alert("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        className="py-8 xs:py-12 sm:py-16 md:py-24 bg-[#C6A38D] border-l-[5px] xs:border-l-[8px] sm:border-l-[10px] border-r-[5px] xs:border-r-[8px] sm:border-r-[10px] border-[#ffffff]"
      >
        <div
          ref={sectionRef}
          className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8"
        >
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 xs:gap-6 sm:gap-8">
            <div className="lg:mb-0 mb-4 xs:mb-6 sm:mb-8">
              <div className="group w-full h-full min-h-[300px] xs:min-h-[350px] sm:min-h-[400px] md:min-h-[500px]">
                <div className="relative h-full border-4 xs:border-5 sm:border-6 rounded-2xl xs:rounded-3xl sm:rounded-4xl border-[#ffffff]">
                  <Image
                    src="/images/contact.png"
                    alt="Pearl Homestay Ujjain Contact Office"
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full rounded-xl xs:rounded-2xl lg:rounded-l-2xl object-cover"
                  />

                  <div className="absolute bottom-0 w-full p-3 xs:p-4 sm:p-6 md:p-8 lg:p-11">
                    <div className="bg-[#1A1A1A]/80 rounded-lg p-3 xs:p-4 sm:p-6 block">
                      <div className="flex items-center mb-3 xs:mb-4 sm:mb-6">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="xs:w-[24px] xs:h-[24px] sm:w-[30px] sm:h-[30px]"
                          aria-label="Phone Icon"
                        >
                          <path
                            d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z"
                            stroke="#F2E2D7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <h5 className="text-[#F2E2D7] text-sm xs:text-base sm:text-lg font-semibold leading-6 ml-2 xs:ml-3 sm:ml-5">
                          +9194562-94563
                        </h5>
                      </div>
                      <div className="flex items-center mb-3 xs:mb-4 sm:mb-6">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="xs:w-[24px] xs:h-[24px] sm:w-[30px] sm:h-[30px]"
                          aria-label="Email Icon"
                        >
                          <path
                            d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z"
                            stroke="#F2E2D7"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <h5 className="text-[#F2E2D7] text-sm xs:text-base sm:text-lg font-semibold leading-6 ml-2 xs:ml-3 sm:ml-5 break-all">
                          pearlhomestayujjain@gmail.com
                        </h5>
                      </div>

                      <div className="flex items-start">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="xs:w-[24px] xs:h-[24px] sm:w-[30px] sm:h-[30px] mt-1"
                          aria-label="Location Icon"
                        >
                          <path
                            d="M25 12.9169C25 17.716 21.1939 21.5832 18.2779 24.9828C16.8385 26.6609 16.1188 27.5 15 27.5C13.8812 27.5 13.1615 26.6609 11.7221 24.9828C8.80612 21.5832 5 17.716 5 12.9169C5 10.1542 6.05357 7.5046 7.92893 5.55105C9.8043 3.59749 12.3478 2.5 15 2.5C17.6522 2.5 20.1957 3.59749 22.0711 5.55105C23.9464 7.5046 25 10.1542 25 12.9169Z"
                            stroke="#F2E2D7"
                            strokeWidth="2"
                          />
                          <path
                            d="M17.5 11.6148C17.5 13.0531 16.3807 14.219 15 14.219C13.6193 14.219 12.5 13.0531 12.5 11.6148C12.5 10.1765 13.6193 9.01058 15 9.01058C16.3807 9.01058 17.5 10.1765 17.5 11.6148Z"
                            stroke="#F2E2D7"
                            strokeWidth="2"
                          />
                        </svg>
                        <h5 className="text-[#F2E2D7] text-sm xs:text-base sm:text-lg font-semibold leading-6 ml-2 xs:ml-3 sm:ml-5">
                          B - 61, Arpita Enclave, Near Jain Lassi, Ujjain,
                          Madhya Pradesh 456010
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#1A1A1A] p-3 xs:p-4 sm:p-6 md:p-8 lg:p-11 rounded-xl xs:rounded-2xl border-[5px] xs:border-[8px] sm:border-[10px]">
              <h2 className="text-[#E69500] font-manrope text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-4 xs:mb-6 sm:mb-8 md:mb-11">
                Contact Us
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 xs:space-y-6 sm:space-y-8 md:space-y-10"
              >
                <input
                  className="w-full h-9 xs:h-10 sm:h-12 text-[#F2E2D7] placeholder-gray-400 shadow-sm bg-transparent text-sm xs:text-base sm:text-lg font-normal leading-7 rounded-full border border-[#F2E2D7] focus:outline-none px-3 xs:px-4"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  type="text"
                  aria-label="Name"
                />
                <input
                  className="w-full h-9 xs:h-10 sm:h-12 text-[#F2E2D7] placeholder-gray-400 shadow-sm bg-transparent text-sm xs:text-base sm:text-lg font-normal leading-7 rounded-full border border-[#F2E2D7] focus:outline-none px-3 xs:px-4"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                  aria-label="Email"
                />
                <input
                  className="w-full h-9 xs:h-10 sm:h-12 text-[#F2E2D7] placeholder-gray-400 shadow-sm bg-transparent text-sm xs:text-base sm:text-lg font-normal leading-7 rounded-full border border-[#F2E2D7] focus:outline-none px-3 xs:px-4"
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  type="tel"
                  aria-label="Phone"
                />
                <textarea
                  className="w-full h-20 xs:h-24 sm:h-32 text-[#F2E2D7] placeholder-gray-400 bg-transparent text-sm xs:text-base sm:text-lg shadow-sm font-normal leading-7 rounded-2xl xs:rounded-3xl border border-[#F2E2D7] focus:outline-none p-3 xs:p-4"
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-label="Message"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-9 xs:h-10 sm:h-12 text-[#1A1A1A] text-xs xs:text-sm sm:text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-[#F2E2D7] bg-[#E69500] shadow-sm flex items-center justify-center"
                  aria-label="Send Message"
                >
                  {loading ? (
                    <div className="w-5 xs:w-6 h-5 xs:h-6 border-2 border-t-transparent border-[#1A1A1A] rounded-full animate-spin"></div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
