import React from "react";
import Link from "next/link";
import Head from "next/head";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#8B593E] text-white border-t-4 border-[#000000]">
        <div className="lg:max-w-[1300px] mx-auto  py-4">
          <div className="text-center">
            <p className="text-lg">
              © {new Date().getFullYear()} Pearl Homestay. All rights reserved.
            </p>
            <p className="text-sm mt-2">
              Designed & Developed by{" "}
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
