import { TCourse } from "@/types/course.type";
import Link from "next/link";
import { FaStar, FaUser } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuBook, LuClock } from "react-icons/lu";

 interface CourseCardProps {
  course: TCourse;
  showAll: boolean;
  onToggle: () => void;
}

  const CourseCard = ({ course, showAll, onToggle }: CourseCardProps) => {
  // Static placeholder values – replace with real fields when backend supplies them
  const enrolledCount = "২৫০ জন ভর্তি";
  const lessonCount = "১২০টি পাঠ";
  const rating = "৪.৮";
  const reviewCount = "১২ হাজার";

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col bg-white border border-gray-100 group">
      <div
        className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: "#374868" }}
      >
        <div
          className="absolute inset-0 opacity-10 font-arabic flex items-center justify-center text-white"
          style={{ fontSize: "8rem", userSelect: "none" }}
          aria-hidden="true"
        >
          ق
        </div>
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: "#ffd54f", color: "#374868" }}
        >
          {course.method === "One to One" ? "এক-এক" : "গ্রুপ"}
        </span>
        <LuBook className="w-16 h-16 text-white/30 group-hover:scale-110 transition-transform duration-300" />
      </div>

      <div
        className="flex items-center justify-between gap-2 px-5 py-3 text-xs font-medium border-b border-gray-100"
        style={{ color: "#374868" }}
      >
        <span className="flex items-center gap-1">
          <HiOutlineUserGroup className="w-4 h-4" />
          {enrolledCount}
        </span>
        <span className="flex items-center gap-1">
          <LuClock className="w-4 h-4" />
          {course.duration}
        </span>
        <span className="flex items-center gap-1">
          <LuBook className="w-4 h-4" />
          {lessonCount}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs text-gray-400 mb-1">
          {course.method === "One to One" ? "ব্যক্তিগত কোর্স" : "গ্রুপ কোর্স"}
        </p>

        <h3
          className="text-base font-bold leading-snug mb-4"
          style={{ color: "#374868" }}
        >
          {course.name}
        </h3>

        {/* instructor row – static, swap with real data */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "#374868" }}
            >
              <FaUser className="w-3 h-3" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700">শিক্ষক</p>
              <p className="text-xs text-gray-400">ইসলামিক স্কলার</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="w-4 h-4" style={{ color: "#ffd54f" }} />
            <span className="text-sm font-bold" style={{ color: "#374868" }}>
              {rating}
            </span>
            <span className="text-xs text-gray-400">({reviewCount})</span>
          </div>
        </div>

        {/* course details list */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            কোর্সের বিষয়বস্তু
          </p>
          <ul className="space-y-1">
            {(showAll ? course.details : course.details.slice(0, 4)).map(
              (detail, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span
                    className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#ffd54f" }}
                  />
                  <span className="text-gray-500">{detail}</span>
                </li>
              )
            )}
          </ul>
          {!showAll && course.details.length > 4 && (
            <button
              onClick={onToggle}
              className="text-xs mt-2 underline cursor-pointer text-left"
              style={{ color: "#374868" }}
            >
              + আরও {course.details.length - 4}টি বিষয়
            </button>
          )}
          {showAll && (
            <button
              onClick={onToggle}
              className="text-xs mt-2 underline cursor-pointer text-left"
              style={{ color: "#374868" }}
            >
              কম দেখান
            </button>
          )}
        </div>

        <div className="flex-grow" />

        {/* price + enroll row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <span
              className="text-lg font-bold"
              style={{ color: "#374868" }}
            >
              ${course.fee}
              <span className="text-xs font-normal text-gray-400">/মাস</span>
            </span>
          </div>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSd-SCNJ6ay9vvFIGfSPQizD5YKd0GJqZljXSDTKy9oLeBks5g/viewform"
            target="_blank"
            className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: "#374868",
              color: "#fff",
              border: "2px solid #374868",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "#ffd54f";
              (e.currentTarget as HTMLAnchorElement).style.color = "#374868";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "#374868";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
          >
            ভর্তি হন
          </Link>
        </div>
      </div>
    </div>
  );
};


export default CourseCard;

