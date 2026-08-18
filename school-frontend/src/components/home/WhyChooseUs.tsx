"use client";

import { FaMicroscope, FaLaptopCode, FaBookReader, FaFutbol, FaShieldAlt, FaAward } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

const facilities = [
  {
    icon: FaMicroscope,
    title: "Advanced Science Labs",
    desc: "Fully equipped physics, chemistry, and biology laboratories for immersive practical research and experiments.",
    color: "bg-[#B4E1EB]/30 text-[#1e3a5f]",
  },
  {
    icon: FaLaptopCode,
    title: "Digital Computer & ICT Lab",
    desc: "High-speed broadband internet and modern computer systems providing students hands-on coding and technological education.",
    color: "bg-[#78A4CB]/20 text-[#1e3a5f]",
  },
  {
    icon: FaBookReader,
    title: "Resourceful Central Library",
    desc: "Extensive repository of textbooks, academic journals, reference encyclopedias, and literature.",
    color: "bg-[#F9E8A2]/50 text-[#5c4300]",
  },
  {
    icon: FaFutbol,
    title: "Sports & Co-curriculars",
    desc: "Spacious sports grounds, annual athletic tournaments, scout programs, science clubs, and debating societies.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: FaShieldAlt,
    title: "Safe & Monitored Campus",
    desc: "Round-the-clock CCTV surveillance, gated security, and trained personnel ensuring a safe and secure learning environment.",
    color: "bg-indigo-50 text-indigo-700",
  },
  {
    icon: FaAward,
    title: "100% Board Exam Success",
    desc: "Consistent 100% pass rates and highest percentage of GPA 5.0 in national secondary examinations.",
    color: "bg-amber-50 text-amber-700",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B4E1EB]/40 text-[#1e3a5f] text-xs md:text-sm font-bold">
            <LuGraduationCap />
            <span>Key Institutional Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a5f]">
            Why Choose Our Institution?
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Equipped with modern facilities, distinguished faculty, and value-based discipline to shape your child's prosperous future.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
