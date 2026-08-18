"use client";

import courses_bg from "@/assets/course/bg-image1.png";
import useCourses from "@/hooks/useCourses";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuBook, LuClock } from "react-icons/lu";
import CourseImg from "@/assets/course/image-cours1.jpeg";

const FeatureCourses = () => {
  const { coursesData } = useCourses();

  return (
    <section className="relative my-20 lg:my-32">
      <Image
        className="hidden md:block absolute w-full h-min -z-10 -mt-32"
        src={courses_bg}
        alt="Background"
      />
      <section className="container1">
        <div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl duration-200 text-slate-800 font-bold mb-6 lg:mb-10">
            <span className="text-[#78A4CB]">Featured</span> Academic Programs
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl group flex flex-col">
            <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#78A4CB]">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={CourseImg}
                  alt="Academic Course"
                  className="object-contain"
                />
              </div>

              <span className="absolute left-3 top-3 rounded-full bg-[#ffd54f] px-3 py-1 text-xs font-semibold text-slate-800">
                Specialized
              </span>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3 text-xs font-medium text-slate-700">
              <span className="flex items-center gap-1">
                <HiOutlineUserGroup className="h-4 w-4 text-[#78A4CB]" />
                250 Enrolled
              </span>

              <span className="flex items-center gap-1">
                <LuClock className="h-4 w-4 text-[#78A4CB]" />
                3 Months
              </span>

              <span className="flex items-center gap-1">
                <LuBook className="h-4 w-4 text-[#78A4CB]" />
                120 Lessons
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-grow flex-col p-5">
              <p className="mb-1 text-xs text-gray-400 font-medium">Foundation Track</p>

              <h3 className="mb-4 text-base font-bold leading-snug text-slate-800">
                STEM & Foundation Skills Masterclass
              </h3>

              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Key Topics
                </p>

                <ul className="space-y-2">
                  {[
                    "Core Mathematics & Logical Reasoning",
                    "Experimental Science & Laboratory Practice",
                    "Communicative English & Creative Writing",
                    "Computer Literacy & Coding Foundations",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ffd54f]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-grow" />

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-lg font-bold text-slate-800">
                  $80
                  <span className="text-xs font-normal text-gray-400">
                    /term
                  </span>
                </span>

                <Link
                  href="/contact"
                  className="rounded-xl border-2 border-[#78A4CB] bg-[#78A4CB] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:border-[#ffd54f] hover:bg-[#ffd54f] hover:text-slate-800"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default FeatureCourses;
