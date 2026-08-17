"use client";

import { useState } from "react";
import { LuUsers, LuSearch, LuGraduationCap, LuFilter } from "react-icons/lu";
import useStudent from "@/hooks/useStudent";

const classes = [
  { id: "all", label: "সকল শ্রেণি" },
  { id: "Class 6", label: "৬ষ্ঠ শ্রেণি (Class 6)" },
  { id: "Class 7", label: "৭ম শ্রেণি (Class 7)" },
  { id: "Class 8", label: "৮ম শ্রেণি (Class 8)" },
  { id: "Class 9", label: "৯ম শ্রেণি (Class 9)" },
  { id: "Class 10", label: "১০ম শ্রেণি (Class 10)" },
];

const groups = [
  { id: "all", label: "সকল গ্রুপ" },
  { id: "Science", label: "বিজ্ঞান (Science)" },
  { id: "Humanities", label: "মানবিক (Humanities)" },
  { id: "Business Studies", label: "ব্যবসায় শিক্ষা (Business Studies)" },
];

const sections = [
  { id: "all", label: "সকল শাখা" },
  { id: "A", label: "শাখা ক (A)" },
  { id: "B", label: "শাখা খ (B)" },
  { id: "C", label: "শাখা গ (C)" },
];

export default function StudentsPage() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { studentData, isLoading } = useStudent({
    class: selectedClass !== "all" ? selectedClass : undefined,
    group: selectedGroup !== "all" && (selectedClass === "Class 9" || selectedClass === "Class 10") ? selectedGroup : undefined,
    section: selectedSection !== "all" ? selectedSection : undefined,
    searchTerm: searchTerm.trim() || undefined,
  });

  const students = studentData?.data || [];

  // Important rule: Group filter only appears for Class 9 and Class 10
  const isGroupVisible = selectedClass === "Class 9" || selectedClass === "Class 10";

  return (
    <div className="min-h-screen bg-[#F3F8FC] py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] p-8 md:p-12 rounded-3xl text-white shadow-xl mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 text-[#F9E8A2] rounded-full text-xs font-bold mb-3">
            <LuGraduationCap />
            <span>শিক্ষার্থী পরিচিতি ও তালিকা</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            বিদ্যালয়ের শিক্ষার্থী তালিকা (৬ষ্ঠ - ১০ম শ্রেণি)
          </h1>
          <p className="text-sm md:text-base text-gray-200 mt-2 max-w-2xl">
            শ্রেণি, শাখা, বিভাগ (গ্রুপ) বা রোল নম্বর দিয়ে সহজেই বিদ্যালয়ের শিক্ষার্থীদের তথ্য ও তালিকা খুঁজুন।
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#B4E1EB]/60 mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1e3a5f]">
            <LuFilter className="text-[#78A4CB]" />
            <span>ফিল্টার ও অনুসন্ধান করুন</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="শিক্ষার্থীর নাম / আইডি দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
              />
              <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Class Filter */}
            <div>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  if (e.target.value !== "Class 9" && e.target.value !== "Class 10") {
                    setSelectedGroup("all");
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white font-medium"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Filter */}
            <div>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white font-medium"
              >
                {sections.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Group Filter (Only visible for Class 9 & Class 10) */}
            {isGroupVisible ? (
              <div>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#78A4CB] text-sm focus:outline-none bg-[#B4E1EB]/20 text-[#1e3a5f] font-semibold"
                >
                  {groups.map((grp) => (
                    <option key={grp.id} value={grp.id}>
                      {grp.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="hidden lg:flex items-center text-xs text-gray-400 font-medium px-3">
                (গ্রুপ নির্বাচন শুধুমাত্র ৯ম ও ১০ম শ্রেণির জন্য প্রযোজ্য)
              </div>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <p>মোট শিক্ষার্থী পাওয়া গেছে: <strong className="text-[#1e3a5f]">{students.length} জন</strong></p>
        </div>

        {/* Student Cards Grid */}
        {isLoading ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm text-gray-500 font-medium">
            শিক্ষার্থীদের তালিকা লোড হচ্ছে...
          </div>
        ) : students.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {students.map((student: any, idx: number) => (
              <div
                key={student._id || idx}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#B4E1EB]/60 flex flex-col items-center text-center relative group"
              >
                {/* Roll Badge Top Right */}
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#1e3a5f] text-[#F9E8A2] font-bold text-xs rounded-lg">
                  রোল: {student.roll}
                </div>

                {/* Photo */}
                <div className="w-22 h-22 rounded-full overflow-hidden border-4 border-[#B4E1EB] mb-4 group-hover:scale-105 transition-transform bg-gray-100">
                  <img
                    src={student.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80"}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <h3 className="font-bold text-base text-[#1e3a5f] group-hover:text-[#78A4CB] transition-colors">
                  {student.name}
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  আইডি: {student.studentId}
                </p>

                {/* Class & Section Details */}
                <div className="mt-4 w-full pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>শ্রেণি:</span>
                    <strong className="text-[#1e3a5f]">{student.class}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>শাখা:</span>
                    <strong className="text-[#1e3a5f]">{student.section || "A"}</strong>
                  </div>
                  {student.group && (
                    <div className="flex items-center justify-between">
                      <span>বিভাগ (গ্রুপ):</span>
                      <span className="px-2 py-0.5 rounded bg-[#B4E1EB]/30 text-[#1e3a5f] font-bold text-[11px]">
                        {student.group === "Science" ? "বিজ্ঞান" : student.group === "Business Studies" ? "ব্যবসায় শিক্ষা" : student.group === "Humanities" ? "মানবিক" : student.group}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm text-gray-500 font-medium">
            নির্বাচিত ফিল্টারের ভিত্তিতে কোনো শিক্ষার্থী পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
