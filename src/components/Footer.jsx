import React from "react";

function Footer() {
  return (
    <>
      <footer className="w-full bg-white/20 backdrop-blur-[14px] overflow-hidden rounded-t-[2vw] shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
        <section className="relative flex flex-col justify-center items-center text-center px-6 py-10 sm:py-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-[25vw] h-[25vw] bg-white/40 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-[25vw] h-[25vw] bg-white/20 rounded-full blur-[90px]"></div>

          <h1 className="relative z-10 bg-linear-to-b from-black/90 via-black/70 to-black/40 text-transparent bg-clip-text text-[10vw] sm:text-[8vw] lg:text-[5vw] font-extrabold tracking-tight leading-none drop-shadow-sm">
            <span className="text-[#F66435]">Device</span>Compare
          </h1>

          <div className="relative z-10 w-[10vw] h-0.5 bg-linear-to-r from-transparent via-black/40 to-transparent my-3"></div>

          <p className="relative z-10 text-black/70 text-sm sm:text-base lg:text-[0.95rem] leading-relaxed max-w-[70ch] font-medium tracking-wide">
            This platform wasn't created to sell you a device — it was created
            to help you understand it.
            <br />
            <br />
            From mobiles to laptops, you don't just compare features here — you
            compare experiences. The design stays quiet so your clarity gets
            loud. The interface stays simple while the logic works hard
            underneath.
          </p>
        </section>

        <section className="relative w-full bg-white/20 backdrop-blur-[14px] rounded-[2vw] mx-auto mb-6 max-w-[95%] shadow-inner overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 px-8 py-8">
            <div className="lg:w-[45%] flex flex-col justify-center gap-2 text-center lg:text-left">
              <h1 className="text-2xl font-semibold text-[#2c2c2c] tracking-wide drop-shadow-sm">
                Created with Purpose
              </h1>
              <p className="text-[0.85rem] text-[#444] leading-relaxed">
                Built with clarity and intent — every section shaped for
                understanding, not noise. It's not just a comparison tool; it's
                a commitment to precision, where specs turn into sense and
                choices finally feel clear.
              </p>

              <div className="flex justify-center lg:justify-start items-center gap-4 mt-2">
                <a
                  href="#"
                  className="text-[#333] text-lg hover:text-black transition-all duration-300"
                >
                  <i className="ri-facebook-fill"></i>
                </a>
                <a
                  href="#"
                  className="text-[#333] text-lg hover:text-black transition-all duration-300"
                >
                  <i className="ri-instagram-fill"></i>
                </a>
                <a
                  href="#"
                  className="text-[#333] text-lg hover:text-black transition-all duration-300"
                >
                  <i className="ri-twitter-fill"></i>
                </a>
                <a
                  href="#"
                  className="text-[#333] text-lg hover:text-black transition-all duration-300"
                >
                  <i className="ri-linkedin-fill"></i>
                </a>
              </div>
            </div>

            <div className="relative lg:w-[45%] w-full h-[12vw] sm:h-[10vw] rounded-[1.5vw] bg-black/40 overflow-hidden flex items-center justify-center shadow-inner">
              <canvas id="footerCanvas" className="absolute inset-0"></canvas>
              <div className="absolute bottom-2 right-4 text-xs text-black italic opacity-70">
                "Emotions, not coded"
              </div>
            </div>
          </div>

          <div className="relative w-full h-px bg-linear-to-r from-transparent via-black/20 to-transparent"></div>

          <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-3 text-[#333] text-[0.8rem]">
            <h1 className="font-light tracking-wide text-center sm:text-left">
              © 2025 DeviceCompare. All rights reserved.
            </h1>

            <div className="flex items-center justify-center gap-4 mt-2 sm:mt-0 font-medium">
              <a href="#" className="hover:underline hover:text-black">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline hover:text-black">
                Terms of Service
              </a>
              <a href="#" className="hover:underline hover:text-black">
                Contact
              </a>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}

export default Footer;
