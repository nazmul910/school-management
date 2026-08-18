"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LuCircleHelp } from "react-icons/lu";

const faqs = [
  {
    q: "Which grades/classes are offered at the institution?",
    a: "We provide comprehensive schooling from Class 6 to Class 10 (SSC Level). In Classes 9 and 10, students can enroll in Science, Humanities, or Business Studies streams.",
  },
  {
    q: "What academic groups are available for Class 9 and 10?",
    a: "Students in Class 9 and 10 can choose between Science, Humanities, and Business Studies groups. Classes 6, 7, and 8 follow a unified general national curriculum.",
  },
  {
    q: "How can parents and students view exam results online?",
    a: "You can visit the 'Results' page from our navigation menu and search by Class and Student Roll number to view subject-wise marksheets and GPAs. You can also view class rank lists on the 'Top 10 Students' page.",
  },
  {
    q: "What are the standard school operating hours?",
    a: "Regular academic classes run from Sunday through Thursday, 8:00 AM to 2:00 PM. Friday and Saturday are weekly holidays.",
  },
  {
    q: "Are there co-curricular clubs and sports activities?",
    a: "Yes, we have dedicated clubs for Science, ICT, Debate, Scouting, and Arts, alongside spacious athletic grounds for football, cricket, and annual tournaments.",
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
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a5f]">
            Everything You Need to Know (FAQ)
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Find quick answers to common queries regarding admissions, curriculum, and campus life.
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