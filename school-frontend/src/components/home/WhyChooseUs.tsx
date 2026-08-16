"use client";

import bg from "@/assets/topography.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import bgCard from "@/assets/Home-Hero/bg-img2.png";
import { FaChalkboardTeacher, FaWifi } from "react-icons/fa";
import { PiPersonSimpleHikeBold } from "react-icons/pi";

const WhyChooseUs = () => {
  return (
    // <section className="container  mx-auto my-20 lg:my-32">
    //   <h2 className="text-3xl lg:text-4xl xl:text-5xl duration-200 text-center text-darker font-bold mt-12 mb-6 lg:mt-20 lg:mb-10">
    //     <span className="text-primary">আমরাই</span> কেন?
    //   </h2>
    //   <div className="flex flex-col md:flex-row justify-center items-center gap-5 lg:gap-10 px-8 md:px-0">
    //     <motion.div
    //       whileHover={{ scale: 1.1 }}
    //       whileTap={{ scale: 0.9 }}
    //       className="relative basis-1/3 p-5 lg:p-8 rounded-3xl bg-primary hover:bg-dark text-white z-20 group duration-100"
    //     >
    //       <section className="absolute inset-0 -z-20">
    //         <div className="w-full h-full bg-black/20 rounded-3xl"></div>
    //         <Image
    //           src={bg}
    //           alt="Background"
    //           fill
    //           style={{
    //             objectFit: "cover",
    //           }}
    //           quality={100}
    //           className="rounded-3xl"
    //         />
    //       </section>
    //       <div className="rounded-full p-4 border border-white w-fit mx-auto">
    //         <FaChalkboardTeacher size={30} />
    //       </div>
    //       <h4 className="text-center font-semibold text-lg lg:text-2xl my-5">
    //         অভিজ্ঞ শিক্ষকসমূহ
    //       </h4>
    //       <article className="text-center text-sm md:text-base text-white">
    //         আমাদের দক্ষ ও অভিজ্ঞ শিক্ষকগণ প্রতিটি শিক্ষার্থীকে ব্যক্তিগত মনোযোগ
    //         ও সর্বোচ্চ মানের শিক্ষা প্রদান করেন। তাদের গাইডেন্সের মাধ্যমে
    //         শিক্ষার্থীরা তাদের লক্ষ্য অর্জনে এগিয়ে যায়।
    //       </article>
    //     </motion.div>

    //     <motion.div
    //       whileHover={{ scale: 1.1 }}
    //       whileTap={{ scale: 0.9 }}
    //       className="relative basis-1/3 p-5 lg:p-8 rounded-3xl bg-primary hover:bg-dark text-white z-20 group duration-100"
    //     >
    //       <section className="absolute inset-0 -z-20">
    //         <div className="w-full h-full bg-black/20 rounded-3xl"></div>
    //         <Image
    //           src={bg}
    //           alt="Background"
    //           fill
    //           style={{
    //             objectFit: "cover",
    //           }}
    //           quality={100}
    //           className="rounded-3xl"
    //         />
    //       </section>
    //       <div className="rounded-full p-4 border border-white w-fit mx-auto">
    //         <FaWifi size={30} />
    //       </div>
    //       <h4 className="text-center font-semibold text-lg lg:text-2xl my-5">
    //         ঘরে বসে শিখার সুযোগ
    //       </h4>
    //       <article className="text-center text-sm md:text-base text-white">
    //         যেকোনো স্থান থেকে সহজেই আমাদের অনলাইন কোর্সগুলোতে অংশ নিয়ে দক্ষতা
    //         বৃদ্ধি করতে পারেন। আমাদের ইন্টারেক্টিভ ক্লাসের মাধ্যমে শিখা হবে সহজ
    //         ও উপভোগ্য।
    //       </article>
    //     </motion.div>
    //     <motion.div
    //       whileHover={{ scale: 1.1 }}
    //       whileTap={{ scale: 0.9 }}
    //       className="relative basis-1/3 p-5 lg:p-8 rounded-3xl bg-primary hover:bg-dark text-white z-20 group duration-100"
    //     >
    //       <section className="absolute inset-0 -z-20">
    //         <div className="w-full h-full bg-black/20 rounded-3xl"></div>
    //         <Image
    //           src={bg}
    //           alt="Background"
    //           fill
    //           style={{
    //             objectFit: "cover",
    //           }}
    //           quality={100}
    //           className="rounded-3xl"
    //         />
    //       </section>
    //       <div className="rounded-full p-4 border border-white w-fit mx-auto">
    //         <PiPersonSimpleHikeBold size={30} />
    //       </div>
    //       <h4 className="text-center font-semibold text-lg lg:text-2xl my-5">
    //         সকল বয়সের জন্যেই উপযোগী
    //       </h4>
    //       <article className="text-center text-sm md:text-base text-white">
    //         আমাদের কোর্সগুলো শিশু থেকে প্রাপ্তবয়স্ক সকলের জন্যই উপযোগীভাবে
    //         তৈরি। প্রতিটি কোর্সের পাঠ্যক্রম বয়স ও দক্ষতার ভিত্তিতে সাজানো
    //         হয়েছে।
    //       </article>
    //     </motion.div>
    //   </div>
    // </section>
    <section className="container1 py-14 lg:py-20">
      <div className="">
        <div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl duration-200 text-darker font-bold mb-6  lg:mb-10">
            <span className="text-primary">আমরাই</span> কেন?
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-x-3">
          <div className="card relative overflow-hidden flex flex-col gap-y-12 border group hover:bg-[#ffd54f] transition-all duration-500 ease-in-out border-primary rounded-2xl p-5 md:p-7 lg:p-10">
            <Image
              src={bgCard}
              alt="bg"
              className=" absolute -bottom-20 -right-10 opacity-20 w-[300px]"
            />
            <div className="flex justify-between items-center">
              <div className="bg-primary w-[60px] h-[60px] xl:w-[80px] xl:h-[80px] text-white group-hover:text-primary transition-all duration-500 ease-in-out rounded-full relative overflow-hidden flex justify-center items-center">
                <FaChalkboardTeacher size={30} className=" relative z-20" />
                <div className=" absolute group-hover:h-full group-hover:w-full transition-all duration-500 ease-in-out h-0 rounded-full w-0 z-10 bg-white"></div>
              </div>
              <h3 className="text-5xl text-[#7e7e7e]">০১</h3>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-lg transition-all duration-500 ease-in-out hover:text-primary lg:text-2xl">
                অভিজ্ঞ শিক্ষকসমূহ
              </h4>
              <p className=" text-sm md:text-base text-gray-500">
                আমাদের দক্ষ ও অভিজ্ঞ শিক্ষকগণ প্রতিটি শিক্ষার্থীকে ব্যক্তিগত
                মনোযোগ ও সর্বোচ্চ মানের শিক্ষা প্রদান করেন। তাদের গাইডেন্সের
                মাধ্যমে শিক্ষার্থীরা তাদের লক্ষ্য অর্জনে এগিয়ে যায়।
              </p>
            </div>
          </div>
          <div className="card relative overflow-hidden flex flex-col gap-y-12 border group hover:bg-[#ffd54f] transition-all duration-500 ease-in-out border-primary rounded-2xl p-5 md:p-7 lg:p-10">
            <Image
              src={bgCard}
              alt="bg"
              className=" absolute -bottom-20 -right-10 opacity-20 w-[300px]"
            />
            <div className="flex justify-between items-center">
              <div className="bg-primary w-[60px] h-[60px] xl:w-[80px] xl:h-[80px] text-white group-hover:text-primary transition-all duration-500 ease-in-out rounded-full relative overflow-hidden flex justify-center items-center">
                <FaWifi size={30} className=" relative z-20" />
                <div className=" absolute group-hover:h-full group-hover:w-full transition-all duration-500 ease-in-out h-0 rounded-full w-0 z-10 bg-white"></div>
              </div>
              <h3 className="text-5xl text-[#7e7e7e]">০২</h3>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-lg transition-all duration-500 ease-in-out hover:text-primary lg:text-2xl">
                ঘরে বসে শিখার সুযোগ
              </h4>
              <p className=" text-sm md:text-base text-gray-500">
                যেকোনো স্থান থেকে সহজেই আমাদের অনলাইন কোর্সগুলোতে অংশ নিয়ে
                দক্ষতা বৃদ্ধি করতে পারেন। আমাদের ইন্টারেক্টিভ ক্লাসের মাধ্যমে
                শিখা হবে সহজ
              </p>
            </div>
          </div>
          <div className="card relative overflow-hidden flex flex-col gap-y-12 border group hover:bg-[#ffd54f] transition-all duration-500 ease-in-out border-primary rounded-2xl p-5 md:p-7 lg:p-10">
            <Image
              src={bgCard}
              alt="bg"
              className=" absolute -bottom-20 -right-10 opacity-20 w-[300px]"
            />
            <div className="flex justify-between items-center">
              <div className="bg-primary w-[60px] h-[60px] xl:w-[80px] xl:h-[80px] text-white group-hover:text-primary transition-all duration-500 ease-in-out rounded-full relative overflow-hidden flex justify-center items-center">
                <PiPersonSimpleHikeBold size={30} className=" relative z-20" />
                <div className=" absolute group-hover:h-full group-hover:w-full transition-all duration-500 ease-in-out h-0 rounded-full w-0 z-10 bg-white"></div>
              </div>
              <h3 className="text-5xl text-[#7e7e7e]">০৩</h3>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-lg transition-all duration-500 ease-in-out hover:text-primary lg:text-2xl">
                সকল বয়সের জন্যেই উপযোগী
              </h4>
              <p className=" text-sm md:text-base text-gray-500">
                আমাদের কোর্সগুলো শিশু থেকে প্রাপ্তবয়স্ক সকলের জন্যই উপযোগীভাবে
                তৈরি। প্রতিটি কোর্সের পাঠ্যক্রম বয়স ও দক্ষতার ভিত্তিতে সাজানো
                হয়েছে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
