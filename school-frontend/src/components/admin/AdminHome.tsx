"use client";

import Link from "next/link";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaImages,
  FaAward,
  FaPlus,
  FaFilePdf,
} from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { LuActivity, LuGraduationCap } from "react-icons/lu";
import useDashboardStats from "@/hooks/useDashboardStats";

export default function AdminHome() {
  const { statsData, isLoading } = useDashboardStats();
  const stats = statsData?.data || {};

  const classDist = stats.classDistribution || {};

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Welcome Banner */}
      <div className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] p-8 md:p-10 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 text-[#F9E8A2] rounded-full text-xs font-bold shadow-sm">
            <LuActivity className="animate-pulse" />
            <span>Live System Control Panel</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome to School Admin Dashboard
          </h1>
          <p className="text-sm text-gray-200 max-w-2xl">
            Effortlessly manage students, teachers, notices, photo gallery, and exam results for Ideal Model School & College.
          </p>
        </div>

        {/* Quick Online Badge */}
        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center shrink-0 shadow-lg">
          <div className="flex items-center justify-center gap-2 text-emerald-300 text-xs font-bold mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Online Active</span>
          </div>
          <p className="text-3xl font-extrabold text-[#F9E8A2]">
            {stats.onlineStudents || 25}
          </p>
          <span className="text-xs text-gray-300">Students Present</span>
        </div>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students */}
        <Link
          href="/admin/manage-students"
          className="bg-white p-6 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Students</p>
            <h3 className="text-3xl font-extrabold text-[#1e3a5f] mt-1 group-hover:text-[#78A4CB] transition-colors">
              {isLoading ? "..." : stats.totalStudents || 0}
            </h3>
            <p className="text-xs text-[#78A4CB] font-semibold mt-1">Class 6 - Class 10</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#B4E1EB]/40 text-[#1e3a5f] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-[#78A4CB] group-hover:text-white transition-all shadow-sm">
            <FaUserGraduate />
          </div>
        </Link>

        {/* Total Teachers */}
        <Link
          href="/admin/manage-teachers"
          className="bg-white p-6 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Teachers</p>
            <h3 className="text-3xl font-extrabold text-[#1e3a5f] mt-1 group-hover:text-emerald-600 transition-colors">
              {isLoading ? "..." : stats.totalTeachers || 0}
            </h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1">Subject Faculty</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
            <FaChalkboardTeacher />
          </div>
        </Link>

        {/* Total Notices */}
        <Link
          href="/admin/manage-notices"
          className="bg-white p-6 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Notices</p>
            <h3 className="text-3xl font-extrabold text-[#1e3a5f] mt-1 group-hover:text-amber-600 transition-colors">
              {isLoading ? "..." : stats.totalNotices || 0}
            </h3>
            <p className="text-xs text-amber-600 font-semibold mt-1">Published with PDF</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#F9E8A2]/50 text-[#5c4300] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
            <IoNotificationsSharp />
          </div>
        </Link>

        {/* Total Gallery */}
        <Link
          href="/admin/manage-gallery"
          className="bg-white p-6 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gallery Photos</p>
            <h3 className="text-3xl font-extrabold text-[#1e3a5f] mt-1 group-hover:text-purple-600 transition-colors">
              {isLoading ? "..." : stats.totalGallery || 0}
            </h3>
            <p className="text-xs text-purple-600 font-semibold mt-1">Photos & Events</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
            <FaImages />
          </div>
        </Link>
      </div>

      {/* Class Breakdown: Class 6, 7, 8, 9, 10 */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60">
        <h2 className="text-lg md:text-xl font-bold text-[#1e3a5f] mb-6 flex items-center gap-2">
          <LuGraduationCap className="text-[#78A4CB]" />
          <span>Class Distribution (Students per Class)</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-[#F3F8FC] border border-[#B4E1EB]/60 text-center hover:scale-105 transition-all duration-200">
            <p className="text-xs text-gray-500 font-bold">Class 6 Students</p>
            <p className="text-2xl font-extrabold text-[#1e3a5f] mt-1">
              {classDist.class6 || 0}
            </p>
            <span className="text-[11px] text-gray-400">Class 6th</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F3F8FC] border border-[#B4E1EB]/60 text-center hover:scale-105 transition-all duration-200">
            <p className="text-xs text-gray-500 font-bold">Class 7 Students</p>
            <p className="text-2xl font-extrabold text-[#1e3a5f] mt-1">
              {classDist.class7 || 0}
            </p>
            <span className="text-[11px] text-gray-400">Class 7th</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F3F8FC] border border-[#B4E1EB]/60 text-center hover:scale-105 transition-all duration-200">
            <p className="text-xs text-gray-500 font-bold">Class 8 Students</p>
            <p className="text-2xl font-extrabold text-[#1e3a5f] mt-1">
              {classDist.class8 || 0}
            </p>
            <span className="text-[11px] text-gray-400">Class 8th</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F9E8A2]/30 border border-amber-200 text-center hover:scale-105 transition-all duration-200">
            <p className="text-xs text-[#5c4300] font-bold">Class 9 Students</p>
            <p className="text-2xl font-extrabold text-[#1e3a5f] mt-1">
              {classDist.class9 || 0}
            </p>
            <span className="text-[11px] text-amber-700 font-medium">Science / Arts / Commerce</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F9E8A2]/30 border border-amber-200 text-center hover:scale-105 transition-all duration-200">
            <p className="text-xs text-[#5c4300] font-bold">Class 10 Students</p>
            <p className="text-2xl font-extrabold text-[#1e3a5f] mt-1">
              {classDist.class10 || 0}
            </p>
            <span className="text-[11px] text-amber-700 font-medium">SSC Batch</span>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60">
        <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Quick Shortcuts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/manage-students"
            className="p-3.5 rounded-2xl bg-[#78A4CB]/10 hover:bg-[#78A4CB] text-[#1e3a5f] hover:text-white font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer text-center shadow-sm"
          >
            <FaPlus />
            <span>Add Student</span>
          </Link>
          <Link
            href="/admin/manage-notices"
            className="p-3.5 rounded-2xl bg-[#F9E8A2]/40 hover:bg-[#F9E8A2] text-[#5c4300] font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer text-center shadow-sm"
          >
            <FaFilePdf />
            <span>Upload Notice</span>
          </Link>
          <Link
            href="/admin/manage-teachers"
            className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer text-center shadow-sm"
          >
            <FaChalkboardTeacher />
            <span>Add Teacher</span>
          </Link>
          <Link
            href="/admin/manage-gallery"
            className="p-3.5 rounded-2xl bg-purple-50 hover:bg-purple-600 text-purple-800 hover:text-white font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer text-center shadow-sm"
          >
            <FaImages />
            <span>Upload Gallery</span>
          </Link>
          <Link
            href="/admin/manage-results"
            className="p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer text-center shadow-sm"
          >
            <FaAward />
            <span>Results & Top 10</span>
          </Link>
          <Link
            href="/admin/manage-reviews"
            className="p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-600 text-rose-800 hover:text-white font-bold text-xs flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer text-center shadow-sm"
          >
            <MdOutlineRateReview />
            <span>Manage Reviews</span>
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
              <span>Recent Notices</span>
            </h3>
            <Link href="/admin/manage-notices" className="text-xs text-[#78A4CB] font-bold hover:underline cursor-pointer">
              All Notices ›
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentNotices && stats.recentNotices.length > 0 ? (
              stats.recentNotices.map((n: any) => (
                <div key={n._id} className="p-3.5 rounded-2xl bg-[#F3F8FC] border border-gray-100 flex items-center justify-between gap-3 hover:shadow-sm transition-shadow">
                  <div className="truncate">
                    <p className="text-sm font-bold text-[#1e3a5f] truncate">{n.heading}</p>
                    <span className="text-[11px] text-gray-400">{n.publishDate}</span>
                  </div>
                  {n.pdfUrl && (
                    <a
                      href={n.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <FaFilePdf size={13} />
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">No notices found.</p>
            )}
          </div>
        </div>

        {/* Recent Students */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-bold text-lg text-[#1e3a5f] flex items-center gap-2">
              <FaUserGraduate className="text-[#78A4CB]" />
              <span>Recently Added Students</span>
            </h3>
            <Link href="/admin/manage-students" className="text-xs text-[#78A4CB] font-bold hover:underline cursor-pointer">
              Manage Students ›
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentStudents && stats.recentStudents.length > 0 ? (
              stats.recentStudents.map((s: any) => (
                <div key={s._id} className="p-3.5 rounded-2xl bg-[#F3F8FC] border border-gray-100 flex items-center justify-between gap-3 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#78A4CB] bg-gray-100 shrink-0">
                      <img src={s.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"} alt={s.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1e3a5f]">{s.name}</p>
                      <span className="text-[11px] text-gray-500">Roll: {s.roll} • {s.class} ({s.section || "A"})</span>
                    </div>
                  </div>
                  {s.group && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#B4E1EB]/40 text-[#1e3a5f] text-[10px] font-bold">
                      {s.group}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">No students found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
