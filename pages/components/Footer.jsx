import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg">© {new Date().getFullYear()} Pearl Homestay. All rights reserved.</p>
          <p className="text-sm mt-2">Designed & Developed by Noxalgo LLP</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
