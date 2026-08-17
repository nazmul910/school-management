"use client";

import { FaMicroscope, FaLaptopCode, FaBookReader, FaFutbol, FaShieldAlt, FaAward } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

const facilities = [
  {
    icon: FaMicroscope,
    title: "আধুনিক বিজ্ঞান গবেষণাগার",
    desc: "পদার্থবিজ্ঞান, রসায়ন ও জীববিজ্ঞানের ব্যবহারিক পরীক্ষণ সম্পন্ন করার জন্য উন্নত যন্ত্রপাতি সমৃদ্ধ ল্যাব।",
    color: "bg-[#B4E1EB]/30 text-[#1e3a5f]",
  },
  {
    icon: FaLaptopCode,
    title: "ডিজিটাল কম্পিউটার ল্যাব",
    desc: "উচ্চগতির ব্রডব্যান্ড ইন্টারনেট এবং আধুনিক কম্পিউটার সমৃদ্ধ আইসিটি ল্যাবে ব্যবহারিক প্রশিক্ষণ।",
    color: "bg-[#78A4CB]/20 text-[#1e3a5f]",
  },
  {
    icon: FaBookReader,
    title: "সমৃদ্ধ কেন্দ্রীয় লাইব্রেরি",
    desc: "পাঠ্যপুস্তক, রেফারেন্স বুক, বিজ্ঞান সাময়িকী ও সাধারণ জ্ঞানের বিশাল সংগ্রহশালা।",
    color: "bg-[#F9E8A2]/50 text-[#5c4300]",
  },
  {
    icon: FaFutbol,
    title: "ক্রীড়া ও সহপাঠ্য কার্যক্রম",
    desc: "বিশাল খেলার মাঠ, বার্ষিক ক্রীড়া প্রতিযোগিতা, স্কাউটিং, বিতর্ক ও সাংস্কৃতিক ক্লাব।",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: FaShieldAlt,
    title: "নিরাপদ ক্যাম্পাস ও সিসিটিভি",
    desc: "সম্পূর্ণ ক্যাম্পাস সার্বক্ষণিক সিসিটিভি ক্যামেরা ও প্রশিক্ষিত নিরাপত্তা কর্মীদের দ্বারা সুরক্ষিত।",
    color: "bg-indigo-50 text-indigo-700",
  },
  {
    icon: FaAward,
    title: "এসএসসি ও জেএসসিতে শতভাগ সাফল্য",
    desc: "নিয়মিত মডেল টেস্ট ও নিবিড় তত্ত্বাবধানে প্রতি বছর শতভাগ পাশের হার ও বিপুল সংখ্যক জিপিএ ৫ অর্জন।",
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
            <span>আমাদের বৈশিষ্ট্য ও সুবিধাসমূহ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a5f]">
            কেন আমাদের বিদ্যালয়কে বেছে নেবেন?
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            একটি আদর্শ শিক্ষা প্রতিষ্ঠানের সকল অত্যাধুনিক সুযোগ-সুবিধা ও নৈতিক পরিবেশ নিয়ে আমরা প্রস্তুত আপনার সন্তানের উজ্জ্বল ভবিষ্যৎ গঠনে।
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
