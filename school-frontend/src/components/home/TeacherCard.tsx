"use client";

import Link from "next/link";
import { LuSchool, LuGraduationCap, LuPhone, LuMail, LuArrowRight } from "react-icons/lu";
import useTeachers from "@/hooks/useTeachers";

export default function TeacherCard() {
  const { teachersData, isLoading } = useTeachers();
  const teachers = (teachersData?.data || []).slice(0, 4);

  return (
    <section className="py-20 bg-[#F3F8FC]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B4E1EB]/50 text-[#1e3a5f] text-xs font-bold mb-2">
              <LuSchool />
              <span>দক্ষ ও নিবেদিতপ্রাণ শিক্ষক পরিষদ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a5f]">
              আমাদের অভিজ্ঞ শিক্ষকমণ্ডলী
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              উচ্চশিক্ষিত ও প্রশিক্ষণপ্রাপ্ত শিক্ষকগণের আন্তরিক পাঠদানে আলোকিত হোক প্রতিটি শিক্ষার্থী
            </p>
          </div>

          <Link
            href="/teachers"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#78A4CB] text-white font-semibold text-sm hover:bg-[#6894bb] transition-all shadow-sm shrink-0"
          >
            <span>সকল শিক্ষক দেখুন</span>
            <LuArrowRight />
          </Link>
        </div>

        {/* Teachers Grid */}
        {isLoading ? (
          <div className="py-12 text-center text-gray-500 font-medium">
            শিক্ষকবৃন্দের তথ্য লোড হচ্ছে...
          </div>
        ) : teachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher: any, idx: number) => (
              <div
                key={teacher._id || idx}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#B4E1EB]/50 flex flex-col group"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={teacher.profileImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#1e3a5f]/90 text-[#F9E8A2] text-xs font-bold rounded-lg backdrop-blur-sm">
                    {teacher.designation}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-lg text-[#1e3a5f] group-hover:text-[#78A4CB] transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      {teacher.department ? `বিভাগ: ${teacher.department}` : teacher.education}
                    </p>
                  </div>

                  {/* Subjects */}
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 font-medium">পাঠদানের বিষয়:</p>
                    <div className="flex flex-wrap gap-1">
                      {(teacher.subject || []).map((sub: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#B4E1EB]/40 text-[#1e3a5f] text-[11px] font-semibold"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Classes Taught */}
                  {teacher.classes && teacher.classes.length > 0 && (
                    <div className="text-xs text-gray-600">
                      <span>শ্রেণি: </span>
                      <strong className="text-[#1e3a5f]">{teacher.classes.join(", ")}</strong>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <LuPhone className="text-[#78A4CB]" /> {teacher.number}
                    </span>
                    <span className="text-[#78A4CB] font-semibold">অভিজ্ঞতা: {teacher.experience || "৩+ বছর"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            কোনো শিক্ষকের তথ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </section>
  );
}