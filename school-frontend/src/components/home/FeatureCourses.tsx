"use client";

// import courses_bg from "@/assets/courses_bg.png";
import courses_bg from "@/assets/course/bg-image1.png";
import useCourses from "@/hooks/useCourses";
import { TCourse } from "@/types/course.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuBook, LuClock } from "react-icons/lu";
import CourseImg from "@/assets/course/image-cours1.jpeg";

const FeatureCourses = () => {
  const { coursesData } = useCourses();
  useEffect(() => {
    // console.log("Course Data in Production", coursesData);
  }, [coursesData]);

  return (
    <section className="relative my-20 lg:my-32">
      <Image
        className="hidden md:block absolute w-full h-min -z-10 -mt-32"
        src={courses_bg}
        alt="Logo"
      />
      <section className="container1 ">

        <div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl duration-200 text-darker font-bold mb-6  lg:mb-10">
            <span className="text-primary">ফিচার</span> কোর্সসমূহ
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl group flex flex-col">
            <div className="relative flex h-64 items-center justify-center overflow-hidden bg-primary">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={CourseImg}
                  alt="courseImage"
                  className=" object-contain"
                />
              </div>

              <span className="absolute left-3 top-3 rounded-full bg-[#ffd54f] px-3 py-1 text-xs font-semibold text-primary">
                এক-এক
              </span>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3 text-xs font-medium text-primary">
              <span className="flex items-center gap-1">
                <HiOutlineUserGroup className="h-4 w-4" />
                ২৫০ জন ভর্তি
              </span>

              <span className="flex items-center gap-1">
                <LuClock className="h-4 w-4" />৩ মাস
              </span>

              <span className="flex items-center gap-1">
                <LuBook className="h-4 w-4" />
                ১২০টি পাঠ
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-grow flex-col p-5">
              <p className="mb-1 text-xs text-gray-400">ব্যক্তিগত কোর্স</p>

              <h3 className="mb-4 text-base font-bold leading-snug text-primary">
                কুরআন তিলাওয়াত ও তাজবিদ কোর্স
              </h3>

              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  কোর্সের বিষয়বস্তু
                </p>

                <ul className="space-y-2">
                  {[
                    "মাখারিজুল হুরুফ শিক্ষা",
                    "তাজবিদের মূল নিয়মাবলী",
                    "সহিহ তিলাওয়াত অনুশীলন",
                    "সূরা মুখস্থ করার পদ্ধতি",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-500"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ffd54f]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-grow" />

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-lg font-bold text-primary">
                  ৳৮০০
                  <span className="text-xs font-normal text-gray-400">
                    /মাস
                  </span>
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

          {/* {coursesData.data &&
              coursesData.data.map((course: TCourse) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  showAll={showAll[course._id]}
                  onToggle={() => toggleDetails(course._id)}
                />
              ))} */}
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 lg:gap-10">
          {coursesData.data &&
            coursesData.data.length > 0 &&
            coursesData.data.slice(0, 3).map((course: TCourse) => (
              <Link
                href="/courses"
                className="text-darker cursor-pointer flex flex-col justify-between gap-5 hover:bg-light/40 duration-300 rounded-lg group w-fit px-5 md:px-8 py-3 lg:py-6"
                key={course._id}
              >
                <div className="flex flex-col justify-center items-center gap-5">
                  <img
                    src={course?.img}
                    alt={course?.name}
                    width={250}
                    height={250}
                  />
                  <h3 className="md:text-lg font-semibold mb-4 bg-primary text-white text-center rounded-lg px-5 py-2">
                    {course.name}
                  </h3>
                </div>
              </Link>
            ))}
        </div> */}
      </section>
    </section>
  );
};

export default FeatureCourses;
