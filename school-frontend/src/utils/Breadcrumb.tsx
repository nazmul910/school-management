import { FaGlobe, FaHome } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import breadcrumb from "@/assets/Home-Hero/bg-new.jpg";

type TBreadcrumbs = {
  title: string;
};

const Breadcrumbs = ({ title }: TBreadcrumbs) => {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 pb-12">
      {/* Background */}
      <Image
        src={breadcrumb}
        alt="Breadcrumb Background"
        fill
        priority
        className=" absolute object-cover top-0 right-0 left-0 w-full h-full"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="mt-4 text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            আপনার কুরআন শিক্ষার যাত্রা শুরু করুন
          </h1>

          <p className="mt-5 text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-8">
            আমাদের অভিজ্ঞ শিক্ষকদের সাথে অনলাইনে সহজ ও সুন্দরভাবে
            কুরআন শিখুন।
          </p>
        </div>

        <div className="mt-12 flex justify-center md:justify-start">
          <div className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-primary backdrop-blur-md px-6 py-4 shadow-2xl">
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:text-yellow-400 transition"
            >
              <FaHome className="text-sm" />
              <span>হোম</span>
            </Link>

            <span className="text-white/40">/</span>

            <FaGlobe className="text-yellow-400" />

            <span className="font-semibold uppercase text-yellow-400">
              {title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumbs;