import React, { useEffect, useState } from "react";
import gsap from "gsap";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if loader has been shown before
    if (sessionStorage.getItem("loaderShown")) {
      setIsLoading(false);
      return;
    }

    // Animate text first
    gsap.from(".welcome-text", {
      duration: 0.5,
      opacity: 0,
      delay: 1,
      y: 50,
      ease: "power2.out"
    });

    // Then slide up loader after delay
    const timer = setTimeout(() => {
      gsap.to(".loading", {
        duration: 1,
        y: "-100%",
        ease: "power3.inOut",
        onComplete: () => {
          setIsLoading(false);
          sessionStorage.setItem("loaderShown", "true");
        },
      });
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-[#F5EBE0] z-[9999] flex items-center justify-center loading">
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-24 h-24">
          {/* Circular loader with 3 rings */}
          <div className="absolute inset-0 border-4 border-[#8B593E] rounded-full animate-[spin_3s_linear_infinite]"></div>
          <div className="absolute inset-2 border-4 border-[#8B593E] rounded-full animate-[spin_2s_linear_infinite]"></div>
          <div className="absolute inset-4 border-4 border-[#8B593E] rounded-full animate-[spin_1s_linear_infinite]"></div>
          
          {/* Center dot */}
          <div className="absolute inset-[42%] bg-[#8B593E] rounded-full animate-pulse"></div>
        </div>
        
        <p className="welcome-text text-2xl font-masiku text-[#8B593E]">
          Welcome to Pearl Home Stay
        </p>
      </div>
    </div>
  );
};

export default Loader;
