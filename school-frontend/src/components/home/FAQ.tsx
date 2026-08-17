"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LuCircleHelp } from "react-icons/lu";

const faqs = [
  {
    q: "বিদ্যালয়ে কোন কোন শ্রেণিতে পাঠদান করানো হয়?",
    a: "আমাদের বিদ্যালয়ে বাংলাদেশ জাতীয় শিক্ষাক্রম অনুযায়ী ৬ষ্ঠ শ্রেণি থেকে ১০ম শ্রেণি (এসএসসি পর্যন্ত) মানসম্মত পাঠদান করানো হয়। ৯ম ও ১০ম শ্রেণিতে বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা গ্রুপ রয়েছে।",
  },
  {
    q: "নবম ও দশম শ্রেণিতে কি কি বিভাগ বা গ্রুপ রয়েছে?",
    a: "নবম এবং দশম শ্রেণির শিক্ষার্থীদের জন্য বিজ্ঞান (Science), মানবিক (Humanities) এবং ব্যবসায় শিক্ষা (Business Studies) তিনটি গ্রুপেরই সুযোগ রয়েছে। ষষ্ঠ, সপ্তম ও অষ্টম শ্রেণিতে সাধারণ পাঠ্যক্রম পরিচালিত হয়।",
  },
  {
    q: "পরীক্ষার ফলাফল কীভাবে দেখা যাবে?",
    a: "আমাদের ওয়েবসাইটের 'ফলাফল' মেন্যুতে গিয়ে শ্রেণি এবং রোল নম্বর দিয়ে সার্চ করলেই বিস্তারিত বিষয়ভিত্তিক নম্বরপত্র ও গ্রেড পাওয়া যাবে। এছাড়া 'সেরা ১০ শিক্ষার্থী' মেন্যুতে প্রতিটি শ্রেণির ১ম থেকে ১০ম স্থান অধিকারীদের তালিকা দেখা যাবে।",
  },
  {
    q: "বিদ্যালয়ের নিয়মিত সময়সূচী বা ক্লাস টাইম কি?",
    a: "প্রতি রবিবার থেকে বৃহস্পতিবার সকাল ৮:০০ টা থেকে দুপুর ২:০০ টা পর্যন্ত নিয়মিত ক্লাস পরিচালিত হয়। শুক্রবার ও শনিবার সাপ্তাহিক ছুটি থাকে।",
  },
  {
    q: "স্কুলে কি সহপাঠ্য কার্যক্রম এবং খেলাধুলার সুযোগ রয়েছে?",
    a: "হ্যাঁ, আমাদের বিদ্যালয়ে রয়েছে প্রশস্ত খেলার মাঠ, সায়েন্স ক্লাব, আইসিটি ক্লাব, ডিবেটিং ক্লাব, স্কাউট এবং বার্ষিক ক্রীড়া ও সাংস্কৃতিক প্রতিযোগিতা।",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#F3F8FC]">
      <div className="max-w-[1000px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B4E1EB]/50 text-[#1e3a5f] text-xs font-bold">
            <LuCircleHelp />
            <span>সচরাচর জিজ্ঞাসা</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a5f]">
            প্রয়োজনীয় প্রশ্নোত্তর (FAQ)
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            বিদ্যালয় ও ভর্তি সংক্রান্ত সাধারণ প্রশ্নের উত্তর জেনে নিন।
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#B4E1EB]/60 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg text-[#1e3a5f] hover:text-[#78A4CB] transition-colors"
                >
                  <span>{faq.q}</span>
                  <FaChevronDown
                    className={`shrink-0 text-sm text-[#78A4CB] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}