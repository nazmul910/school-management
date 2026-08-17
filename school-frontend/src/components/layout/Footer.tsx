"use client";

import Link from "next/link";
import { BsFacebook, BsYoutube, BsTwitter, BsLinkedin } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { LuGraduationCap } from "react-icons/lu";

const quickLinks = [
  { name: "হোম পেজ", href: "/" },
  { name: "শিক্ষার্থী তালিকা", href: "/students" },
  { name: "শিক্ষকমণ্ডলী", href: "/teachers" },
  { name: "নোটিশ বোর্ড", href: "/notices" },
  { name: "পরীক্ষার ফলাফল", href: "/results" },
  { name: "সেরা ১০ শিক্ষার্থী", href: "/top-10" },
  { name: "স্কুল গ্যালারি", href: "/gallery" },
  { name: "যোগাযোগ ও মতামত", href: "/contact" },
];

const academicLinks = [
  { name: "৬ষ্ঠ শ্রেণি", href: "/students?class=Class%206" },
  { name: "৭ম শ্রেণি", href: "/students?class=Class%207" },
  { name: "৮ম শ্রেণি", href: "/students?class=Class%208" },
  { name: "৯ম শ্রেণি (বিজ্ঞান/মানবিক/ব্যবসায়)", href: "/students?class=Class%209" },
  { name: "১০ম শ্রেণি (এসএসসি ব্যাচ)", href: "/students?class=Class%2010" },
  { name: "ভর্তি নির্দেশিকা", href: "/contact" },
  { name: "বার্ষিক পরীক্ষার রুটিন", href: "/notices" },
];

const Footer = () => {
  return (
    <footer className="bg-[#102033] text-gray-300 font-sans mt-20 border-t-4 border-[#78A4CB]">
      {/* Main Footer */}
      <section className="max-w-[1400px] mx-auto grid grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* School Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#78A4CB] to-[#B4E1EB] flex items-center justify-center text-white text-2xl shadow-md">
              <LuGraduationCap />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white leading-tight">
                আইডিয়াল মডেল স্কুল ও কলেজ
              </h3>
              <p className="text-xs text-[#F9E8A2]">শিক্ষা • শৃঙ্খলা • নৈতিকতা</p>
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            গুণগত মানসম্পন্ন আধুনিক ও নৈতিক শিক্ষাদানের মাধ্যমে শিক্ষার্থীদের মেধা বিকাশ, চরিত্র গঠন এবং দেশপ্রেমিক সুনাগরিক হিসেবে গড়ে তোলাই আমাদের মূল লক্ষ্য।
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
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:text-white transition-colors"
            >
              <BsYoutube size={16} />
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
            প্রয়োজনীয় লিংক
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
            একাডেমিক তথ্য (৬ষ্ঠ - ১০ম শ্রেণি)
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
            বিদ্যালয়ের ঠিকানা ও যোগাযোগ
          </h4>

          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <IoLocationSharp className="text-[#F9E8A2] text-xl shrink-0 mt-0.5" />
              <span>বাড়ি নং ১২, রোড নং ৫, ব্লক-বি, মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ।</span>
            </div>

            <div className="flex items-center gap-3">
              <IoMdCall className="text-[#F9E8A2] text-lg shrink-0" />
              <span>+৮৮০ ২-৯৮৭৬৫৪৩, +৮৮০ ১৭০০-০০০০০০</span>
            </div>

            <div className="flex items-center gap-3">
              <IoMdMail className="text-[#F9E8A2] text-lg shrink-0" />
              <span>info@idealschool.edu.bd</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="bg-[#1e3a5f] p-3 rounded-lg border border-[#78A4CB]/30 text-xs">
              <p className="text-[#F9E8A2] font-semibold mb-1">অফিস চলাকালীন সময়:</p>
              <p className="text-gray-300">রবিবার – বৃহস্পতিবার: সকাল ৮:০০ – বিকাল ৪:০০</p>
              <p className="text-gray-400">শুক্রবার ও শনিবার: সাপ্তাহিক ছুটি</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Copyright */}
      <section className="border-t border-gray-800 bg-[#0a1523] py-5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} আইডিয়াল মডেল স্কুল ও কলেজ। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-4">
            <Link href="/notices" className="hover:text-white transition-colors">নোটিশ</Link>
            <span>•</span>
            <Link href="/results" className="hover:text-white transition-colors">ফলাফল</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">যোগাযোগ</Link>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;