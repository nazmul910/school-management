import aus from "@/assets/flags/aus-flag.webp";
import bd from "@/assets/flags/bd-flag.webp";
import can from "@/assets/flags/can-flag.webp";
import usa from "@/assets/flags/usa-flag.webp";
import Image from "next/image";
import { FaAward } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";

const StudentStatus = () => {
  const flags = [
    { src: bd, alt: "Bangladesh" },
    { src: usa, alt: "United States" },
    { src: can, alt: "Canada" },
    { src: aus, alt: "Australia" },
  ];

  const stats = [
    { number: "1500+", label: "Successful Graduates" },
    { number: "100%", label: "Curriculum Standard" },
  ];

  return (
    <section className="bg-[#F2F3F5] py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Section heading */}
        <p className="text-center text-[11px] uppercase tracking-[3px] text-[#8a7a60] mb-2 font-semibold">
          About Our Standards
        </p>
        <h2 className="text-center text-3xl font-bold text-[#1e3a5f] mb-12">
          Excellence in Academic Guidance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left dark panel */}
          <div className="bg-[#1e3a5f] rounded-3xl p-10 flex flex-col justify-between min-h-[340px]">
            <div>
              <p className="text-[10px] uppercase tracking-[3px] text-[#95BDD7] mb-3">
                Ideal Model School & College
              </p>
              <h3 className="text-2xl font-bold text-white leading-snug">
                Building Global Standard<br />Education & Ethics
              </h3>
              <div className="w-11 h-[3px] bg-amber-400 rounded-full my-5" />
              <p className="text-sm text-slate-300 leading-7">
                Our institution provides comprehensive academic coaching, modern scientific tools, and character mentorship for lifelong success.
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
                  <FaAward />
                </div>
                <h4 className="font-semibold text-[#1a2340] text-[15px]">
                  Trusted by Guardians
                </h4>
              </div>
              <div className="h-px bg-gray-100" />
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Parents trust our dedicated mentors, safety records, and comprehensive pedagogical methodologies.
              </p>
            </div>

            {/* Feature card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-black/5 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#e8edf7] text-[#1e3a5f] flex items-center justify-center text-xl shrink-0">
                  <PiStudentFill />
                </div>
                <h4 className="font-semibold text-[#1a2340] text-[15px]">
                  Distinguished Alumni
                </h4>
              </div>
              <div className="h-px bg-gray-100" />
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Our graduates have moved on to leading public universities, engineering faculties, and professional fields.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-[#1e3a5f] rounded-2xl py-5 px-4 text-center"
                >
                  <p className="text-2xl font-bold text-white mb-1">{s.number}</p>
                  <p className="text-[11px] text-slate-200 tracking-wide">{s.label}</p>
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