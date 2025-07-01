import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const Footer = () => {
  return (
    <>
      <Head>
        <title>Pearl Homestay Ujjain - Comfortable Stay Near Mahakal Temple</title>
        <meta name="description" content="Pearl Homestay offers comfortable accommodation near Mahakaleshwar Temple in Ujjain. Book your stay with us for a memorable spiritual experience." />
        <meta name="keywords" content="Pearl Homestay, Ujjain accommodation, Mahakal Temple stay, homestay near Mahakaleshwar Temple" />
        <meta property="og:title" content="Pearl Homestay Ujjain - Comfortable Stay Near Mahakal Temple" />
        <meta property="og:description" content="Pearl Homestay offers comfortable accommodation near Mahakaleshwar Temple in Ujjain. Book your stay with us for a memorable spiritual experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pearlhomestayujjain.in" />
        <link rel="canonical" href="https://pearlhomestayujjain.in" />
      </Head>
      <footer className="bg-[#8B593E] text-white border-t-4 border-[#000000]">
        <div className="lg:max-w-[1300px] mx-auto  py-4">
          <div className="text-center">
            <p className="text-lg">© {new Date().getFullYear()} Pearl Homestay. All rights reserved.</p>
            <p className="text-sm mt-2">
              Designed & Developed by{' '}
              <Link 
                href="https://www.noxalgo.com" 
                target="_blank"
                rel="noopener noreferrer" 
                className="font-bold hover:text-[#F2E2D7] transition-colors"
                aria-label="Visit Noxalgo LLP website"
              >
                Noxalgo LLP
              </Link>
            </p>
          </div>  
        </div>
      </footer>
    </>
  );
};

export default Footer;
