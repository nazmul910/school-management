"use client";

import logo from "@/assets/logo1.jpeg";
import mckp from "@/assets/footer/mosqu1.png";

import Image from "next/image";
import Link from "next/link";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";

const quickLinks = [
  { name: "হোম", href: "/" },
  { name: "কোর্সসমূহ", href: "/courses" },
  { name: "বইসমূহ", href: "/books" },
  { name: "শিক্ষকমণ্ডলী", href: "/teachers" },
  { name: "যোগাযোগ", href: "/contact" },
];

const resources = [
  {
    name: "ভর্তি",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSd-SCNJ6ay9vvFIGfSPQizD5YKd0GJqZljXSDTKy9oLeBks5g/viewform",
  },
  {
    name: "গোপনীয়তা নীতি",
    href: "/privacy-policy",
  },
  {
    name: "শর্তাবলী",
    href: "/terms-condition",
  },
  {
    name: "সাধারণ জিজ্ঞাসা",
    href: "/faq",
  },
];

const Footer = () => {
  return (
    <footer className="relative bg-black text-light font-sans mt-28 lg:mt-72 xl:mt-60">
     
      <div className="pointer-events-none absolute bottom-52 left-0 hidden lg:block lg:w-[880px] lg:h-[1200px] xl:w-[1080px] xl:h-[780px] 2xl:w-[1360px] 2xl:h-[940px]">
        <Image
          src={mckp}
          alt="Mosque Background"
          fill
          className="object-contain object-left-bottom"
        />
      </div>

      {/* Main Footer */}
      <section className="container relative z-10 mx-auto grid grid-cols-1 gap-10 px-5 py-14 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {/* Logo */}
        <div>
          <div className="mb-5 flex items-center gap-4">
            <Image
              src={logo}
              alt="Logo"
              className="h-16 w-16 rounded-md object-cover"
            />

            <div>
              <h3 className="text-xl font-bold text-white">
                দাওয়াহ কুরআন একাডেমি
              </h3>

              <p className="text-sm text-white">
                ঘরে বসেই অনলাইনে কুরআন শিক্ষা
              </p>
            </div>
          </div>

          <p className="leading-7 text-white">
            অভিজ্ঞ শিক্ষকদের মাধ্যমে শিশু ও প্রাপ্তবয়স্কদের জন্য
            এক-টু-ওয়ান লাইভ ক্লাস, নমনীয় সময়সূচি এবং ব্যক্তিগত
            তত্ত্বাবধানে সহীহভাবে কুরআন শিক্ষা প্রদান করাই আমাদের
            লক্ষ্য।
          </p>
        </div>

        {/* Quick Links */}
        <div className=" xl:col-span-2 xl:flex xl:flex-col xl:items-center">
          <h4 className="mb-5 text-lg font-semibold text-white">
            গুরুত্বপূর্ণ লিংক
          </h4>

          <div className="flex flex-col gap-3">
            {quickLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="w-fit text-white transition-all duration-300 hover:translate-x-1 hover:text-[#ffd54f]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Resources */}
        {/* <div>
          <h4 className="mb-5 text-lg font-semibold text-white">
            প্রয়োজনীয় তথ্য
          </h4>

          <div className="flex flex-col gap-3">
            {resources.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                className="w-fit text-white transition-all duration-300 hover:translate-x-1 hover:text-[#ffd54f]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div> */}

        {/* Social */}
        <div className=" ">
          <h4 className="mb-5 text-lg font-semibold text-white">
            আমাদের সাথে যুক্ত থাকুন
          </h4>

          <p className="mb-5 leading-7 text-white">
            আমাদের সর্বশেষ আপডেট, ঘোষণা এবং ইসলামিক
            শিক্ষামূলক কনটেন্ট পেতে আমাদের সামাজিক
            যোগাযোগমাধ্যমে যুক্ত থাকুন।
          </p>

          <div className="flex gap-5">
            <Link
              href="https://www.facebook.com/onlinequranacademy24"
              target="_blank"
              className="rounded-full border border-white p-3 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#ffd54f] hover:text-[#ffd54f]"
            >
              <BsFacebook size={22} />
            </Link>

            <Link
              href="https://wa.me/8801852955611"
              target="_blank"
              className="rounded-full border border-white p-3 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#ffd54f] hover:text-[#ffd54f]"
            >
              <BsWhatsapp size={22} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="relative z-10 border-t border-white/10">
        <div className="container mx-auto px-5 pb-5">
          <p className="text-center text-sm text-white">
            © {new Date().getFullYear()} দাওয়াহ কুরআন একাডেমি। সর্বস্বত্ব
            সংরক্ষিত। নির্মাণ করেছে{" "}
            <Link
              href="https://www.returnhex.com/"
              target="_blank"
              className="font-medium text-white transition-colors duration-300 hover:underline"
            >
              Return Hex
            </Link>
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;