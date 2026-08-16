import aus from "@/assets/flags/aus-flag.webp";
import bd from "@/assets/flags/bd-flag.webp";
import can from "@/assets/flags/can-flag.webp";
import usa from "@/assets/flags/usa-flag.webp";
import Image from "next/image";
import { FaHandFist } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";

const StudentStatus = () => {
  const flags = [
    { src: bd, alt: "Bangladesh" },
    { src: usa, alt: "America" },
    { src: can, alt: "Canada" },
    { src: aus, alt: "Australia" },
  ];

  const stats = [
    { number: "১০০০+", label: "সফল শিক্ষার্থী" },
    { number: "৪টি", label: "দেশে আমাদের উপস্থিতি" },
  ];

  return (
    <section className="bg-[#F2F3F5] py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Section heading */}
        <p className="text-center text-[11px] uppercase tracking-[3px] text-[#8a7a60] mb-2">
          আমাদের সম্পর্কে
        </p>
        <h2 className="text-center text-3xl font-bold text-primary mb-12">
          আলহামদুলিল্লাহ!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left dark panel */}
          <div className="bg-primary rounded-3xl p-10 flex flex-col justify-between min-h-[340px]">
            <div>
              <p className="text-[10px] uppercase tracking-[3px] text-[#6a85aa] mb-3">
                কুরআন শিক্ষা একাডেমি
              </p>
              <h3 className="text-2xl font-bold text-white leading-snug">
                বিশ্বজুড়ে বাংলাভাষীদের<br />কুরআন শিক্ষায়
              </h3>
              <div className="w-11 h-[3px] bg-amber-400 rounded-full my-5" />
              <p className="text-sm text-[#8fa3c0] leading-7">
                আমরা দীর্ঘদিন ধরে আমেরিকা, কানাডা, অস্ট্রেলিয়া এবং বাংলাদেশে
                বসবাসকারী বাংলাভাষীদের কুরআন শিক্ষা দিয়ে আসছি।
              </p>
            </div>
            <div className="flex items-center gap-3 mt-8">
              {flags.map((flag) => (
                <Image
                  key={flag.alt}
                  width={36}
                  height={36}
                  className="rounded-full border-[1.5px] border-white/15 object-cover"
                  src={flag.src}
                  alt={flag.alt}
                />
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">

            {/* Feature card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-black/5 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shrink-0">
                  <FaHandFist />
                </div>
                <h4 className="font-semibold text-[#1a2340] text-[15px]">
                  শিক্ষার্থীদের আস্থা
                </h4>
              </div>
              <div className="h-px bg-gray-100" />
              <p className="text-[13px] text-gray-500 leading-relaxed">
                আমাদের একাডেমি শিক্ষার্থীদের গ্রহণযোগ্যতা ও কুরআন শিক্ষার মানের জন্য নির্ভরযোগ্য।
              </p>
            </div>

            {/* Feature card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-black/5 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#e8edf7] text-primary flex items-center justify-center text-xl shrink-0">
                  <PiStudentFill />
                </div>
                <h4 className="font-semibold text-[#1a2340] text-[15px]">
                  সফল সমাপ্তি
                </h4>
              </div>
              <div className="h-px bg-gray-100" />
              <p className="text-[13px] text-gray-500 leading-relaxed">
                আমাদের একাডেমি থেকে সফলভাবে কুরআন শিক্ষাগ্রহণ সম্পন্ন করেছে বহু প্রতিভাবান শিক্ষার্থী।
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-primary rounded-2xl py-5 px-4 text-center"
                >
                  <p className="text-2xl font-bold text-white mb-1">{s.number}</p>
                  <p className="text-[11px] text-[#fff] tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentStatus;