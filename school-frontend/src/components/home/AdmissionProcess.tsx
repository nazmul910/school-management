"use client";

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { LuFileText, LuClipboardCheck, LuUserPlus, LuCircleCheck } from "react-icons/lu";

const steps = [
  {
    icon: LuFileText,
    step: "০১",
    title: "ভর্তি আবেদন ফরম সংগ্রহ",
    desc: "বিদ্যালয় অফিস থেকে সরাসরি অথবা আমাদের অনলাইন ওয়েবসাইট থেকে নির্দিষ্ট শ্রেণির আবেদন ফরম পূরণ করুন।",
  },
  {
    icon: LuClipboardCheck,
    step: "০২",
    title: "প্রয়োজনীয় কাগজপত্র সংযুক্তি",
    desc: "শিক্ষার্থীর জন্ম নিবন্ধন সনদ, পূর্ববর্তী শ্রেণির ছাড়পত্র (টিসি), নম্বরপত্র এবং অভিভাবকের এনআইডি কার্ডের কপি জমা দিন।",
  },
  {
    icon: LuUserPlus,
    step: "০৩",
    title: "ভর্তি পরীক্ষা / সাক্ষাৎকার",
    desc: "নির্ধারিত তারিখে বাংলা, ইংরেজি ও গণিত বিষয়ের মূল্যায়ন পরীক্ষা অথবা উপস্থিত মৌখিক সাক্ষাৎকারে অংশগ্রহণ করুন।",
  },
  {
    icon: LuCircleCheck,
    step: "০৪",
    title: "চূড়ান্ত ভর্তি ও রোল প্রাপ্তি",
    desc: "মেধাতালিকার ভিত্তিতে ভর্তি ফি প্রদান সম্পন্ন করে নির্ধারিত শাখা, গ্রুপ ও রোল নম্বর সংগ্রহ করুন।",
  },
];

export default function AdmissionProcess() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F9E8A2]/60 text-[#5c4300] text-xs font-bold">
            <span>ভর্তি তথ্য ২০২৬</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a5f]">
            ভর্তি প্রক্রিয়া ও প্রয়োজনীয় নির্দেশাবলী
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            ৬ষ্ঠ থেকে ১০ম শ্রেণিতে (বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা গ্রুপ) নতুন শিক্ষাবর্ষে ভর্তির জন্য সহজ ৪টি ধাপ।
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F3F8FC] p-8 rounded-2xl border border-[#B4E1EB]/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Step Number Top Right */}
                <div className="absolute top-4 right-4 text-2xl font-extrabold text-[#78A4CB]/40 group-hover:text-[#78A4CB] transition-colors">
                  {item.step}
                </div>

                <div>
                  <div className="w-13 h-13 rounded-xl bg-white text-[#78A4CB] shadow-sm flex items-center justify-center text-2xl mb-6 group-hover:bg-[#78A4CB] group-hover:text-white transition-all">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-[#1e3a5f] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Admission CTA Box */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl font-bold">২০২৬ শিক্ষাবর্ষে ভর্তি চলছে!</h3>
            <p className="text-sm text-[#F9E8A2]">সীমিত আসনে ৬ষ্ঠ থেকে ১০ম শ্রেণিতে ভর্তি হতে আজই যোগাযোগ করুন।</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#F9E8A2] text-[#5c4300] font-bold rounded-xl text-sm hover:bg-[#fae488] shadow-md transition-all flex items-center gap-2 shrink-0"
            >
              <span>যোগাযোগ করুন</span>
              <BsArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
