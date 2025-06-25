import React, { useEffect, useState } from "react";
import gsap from "gsap";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if loader has been shown before
    if (sessionStorage.getItem("loaderShown")) {
      setIsLoading(false);
      return;
    }

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial mobile state
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);
    //     // Animate loader sliding up after delay
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
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-[#fafafb] z-[9999] flex items-center justify-center loading">
      <div className="flex flex-col items-center px-4">
        {isMobile ? (
          <div className="w-[100px] h-[100px] border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        ) : (
          <div className="flex justify-center items-center relative w-[90px] h-[103px] mb-4">
            <div className="absolute w-[50px] h-[31px]">
              <div className="w-full h-full relative">
                <span className="absolute w-[4px] h-0 bg-[#053146] z-[999999] left-0 animate-[load1_3.2s_ease_infinite]" />
                <span className="absolute w-[4px] h-0 bg-[#053146] z-[999999] right-0 animate-[load3_3.2s_ease_0.8s_infinite]" />
              </div>
            </div>
            <div className="absolute w-[50px] h-[31px] rotate-60">
              <div className="w-full h-full relative">
                <span className="absolute w-[4px] h-0 bg-[#053146] z-[999999] left-0" />
              </div>
            </div>
            <div className="absolute w-[50px] h-[31px] -rotate-60">
              <div className="w-full h-full relative">
                <span className="absolute w-[4px] h-0 bg-[#053146] z-[999999] right-0 animate-[load2_3.2s_ease_0.4s_infinite]" />
              </div>
            </div>
            <div className="absolute w-[50px] h-[31px]">
              <div className="w-full h-full relative">
                <span className="absolute w-[4px] h-0 bg-[#053146] z-[999999] top-[10px] left-[23px] rotate-90 animate-[load4_3.2s_ease_1s_infinite]" />
              </div>
            </div>
          </div>
        )}
        <p className="text-lg sm:text-xl font-semibold">Loading...</p>
      </div>
    </div>
  );
};

// Add these keyframes to your global CSS or tailwind.config.js
/*
@keyframes load1 {
  0% { bottom: 0; height: 0; }
  6.944444444% { bottom: 0; height: 100%; }
  50% { top: 0; height: 100%; }
  59.944444433% { top: 0; height: 0; }
}

@keyframes load2 {
  0% { top: 0; height: 0; }
  6.944444444% { top: 0; height: 100%; }
  50% { bottom: 0; height: 100%; }
  59.944444433% { bottom: 0; height: 0; }
}

@keyframes load3 {
  0% { top: 0; height: 0; }
  6.944444444% { top: 0; height: 100%; }
  50% { bottom: 0; height: 100%; }
  59.94444443% { bottom: 0; height: 0; }
}

@keyframes load4 {
  0% { height: 0; }
  6.944444444% { height: 31px; }
  50% { height: 31px; }
  59.94444443% { height: 0; }
}
*/

export default Loader;
