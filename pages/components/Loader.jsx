import React from 'react';

const Loader = () => {
  return (
    <div>
      <section className="flex justify-center items-center relative w-[90px] h-[103px]">
        <div className="absolute w-[50px] h-[31px]">
          <div className="w-full h-full relative">
            <span className="absolute w-[4px] h-0 bg-[#053146] z-[999999] left-0 animate-[load1_3.2s_ease_infinite]" />
            <span className="absolute w-[4px] h-0 bg-[#053146] z-[999999] right-0 animate-[load3_3.2s_ease_0.8s_infinite]" />
          </div>
        </div>
        <div className="absolute w-[50px] h-[31px] rotate-[60deg]">
          <div className="w-full h-full relative">
            <span className="absolute w-[4px] h-0 bg-[#053146] z-[999999] left-0 animate-[load1_3.2s_ease_infinite]" />
          </div>
        </div>
        <div className="absolute w-[50px] h-[31px] -rotate-[60deg]">
          <div className="w-full h-full relative">
            <span className="absolute w-[4px] h-0 bg-[#053146] z-[999999] right-0 animate-[load2_3.2s_ease_0.4s_infinite]" />
          </div>
        </div>
        <div className="absolute w-[50px] h-[31px]">
          <div className="w-full h-full relative">
            <span className="absolute w-[4px] h-0 bg-[#053146] z-[999999] top-[10px] left-[23px] rotate-90 animate-[load4_3.2s_ease_1s_infinite]" />
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes load1 {
          0% {
            bottom: 0;
            height: 0;
          }

          6.944444444% {
            bottom: 0;
            height: 100%;
          }

          50% {
            top: 0;
            height: 100%;
          }

          59.944444444% {
            top: 0;
            height: 0;
          }
        }

        @keyframes load2 {
          0% {
            top: 0;
            height: 0;
          }

          6.944444444% {
            top: 0;
            height: 100%;
          }

          50% {
            bottom: 0;
            height: 100%;
          }

          59.944444444% {
            bottom: 0;
            height: 0;
          }
        }

        @keyframes load3 {
          0% {
            top: 0;
            height: 0;
          }

          6.944444444% {
            top: 0;
            height: 100%;
          }

          50% {
            bottom: 0;
            height: 100%;
          }

          59.944444444% {
            bottom: 0;
            height: 0;
          }
        }

        @keyframes load4 {
          0% {
            top: 37px;
            left: 23px;
            height: 134%;
          }

          6.944444444% {
            top: 10px;
            height: 134%;
          }

          50% {
            bottom: 10px;
            height: 134%;
          }

          59.944444444% {
            bottom: 0;
            height: 0;
          }
        }

        @keyframes load5 {
          0% {
            bottom: 0;
            height: 0;
          }

          6.944444444% {
            bottom: 0;
            height: 100%;
          }

          50% {
            top: 0;
            height: 100%;
          }

          59.944444444% {
            top: 0;
            height: 0;
          }
        }

        @keyframes load6 {
          0% {
            bottom: 0;
            height: 0;
          }

          6.944444444% {
            bottom: 0;
            height: 100%;
          }

          50% {
            top: 0;
            height: 100%;
          }

          59.944444444% {
            top: 0;
            height: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
