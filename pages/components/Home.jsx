// import React, { useState, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";

// const ChevronDown = () => (
//   <svg
//     className="w-4 h-4 text-[#8B593E] pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//     aria-hidden="true"
//   >
//     <path
//       d="M6 9l6 6 6-6"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const CalendarIcon = () => (
//   <svg
//     className="w-5 h-5 text-[#8B593E] mr-2"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//     aria-hidden="true"
//   >
//     <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
//     <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" />
//   </svg>
// );

// const CircleModal = ({ open, onClose, children }) => {
//   const modalRef = useRef(null);

//   React.useEffect(() => {
//     const body = document.body;
//     if (open) {
//       body.style.overflow = "hidden";
//     } else {
//       body.style.overflow = "";
//     }
//     return () => {
//       body.style.overflow = "";
//     };
//   }, [open]);

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
//         open ? "pointer-events-auto" : "pointer-events-none"
//       }`}
//       aria-modal="true"
//       role="dialog"
//     >
//       <div
//         className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
//           open ? "opacity-100" : "opacity-0"
//         }`}
//         onClick={onClose}
//       />
//       <div
//         ref={modalRef}
//         className={`
//           relative flex flex-col items-center justify-center
//           transition-[clip-path,opacity] duration-700 ease-in-out
//           bg-white/30 backdrop-blur-xs px-4 sm:px-8 py-6 sm:py-10 
//           w-[95%] sm:min-w-[300px] md:min-w-[1000px] min-h-[220px] 
//           max-w-[95vw] sm:max-w-[85vw] md:max-w-[75vw] max-h-[95vh] border-2 rounded-3xl
//           overflow-y-auto
//           ${open ? "opacity-100" : "opacity-0"}
//         `}
//         style={{
//           clipPath: open ? "circle(170% at 100% 0%)" : "circle(0% at 100% 0%)",
//         }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// const Home = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [bookingData, setBookingData] = useState({
//     checkIn: "",
//     checkOut: "",
//     adults: 1,
//     children: 0,
//   });

//   const handleInputChange = (field, value) => {
//     setBookingData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleBookingSubmit = (e) => {
//     e.preventDefault();
//     // Add booking logic here
//     console.log("Booking submitted:", bookingData);
//     setModalOpen(false);
//   };

//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <main className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
//       <div className="absolute inset-0 w-full h-full z-0 sm:mt-[121px] mt-[95px]">
//         <Image
//           src="/images/home.png"
//           alt="Homestay Background"
//           fill
//           className="object-cover object-center"
//           priority
//           sizes="100vw"
//         />
//       </div>

//       <section className="w-full flex flex-col md:flex-row items-center justify-between lg:max-w-[1300px] mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32 relative z-10">
//         <div className="flex-1 flex flex-col items-center md:items-start justify-center z-10 md:-mx-20 mt-20 md:mt-28">
//           <h1 className="text-3xl sm:text-4xl md:text-[49px] font-extralight text-[#4A2511] mb-3 uppercase text-center md:text-left font-masiku md:bg-transparent bg-[#F2E2D7]/50 p-2 rounded-lg">
//             Welcome to <span className="text-[#8B593E]">Pearl Homestay</span>
//           </h1>
//           <p className="text-sm sm:text-lg md:text-base text-[#4A2511]/90 mb-4 max-w-lg text-center md:text-left italic md:bg-transparent bg-[#F2E2D7]/50 p-2 rounded-lg">
//             &quot;Experience comfort, warmth, and tranquility at our family-run
//             homestay. Nestled in nature, our cozy rooms and personalized service
//             make you feel right at home.&quot;
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//             <button
//               onClick={() => setModalOpen(true)}
//               className="w-full sm:w-auto px-5 py-3 bg-[#8B593E] text-[#F2E2D7] rounded-full font-semibold text-sm shadow-md hover:bg-[#6B4530] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B593E]/50"
//             >
//               Book Now
//             </button>
//             <Link
//               href="/rooms"
//               className="w-full sm:w-auto px-5 py-3 bg-[#F2E2D7] text-[#8B593E] rounded-full font-semibold text-sm shadow-md hover:bg-[#e5d1c0] transition-all duration-200 text-center"
//             >
//               View Rooms
//             </Link>
//           </div>
//         </div>
//       </section>

//       <CircleModal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <h2 className="text-2xl sm:text-4xl font-semibold text-[#000000] mb-6 text-center">
//           Book Your Stay Now...
//         </h2>
//         <form
//           onSubmit={handleBookingSubmit}
//           className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 w-full justify-center flex-wrap"
//         >
//           {/* Check In */}
//           <div className="flex flex-col w-full md:w-auto">
//             <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-2">
//               <CalendarIcon />
//               <input
//                 type="date"
//                 className="outline-none h-10 text-base sm:text-lg bg-transparent w-full text-[#4A2511] placeholder-[#8B593E]/60"
//                 value={bookingData.checkIn}
//                 onChange={(e) => handleInputChange("checkIn", e.target.value)}
//                 required
//                 min={today}
//               />
//             </div>
//           </div>

//           {/* Check Out */}
//           <div className="flex flex-col w-full md:w-auto">
//             <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-2">
//               <CalendarIcon />
//               <input
//                 type="date"
//                 className="outline-none h-10 text-base sm:text-lg bg-transparent w-full text-[#4A2511] placeholder-[#8B593E]/60"
//                 value={bookingData.checkOut}
//                 onChange={(e) => handleInputChange("checkOut", e.target.value)}
//                 required
//                 min={bookingData.checkIn || today}
//               />
//             </div>
//           </div>

//           {/* Adults */}
//           <div className="flex flex-col w-full sm:w-1/2 md:w-auto">
//             <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-2 w-full md:min-w-[150px]">
//               <span className="text-[#4A2511] font-medium mr-2">Adults</span>
//               <div className="relative flex-1">
//                 <select
//                   value={bookingData.adults}
//                   onChange={(e) =>
//                     handleInputChange("adults", Number(e.target.value))
//                   }
//                   className="w-full appearance-none bg-transparent text-base sm:text-lg text-[#4A2511] pl-2 pr-8 py-1 outline-none cursor-pointer"
//                 >
//                   {Array.from({ length: 10 }, (_, i) => (
//                     <option
//                       key={i + 1}
//                       value={i + 1}
//                       className="py-2 hover:bg-[#F2E2D7]"
//                     >
//                       {i + 1} {i === 0 ? "Adult" : "Adults"}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown />
//               </div>
//             </div>
//           </div>

//           {/* Children */}
//           <div className="flex flex-col w-full sm:w-1/2 md:w-auto">
//             <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-2 min-w-[150px]">
//               <span className="text-[#4A2511] font-medium mr-2">Children</span>
//               <div className="relative flex-1">
//                 <select
//                   value={bookingData.children}
//                   onChange={(e) =>
//                     handleInputChange("children", Number(e.target.value))
//                   }
//                   className="w-full appearance-none bg-transparent text-base sm:text-lg text-[#4A2511] pl-2 pr-8 py-1 outline-none cursor-pointer"
//                 >
//                   {Array.from({ length: 6 }, (_, i) => (
//                     <option
//                       key={i}
//                       value={i}
//                       className="py-2 hover:bg-[#F2E2D7]"
//                     >
//                       {i} {i === 1 ? "Child" : "Children"}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown />
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full sm:w-auto px-6 py-3 bg-[#8B593E] text-[#F2E2D7] rounded-full font-semibold text-lg shadow-md hover:bg-[#6B4530] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B593E]/50 mt-2 md:mt-0"
//           >
//             Book Now
//           </button>
//         </form>

//         <button
//           onClick={() => setModalOpen(false)}
//           className="mt-6 px-4 py-2 bg-[#8B593E] text-[#F2E2D7] rounded-full font-semibold text-lg shadow-md hover:bg-[#6B4530] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B593E]/50"
//         >
//           Close
//         </button>
//       </CircleModal>
//     </main>
//   );
// };

// export default Home;



import Image from "next/image";
import Marquee from "react-fast-marquee";

const Home = () => {
  return (
    <div className="lg:max-w-[1300px]">
    <section className="lg:max-w-[1300px]  flex flex-col md:flex-row justify-center items-center min-h-screen p-4 md:p-8 my-0 sm:my-2 ml-0 sm:ml-16 bg-[#C6A38D]">
      <div className="lg:max-w-[1300px] w-full md:w-1/2 px-4 py-8 sm:px-6 lg:px-8 md:pr-12">
        <div className="md:mb-10 mt-5 sm:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-[49px] font-extralight text-[#4A2511] mb-3 uppercase text-center md:text-left font-masiku md:bg-transparent bg-[#F2E2D7]/50 p-2 rounded-lg">
            Welcome to <span className="text-[#8B593E]">Pearl Homestay</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-base text-[#4A2511]/90 mb-4 max-w-lg text-center md:text-left italic md:bg-transparent bg-[#F2E2D7]/50 p-2 rounded-lg">
            &quot;Experience comfort, warmth, and tranquility at our family-run
            homestay. Nestled in nature, our cozy rooms and personalized service
            make you feel right at home.&quot;
          </p>
        </div>

        <div className="md:hidden">
          <Image
            src="/images/home.png"
            alt="Pearl Homestay"
            width={500}
            height={300}
            className="object-cover rounded-lg shadow-lg"
            priority
          />
        </div>

        <div className="md:hidden py-4">
          <Marquee speed={40} gradientWidth={50}>
            {[
              "Sacred",
              "Ancient", 
              "Serene",
              "Spiritual",
              "Peaceful",
              "Tranquil",
              "Calm",
              "Comfortable",
              "Relaxing",
              "Refreshing",
              "Inviting",
              "Welcoming",
              "Homey",
              "Cozy",
            ].map((word, index) => (
              <span
                key={index}
                className="mx-3 text-sm font-bold italic text-[#8B593E]">
                ✨ {word}
              </span>
            ))}
          </Marquee>
        </div>

        <div className="flex justify-center mt-6">
          <a href="#booking" className="w-full sm:w-auto">
            <button
              type="button"
              className="exploreMoreBtn bg-[#8B593E] hover:bg-[#6B4530] text-[#F2E2D7] font-semibold w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-xl rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#8B593E] focus:ring-opacity-50">
              Book Your Stay Now
            </button>
          </a>
        </div>
      </div>

      <div className="rightSection w-full md:w-1/2 px-4 py-8 sm:px-6 lg:px-8 hidden md:flex justify-center items-center md:pl-12">
        <div className="w-full max-w-xl relative">
          <Image
            src="/images/home.png"
            alt="Pearl Homestay"
            width={800}
            height={600}
            className="object-cover rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
    </div>
  );
};

export default Home;