"use client";

import { useState } from "react";
import Link from "next/link";
import { LuAward, LuTrophy, LuMedal, LuArrowRight } from "react-icons/lu";
import useResults from "@/hooks/useResults";

const classesList = [
  { id: "Class 6", label: "৬ষ্ঠ শ্রেণি" },
  { id: "Class 7", label: "৭ম শ্রেণি" },
  { id: "Class 8", label: "৮ম শ্রেণি" },
  { id: "Class 9", label: "৯ম শ্রেণি" },
  { id: "Class 10", label: "১০ম শ্রেণি" },
];

export default function TopStudentsPreview() {
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const { top10Data, isTop10Loading } = useResults();

  const topStudentsMap = top10Data?.data || {};
  const currentClassStudents = (topStudentsMap[selectedClass] || []).slice(0, 5);

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="w-8 h-8 rounded-full bg-[#F9E8A2] text-[#5c4300] font-extrabold flex items-center justify-center shadow-md border-2 border-amber-400">
          ১ম
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="w-8 h-8 rounded-full bg-[#B4E1EB] text-[#1e3a5f] font-extrabold flex items-center justify-center shadow-md border-2 border-[#78A4CB]">
          ২য়
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="w-8 h-8 rounded-full bg-[#95BDD7] text-white font-extrabold flex items-center justify-center shadow-md border-2 border-[#78A4CB]">
          ৩য়
        </span>
      );
    }
    return (
      <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center border border-gray-300 text-xs">
        {rank}ম
      </span>
    );
  };

  return (
    <section className="py-16 bg-[#F3F8FC]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F9E8A2]/60 text-[#5c4300] text-xs font-bold mb-2">
              <LuTrophy />
              <span>মেধাতালিকা ও বার্ষিক পরীক্ষার সেরা শিক্ষার্থী</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e3a5f]">
              শ্রেণিভিত্তিক শীর্ষ শিক্ষার্থী (Top Students)
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              বার্ষিক পরীক্ষায় সর্বোচ্চ নম্বর ও গ্রেড অর্জনকারী প্রতিটি শ্রেণির শীর্ষ কৃতী শিক্ষার্থী
            </p>
          </div>

          <Link
            href="/top-10"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#78A4CB] text-white font-semibold text-sm hover:bg-[#6894bb] transition-all shadow-sm shrink-0"
          >
            <span>সম্পূর্ণ সেরা ১০ তালিকা দেখুন</span>
            <LuArrowRight />
          </Link>
        </div>

        {/* Class Tabs: Class 6 | Class 7 | Class 8 | Class 9 | Class 10 */}
        <div className="flex items-center justify-start overflow-x-auto gap-2 p-1.5 bg-white rounded-2xl shadow-sm border border-[#B4E1EB]/60 mb-8">
          {classesList.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold transition-all text-center whitespace-nowrap ${
                selectedClass === cls.id
                  ? "bg-[#78A4CB] text-white shadow-md"
                  : "text-gray-600 hover:bg-[#B4E1EB]/20 hover:text-[#1e3a5f]"
              }`}
            >
              {cls.label} ({cls.id})
            </button>
          ))}
        </div>

        {/* Top Performers Grid */}
        {isTop10Loading ? (
          <div className="py-12 text-center text-gray-500 font-medium">
            সেরা শিক্ষার্থীদের তথ্য লোড হচ্ছে...
          </div>
        ) : currentClassStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {currentClassStudents.map((student: any, idx: number) => {
              const position = student.position || idx + 1;
              return (
                <div
                  key={student._id || idx}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-[#B4E1EB]/60 flex flex-col items-center text-center relative group"
                >
                  {/* Position Badge Top Left */}
                  <div className="absolute top-3 left-3">
                    {getRankBadge(position)}
                  </div>

                  {/* Student Image */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#B4E1EB] mb-3 group-hover:scale-105 transition-transform">
                    <img
                      src={student.studentImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80"}
                      alt={student.studentName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Student Details */}
                  <h3 className="font-bold text-base text-[#1e3a5f] truncate max-w-[160px]">
                    {student.studentName}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    রোল: <strong className="text-gray-800">{student.studentRoll}</strong> • শাখা: {student.section || "A"}
                  </p>
                  {student.group && (
                    <span className="mt-1 px-2 py-0.5 rounded-full bg-[#B4E1EB]/30 text-[#1e3a5f] text-[11px] font-semibold">
                      {student.group === "Science" ? "বিজ্ঞান" : student.group === "Business Studies" ? "ব্যবসায় শিক্ষা" : student.group === "Humanities" ? "মানবিক" : student.group}
                    </span>
                  )}

                  {/* Marks & GPA pill */}
                  <div className="mt-4 w-full pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px]">মোট নম্বর</span>
                      <strong className="text-[#78A4CB] text-sm">{student.totalMarks}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">জিপিএ</span>
                      <strong className="text-emerald-600 text-sm">{student.gpa.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">গ্রেড</span>
                      <span className="px-2 py-0.5 bg-[#F9E8A2] text-[#5c4300] font-bold rounded">
                        {student.grade}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500">
            এই শ্রেণির জন্য এখনো ফলাফল এন্ট্রি করা হয়নি।
          </div>
        )}
      </div>
    </section>
  );
}
