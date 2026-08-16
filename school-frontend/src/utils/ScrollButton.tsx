"use client";

import { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

const ScrollToTop = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollPercent(percent);
      setVisible(scrollTop > 200); 
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollPercent / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-500 ease-out hover:shadow-xl ${
        visible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-6 opacity-0 scale-75 pointer-events-none"
      }`}
    >
      <svg
        className="absolute inset-0 h-14 w-14 -rotate-90"
        viewBox="0 0 48 48"
      >

        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="3"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#ffd54f"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>


      <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 hover:scale-110">
        <LuArrowUp size={18} />
      </span>
    </button>
  );
};

export default ScrollToTop;