"use client";
import { handleLogout } from "@/app/providers/AuthContext";
import { useUser } from "@/app/providers/UserContext";


import Image from "next/image";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdNotificationAdd,
  MdRateReview,
} from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import logo from "@/assets/school-logo.png"

interface StudentSidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StudentSidebar({
  isOpen,
  setIsOpen,
}: StudentSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const navItems = [
    { href: "/student/student-dashboard", label: "Profile", Icon: CgProfile },
    { href: "/student/notices", label: "Notice", Icon: MdNotificationAdd },
    {
      href: "/student/student-reviews",
      label: "My Reviews",
      Icon: MdRateReview,
    },
    {
      href: "/student/change-password",
      label: "Change Password",
      Icon: RiLockPasswordFill,
    },
  ];

  return (
    <>
      <aside className=" bg-primary fixed inset-y-0  overflow-visible z-10 lg:fixed lg:top-0 left-0 h-screen shadow-md  transition-all duration-300 ease-in-out">
        <div
          className={` transition-all duration-300 ease-in-out relative overflow-visible ${
            isOpen ? " w-52 px-2" : "w-28 px-5"
          }`}
        >
          {isOpen ? (
            <div className="flex  pt-6 items-center justify-center relative">
              <div
                className={`flex flex-col items-start justify-start gap-2 ${
                  isOpen ? "px-5" : "px-2"
                }`}
              >
                <Link href="/">
                  <Image
                    src={logo}
                    alt="logo"
                    className="w-12 rounded cursor-pointer"
                  />
                </Link>
                <p className="font-semibold text-white">Dawah Quran Academy</p>
              </div>
              {/* <span className="text-lg font-medium">DevKon School</span> */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -right-4 top-2 z-50 bg-white border-2 border-[#ffd54f] text-primary rounded-full p-1 text-2xl cursor-pointer"
              >
                <MdKeyboardDoubleArrowLeft />
              </button>
            </div>
          ) : (
            <div className="pt-8">
              <Image
                src={logo}
                alt="logo"
                className="w-12 rounded mx-auto cursor-pointer"
              />
              <button
                onClick={() => setIsOpen(true)}
                className="absolute -right-2 top-2 z-50 bg-white border-2 border-[#ffd54f] text-primary rounded-full p-1 text-2xl cursor-pointer"
              >
                <MdKeyboardDoubleArrowRight />
              </button>
            </div>
          )}
        </div>

        {/* Navigation links */}
        <div
          className={`mt-6 transition-all duration-300 ease-in-out ${
            isOpen ? "px-4" : "px-2"
          }`}
        >
          <nav className="flex flex-col gap-1.5">
            {navItems.map(({ href, label, Icon }, idx) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={idx}
                  href={href}
                  className={`flex items-center w-full transition-all duration-200 rounded-2xl p-3 relative group cursor-pointer hover:scale-[1.02] active:scale-95 ${
                    isOpen ? "justify-between" : "justify-center"
                  } ${
                    isActive
                      ? "bg-gray-900 text-white font-bold shadow-md"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {isOpen ? (
                    <div className="flex items-center gap-3">
                      <Icon
                        size={20}
                        className={`transition-transform group-hover:scale-110 ${isActive ? "text-[#F9E8A2]" : "text-white"}`}
                      />
                      <span className="font-medium text-sm text-white">{label}</span>
                    </div>
                  ) : (
                    <div className="relative">
                      <Icon
                        size={22}
                        className={`transition-transform group-hover:scale-110 ${isActive ? "text-[#F9E8A2]" : "text-white"}`}
                      />
                      <span className="absolute top-1/2 left-full ml-3 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#1e3a5f] text-white text-xs font-semibold rounded-lg px-3 py-1.5 whitespace-nowrap shadow-xl z-50 pointer-events-none">
                        {label}
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Section break */}
          <div className="border-t border-white/10 my-4"></div>

          {/* Go to Home Button */}
          <Link
            href="/"
            className={`flex items-center w-full transition-all duration-200 rounded-2xl p-3 bg-white/10 hover:bg-white/20 text-white relative group cursor-pointer hover:scale-[1.02] active:scale-95 ${
              isOpen ? "justify-between" : "justify-center"
            }`}
          >
            {isOpen ? (
              <div className="flex items-center gap-3">
                <FaHome size={18} className="text-[#F9E8A2] transition-transform group-hover:scale-110" />
                <span className="font-medium text-sm text-white">Go to Home</span>
              </div>
            ) : (
              <div className="relative">
                <FaHome size={20} className="text-[#F9E8A2]" />
                <span className="absolute top-1/2 left-full ml-3 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#1e3a5f] text-white text-xs font-semibold rounded-lg px-3 py-1.5 whitespace-nowrap shadow-xl z-50 pointer-events-none">
                  Go to Home
                </span>
              </div>
            )}
          </Link>

          {/* Logout button */}
          <button
            type="button"
            onClick={() => handleLogout(router)}
            className={`flex items-center w-full transition-all duration-200 mt-2 rounded-2xl p-3 bg-red-600 hover:bg-red-700 text-white relative group cursor-pointer hover:scale-[1.02] active:scale-95 shadow-sm ${
              isOpen ? "justify-between" : "justify-center"
            }`}
          >
            {isOpen ? (
              <div className="flex items-center gap-3">
                <LuLogOut size={18} className="text-white transition-transform group-hover:scale-110" />
                <span className="font-semibold text-sm text-white">Logout</span>
              </div>
            ) : (
              <div className="relative">
                <LuLogOut size={20} className="text-white" />
                <span className="absolute top-1/2 left-full ml-3 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-red-600 text-white text-xs font-semibold rounded-lg px-3 py-1.5 whitespace-nowrap shadow-xl z-50 pointer-events-none">
                  Logout
                </span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
