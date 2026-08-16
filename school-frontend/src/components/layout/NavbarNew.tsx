"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { useRouter, usePathname } from "next/navigation";

import { handleLogout, useAuth } from "@/app/providers/AuthContext";
import { useUser } from "@/app/providers/UserContext";
import logo from "@/assets/logo1.jpeg";

const navItems = [
  { name: "হোম", href: "/" },
  { name: "কোর্সসমূহ", href: "/courses" },  //  /courses
  { name: "বইসমূহ", href: "/books" },
  { name: "শিক্ষকবৃন্দ", href: "/teachers" },
  { name: "যোগাযোগ", href: "/contact" },  //  /contact
];

export default function NavbarNew() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const isLoggedIn = profile.name !== "" && profile.name !== undefined;
  const goDashboard = () => {
    auth?.user.role === "student"
      ? router.push("/student/student-dashboard")
      : router.push("/admin/admin-home");
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
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-50 lg:hidden shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-primary">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2"
          >
            <Image src={logo} alt="logo" width={36} height={36} />
            <span className="text-white font-bold text-base">
              Dawah Quran Academy BD
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="close-menu"
          >
            <ImCross size={14} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-5 py-3.5 text-[15px] transition-colors border-b border-gray-50 ${
                pathname === item.href
                  ? "bg-[#e8f0fe] text-[#0f1f3d] font-semibold border-r-[3px] border-r-[#c8a951]"
                  : "text-gray-700 hover:bg-gray-50 hover:text-[#0f1f3d]"
              }`}
            >
              <span className="text-[#c8a951] mr-2">›</span> {item.name}
            </Link>
          ))}
          <Link
            href="/admission"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-5 py-3.5 text-[15px] text-gray-700 hover:bg-gray-50 hover:text-[#0f1f3d] transition-colors border-b border-gray-50"
          >
            <span className="text-[#c8a951] mr-2">›</span> এডমিশন
          </Link>
        </nav>

        {/* Drawer Footer */}
        <div className="px-5 py-4 mt-2 space-y-3">
          {isLoggedIn ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center overflow-hidden flex-shrink-0">
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt="avatar"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold">
                      {profile.name?.split(" ")[0][0]}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-800 truncate">
                  {profile.name}
                </span>
              </div>
              <button
                onClick={() => {
                  handleLogout(router);
                  setIsOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 border border-red-300 rounded-lg text-red-500 text-sm hover:bg-red-50 transition-colors flex-shrink-0"
              >
                <LuLogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#c8a951] rounded-lg text-white text-sm font-semibold hover:bg-[#b8963f] transition-colors"
            >
              Login
            </Link>
          )}

          <Link
            href="/admission"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-full py-2.5 bg-primary rounded-lg text-white text-sm font-semibold hover:bg-[#0f1f3d] transition-colors"
          >
            ভর্তি হন
          </Link>

          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-gray-500">Follow Us:</span>
            <a
              href="#"
              className="w-7 h-7 grid place-items-center rounded-full bg-gray-100 text-primary hover:bg-[#c8a951] hover:text-white transition-colors"
            >
              <BsFacebook size={12} />
            </a>
            <a
              href="#"
              className="w-7 h-7 grid place-items-center rounded-full bg-gray-100 text-primary hover:bg-[#c8a951] hover:text-white transition-colors"
            >
              <BsWhatsapp size={12} />
            </a>
          </div>
        </div>
      </aside>

      {/* ═══════════ MAIN HEADER ═══════════ */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-30">
        {/* ── Top Mini-Bar (dark) ── */}
        <div className="bg-[#0B240F] text-white text-[13px] hidden md:block">
          <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-11">
            {/* Left: contact info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <IoMdCall className="text-[#c8a951]" size={15} />
                <span className="text-gray-200">+8801852-955611</span>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <IoMdMail className="text-[#c8a951]" size={15} />
                <span className="text-gray-200">
                  muinulislammuin16802@gmail.com
                </span>
              </div>
            </div>

            {/* Right: social */}
            <div className="flex items-center gap-3">
              <span className="text-gray-300">Follow Us:</span>
              <a
                href="#"
                className="text-gray-300 hover:text-[#c8a951] transition-colors"
              >
                <BsFacebook size={13} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#c8a951] transition-colors"
              >
                <BsWhatsapp size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Main Navbar Row ── */}
        <div className="relative overflow-hidden bg-white">
          <div className=" absolute w-[20%] bg-primary  h-full">

          </div>
          <div className="max-w-[1400px] mx-auto flex items-stretch justify-between">
            {/* Logo block — angled blue panel like reference */}
            <Link href="/" className="relative flex items-center">
              <div className="relative pl-6 pr-16 py-5 flex items-center gap-3 ">
                <div className=" z-[5] absolute w-[100%] clip-angled h-full bg-primary">
                </div>
                <Image
                  src={logo}
                  alt="logo"
                  width={48}
                  height={48}
                  className="object-contain relative z-10"
                />
                <div className="leading-tight relative z-10"> 
                  <h1 className="text-white font-bold text-lg  md:text-xl tracking-wide">
                     Dawah 
                  </h1>
                  <h1 className="text-white font-bold text-lg md:text-xl tracking-wide">
                     Quran
                  </h1>
                  <p className="text-[#c8a951] text-[10px] tracking-[0.2em] font-medium uppercase">
                    Academy
                  </p>
                </div>
                <div className=" absolute w-[25%] -bottom-5 rotate-[150deg]  bg-[#0B240F] h-full clip-angled  -right-5">

                </div>
              </div>
              {/* angled cut using inline style for cross-browser */}
              <style jsx>{`
                .clip-angled {
                  clip-path: polygon(
                    0 0,
                    100% 0,
                    calc(100% - 32px) 100%,
                    0 100%
                  );
                }
              `}</style>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8 px-6">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-[15px] font-medium transition-colors py-2 ${
                      active
                        ? "text-[#c8a951]"
                        : "text-primary hover:text-[#c8a951]" 
                    }`}
                  >
                    {item.name}
                    {active && (
                      <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#c8a951]" />
                    )}
                  </Link>
                );
              })}
              <Link
                href="/admission"
                className={`text-[15px] font-medium transition-colors py-2 ${
                  pathname === "/admission"
                    ? "text-[#c8a951]"
                    : "text-primary hover:text-[#c8a951]"
                }`}
              >
                এডমিশন
              </Link>
            </nav>

            {/* Right: icons + auth + CTA */}
            <div className="hidden md:flex items-center gap-3 pr-6">


              {/* Auth area */}
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={goDashboard}
                    className="relative h-10 w-10 rounded-full overflow-hidden bg-primary text-white grid place-items-center"
                  >
                    {profile.avatar ? (
                      <Image
                        src={profile.avatar}
                        alt="avatar"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-sm font-semibold">
                        {profile.name?.split(" ")[0][0]}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => handleLogout(router)}
                    aria-label="logout"
                    className="p-2 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LuLogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-5 h-11 inline-flex items-center justify-center rounded-md border border-[#c8a951] text-[#c8a951] text-sm font-semibold hover:bg-[#c8a951] hover:text-white transition-colors"
                >
                  Login
                </Link>
              )}

              {/* Primary CTA — Donate-style */}
              <Link
                href="/admission"
                className="px-6 h-11 inline-flex items-center justify-center rounded-md bg-primary text-white text-sm font-semibold hover:bg-[#083519] transition-colors shadow-md"
              >
                ভর্তি হন
              </Link>
            </div>

            {/* ── Mobile Right: avatar + CTA + hamburger ── */}
            <div className="flex md:hidden items-center gap-2 pr-3">
              {isLoggedIn && (
                <button
                  onClick={goDashboard}
                  className="relative h-9 w-9 rounded-full overflow-hidden bg-primary text-white grid place-items-center"
                >
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt="avatar"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-xs font-semibold">
                      {profile.name?.split(" ")[0][0]}
                    </span>
                  )}
                </button>
              )}

              <Link
                href="/admission"
                className="hidden sm:inline-flex px-3 h-9 items-center justify-center rounded-md bg-[#c8a951] text-white text-xs font-semibold"
              >
                ভর্তি হন
              </Link>

              <button
                onClick={() => setIsOpen((o) => !o)}
                aria-label={isOpen ? "close-menu" : "open-menu"}
                className="w-10 h-10 grid place-items-center rounded-md bg-primary text-white"
              >
                {isOpen ? <ImCross size={14} /> : <CiMenuFries size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
