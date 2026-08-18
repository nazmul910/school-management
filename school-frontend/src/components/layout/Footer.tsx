"use client";

import Link from "next/link";
import { BsFacebook, BsYoutube, BsTwitter, BsLinkedin } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { LuGraduationCap } from "react-icons/lu";
import Image from "next/image";
import logo from "@/assets/school-logo.png";

const quickLinks = [
  { name: "Home Page", href: "/" },
  { name: "Student Directory", href: "/students" },
  { name: "Faculty Members", href: "/teachers" },
  { name: "Notice Board", href: "/notices" },
  { name: "Academic Results", href: "/results" },
  { name: "Top 10 Students", href: "/top-10" },
  { name: "Photo Gallery", href: "/gallery" },
  { name: "Contact & Admissions", href: "/contact" },
];

const academicLinks = [
  { name: "Class 6", href: "/students?class=Class%206" },
  { name: "Class 7", href: "/students?class=Class%207" },
  { name: "Class 8", href: "/students?class=Class%208" },
  { name: "Class 9 (Science / Humanities / Business)", href: "/students?class=Class%209" },
  { name: "Class 10 (SSC Batch)", href: "/students?class=Class%2010" },
  { name: "Admission Guide", href: "/contact" },
  { name: "Examination Routine", href: "/notices" },
];

const Footer = () => {
  return (
    <footer className="bg-[#102033] text-gray-300 font-sans mt-20 border-t-4 border-[#78A4CB]">
      {/* Main Footer */}
      <section className="max-w-[1400px] mx-auto grid grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* School Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#78A4CB] to-[#B4E1EB] flex items-center justify-center text-white text-2xl shadow-md shrink-0">
                <Image
                  src={logo}
                  alt="School Logo"
                  width={40}
                  height={60}
                  className="rounded-full"
                />
              </div>
            <div>
              <h3 className="text-xl font-bold text-white leading-tight">
                Uttar Betdoba Fatema Halim High School
              </h3>

            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            Committed to providing high quality, modern, and value-based education to nurture creative talents, moral character, and future leaders.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#78A4CB] hover:text-white transition-colors"
            >
              <BsFacebook size={16} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#78A4CB] hover:text-white transition-colors"
            >
              <BsTwitter size={16} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#78A4CB] hover:text-white transition-colors"
            >
              <BsLinkedin size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-base font-bold text-white mb-5 pb-2 border-b border-gray-700/60 inline-block">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-[#F9E8A2] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#78A4CB]">›</span> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Academic Structure */}
        <div>
          <h4 className="text-base font-bold text-white mb-5 pb-2 border-b border-gray-700/60 inline-block">
            Academic Levels (Class 6 - 10)
          </h4>
          <ul className="space-y-2.5 text-sm">
            {academicLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-[#F9E8A2] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#78A4CB]">›</span> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-white mb-5 pb-2 border-b border-gray-700/60 inline-block">
            Campus & Contact
          </h4>

          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <IoLocationSharp className="text-[#F9E8A2] text-xl shrink-0 mt-0.5" />
              <span>Hamidpur,Tangail.</span>
            </div>

            <div className="flex items-center gap-3">
              <IoMdCall className="text-[#F9E8A2] text-lg shrink-0" />
              <span>+880 2-9876543, +880 1700-000000</span>
            </div>

            <div className="flex items-center gap-3">
              <IoMdMail className="text-[#F9E8A2] text-lg shrink-0" />
              <span>info@uttarbetdobafatemahhs.edu.bd</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="bg-[#1e3a5f] p-3 rounded-lg border border-[#78A4CB]/30 text-xs">
              <p className="text-[#F9E8A2] font-semibold mb-1">Office Hours:</p>
              <p className="text-gray-300">Sunday – Thursday: 8:00 AM – 4:00 PM</p>
              <p className="text-gray-400">Friday & Saturday: Weekly Holiday</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Copyright */}
      <section className="border-t border-gray-800 bg-[#0a1523] py-5">
        <div className="max-w-[1400px] mx-auto px-6 gap-3 text-xs text-gray-400">
          <p className="text-center">
            © {new Date().getFullYear()} <span className=" font-bold text-white">MD.Nazmul Hasan.</span> All rights reserved.
          </p>
          {/* <div className="flex items-center gap-4">
            <Link href="/notices" className="hover:text-white transition-colors">Notices</Link>
            <span>•</span>
            <Link href="/results" className="hover:text-white transition-colors">Results</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div> */}
        </div>
      </section>
    </footer>
  );
};

export default Footer;