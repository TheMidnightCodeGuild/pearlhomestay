import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-[#000000] ${
        isScrolled ? 'bg-[#C6A38D]' : 'bg-[#C6A38D]'
      }`}
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center transform hover:scale-105 transition-duration-200"
          >
            <Image
              src="/images/logo.png"
              alt="Homestay Logo"
              width={150}
              height={50}
              className="object-cover w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16 lg:w-32 lg:h-32 border-4 border-[#8B593E] rounded-full shadow-lg"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 
                  ${
                    router.pathname === link.href
                      ? 'text-[#8B593E] bg-[#F2E2D7]'
                      : 'text-[#4A2511] hover:text-[#8B593E] hover:bg-[#F2E2D7]/70'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-now"
              className="ml-2 px-5 py-2 bg-[#8B593E] text-[#F2E2D7] rounded-full font-semibold 
                hover:bg-[#6B4530] transform hover:scale-105 transition-all duration-200 
                shadow-md text-sm lg:text-base flex items-center"
            >
              Book Now
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-[#F2E2D7]/50 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-[#4A2511]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 
                  ${
                    router.pathname === link.href
                      ? 'text-[#8B593E] bg-[#F2E2D7]'
                      : 'text-[#4A2511] hover:text-[#8B593E] hover:bg-[#F2E2D7]/70'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-now"
              className="block mt-4 mx-4 px-6 py-3 bg-[#8B593E] text-[#F2E2D7] rounded-full 
                font-semibold text-center hover:bg-[#6B4530] transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;