"use client";
import Breadcrumbs from "@/utils/Breadcrumb";
import GetInTouch from "@/utils/GetInTouch";
import useCourses from "@/hooks/useCourses";
import { TCourse } from "@/types/course.type";
import Link from "next/link";
import { useState } from "react";
import {
  FaQuoteRight,
  FaUser,
  FaUserFriends,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { LuBook, LuClock } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import CourseCard from "@/utils/CourseCard";

import bgImg from "@/assets/course/bg-image1.png";
import Image from "next/image";

const Courses = () => {
  const [showAll, setShowAll] = useState<{ [key: string]: boolean }>({});
  const { coursesData } = useCourses();

  const toggleDetails = (courseId: string) => {
    setShowAll((prev) => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  const hasCourses = coursesData?.data && coursesData.data.length > 0;

  return (
    <section className=" ">
      <Breadcrumbs title="কোর্সসমূহ" />

      <section className="py-20 px-4" style={{ background: "#f0f3f8" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xl text-primary font-semibold tracking-widest uppercase mb-3">
            আল-হাদিস
          </p>

          <div className="relative rounded-3xl bg-primary overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5"
              aria-hidden="true"
            >
              <span
                className="font-arabic"
                style={{ fontSize: "clamp(6rem,20vw,16rem)", color: "#ffd54f" }}
              >
                علم
              </span>
            </div>

            <div className="absolute top-6 left-6 opacity-30">
              <FaQuoteRight
                className="w-10 h-10"
                style={{ color: "#ffd54f" }}
              />
            </div>

            <div className="relative z-10 py-16 px-6 md:px-16 text-center">
              <p
                className="font-arabic text-2xl md:text-4xl leading-loose mb-6"
                style={{ color: "#ffd54f" }}
              >
                طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
              </p>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div
                  className="h-px w-16 md:w-28"
                  style={{ background: "rgba(255,213,79,0.4)" }}
                />
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#ffd54f" }}
                />
                <div
                  className="h-px w-16 md:w-28"
                  style={{ background: "rgba(255,213,79,0.4)" }}
                />
              </div>

              <p className="text-lg md:text-2xl text-white/90 font-medium mb-4">
                &ldquo;জ্ঞান অর্জন করা প্রত্যেক মুসলিমের জন্য ফরজ&rdquo;
              </p>

              <p className="text-sm text-white/50 mb-10">
                — সুনান ইবনে মাজাহ, হাদিস নং: ২২৪
              </p>

              <div
                className="inline-block rounded-2xl px-6 py-4 text-sm md:text-base text-white/80 italic max-w-2xl"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                এই হাদিসটি শিক্ষার গুরুত্ব ও মর্যাদা তুলে ধরে। ইসলামে জ্ঞান
                অর্জনের মাধ্যমে আত্মিক ও বৈষয়িক উন্নতি সাধন করা একটি
                গুরুত্বপূর্ণ ইবাদত হিসেবে বিবেচিত হয়।
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative bg-white">
        <div className=" absolute z-0 w-full h-full top-0 left-0 right-0">
          <Image src={bgImg} alt="bg-image" className="w-full h-full" />
        </div>
        <div className="max-w-6xl relative mx-auto z-20">
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-2"
              style={{ color: "#ffd54f" }}
            >
              আমাদের প্রোগ্রাম
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#374868" }}
            >
              অনলাইন ইসলামিক{" "}
              <span
                style={{ color: "#374868", borderBottom: "3px solid #ffd54f" }}
              >
                কোর্সসমূহ
              </span>
            </h2>
          </div>

          {hasCourses ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {coursesData.data.map((course: TCourse) => (
                <div
                  key={course._id}
                  className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative flex h-64 items-center justify-center overflow-hidden bg-primary">
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={course.img}
                        alt={course.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>

                    <span className="absolute left-3 top-3 rounded-full bg-[#ffd54f] px-3 py-1 text-xs font-semibold text-primary">
                      {course.method}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3 text-xs font-medium text-primary">
                    <span className="flex items-center gap-1">
                      <LuClock className="h-4 w-4" />
                      {course.duration}
                    </span>

                    <span className="flex items-center gap-1">
                      <LuBook className="h-4 w-4" />
                      {course.details.length} টি বিষয়
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-grow flex-col p-5">
                    <p className="mb-1 text-xs text-gray-400">
                      {course.method}
                    </p>

                    <h3 className="mb-4 text-base font-bold leading-snug text-primary">
                      {course.name}
                    </h3>

                    <div className="mb-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        কোর্সের বিষয়বস্তু
                      </p>

                      <ul className="space-y-2">
                        {(showAll[course._id]
                          ? course.details
                          : course.details.slice(0, 2)
                        ).map((item: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-500"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ffd54f]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {course.details.length > 2 && (
                        <button
                          onClick={() => toggleDetails(course._id)}
                          className="mt-3 text-sm font-semibold text-primary hover:text-[#ffd54f]"
                        >
                          {showAll[course._id]
                            ? "কম দেখান"
                            : `+ আরও ${course.details.length - 2}টি বিষয়`}
                        </button>
                      )}
                    </div>

                    <div className="flex-grow" />

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-lg font-bold text-primary">
                        ৳{course.fee}
                      </span>

                      <Link
                        href="https://docs.google.com/forms/d/e/1FAIpQLSd-SCNJ6ay9vvFIGfSPQizD5YKd0GJqZljXSDTKy9oLeBks5g/viewform"
                        target="_blank"
                        className="rounded-xl border-2 border-primary bg-primary px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:border-[#ffd54f] hover:bg-[#ffd54f] hover:text-primary"
                      >
                        ভর্তি হন
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="bg-primary/10 p-6 rounded-full mb-6">
                <LuBook className="text-5xl text-primary" />
              </div>

              <h3 className="text-2xl font-bold text-primary mb-2">
                কোনো কোর্স পাওয়া যায়নি
              </h3>

              <p className="text-gray-500 max-w-md leading-7">
                এই মুহূর্তে আমাদের কোনো কোর্স চালু নেই। অনুগ্রহ করে পরে আবার
                চেক করুন, নতুন কোর্স শীঘ্রই যুক্ত করা হবে।
              </p>
            </div>
          )}
        </div>
      </section>

      <GetInTouch />
    </section>
  );
};

export default Courses;