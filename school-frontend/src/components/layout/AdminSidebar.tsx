"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHome, FaChalkboardTeacher, FaUserGraduate, FaImages, FaAward } from "react-icons/fa";
import { LuLogOut, LuGraduationCap } from "react-icons/lu";
import { IoMdMail, IoMdPerson } from "react-icons/io";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdNotificationAdd,
  MdOutlineRateReview,
} from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { handleLogout } from "@/app/providers/AuthContext";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminSidebar({
  isOpen,
  setIsOpen,
}: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/admin/admin-home",
      label: "Dashboard",
      Icon: FaHome,
    },
    {
      href: "/admin/manage-students",
      label: "Manage Students",
      Icon: FaUserGraduate,
    },
    {
      href: "/admin/manage-teachers",
      label: "Manage Teachers",
      Icon: FaChalkboardTeacher,
    },
    {
      href: "/admin/manage-notices",
      label: "Manage Notices",
      Icon: MdNotificationAdd,
    },
    {
      href: "/admin/manage-gallery",
      label: "Manage Gallery",
      Icon: FaImages,
    },
    {
      href: "/admin/manage-results",
      label: "Results & Top 10",
      Icon: FaAward,
    },
    {
      href: "/admin/manage-reviews",
      label: "Manage Reviews",
      Icon: MdOutlineRateReview,
    },
    {
      href: "/admin/all-users",
      label: "All Users",
      Icon: IoMdPerson,
    },
    {
      href: "/admin/send-mail",
      label: "Send Mail",
      Icon: IoMdMail,
    },
    {
      href: "/admin/change-password",
      label: "Change Password",
      Icon: RiLockPasswordFill,
    },
  ];

  return (
    <>
      <aside className="bg-[#102033] fixed inset-y-0 overflow-y-auto z-40 lg:fixed lg:top-0 left-0 h-screen shadow-xl transition-all duration-300 ease-in-out border-r border-gray-800">
        <div
          className={`transition-all duration-300 ease-in-out relative overflow-visible ${
            isOpen ? "w-64 px-4" : "w-20 px-3"
          }`}
        >
          {/* Sidebar Header */}
          {isOpen ? (
            <div className="flex pt-6 pb-4 items-center justify-between relative border-b border-gray-800">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#78A4CB] to-[#B4E1EB] flex items-center justify-center text-white text-2xl shadow-md shrink-0">
                  <LuGraduationCap />
                </div>
                <div className="leading-tight">
                  <span className="font-bold text-white text-sm block">Ideal Model School</span>
                  <span className="text-[11px] text-[#F9E8A2]">Admin Panel</span>
                </div>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-[#1e3a5f] border border-[#78A4CB] text-[#F9E8A2] rounded-full p-1.5 text-lg hover:bg-[#78A4CB] hover:text-white transition-colors"
              >
                <MdKeyboardDoubleArrowLeft />
              </button>
            </div>
          ) : (
            <div className="pt-6 pb-4 flex flex-col items-center gap-3 border-b border-gray-800">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#78A4CB] to-[#B4E1EB] flex items-center justify-center text-white text-xl shadow-md">
                <LuGraduationCap />
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-[#1e3a5f] border border-[#78A4CB] text-[#F9E8A2] rounded-full p-1 text-base hover:bg-[#78A4CB] hover:text-white transition-colors"
              >
                <MdKeyboardDoubleArrowRight />
              </button>
            </div>
          )}
        </div>

        {/* Navigation links */}
        <div className={`mt-4 pb-20 ${isOpen ? "px-3" : "px-2"}`}>
          <nav className="flex flex-col gap-1.5">
            {menuItems.map(({ href, label, Icon }, idx) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={idx}
                  href={href}
                  className={`flex items-center w-full transition-all duration-200 rounded-2xl p-3 relative group cursor-pointer hover:scale-[1.02] active:scale-95 ${
                    isOpen ? "justify-start gap-3" : "justify-center"
                  } ${
                    isActive
                      ? "bg-[#78A4CB] text-white font-bold shadow-md shadow-[#78A4CB]/30"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-[#95BDD7]"}`}
                  />
                  {isOpen ? (
                    <span className="text-sm truncate font-medium">{label}</span>
                  ) : (
                    <span className="absolute top-1/2 left-full ml-3 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#1e3a5f] text-white text-xs font-semibold rounded-lg px-3 py-1.5 whitespace-nowrap shadow-xl z-50 pointer-events-none">
                      {label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Section break */}
          <div className="border-t border-gray-800 my-4"></div>

          {/* Go to Home */}
          <Link
            href="/"
            className={`flex items-center w-full transition-all duration-200 rounded-2xl p-3 bg-white/5 hover:bg-white/10 text-gray-300 relative group cursor-pointer hover:scale-[1.02] active:scale-95 ${
              isOpen ? "justify-start gap-3" : "justify-center"
            }`}
          >
            <FaHome size={18} className="text-[#F9E8A2] transition-transform group-hover:scale-110" />
            {isOpen ? (
              <span className="text-sm font-medium">Main Website</span>
            ) : (
              <span className="absolute top-1/2 left-full ml-3 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#1e3a5f] text-white text-xs font-semibold rounded-lg px-3 py-1.5 whitespace-nowrap shadow-xl z-50 pointer-events-none">
                Main Website
              </span>
            )}
          </Link>

          {/* Logout button */}
          <button
            type="button"
            onClick={() => handleLogout(router)}
            className={`flex items-center w-full transition-all duration-200 rounded-2xl mt-2 p-3 bg-red-600/80 hover:bg-red-600 text-white relative group cursor-pointer hover:scale-[1.02] active:scale-95 ${
              isOpen ? "justify-start gap-3" : "justify-center"
            }`}
          >
            <LuLogOut size={18} className="text-white transition-transform group-hover:scale-110" />
            {isOpen ? (
              <span className="text-sm font-semibold">Logout</span>
            ) : (
              <span className="absolute top-1/2 left-full ml-3 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-red-600 text-white text-xs font-semibold rounded-lg px-3 py-1.5 whitespace-nowrap shadow-xl z-50 pointer-events-none">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
