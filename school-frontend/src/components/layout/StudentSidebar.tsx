"use client";
import { handleLogout } from "@/app/providers/AuthContext";
import { useUser } from "@/app/providers/UserContext";
import logo from "@/assets/logo.jpg";
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
            isOpen ? "px-5" : "px-2"
          }`}
        >
          <nav className="flex flex-col gap-0 xl:gap-2">
            {navItems.map(({ href, label, Icon }, idx) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={idx}
                  href={href}
                  className={`flex items-center w-full transition-all duration-200 rounded-md p-2 hover:bg-gray-900 relative group ${
                    isOpen ? "justify-between" : "justify-center"
                  } ${isActive ? "bg-gray-800 border-l-4 border-white" : ""}`}
                >
                  {isOpen ? (
                    <div className="flex items-center justify-center gap-2">
                      <Icon
                        size={20}
                        className={`${isActive ? "text-light" : "text-white"}`}
                      />
                      <span
                        className={`font-medium text-sm lg:text-sm xl:text-md ${
                          isActive ? "text-light" : "text-white"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  ) : (
                    <div className="relative">
                      <Icon
                        size={22}
                        className={`${isActive ? "text-light" : "text-white"}`}
                      />
                      <span className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-100 text-black text-sm rounded px-2 py-1 whitespace-nowrap">
                        {label}
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
          {/* Section break */}
          <div className="border-t border-gray-700"></div>
          {/*  Go to Home Button */}
          <Link
            href="/"
            className={`flex items-center w-full transition-all duration-200 mt-3 rounded-md p-2 bg-[#142a57] hover:bg-[#1d3d7c] text-primary relative group ${
              isOpen ? "justify-between" : "justify-center"
            }`}
          >
            {isOpen ? (
              <div className="flex items-center justify-center gap-2">
                <FaHome size={20} className="text-white" />
                <span className="font-medium text-sm lg:text-sm xl:text-md text-white">
                  Go to Home
                </span>
              </div>
            ) : (
              <div className="relative">
                <FaHome size={22} className="text-white" />
                <span className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-100 text-black text-sm rounded px-2 py-1 whitespace-nowrap">
                  Go to Home
                </span>
              </div>
            )}
          </Link>
          {/* Logout button */}
          <button
            onClick={() => handleLogout(router)}
            className={`flex items-center w-full transition-all duration-200 mt-3 rounded-md p-2 bg-red-500 hover:bg-red-600 text-white relative group ${
              isOpen ? "justify-between" : "justify-center"
            }`}
          >
            {isOpen ? (
              <div className="flex items-center justify-center gap-2">
                <LuLogOut size={20} className="text-white" />
                <span className="font-medium text-sm lg:text-sm xl:text-md text-white">
                  Logout
                </span>
              </div>
            ) : (
              <div className="relative">
                <LuLogOut size={22} className="text-white" />
                <span className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-100 text-black text-sm rounded px-2 py-1 whitespace-nowrap">
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
