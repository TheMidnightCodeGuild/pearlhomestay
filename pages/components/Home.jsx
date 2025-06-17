import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CircleModal = ({ open, onClose, children }) => {
  const modalRef = useRef(null);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className={`
          relative flex flex-col items-center justify-center
          transition-[clip-path,opacity] duration-700 ease-in-out
          bg-[#C6A38D]/60 backdrop-blur-sm px-4 sm:px-8 py-6 sm:py-10 
          w-[95%] sm:min-w-[300px] md:min-w-[1000px] min-h-[220px] 
          max-w-[95vw] max-h-[95vh] border-2 rounded-3xl
          ${open ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          clipPath: open
            ? 'circle(170% at 100% 0%)'
            : 'circle(0% at 100% 0%)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

const ChevronDown = () => (
  <svg 
    className="w-4 h-4 text-[#8B593E] pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setModalOpen(false);
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0 mt-[145.1px]">
        <Image
          src="/images/home.png"
          alt="Homestay Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <section className="w-full flex flex-col md:flex-row items-center justify-between lg:max-w-[1300px] mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32 relative z-10">
        <div className="flex-1 flex flex-col items-center md:items-start justify-center z-10 md:-mx-28 mt-20 md:mt-28">
          <h1 className="text-3xl sm:text-4xl md:text-[43px] font-semibold text-[#4A2511] mb-3 uppercase text-center md:text-left">
            Welcome to <span className="text-[#8B593E]">Pearl Homestay</span>
          </h1>
          <p className="text-base sm:text-lg md:text-base text-[#4A2511]/90 mb-4 max-w-lg text-center md:text-left mx-4 md:mx-10 italic">
            Experience comfort, warmth, and tranquility at our family-run homestay. Nestled in nature, our cozy rooms and personalized service make you feel right at home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mx-4 md:mx-44">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 bg-[#8B593E] text-[#F2E2D7] rounded-full font-semibold text-sm shadow-md hover:bg-[#6B4530] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B593E]/50"
            >
              Book Now
            </button>
            <Link
              href="/rooms"
              className="w-full sm:w-auto px-5 py-3 bg-[#F2E2D7] text-[#8B593E] rounded-full font-semibold text-sm shadow-md hover:bg-[#e5d1c0] transition-all duration-200 text-center"
            >
              View Rooms
            </Link>
          </div>
        </div>
      </section>

      <CircleModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl sm:text-4xl font-semibold text-[#000000] mb-6 text-center">
          Book Your Stay Now...
        </h2>
        <form
          onSubmit={handleBookingSubmit}
          className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 w-full justify-center"
        >
          {/* Check In */}
          <div className="flex flex-col w-full md:w-auto">
            <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-2">
              <svg className="w-5 h-5 text-[#8B593E] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" />
              </svg>
              <input
                type="date"
                className="outline-none h-10 text-base sm:text-lg bg-transparent w-full text-[#4A2511] placeholder-[#8B593E]/60"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Check Out */}
          <div className="flex flex-col w-full md:w-auto">
            <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-2">
              <svg className="w-5 h-5 text-[#8B593E] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" />
              </svg>
              <input
                type="date"
                className="outline-none h-10 text-base sm:text-lg bg-transparent w-full text-[#4A2511] placeholder-[#8B593E]/60"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                required
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Adults */}
          <div className="flex flex-col w-full md:w-auto">
            <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-2 w-full md:min-w-[150px]">
              <span className="text-[#4A2511] font-medium mr-2">Adults</span>
              <div className="relative flex-1">
                <select
                  value={adults}
                  onChange={e => setAdults(Number(e.target.value))}
                  className="w-full appearance-none bg-transparent text-base sm:text-lg text-[#4A2511] pl-2 pr-8 py-1 outline-none cursor-pointer"
                >
                  {[...Array(10)].map((_, i) => (
                    <option
                      key={i + 1}
                      value={i + 1}
                      className="py-2 hover:bg-[#F2E2D7]"
                    >
                      {i + 1} {i === 0 ? 'Adult' : 'Adults'}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>
          </div>

          {/* Children */}
          <div className="flex flex-col w-full md:w-auto">
            <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-2 min-w-[150px]">
              <span className="text-[#4A2511] font-medium mr-2">Children</span>
              <div className="relative flex-1">
                <select
                  value={children}
                  onChange={e => setChildren(Number(e.target.value))}
                  className="w-full appearance-none bg-transparent text-lg text-[#4A2511] pl-2 pr-8 py-1 outline-none cursor-pointer"
                >
                  {[...Array(6)].map((_, i) => (
                    <option
                      key={i}
                      value={i}
                      className="py-2 hover:bg-[#F2E2D7]"
                    >
                      {i} {i === 1 ? 'Child' : 'Children'}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-[#8B593E] text-[#F2E2D7] rounded-full font-semibold text-lg shadow-md hover:bg-[#6B4530] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B593E]/50"
          >
            Book Now
          </button>
        </form>

        <button
          onClick={() => setModalOpen(false)}
          className="mt-6 px-4 py-2 bg-[#8B593E] text-[#F2E2D7] rounded-full font-semibold text-lg shadow-md hover:bg-[#6B4530] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B593E]/50"
        >
          Close
        </button>
      </CircleModal>
    </main>
  )
}

export default Home