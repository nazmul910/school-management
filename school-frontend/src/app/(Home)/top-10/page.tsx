"use client";

import { useState } from "react";
import { LuAward, LuTrophy } from "react-icons/lu";
import useResults from "@/hooks/useResults";
import EmptyState from "@/components/common/EmptyState";

const classesList = [
  { id: "Class 6", label: "Class 6" },
  { id: "Class 7", label: "Class 7" },
  { id: "Class 8", label: "Class 8" },
  { id: "Class 9", label: "Class 9" },
  { id: "Class 10", label: "Class 10" },
];

export default function Top10Page() {
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const { top10Data, isTop10Loading } = useResults();

  const topMap = top10Data?.data || {};
  const currentStudents = topMap[selectedClass] || [];

  const getRankBadge = (pos: number) => {
    if (pos === 1) {
      return (
        <span className="w-9 h-9 rounded-full bg-[#F9E8A2] text-[#5c4300] font-extrabold flex items-center justify-center shadow-md border-2 border-amber-400 text-sm">
          1st
        </span>
      );
    }
    if (pos === 2) {
      return (
        <span className="w-9 h-9 rounded-full bg-[#B4E1EB] text-[#1e3a5f] font-extrabold flex items-center justify-center shadow-md border-2 border-[#78A4CB] text-sm">
          2nd
        </span>
      );
    }
    if (pos === 3) {
      return (
        <span className="w-9 h-9 rounded-full bg-[#95BDD7] text-white font-extrabold flex items-center justify-center shadow-md border-2 border-[#78A4CB] text-sm">
          3rd
        </span>
      );
    }
    return (
      <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center border border-gray-300 text-xs">
        {pos}th
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F8FC] py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] p-8 md:p-12 rounded-3xl text-white shadow-xl mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 text-[#F9E8A2] rounded-full text-xs font-bold mb-3">
            <LuTrophy />
            <span>Annual Merit Honors</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Top 10 Academic Achievers by Class
          </h1>
          <p className="text-sm md:text-base text-gray-200 mt-2 max-w-2xl">
            Official merit list honoring the top 10 outstanding scholars in each grade based on aggregate examination performance.
          </p>
        </div>

        {/* Side-by-Side Class Tabs */}
        <div className="flex items-center justify-start overflow-x-auto gap-2.5 p-2 bg-white rounded-2xl shadow-sm border border-[#B4E1EB]/60 mb-8">
          {classesList.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={`flex-1 min-w-[150px] py-3.5 px-5 rounded-xl text-sm md:text-base font-bold transition-all text-center whitespace-nowrap ${
                selectedClass === cls.id
                  ? "bg-[#78A4CB] text-white shadow-md"
                  : "text-gray-600 hover:bg-[#B4E1EB]/20 hover:text-[#1e3a5f]"
              }`}
            >
              {cls.label}
            </button>
          ))}
        </div>

        {/* Top 10 Content */}
        {isTop10Loading ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm text-gray-500 font-medium">
            Loading top 10 rankings...
          </div>
        ) : currentStudents.length > 0 ? (
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#B4E1EB]/60">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold text-[#1e3a5f] flex items-center gap-2">
                <LuAward className="text-[#78A4CB]" />
                <span>{selectedClass} — Top 10 Merit List</span>
              </h2>
              <span className="px-3.5 py-1 rounded-full bg-[#F9E8A2] text-[#5c4300] text-xs font-bold">
                Final Evaluation 2025
              </span>
            </div>

            {/* Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1e3a5f] text-white text-xs uppercase tracking-wider">
                    <th className="p-4 rounded-l-xl text-center">Rank</th>
                    <th className="p-4">Student</th>
                    <th className="p-4 text-center">Roll</th>
                    <th className="p-4 text-center">Class & Section</th>
                    <th className="p-4 text-center">Group / Stream</th>
                    <th className="p-4 text-center">Total Marks</th>
                    <th className="p-4 text-center">GPA</th>
                    <th className="p-4 rounded-r-xl text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {currentStudents.map((student: any, idx: number) => {
                    const position = student.position || idx + 1;
                    return (
                      <tr
                        key={student._id || idx}
                        className={`hover:bg-blue-50/30 transition-colors ${
                          position <= 3 ? "bg-[#F9E8A2]/10" : ""
                        }`}
                      >
                        {/* Position Badge */}
                        <td className="p-4 text-center">
                          <div className="flex justify-center">
                            {getRankBadge(position)}
                          </div>
                        </td>

                        {/* Student Name & Image */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#B4E1EB] shrink-0 bg-gray-100">
                              <img
                                src={student.studentImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80"}
                                alt={student.studentName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <strong className="text-[#1e3a5f] font-bold block">
                                {student.studentName}
                              </strong>
                              <span className="text-xs text-gray-400 font-mono">
                                {student.studentId}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Roll */}
                        <td className="p-4 text-center font-bold text-gray-800">
                          {student.studentRoll}
                        </td>

                        {/* Class & Section */}
                        <td className="p-4 text-center text-gray-700">
                          {student.class} ({student.section || "A"})
                        </td>

                        {/* Group */}
                        <td className="p-4 text-center">
                          {student.group ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-[#B4E1EB]/40 text-[#1e3a5f] text-xs font-semibold">
                              {student.group}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>

                        {/* Total Marks */}
                        <td className="p-4 text-center font-bold text-[#78A4CB] text-base">
                          {student.totalMarks}
                        </td>

                        {/* GPA */}
                        <td className="p-4 text-center font-bold text-emerald-600 text-base">
                          {student.gpa?.toFixed(2)}
                        </td>

                        {/* Grade */}
                        <td className="p-4 text-center">
                          <span className="px-3 py-1 bg-[#F9E8A2] text-[#5c4300] font-extrabold rounded-lg text-xs">
                            {student.grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyState
            icon="award"
            title="No Results Recorded Yet"
            description={`Merit list data for ${selectedClass} has not been published yet. Please check back later.`}
            size="lg"
          />
        )}
      </div>
    </div>
  );
}
