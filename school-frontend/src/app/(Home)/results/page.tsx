"use client";

import { useState } from "react";
import Link from "next/link";
import { LuSearch, LuAward, LuPrinter, LuGraduationCap, LuCircleAlert, LuTrophy } from "react-icons/lu";
import useAxios from "@/hooks/useAxios";

const classes = [
  { id: "Class 6", label: "৬ষ্ঠ শ্রেণি (Class 6)" },
  { id: "Class 7", label: "৭ম শ্রেণি (Class 7)" },
  { id: "Class 8", label: "৮ম শ্রেণি (Class 8)" },
  { id: "Class 9", label: "৯ম শ্রেণি (Class 9)" },
  { id: "Class 10", label: "১০ম শ্রেণি (Class 10)" },
];

const examTypes = [
  { id: "Final Examination", label: "বার্ষিক পরীক্ষা (Final Examination)" },
  { id: "Half Yearly", label: "অর্ধ-বার্ষিক পরীক্ষা (Half Yearly)" },
  { id: "First Term", label: "১ম সাময়িক পরীক্ষা (1st Term)" },
];

const examYears = ["2025", "2026"];

export default function ResultsPage() {
  const axios = useAxios();
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [roll, setRoll] = useState("1");
  const [examType, setExamType] = useState("Final Examination");
  const [examYear, setExamYear] = useState("2025");

  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roll) {
      setErrorMsg("অনুগ্রহ করে রোল নম্বর প্রদান করুন।");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    setResultData(null);

    try {
      const res = await axios.get(
        `/results/search?className=${encodeURIComponent(selectedClass)}&roll=${roll}&examType=${encodeURIComponent(examType)}&examYear=${examYear}`
      );
      if (res.data?.data) {
        setResultData(res.data.data);
      } else {
        setErrorMsg("ফলাফল পাওয়া যায়নি। তথ্য সঠিক কিনা যাচাই করুন।");
      }
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || "প্রদত্ত তথ্য অনুযায়ী কোনো ফলাফল পাওয়া যায়নি।");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F3F8FC] py-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] p-8 md:p-12 rounded-3xl text-white shadow-xl mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 text-[#F9E8A2] rounded-full text-xs font-bold mb-3">
              <LuAward />
              <span>অনলাইন ফলাফল পোর্টাল</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              পরীক্ষার ফলাফল ও নম্বরপত্র অনুসন্ধান
            </h1>
            <p className="text-sm md:text-base text-gray-200 mt-2 max-w-2xl">
              শ্রেণি ও রোল নম্বর নির্বাচন করে তাৎক্ষণিকভাবে বিষয়ভিত্তিক নম্বর, জিপিএ, গ্রেড ও অবস্থান দেখুন।
            </p>
          </div>

          <Link
            href="/top-10"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F9E8A2] text-[#5c4300] font-bold text-sm hover:bg-[#fae488] shadow-md transition-all shrink-0"
          >
            <LuTrophy />
            <span>সেরা ১০ শিক্ষার্থী তালিকা</span>
          </Link>
        </div>

        {/* Search Form Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 mb-10">
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-6 flex items-center gap-2">
            <LuSearch className="text-[#78A4CB]" />
            <span>ফলাফল অনুসন্ধানের তথ্য প্রদান করুন</span>
          </h2>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Class */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">শ্রেণি *</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white font-medium"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Roll */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">রোল নম্বর *</label>
              <input
                type="number"
                placeholder="যেমন: ১, ২, ৩..."
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
              />
            </div>

            {/* Exam Type */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">পরীক্ষার ধরন *</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white font-medium"
              >
                {examTypes.map((ext) => (
                  <option key={ext.id} value={ext.id}>
                    {ext.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Year & Submit */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">পরীক্ষার সন *</label>
              <select
                value={examYear}
                onChange={(e) => setExamYear(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white font-medium"
              >
                {examYears.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-4 flex justify-end mt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all flex items-center justify-center gap-2"
              >
                <LuSearch />
                <span>{loading ? "অনুসন্ধান চলছে..." : "ফলাফল দেখুন"}</span>
              </button>
            </div>
          </form>

          {/* Error Message */}
          {errorMsg && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <LuCircleAlert className="text-lg shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Marksheet Display */}
        {resultData && (
          <div id="printable-marksheet" className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-[#B4E1EB]/60">
            {/* Marksheet Top Controls */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-200 print:hidden">
              <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                ফলাফল সফলভাবে প্রাপ্ত হয়েছে
              </span>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1e3a5f] font-semibold text-xs transition-colors"
              >
                <LuPrinter />
                <span>প্রিন্ট / সেভ করুন</span>
              </button>
            </div>

            {/* School Header */}
            <div className="text-center pb-6 border-b-2 border-[#78A4CB] space-y-1">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">
                আইডিয়াল মডেল স্কুল ও কলেজ
              </h2>
              <p className="text-xs text-gray-500">মিরপুর-১০, ঢাকা-১২১৬ • EIIN: ১২৩৪৫৬</p>
              <h3 className="text-lg font-bold text-[#78A4CB] pt-2">
                একাডেমিক ফলাফল ও নম্বরপত্র ({resultData.examType} - {resultData.examYear})
              </h3>
            </div>

            {/* Student Info Card */}
            <div className="my-6 p-5 rounded-2xl bg-[#F3F8FC] border border-[#B4E1EB]/60 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs md:text-sm">
              <div>
                <span className="text-gray-400 block text-[11px]">শিক্ষার্থীর নাম:</span>
                <strong className="text-[#1e3a5f] font-bold text-base">{resultData.studentName}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">শিক্ষার্থী আইডি:</span>
                <strong className="text-gray-800 font-mono">{resultData.studentId}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">শ্রেণি:</span>
                <strong className="text-[#1e3a5f]">{resultData.class}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">রোল নম্বর:</span>
                <strong className="text-[#1e3a5f] text-base">{resultData.studentRoll}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">শাখা:</span>
                <strong className="text-gray-800">{resultData.section || "A"}</strong>
              </div>
              {resultData.group && (
                <div>
                  <span className="text-gray-400 block text-[11px]">বিভাগ (গ্রুপ):</span>
                  <strong className="text-[#78A4CB]">
                    {resultData.group === "Science" ? "বিজ্ঞান" : resultData.group === "Business Studies" ? "ব্যবসায় শিক্ষা" : resultData.group === "Humanities" ? "মানবিক" : resultData.group}
                  </strong>
                </div>
              )}
              <div>
                <span className="text-gray-400 block text-[11px]">মেধাক্রম / অবস্থান:</span>
                <span className="px-2.5 py-0.5 rounded bg-[#F9E8A2] text-[#5c4300] font-extrabold">
                  {resultData.position}ম স্থান
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">ফলাফল স্ট্যাটাস:</span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  উত্তীর্ণ (Passed)
                </span>
              </div>
            </div>

            {/* Subject-Wise Marks Table */}
            <div className="overflow-x-auto my-6">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1e3a5f] text-white text-xs uppercase tracking-wider">
                    <th className="p-3.5 rounded-l-xl">ক্রমিক</th>
                    <th className="p-3.5">বিষয়</th>
                    <th className="p-3.5 text-center">প্রাপ্ত নম্বর</th>
                    <th className="p-3.5 text-center">লেটার গ্রেড</th>
                    <th className="p-3.5 rounded-r-xl text-center">গ্রেড পয়েন্ট (GPA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {resultData.subjectMarks?.map((sub: any, idx: number) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3.5 text-gray-500 font-mono">{idx + 1}</td>
                      <td className="p-3.5 font-bold text-[#1e3a5f]">{sub.subject}</td>
                      <td className="p-3.5 text-center font-bold">{sub.marks}</td>
                      <td className="p-3.5 text-center">
                        <span className="px-2.5 py-1 rounded bg-[#B4E1EB]/30 text-[#1e3a5f] font-bold text-xs">
                          {sub.grade}
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-bold text-emerald-600">
                        {sub.gpa?.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Bar */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#78A4CB] to-[#95BDD7] text-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-white/80 block">সর্বমোট নম্বর</span>
                <strong className="text-2xl md:text-3xl font-extrabold">{resultData.totalMarks}</strong>
              </div>
              <div>
                <span className="text-xs text-white/80 block">প্রাপ্ত জিপিএ (GPA)</span>
                <strong className="text-2xl md:text-3xl font-extrabold text-[#F9E8A2]">
                  {resultData.gpa?.toFixed(2)}
                </strong>
              </div>
              <div>
                <span className="text-xs text-white/80 block">চূড়ান্ত গ্রেড</span>
                <span className="px-4 py-1.5 rounded-xl bg-white text-[#1e3a5f] text-xl font-extrabold shadow-sm inline-block">
                  {resultData.grade}
                </span>
              </div>
              <div>
                <span className="text-xs text-white/80 block">শ্রেণির অবস্থান</span>
                <strong className="text-2xl md:text-3xl font-extrabold text-[#F9E8A2]">
                  {resultData.position}ম
                </strong>
              </div>
            </div>

            {/* Signature Area for Printing */}
            <div className="mt-16 pt-8 grid grid-cols-3 gap-8 text-center text-xs text-gray-500 border-t border-dashed border-gray-300">
              <div>
                <div className="w-32 border-b border-gray-400 mx-auto mb-2" />
                <span>শ্রেণি শিক্ষকের স্বাক্ষর</span>
              </div>
              <div>
                <div className="w-32 border-b border-gray-400 mx-auto mb-2" />
                <span>পরীক্ষা নিয়ন্ত্রক</span>
              </div>
              <div>
                <div className="w-32 border-b border-gray-400 mx-auto mb-2" />
                <span className="font-bold text-[#1e3a5f]">প্রধান শিক্ষক</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
