import logo from "@/assets/logo1-removebg-preview.png";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { MdStar } from "react-icons/md";
import { FaQuoteRight } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const educationalQuotes = [
  {
    quote:
      "Education is the most powerful weapon which you can use to change the world.",
    reference: "Nelson Mandela",
  },
  {
    quote:
      "The beautiful thing about learning is that no one can take it away from you.",
    reference: "B.B. King",
  },
  {
    quote:
      "Develop a passion for learning. If you do, you will never cease to grow.",
    reference: "Anthony J. D'Angelo",
  },
  {
    quote:
      "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.",
    reference: "Albert Einstein",
  },
  {
    quote:
      "The roots of education are bitter, but the fruit is sweet.",
    reference: "Aristotle",
  },
];

export default function AuthSidebar() {
  const swiperRef = useRef<any>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  return (
    <div className="hidden flex-1 h-full md:flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-white rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 border-2 border-white rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-8 h-8 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-5 w-6 h-6 border border-white rounded-full"></div>
        <div className="absolute top-20 right-1/3 w-4 h-4 border border-white rounded-full"></div>
      </div>

      {/* Logo and Title */}
      <div className="flex items-center gap-4 mb-8 z-10 transform hover:scale-105 transition-transform duration-300">
        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 text-white text-3xl">
          <LuGraduationCap />
        </div>
        <h1 className="text-white font-bold text-2xl lg:text-3xl xl:text-4xl drop-shadow-lg">
          Ideal Model School
        </h1>
      </div>

      {/* Quote Box with Floating Illustrations */}
      <div className="relative bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 mb-8 max-w-2xl shadow-xl border border-white border-opacity-20 hover:bg-opacity-15 transition-all duration-300 z-10">
        {/* Floating elements around quote */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-bounce shadow-lg pointer-events-none">
          <MdStar className="text-white text-xs" />
        </div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-pulse shadow-lg pointer-events-none">
          <LuGraduationCap className="text-white text-xs" />
        </div>
        <div className="absolute top-1/2 -left-6 w-4 h-4 bg-white bg-opacity-15 rounded-full animate-ping pointer-events-none"></div>
        <div className="absolute top-10 -right-8 w-3 h-3 bg-white bg-opacity-15 rounded-full animate-pulse pointer-events-none"></div>

        <div className="flex items-center justify-center mb-4 pointer-events-none">
          <FaQuoteRight className="text-white text-2xl opacity-60" />
        </div>

        {/* Quote Slider */}
        <div className="relative">
          <Swiper
            ref={swiperRef}
            onSwiper={setSwiperInstance}
            modules={[Autoplay, EffectFade, Navigation]}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={800}
            allowTouchMove={true}
            grabCursor={true}
            className="hadith-swiper"
            style={{
              position: 'relative',
              zIndex: 1,
            }}
          >
            {educationalQuotes.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="text-center py-4">
                  <p className="text-white leading-relaxed w-96 mx-auto text-sm lg:text-base font-light mb-4 min-h-[4rem] lg:min-h-[3rem] flex items-center justify-center">
                    "{item.quote}"
                  </p>
                  <p className="text-white text-xs lg:text-sm opacity-80 font-medium">
                    - {item.reference}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button 
            className="swiper-button-prev-custom absolute left-2 top-1/2 transform -translate-y-1/2 z-30 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 active:scale-95 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Previous quote"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          
          <button 
            className="swiper-button-next-custom absolute right-2 top-1/2 transform -translate-y-1/2 z-30 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 active:scale-95 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Next quote"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}