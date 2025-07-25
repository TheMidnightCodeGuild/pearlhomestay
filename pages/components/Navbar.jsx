import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#gallery", label: "Gallery" },
  { href: "#amenities", label: "Services" },
  { href: "#contact", label: "Contact Us" },
  { href: "/ujjain", label: "Insights" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled past threshold
      setIsScrolled(currentScrollY > 10);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-t-[10px] border-r-[10px] border-l-[10px] border-[#ffffff] bg-[#C6A38D] ${
          isScrolled ? "bg-[#C6A38D] shadow-md" : "bg-[#C6A38D]"
        } ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1300px] mx-auto px-2 xs:px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center relative"
              aria-label="Pearl Homestay Ujjain - Home"
            >
              <span className="block relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-14 md:w-36 md:h-24 lg:w-44 lg:h-[120px]">
                <Image
                  src="/images/logo1.png"
                  alt="Pearl Homestay Ujjain"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 480px) 64px, (max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 144px, 176px"
                />
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div
              className="hidden md:flex items-center space-x-1 lg:space-x-3"
              role="menubar"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm lg:text-sm font-medium transition-all duration-200 relative group 
                    ${
                      router.pathname === link.href
                        ? "text-[#4A2511] "
                        : "text-[#4A2511] hover:text-[#8B593E]"
                    }`}
                  aria-current={
                    router.pathname === link.href ? "page" : undefined
                  }
                  role="menuitem"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B593E] transition-all duration-300 group-hover:w-[100%]"></span>
                </Link>
              ))}
              <Link
                href="/booking"
                className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#8B593E] rounded-full shadow-md group"
                role="menuitem"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#8B593E] group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-[#8B593E] transition-all duration-300 transform group-hover:translate-x-full ease">
                  Book Now
                </span>
                <span className="relative invisible">Book Now</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-[#F2E2D7]/50 transition-colors duration-200"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="w-5 h-5 xs:w-6 xs:h-6 text-[#4A2511]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={!isMenuOpen}
            role="menu"
          >
            <div className="py-2 xs:py-3 space-y-1 xs:space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 xs:px-4 py-2 xs:py-3 rounded-lg text-sm xs:text-base font-medium transition-all duration-200 relative group
                    ${
                      router.pathname === link.href
                        ? "text-[#8B593E] bg-[#F2E2D7]"
                        : "text-[#4A2511] hover:text-[#8B593E]"
                    }`}
                  aria-current={
                    router.pathname === link.href ? "page" : undefined
                  }
                  role="menuitem"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B593E] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <Link
                href="/booking"
                className="block px-3 xs:px-4 py-2"
                role="menuitem"
              >
                <div className="relative inline-flex items-center justify-center p-3 xs:p-4 px-4 xs:px-6 py-2 xs:py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-[#8B593E] rounded-full shadow-md group w-full">
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#ffffff] group-hover:translate-x-0 ease">
                    <svg
                      className="w-5 h-5 xs:w-6 xs:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-[#ffffff] transition-all duration-300 transform group-hover:translate-x-full ease text-sm xs:text-base">
                    Book Now
                  </span>
                  <span className="relative invisible text-[#ffffff] text-sm xs:text-base">
                    Book Now
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
