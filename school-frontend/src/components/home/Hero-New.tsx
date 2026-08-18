"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { BsCheck2Circle, BsArrowRight } from "react-icons/bs";
import { LuGraduationCap, LuAward, LuUsers, LuBookOpen, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import useOnlineCount from "@/hooks/useOnlineCount";
import useDashboardStats from "@/hooks/useDashboardStats";

const heroSlides = [
  {
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80",
    label: "Creative Learning",
    caption: "Joyful and engaging educational environment",
  },
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80",
    label: "Modern Classrooms",
    caption: "Equipped with digital multimedia and interactive tools",
  },
  {
    src: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=900&q=80",
    label: "Science Laboratories",
    caption: "Practical hands-on experiments in high-tech labs",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
    label: "Annual Sports Festival",
    caption: "Active participation in sports and extracurriculars",
  },
];

const HeroNew = () => {
  const { onlineCount } = useOnlineCount();
  const { statsData } = useDashboardStats();

  const totalStudents = statsData?.data?.totalStudents || 1250;
  const totalTeachers = statsData?.data?.totalTeachers || 45;

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative bg-gradient-to-b from-[#F3F8FC] via-[#FFFFFF] to-[#F3F8FC] pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B4E1EB]/30 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F9E8A2]/30 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/4" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1e3a5f] text-white text-xs md:text-sm font-medium shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Online Students: <strong className="text-[#F9E8A2]">{onlineCount} Active</strong></span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B4E1EB]/50 text-[#1e3a5f] text-xs md:text-sm font-semibold border border-[#95BDD7]/40">
                <LuAward className="text-[#78A4CB]" />
                <span>Recognized for Academic Excellence</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#1e3a5f] leading-tight tracking-tight">
              Shaping Tomorrow's Leaders <br />
              <span className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] bg-clip-text text-transparent">
                Through Knowledge & Integrity
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Offering world-class education from Class 6 to Class 10 with state-of-the-art laboratories, multimedia classrooms, and dedicated subject specialists.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              {[
                "Highly Qualified & Specialized Faculty",
                "Digital Multimedia Classrooms & Tech Labs",
                "Science, Humanities & Business Studies Groups",
                "Real-time Digital Attendance & Exam Portals",
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700 text-sm md:text-base font-medium">
                  <BsCheck2Circle className="text-[#78A4CB] text-lg shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/notices"
                className="px-6 py-3.5 rounded-xl bg-[#78A4CB] text-white font-semibold text-base hover:bg-[#6894bb] shadow-lg shadow-[#78A4CB]/30 transition-all flex items-center gap-2"
              >
                <span>View Notice Board</span>
                <BsArrowRight />
              </Link>
              <Link
                href="/results"
                className="px-6 py-3.5 rounded-xl bg-white text-[#1e3a5f] font-semibold text-base border-2 border-[#95BDD7] hover:bg-[#B4E1EB]/20 transition-all"
              >
                Check Results
              </Link>
              <Link
                href="/top-10"
                className="px-6 py-3.5 rounded-xl bg-[#F9E8A2] text-[#5c4300] font-bold text-base hover:bg-[#fae488] transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Top 10 Students</span>
                <LuAward />
              </Link>
            </div>
          </div>

          {/* Right Column: Auto-Sliding Image Carousel */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Carousel Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11] group">
                {/* Slides */}
                {heroSlides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      idx === currentSlide
                        ? "opacity-100 scale-100 z-10"
                        : "opacity-0 scale-105 z-0"
                    }`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102033]/80 via-[#102033]/10 to-transparent" />

                    {/* Slide Caption */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="inline-block px-2.5 py-1 bg-[#F9E8A2] text-[#5c4300] font-bold text-xs rounded-md mb-1.5">
                        {slide.label}
                      </span>
                      <h3 className="text-base md:text-lg font-bold leading-snug">{slide.caption}</h3>
                    </div>
                  </div>
                ))}

                {/* Prev / Next Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                  aria-label="Previous Slide"
                >
                  <LuChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                  aria-label="Next Slide"
                >
                  <LuChevronRight size={18} />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-14 right-4 z-20 flex items-center gap-1.5">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? "w-5 h-2 bg-[#F9E8A2]"
                          : "w-2 h-2 bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -top-5 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#F9E8A2] flex items-center gap-3.5 z-30">
                <div className="w-12 h-12 rounded-xl bg-[#F9E8A2]/50 text-[#5c4300] flex items-center justify-center text-2xl">
                  <LuGraduationCap />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Board Exam Pass Rate</p>
                  <p className="text-xl font-extrabold text-emerald-600">100% Success</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Counter Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white shadow-md border border-[#B4E1EB]/60">
          <div className="text-center p-3 border-r border-gray-100">
            <div className="flex justify-center text-[#78A4CB] text-2xl mb-1"><LuUsers /></div>
            <p className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">{totalStudents}+</p>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5">Active Students</p>
          </div>
          <div className="text-center p-3 border-r border-gray-100">
            <div className="flex justify-center text-[#78A4CB] text-2xl mb-1"><LuBookOpen /></div>
            <p className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">{totalTeachers}+</p>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5">Faculty Members</p>
          </div>
          <div className="text-center p-3 border-r border-gray-100">
            <div className="flex justify-center text-[#78A4CB] text-2xl mb-1"><LuAward /></div>
            <p className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">98.5%</p>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5">GPA 5.0 & Merit Rate</p>
          </div>
          <div className="text-center p-3">
            <div className="flex justify-center text-[#78A4CB] text-2xl mb-1"><LuGraduationCap /></div>
            <p className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">30+ Years</p>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5">Academic Legacy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;