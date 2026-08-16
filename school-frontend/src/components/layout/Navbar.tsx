"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { IoMdCall } from "react-icons/io";

import { handleLogout, useAuth } from "@/app/providers/AuthContext";
import { useUser } from "@/app/providers/UserContext";
import logo from "@/assets/logo-without-bg.png";
import { useRouter, usePathname } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify"; 

const navItems = [
  { name: "হোম", href: "/" },
  { name: "কোর্সসমূহ", href: "/courses" },
  { name: "বইসমূহ", href: "/books" },
  { name: "শিক্ষকবৃন্দ", href: "/teachers" },
  { name: "যোগাযোগ", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { profile } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white shadow-md "
            : "bg-white sm:bg-white/15 backdrop-blur-md sm:text-white"
        }
      `}
    >
      {/* Top Mini‑Bar */}
      <div
        className={`hidden sm:flex bg-primary  items-center transition-all duration-300 ${
          scrolled ? "opacity-0 pointer-events-none h-0" : "opacity-100 h-10"
        }`}
      >
        <div className="container mx-auto text-white flex justify-between items-center gap-5 py-8">
          <div className="slider-container w-1/2 flex-nowrap relative overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="marqueeRight  flex items-center gap-5">
              إِقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴿١﴾ خَلَقَ الْإِنسَانَ
              مِنْ عَلَقٍ
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.facebook.com/onlinequranacademy24"
              target="_blank"
            >
              <BsFacebook className="text-xl hover:text-green-500 transition" />
            </Link>
            <Link href="https://wa.me/8801775060181" target="_blank">
              <BsWhatsapp className="text-xl hover:text-green-500 transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="container1  flex items-center justify-between px-6 h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center ">
          <Image
            src={logo}
            alt="Logo"
            className="w-12 lg:w-20 h-12 py-1 rounded-sm lg:h-20"
          />
        </Link>

        {/* Contact Info */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="https://wa.me/8801775060181" target="_blank">
            <IoMdCall className="text-2xl animate-bounce text-green-800" />
          </Link>
          <div>
            <Link
              href="https://wa.me/8801775060181"
              target="_blank"
              className="block font-medium"
            >
              +8801775-060181
            </Link>
            <p className="text-sm ">quranacademybd1@gmail.com</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden  lg:flex items-center space-x-8 text-base">
          {navItems.map((item) => (
            <li key={item.name} className="relative group">
              <Link
                href={item.href}
                className={`relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom hover:after:scale-x-100  ${
                  scrolled
                    ? "hover:text-primary after:bg-primary"
                    : "hover:text-darker after:bg-darker"
                } `}
              >
                {item.name}
                {pathname === item.href && (
                  <hr
                    className={`${scrolled ? "border-darker" : "border-white"}`}
                  />
                )}
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSd-SCNJ6ay9vvFIGfSPQizD5YKd0GJqZljXSDTKy9oLeBks5g/viewform"
              target="_blank"
              className="relative inline-block text-lg group"
            >
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-darker transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                <span className="relative">এডমিশন</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-darker rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </Link>
          </li>

          <li>
            {profile.name !== "" && profile.name !== undefined ? (
              <div className="flex items-center gap-4">
                <div className="relative group inline-block">
                  <div
                    className={`${
                      scrolled
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-primary"
                    } p-2 h-10 w-10 grid place-items-center rounded-full font-semibold  cursor-pointer`}
                  >
                    {profile.avatar !== "" && profile.avatar !== undefined ? (
                      <Image
                        onClick={() => {
                          auth?.user.role === "student"
                            ? router.push("/student/student-dashboard")
                            : router.push("/admin/admin-home");
                        }}
                        src={profile.avatar}
                        alt="avatar"
                        className="h-full w-full rounded-full"
                        fill
                      />
                    ) : (
                      <Link
                        href={`${
                          auth?.user.role === "student"
                            ? "/student/student-dashboard"
                            : "/admin/admin-home"
                        }`}
                      >
                        {profile.name?.split(" ")[0][0]}
                      </Link>
                    )}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Dashboard
                  </div>
                </div>
                <div className="relative group inline-block">
                  <button
                    onClick={() => handleLogout(router)}
                    className="text-2xl p-2"
                  >
                    <LuLogOut className="text-red-500" />
                  </button>
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Logout
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-primary rounded shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span
                  className={`absolute flex items-center justify-center w-full h-full ${
                    scrolled ? "text-primary " : "text-white"
                  } transition-all duration-300 transform group-hover:translate-x-full ease`}
                >
                  Login
                </span>
                <span className="relative invisible">Login</span>
              </Link>
            )}
          </li>
        </ul>
        <div className="lg:hidden flex items-center gap-5">
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSd-SCNJ6ay9vvFIGfSPQizD5YKd0GJqZljXSDTKy9oLeBks5g/viewform"
            target="_blank"
            className="relative inline-block text-base group"
          >
            <span className="relative z-10 block px-3 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-3 py-2 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-32 h-32 -ml-1 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-8 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span className="relative">এডমিশন</span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-10 -mb-[3px] -mr-[2px] transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </Link>

          {profile.name !== "" && profile.name !== undefined ? (
            <>
              <div className="relative group inline-block">
                <div
                  className={`${
                    scrolled
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-primary"
                  } p-1 h-8 w-8 grid place-items-center rounded-full font-semibold cursor-pointer`}
                >
                  {profile.avatar !== "" && profile.avatar !== undefined ? (
                    <Image
                      onClick={() => {
                        auth?.user.role === "student"
                          ? router.push("/student/student-dashboard")
                          : router.push("/admin/admin-home");
                      }}
                      src={profile.avatar}
                      alt="avatar"
                      className="h-full w-full rounded-full"
                      fill
                    />
                  ) : (
                    <Link
                      href={`${
                        auth?.user.role === "student"
                          ? "/student/student-dashboard"
                          : "/admin/admin-home"
                      }`}
                    >
                      {profile.name.split(" ")[0][0]}
                    </Link>
                  )}
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Dashboard
                </div>
              </div>

              <div className="relative group inline-block">
                <button onClick={() => handleLogout(router)} className="text-2xl p-2">
                  <LuLogOut className="text-red-500" />
                </button>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Logout
                </div>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="relative inline-flex items-center justify-center px-4 py-1.5 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-primary rounded shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span
                className={`absolute flex items-center justify-center w-full h-full ${
                  scrolled ? "text-primary " : "sm:text-white"
                } transition-all duration-300 transform group-hover:translate-x-full ease`}
              >
                Login
              </span>
              <span className="relative invisible">Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-2xl p-2"
          onClick={() => setIsOpen((o) => !o)}
        >
          {isOpen ? <ImCross /> : <CiMenuFries />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/10 backdrop-blur-md shadow-md">
          <ul className="space-y-1 p-4 text-base">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 hover:bg-gray-100 hover:text-primary rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
