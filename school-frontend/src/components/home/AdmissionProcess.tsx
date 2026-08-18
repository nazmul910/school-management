"use client";

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { LuFileText, LuClipboardCheck, LuUserPlus, LuCircleCheck } from "react-icons/lu";

const steps = [
  {
    icon: LuFileText,
    step: "01",
    title: "Application Submission",
    desc: "Collect and complete the official admission application form online through our portal or directly from the school campus.",
  },
  {
    icon: LuClipboardCheck,
    step: "02",
    title: "Document Verification",
    desc: "Submit student birth certificate, transfer certificate (TC), previous grade transcripts, and guardian identification documents.",
  },
  {
    icon: LuUserPlus,
    step: "03",
    title: "Assessment & Interview",
    desc: "Participate in the evaluation assessment or interactive interview covering English, Mathematics, and Science fundamentals.",
  },
  {
    icon: LuCircleCheck,
    step: "04",
    title: "Final Enrollment & ID",
    desc: "Complete registration fee formalities, receive official student ID, class section, and academic starter package.",
  },
];

export default function AdmissionProcess() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F9E8A2]/60 text-[#5c4300] text-xs font-bold">
            <span>Admission Information 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a5f]">
            Admission Process & Guidelines
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Simple 4-step enrollment process for Classes 6 through 10 in Science, Humanities, and Business Studies groups.
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
                <div className="absolute top-4 right-4 text-2xl font-extrabold text-[#78A4CB]/80 group-hover:text-[#78A4CB] transition-colors">
                  {item.step}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-white text-[#78A4CB] shadow-sm flex items-center justify-center text-2xl mb-6 group-hover:bg-[#78A4CB] group-hover:text-white transition-all">
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
            <h3 className="text-2xl font-bold">Admissions Open for Academic Session 2026!</h3>
            <p className="text-sm text-[#F9E8A2]">Limited seats available for Classes 6 to 10. Contact our admission desk today.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#F9E8A2] text-[#5c4300] font-bold rounded-xl text-sm hover:bg-[#fae488] shadow-md transition-all flex items-center gap-2 shrink-0"
            >
              <span>Contact Admissions</span>
              <BsArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
