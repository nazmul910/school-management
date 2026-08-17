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
    label: "সৃজনশীল শিক্ষা",
    caption: "শিক্ষার্থীদের আনন্দময় পাঠদান পরিবেশ",
  },
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80",
    label: "আধুনিক শ্রেণিকক্ষ",
    caption: "ডিজিটাল মাল্টিমিডিয়া ক্লাসরুম সুবিধা",
  },
  {
    src: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=900&q=80",
    label: "বিজ্ঞান ল্যাব",
    caption: "আধুনিক বিজ্ঞানাগারে ব্যবহারিক পরীক্ষা-নিরীক্ষা",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
    label: "বার্ষিক ক্রীড়া উৎসব",
    caption: "সহপাঠ্য কার্যক্রমে শিক্ষার্থীদের সক্রিয় অংশগ্রহণ",
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
                <span>অনলাইনে শিক্ষার্থী: <strong className="text-[#F9E8A2]">{onlineCount} জন</strong></span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B4E1EB]/50 text-[#1e3a5f] text-xs md:text-sm font-semibold border border-[#95BDD7]/40">
                <LuAward className="text-[#78A4CB]" />
                <span>শ্রেষ্ঠ শিক্ষা প্রতিষ্ঠান স্বীকৃতিপ্রাপ্ত</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#1e3a5f] leading-tight tracking-tight">
              শিক্ষা, শৃঙ্খলা ও নৈতিকতায় <br />
              <span className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] bg-clip-text text-transparent">
                গড়ে উঠুক আগামীর ভবিষ্যৎ
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              আধুনিক বিজ্ঞানাগার, মাল্টিমিডিয়া ক্লাসরুম এবং অভিজ্ঞ শিক্ষকমণ্ডলীর নিবিড় পরিচর্যায় ৬ষ্ঠ থেকে ১০ম শ্রেণির শিক্ষার্থীদের জন্য আন্তর্জাতিক মানসম্পন্ন শিক্ষা নিশ্চিত করাই আমাদের অঙ্গীকার।
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              {[
                "অভিজ্ঞ ও বিষয়ভিত্তিক শিক্ষকমণ্ডলী",
                "ডিজিটাল ক্লাসরুম ও বিজ্ঞান ল্যাব",
                "বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা গ্রুপ",
                "ডিজিটাল উপস্থিতি ও নিয়মিত ফলাফল",
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
                <span>নোটিশ বোর্ড দেখুন</span>
                <BsArrowRight />
              </Link>
              <Link
                href="/results"
                className="px-6 py-3.5 rounded-xl bg-white text-[#1e3a5f] font-semibold text-base border-2 border-[#95BDD7] hover:bg-[#B4E1EB]/20 transition-all"
              >
                পরীক্ষার ফলাফল
              </Link>
              <Link
                href="/top-10"
                className="px-6 py-3.5 rounded-xl bg-[#F9E8A2] text-[#5c4300] font-bold text-base hover:bg-[#fae488] transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>সেরা ১০ শিক্ষার্থী</span>
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

                {/* Prev / Next Buttons (visible on group hover) */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                >
                  <LuChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
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
                    />
                  ))}
                </div>
              </div>

              {/* Floating Stat Card 1 */}
              {/* <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#B4E1EB] flex items-center gap-3.5 z-30">
                <div className="w-12 h-12 rounded-xl bg-[#B4E1EB]/40 text-[#1e3a5f] flex items-center justify-center text-2xl">
                  <LuUsers />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">বর্তমান শিক্ষার্থী</p>
                  <p className="text-xl font-extrabold text-[#1e3a5f]">{totalStudents}+ জন</p>
                </div>
              </div> */}

              {/* Floating Stat Card 2 */}
              <div className="absolute -top-5 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#F9E8A2] flex items-center gap-3.5 z-30">
                <div className="w-12 h-12 rounded-xl bg-[#F9E8A2]/50 text-[#5c4300] flex items-center justify-center text-2xl">
                  <LuGraduationCap />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">এসএসসি পাশের হার</p>
                  <p className="text-xl font-extrabold text-emerald-600">১০০% সাফল্য</p>
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
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5">মোট শিক্ষার্থী</p>
          </div>
          <div className="text-center p-3 border-r border-gray-100">
            <div className="flex justify-center text-[#78A4CB] text-2xl mb-1"><LuBookOpen /></div>
            <p className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">{totalTeachers}+</p>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5">অভিজ্ঞ শিক্ষক</p>
          </div>
          <div className="text-center p-3 border-r border-gray-100">
            <div className="flex justify-center text-[#78A4CB] text-2xl mb-1"><LuAward /></div>
            <p className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">৯৮.৫%</p>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5">এ+ ও মেধা তালিকা</p>
          </div>
          <div className="text-center p-3">
            <div className="flex justify-center text-[#78A4CB] text-2xl mb-1"><LuGraduationCap /></div>
            <p className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">৩০+ বছর</p>
            <p className="text-xs md:text-sm text-gray-500 font-medium mt-0.5">গৌরবময় ঐতিহ্য</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;