"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { LuLogOut, LuGraduationCap, LuLayoutDashboard, LuUserCheck } from "react-icons/lu";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import { handleLogout, useAuth } from "@/app/providers/AuthContext";
import { useUser } from "@/app/providers/UserContext";
import useOnlineCount from "@/hooks/useOnlineCount";

const navItems = [
  { name: "হোম", href: "/" },
  { name: "শিক্ষার্থী", href: "/students" },
  { name: "শিক্ষকবৃন্দ", href: "/teachers" },
  { name: "নোটিশ", href: "/notices" },
  { name: "ফলাফল", href: "/results" },
  { name: "সেরা ১০ শিক্ষার্থী", href: "/top-10" },
  { name: "গ্যালারি", href: "/gallery" },
  { name: "যোগাযোগ", href: "/contact" },
];

export default function NavbarNew() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();
  const { onlineCount } = useOnlineCount();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isLoggedIn = Boolean(profile?.name);

  const goDashboard = () => {
    if (auth?.user?.role === "student") {
      router.push("/student/student-dashboard");
    } else {
      router.push("/admin/admin-home");
    }
  };

  return (
    <>
      {/* ── Mobile Overlay ── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Mobile Drawer ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-50 lg:hidden shadow-2xl transform transition-transform duration-300 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#78A4CB] text-white">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xl">
                <LuGraduationCap />
              </div>
              <div className="leading-tight">
                <span className="font-bold text-base block">আইডিয়াল মডেল স্কুল</span>
                <span className="text-[11px] text-[#F9E8A2]">শিক্ষা • শৃঙ্খলা • নৈতিকতা</span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors"
              aria-label="close-menu"
            >
              <ImCross size={14} />
            </button>
          </div>

          {/* Online status indicator */}
          <div className="bg-[#B4E1EB]/40 px-5 py-2 text-xs text-[#1e3a5f] flex items-center gap-2 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>অনলাইনে শিক্ষার্থী: <strong>{onlineCount} জন</strong></span>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-5 py-3 text-[15px] font-medium transition-colors border-b border-gray-100 ${
                  pathname === item.href
                    ? "bg-[#B4E1EB]/30 text-[#1e3a5f] font-semibold border-l-4 border-[#78A4CB]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#78A4CB]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-3">
          {isLoggedIn ? (
            <div className="space-y-2">
              <button
                onClick={() => {
                  goDashboard();
                  setIsOpen(false);
                }}
                className="w-full py-2.5 bg-[#78A4CB] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <LuLayoutDashboard size={16} /> ড্যাশবোর্ড
              </button>
              <button
                onClick={() => {
                  handleLogout(router);
                  setIsOpen(false);
                }}
                className="w-full py-2 border border-red-300 rounded-lg text-red-500 text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <LuLogOut size={15} /> লগআউট
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full py-2.5 bg-[#78A4CB] rounded-lg text-white text-sm font-semibold hover:bg-[#6894bb] transition-colors shadow-sm"
            >
              লগইন করুন
            </Link>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
            <span>হেল্পলাইন: ০১৭০০-০০০০০০</span>
            <div className="flex items-center gap-2">
              <a href="#" className="text-gray-400 hover:text-[#78A4CB]"><BsFacebook size={14} /></a>
              <a href="#" className="text-gray-400 hover:text-red-500"><BsYoutube size={14} /></a>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══════════ MAIN HEADER ═══════════ */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-40 border-b border-[#B4E1EB]/50">
        {/* ── Top Mini-Bar ── */}
        <div className="bg-[#1e3a5f] text-white text-[13px] hidden md:block border-b border-[#95BDD7]/30">
          <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-9">
            {/* Left: Contact Info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <IoMdCall className="text-[#F9E8A2]" size={15} />
                <span className="text-gray-200">+৮৮০ ২-৯৮৭৬৫৪৩, +৮৮০ ১৭০০-০০০০০০</span>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <IoMdMail className="text-[#F9E8A2]" size={15} />
                <span className="text-gray-200">info@idealschool.edu.bd</span>
              </div>
            </div>

            {/* Right: Online Students Badge + Social */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 bg-[#78A4CB]/25 px-3 py-0.5 rounded-full border border-[#95BDD7]/40 text-xs text-[#F9E8A2]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-medium">অনলাইনে শিক্ষার্থী: {onlineCount} জন</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span>যোগাযোগ:</span>
                <a href="#" className="hover:text-[#F9E8A2] transition-colors"><BsFacebook size={13} /></a>
                <a href="#" className="hover:text-[#F9E8A2] transition-colors"><BsYoutube size={13} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Navbar Row ── */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between h-18 md:h-20">
          {/* Logo & School Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 md:w-13 md:h-13 rounded-xl bg-gradient-to-tr from-[#78A4CB] to-[#B4E1EB] flex items-center justify-center text-white text-2xl md:text-3xl shadow-md border-2 border-white group-hover:scale-105 transition-transform">
              <LuGraduationCap />
            </div>
            <div className="leading-tight">
              <h1 className="text-[#1e3a5f] font-bold text-lg md:text-xl tracking-tight">
                আইডিয়াল মডেল স্কুল ও কলেজ
              </h1>
              <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                <span>স্থাপিত: ১৯৯৫</span>
                <span className="text-[#78A4CB]">•</span>
                <span className="text-[#78A4CB] font-semibold">EIIN: ১২৩৪৫৬</span>
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-7">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[15px] font-semibold transition-all py-1.5 px-1 relative ${
                    active
                      ? "text-[#78A4CB]"
                      : "text-gray-700 hover:text-[#78A4CB]"
                  }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute left-0 right-0 -bottom-1 h-[2.5px] bg-[#78A4CB] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Auth / Dashboard / Contact CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={goDashboard}
                  className="flex items-center gap-2 px-4 py-2 bg-[#78A4CB] text-white rounded-lg text-sm font-semibold hover:bg-[#6894bb] transition-all shadow-sm"
                >
                  <LuLayoutDashboard size={16} />
                  <span>{auth?.user?.role === "admin" ? "অ্যাডমিন প্যানেল" : "ড্যাশবোর্ড"}</span>
                </button>
                <button
                  onClick={() => handleLogout(router)}
                  title="লগআউট"
                  className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LuLogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg border border-[#78A4CB] text-[#1e3a5f] text-sm font-semibold hover:bg-[#B4E1EB]/30 transition-colors"
                >
                  লগইন
                </Link>
                <Link
                  href="/contact"
                  className="px-4.5 py-2 rounded-lg bg-gradient-to-r from-[#78A4CB] to-[#95BDD7] text-white text-sm font-semibold hover:opacity-95 shadow-sm transition-opacity"
                >
                  ভর্তি ও তথ্য
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right: Hamburger Menu */}
          <div className="flex md:hidden items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={goDashboard}
                className="p-2 bg-[#78A4CB] text-white rounded-md text-xs font-semibold"
              >
                ড্যাশবোর্ড
              </button>
            )}
            <button
              onClick={() => setIsOpen((o) => !o)}
              aria-label={isOpen ? "close-menu" : "open-menu"}
              className="w-10 h-10 grid place-items-center rounded-lg bg-[#78A4CB] text-white"
            >
              {isOpen ? <ImCross size={14} /> : <CiMenuFries size={22} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
