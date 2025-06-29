import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const HomePage = () => {
  const desktopImageRef = useRef(null);
  const mobileImageRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
  });

  useEffect(() => {
    // Animation for both mobile and desktop images
    const images = [desktopImageRef.current, mobileImageRef.current];
    
    // Add 4 second delay before animation
    setTimeout(() => {
      images.forEach(image => {
        if (image) {
          gsap.from(image, {
            duration: 1.5,
            x: "-100%",
            rotation: 360,
            ease: "power2.out",
          });
        }
      });
    }, 3000);
  }, []);

  const handleInputChange = (field, value) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", bookingData);
    setModalOpen(false);
  };

  const today = new Date().toISOString().split("T")[0];

  const ChevronDown = () => (
    <svg
      className="w-4 h-4 text-[#8B593E] pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const CalendarIcon = () => (
    <svg
      className="w-5 h-5 text-[#8B593E] mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" />
    </svg>
  );

  const CircleModal = ({ open, onClose, children }) => {
    const modalRef = useRef(null);

    useEffect(() => {
      const body = document.body;
      if (open) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }
      return () => {
        body.style.overflow = "";
      };
    }, [open]);

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-modal="true"
        role="dialog"
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />
        <div
          ref={modalRef}
          className={`
            relative flex flex-col items-center justify-center
            transition-[clip-path,opacity] duration-700 ease-in-out
            bg-white/30 backdrop-blur-xs px-4 sm:px-8 py-6 sm:py-10
            w-[95%] sm:min-w-[300px] md:min-w-[1000px] min-h-[220px]
            max-w-[95vw] sm:max-w-[85vw] md:max-w-[75vw] max-h-[95vh] border-2 rounded-3xl
            overflow-y-auto
            ${open ? "opacity-100" : "opacity-0"}
          `}
          style={{
            clipPath: open
              ? "circle(170% at 100% 0%)"
              : "circle(0% at 100% 0%)",
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <section className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4 md:p-8 mt-2 bg-[#C6A38D] border-[10px] border-[#8B593E]">
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
            alt="Pearl Homestay"
            width={500}
            height={300}
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <p className="text-[13px] sm:text-base md:text-base text-[#4A2511]/90 mt-4 max-w-lg mx-auto md:mx-0 italic  md:bg-transparent  rounded-lg mb-5 font-bold text-center">
          &quot;Experience comfort, warmth, and tranquility at our family-run
          homestay. Nestled in nature, our cozy rooms and personalized service
          make you feel right at home.&quot;
        </p>

        <div className="flex justify-center md:justify-start sm:mx-48 mx-0">
          <button
            onClick={() => setModalOpen(true)}
            type="button"
            className="w-28 sm:w-auto  py-2 sm:px-4 sm:py-1.5  bg-[#8B593E] text-[#F2E2D7] rounded-full font-semibold text-base sm:text-lg shadow-md hover:bg-[#6B4530] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B593E]/50"
          >
            Book Now
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 px-4 py-8 sm:px-6 lg:px-8 hidden md:flex justify-center items-center md:pl-12">
        <div className="w-full max-w-xl relative mt-10" ref={desktopImageRef}>
          <Image
            src="/images/home.png"
            alt="Pearl Homestay"
            width={800}
            height={600}
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>

      <CircleModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="w-full max-w-4xl mx-auto px-4">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-semibold text-[#000000] mb-6 text-center">
            Book Your Stay Now...
          </h2>
          <form
            onSubmit={handleBookingSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
          >
            {/* Check In */}
            <div className="flex flex-col">
              <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-2">
                <CalendarIcon />
                <input
                  type="date"
                  className="outline-none h-10 text-sm sm:text-base bg-transparent w-full text-[#4A2511]"
                  value={bookingData.checkIn}
                  onChange={(e) => handleInputChange("checkIn", e.target.value)}
                  required
                  min={today}
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex flex-col">
              <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-2">
                <CalendarIcon />
                <input
                  type="date"
                  className="outline-none h-10 text-sm sm:text-base bg-transparent w-full text-[#4A2511]"
                  value={bookingData.checkOut}
                  onChange={(e) =>
                    handleInputChange("checkOut", e.target.value)
                  }
                  required
                  min={bookingData.checkIn || today}
                />
              </div>
            </div>

            {/* Adults */}
            <div className="flex flex-col">
              <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-2">
                <span className="text-[#4A2511] font-medium text-sm sm:text-base mr-2">
                  Adults
                </span>
                <div className="relative flex-1">
                  <select
                    value={bookingData.adults}
                    onChange={(e) =>
                      handleInputChange("adults", Number(e.target.value))
                    }
                    className="w-full appearance-none bg-transparent text-sm sm:text-base text-[#4A2511] pl-2 pr-8 py-1 outline-none cursor-pointer"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? "Adult" : "Adults"}
                      </option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </div>
            </div>

            {/* Children */}
            <div className="flex flex-col">
              <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-2">
                <span className="text-[#4A2511] font-medium text-sm sm:text-base mr-2">
                  Children
                </span>
                <div className="relative flex-1">
                  <select
                    value={bookingData.children}
                    onChange={(e) =>
                      handleInputChange("children", Number(e.target.value))
                    }
                    className="w-full appearance-none bg-transparent text-sm sm:text-base text-[#4A2511] pl-2 pr-8 py-1 outline-none cursor-pointer"
                  >
                    {Array.from({ length: 6 }, (_, i) => (
                      <option key={i} value={i}>
                        {i} {i === 1 ? "Child" : "Children"}
                      </option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 mt-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#8B593E] text-[#F2E2D7] rounded-full font-semibold text-base sm:text-lg shadow-md hover:bg-[#6B4530] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B593E]/50"
              >
                Book Now
              </button>
            </div>
          </form>

          {/* Close Modal Button */}
          <button
            onClick={() => setModalOpen(false)}
            className="mt-6 px-4 py-2 bg-[#8B593E] text-[#F2E2D7] rounded-full font-semibold text-base sm:text-lg shadow-md hover:bg-[#6B4530] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B593E]/50"
          >
            Close
          </button>
        </div>
      </CircleModal>
    </section>
  );
};

export default HomePage;
