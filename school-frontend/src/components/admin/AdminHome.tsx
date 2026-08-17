"use client";

import Link from "next/link";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaImages,
  FaAward,
  FaPlus,
  FaEye,
  FaFilePdf,
} from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { LuUsers, LuActivity, LuCalendar, LuGraduationCap } from "react-icons/lu";
import useDashboardStats from "@/hooks/useDashboardStats";

export default function AdminHome() {
  const { statsData, isLoading } = useDashboardStats();
  const stats = statsData?.data || {};

  const classDist = stats.classDistribution || {};

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Welcome Banner */}
      <div className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-[#F9E8A2] rounded-full text-xs font-bold">
            <LuActivity className="animate-pulse" />
            <span>লাইভ সিস্টেম কন্ট্রোল প্যানেল</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold">
            স্বাগতম, বিদ্যালয় অ্যাডমিন ড্যাশবোর্ড
          </h1>
          <p className="text-sm text-gray-200">
            আইডিয়াল মডেল স্কুল ও কলেজের সকল শিক্ষার্থী, শিক্ষক, নোটিশ, গ্যালারি ও পরীক্ষার ফলাফল ব্যবস্থাপনা করুন।
          </p>
        </div>

        {/* Quick Online Badge */}
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center shrink-0">
          <div className="flex items-center justify-center gap-2 text-emerald-300 text-xs font-bold mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>অনলাইনে সক্রিয়</span>
          </div>
          <p className="text-3xl font-extrabold text-[#F9E8A2]">
            {stats.onlineStudents || 25} জন
          </p>
          <span className="text-xs text-gray-300">শিক্ষার্থী উপস্থিত</span>
        </div>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#B4E1EB]/60 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">মোট শিক্ষার্থী</p>
            <h3 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">
              {isLoading ? "..." : stats.totalStudents || 0}
            </h3>
            <p className="text-xs text-[#78A4CB] font-semibold mt-1">৬ষ্ঠ - ১০ম শ্রেণি</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#B4E1EB]/40 text-[#1e3a5f] flex items-center justify-center text-2xl">
            <FaUserGraduate />
          </div>
        </div>

        {/* Total Teachers */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#B4E1EB]/60 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">মোট শিক্ষক</p>
            <h3 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">
              {isLoading ? "..." : stats.totalTeachers || 0}
            </h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1">বিষয়ভিত্তিক শিক্ষক</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl">
            <FaChalkboardTeacher />
          </div>
        </div>

        {/* Total Notices */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#B4E1EB]/60 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">মোট নোটিশ</p>
            <h3 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">
              {isLoading ? "..." : stats.totalNotices || 0}
            </h3>
            <p className="text-xs text-amber-600 font-semibold mt-1">পিডিএফ সহ প্রকাশিত</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#F9E8A2]/50 text-[#5c4300] flex items-center justify-center text-2xl">
            <IoNotificationsSharp />
          </div>
        </div>

        {/* Total Gallery */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#B4E1EB]/60 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">মোট গ্যালারি ছবি</p>
            <h3 className="text-3xl font-extrabold text-[#1e3a5f] mt-1">
              {isLoading ? "..." : stats.totalGallery || 0}
            </h3>
            <p className="text-xs text-purple-600 font-semibold mt-1">ফটো ও ইভেন্ট</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center text-2xl">
            <FaImages />
          </div>
        </div>
      </div>

      {/* Class Breakdown: Class 6, 7, 8, 9, 10 */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60">
        <h2 className="text-lg md:text-xl font-bold text-[#1e3a5f] mb-6 flex items-center gap-2">
          <LuGraduationCap className="text-[#78A4CB]" />
          <span>শ্রেণিভিত্তিক শিক্ষার্থী সংখ্যা (Class Distribution)</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-[#F3F8FC] border border-[#B4E1EB]/60 text-center">
            <p className="text-xs text-gray-500 font-bold">ক্লাস ৬-এর শিক্ষার্থী</p>
            <p className="text-2xl font-extrabold text-[#1e3a5f] mt-1">
              {classDist.class6 || 0} জন
            </p>
            <span className="text-[11px] text-gray-400">৬ষ্ঠ শ্রেণি</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F3F8FC] border border-[#B4E1EB]/60 text-center">
            <p className="text-xs text-gray-500 font-bold">ক্লাস ৭-এর শিক্ষার্থী</p>
            <p className="text-2xl font-extrabold text-[#1e3a5f] mt-1">
              {classDist.class7 || 0} জন
            </p>
            <span className="text-[11px] text-gray-400">৭ম শ্রেণি</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F3F8FC] border border-[#B4E1EB]/60 text-center">
            <p className="text-xs text-gray-500 font-bold">ক্লাস ৮-এর শিক্ষার্থী</p>
            <p className="text-2xl font-extrabold text-[#1e3a5f] mt-1">
              {classDist.class8 || 0} জন
            </p>
            <span className="text-[11px] text-gray-400">৮ম শ্রেণি</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F9E8A2]/30 border border-amber-200 text-center">
            <p className="text-xs text-[#5c4300] font-bold">ক্লাস ৯-এর শিক্ষার্থী</p>
            <p className="text-2xl font-extrabold text-[#1e3a5f] mt-1">
              {classDist.class9 || 0} জন
            </p>
            <span className="text-[11px] text-amber-700 font-medium">বিজ্ঞান/মানবিক/ব্যবসায়</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F9E8A2]/30 border border-amber-200 text-center">
            <p className="text-xs text-[#5c4300] font-bold">ক্লাস ১০-এর শিক্ষার্থী</p>
            <p className="text-2xl font-extrabold text-[#1e3a5f] mt-1">
              {classDist.class10 || 0} জন
            </p>
            <span className="text-[11px] text-amber-700 font-medium">এসএসসি ব্যাচ</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60">
        <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">দ্রুত অ্যাকশন (Quick Shortcuts)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/manage-students"
            className="p-3.5 rounded-xl bg-[#78A4CB]/10 hover:bg-[#78A4CB] text-[#1e3a5f] hover:text-white font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all text-center"
          >
            <FaPlus />
            <span>নতুন শিক্ষার্থী যুক্ত</span>
          </Link>
          <Link
            href="/admin/manage-notices"
            className="p-3.5 rounded-xl bg-[#F9E8A2]/40 hover:bg-[#F9E8A2] text-[#5c4300] font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all text-center"
          >
            <FaFilePdf />
            <span>পিডিএফ নোটিশ আপলোড</span>
          </Link>
          <Link
            href="/admin/manage-teachers"
            className="p-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all text-center"
          >
            <FaChalkboardTeacher />
            <span>নতুন শিক্ষক যোগ</span>
          </Link>
          <Link
            href="/admin/manage-gallery"
            className="p-3.5 rounded-xl bg-purple-50 hover:bg-purple-600 text-purple-800 hover:text-white font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all text-center"
          >
            <FaImages />
            <span>গ্যালারি ছবি আপলোড</span>
          </Link>
          <Link
            href="/admin/manage-results"
            className="p-3.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all text-center"
          >
            <FaAward />
            <span>ফলাফল ও টপ ১০</span>
          </Link>
          <Link
            href="/admin/manage-reviews"
            className="p-3.5 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-800 hover:text-white font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all text-center"
          >
            <MdOutlineRateReview />
            <span>মতামত ব্যবস্থাপনা</span>
          </Link>
        </div>
      </div>

      {/* Recent Notices & Recent Students Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Notices */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-bold text-lg text-[#1e3a5f] flex items-center gap-2">
              <IoNotificationsSharp className="text-[#78A4CB]" />
              <span>সাম্প্রতিক নোটিশসমূহ</span>
            </h3>
            <Link href="/admin/manage-notices" className="text-xs text-[#78A4CB] font-bold hover:underline">
              সকল নোটিশ ›
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentNotices && stats.recentNotices.length > 0 ? (
              stats.recentNotices.map((n: any) => (
                <div key={n._id} className="p-3.5 rounded-xl bg-[#F3F8FC] border border-gray-100 flex items-center justify-between gap-3">
                  <div className="truncate">
                    <p className="text-sm font-bold text-[#1e3a5f] truncate">{n.heading}</p>
                    <span className="text-[11px] text-gray-400">{n.publishDate}</span>
                  </div>
                  {n.pdfUrl && (
                    <a href={n.pdfUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200">
                      <FaFilePdf size={13} />
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">কোনো নোটিশ পাওয়া যায়নি।</p>
            )}
          </div>
        </div>

        {/* Recent Students */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-bold text-lg text-[#1e3a5f] flex items-center gap-2">
              <FaUserGraduate className="text-[#78A4CB]" />
              <span>নতুন শিক্ষার্থী তালিকা</span>
            </h3>
            <Link href="/admin/manage-students" className="text-xs text-[#78A4CB] font-bold hover:underline">
              শিক্ষার্থী ব্যবস্থাপনা ›
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentStudents && stats.recentStudents.length > 0 ? (
              stats.recentStudents.map((s: any) => (
                <div key={s._id} className="p-3.5 rounded-xl bg-[#F3F8FC] border border-gray-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-[#78A4CB] bg-gray-100 shrink-0">
                      <img src={s.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"} alt={s.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1e3a5f]">{s.name}</p>
                      <span className="text-[11px] text-gray-500">রোল: {s.roll} • {s.class} ({s.section || "A"})</span>
                    </div>
                  </div>
                  {s.group && (
                    <span className="px-2 py-0.5 rounded bg-[#B4E1EB]/40 text-[#1e3a5f] text-[10px] font-bold">
                      {s.group}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">কোনো শিক্ষার্থী পাওয়া যায়নি।</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
