"use client";

import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";

import img1 from "@/assets/Home-Hero/hero-img4.png";
import heroImge from "@/assets/Home-Hero/hero-img2.png";
import heroImge2 from "@/assets/Home-Hero/hero-design1.png";
import makkaImg1 from "@/assets/Home-Hero/sm-makk-img1.svg";
import makkaImg2 from "@/assets/Home-Hero/sm-makka-img2.svg";
import makkaImg3 from "@/assets/Home-Hero/sm-makka-img3.svg";
import { Button3, Button4 } from "@/utils/Button";
import PrayerWidget from "@/utils/Clock";



const HeroNew = () => {
  return (
    <section className="bg-[#f2f3f5]">
      <div className="flex relative flex-col lg:flex-row justify-between items-center container1 pb-20 pt-32 gap-16 md:gap-32 md:pt-44 md:pb-32 lg:pt-52 lg:pb-20">
        <div className=" absolute left-0 bottom-0 w-full flex justify-center items-center">
          <PrayerWidget />
        </div>
        {/* Left */}
        <div className="w-full lg:block lg:w-[50%] flex items-center lg:justify-start flex-col gap-6 relative">
          <Image
            src={makkaImg3}
            alt=""
            className="anim hidden lg:block absolute bottom-0 lg:-left-12 xl:-left-32 lg:w-[45px] xl:w-[60px] h-auto object-cover"
          />

          <Image
            src={img1}
            alt="Hero Image"
            className="w-[40%] md:w-[20%] lg:w-[30%] xl:h-full xl:w-[20%]"
          />

          <div className="text-[#03060e] text-center lg:text-left text-xl md:text-4xl 2xl:text-6xl font-bold my-3 lg:my-5 2xl:my-7 duration-300">
            জীবনের প্রকৃত সফলতা কুরআনের পথে।
            <br /> আজই শুরু করুন!
          </div>

          <div>
            <p className="lg:mb-2 md:text-xl text-[#737374] flex justify-start items-center gap-x-2">
              <BsCheck2Circle /> তাজবিদসহ কুরআন শিক্ষা
            </p>
            <p className="lg:mb-2 md:text-xl text-[#737374] flex justify-start items-center gap-x-2">
              <BsCheck2Circle /> লাইভ ইন্টারেকটিভ ক্লাস
            </p>
            <p className="lg:mb-2 md:text-xl text-[#737374] flex justify-start items-center gap-x-2">
              <BsCheck2Circle /> শিশু ও বয়স্কদের জন্য বিশেষ কোর্স
            </p>
          </div>

          {/* Buttons + Prayer Widget */}
          <div className="lg:ml-5 flex flex-wrap items-center gap-4 lg:mt-5">
            <Button4 text="যোগাযোগ" to="/contact" />
            <Button3
              text="এডমিশন"
              to="https://docs.google.com/forms/d/e/1FAIpQLSd-SCNJ6ay9vvFIGfSPQizD5YKd0GJqZljXSDTKy9oLeBks5g/viewform"
              target="_blank"
            />
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:block lg:w-[45%] flex justify-center items-center">
          <div className="w-[70%] lg:w-[80%] flex justify-center items-center relative">
            <Image
              src={makkaImg2}
              alt=""
              className="anim2 hidden lg:block absolute lg:-right-10 xl:right-10 top-0 lg:w-[45px] xl:w-[60px] h-auto object-cover"
            />
            <Image
              src={makkaImg1}
              alt=""
              className="anim hidden lg:block absolute top-0 lg:-left-16 xl:-left-10 lg:w-[35px] xl:w-[50px] h-auto object-cover"
            />
            <Image
              src={heroImge}
              alt="Hero Image"
              className="z-10 w-[75%] relative rounded-full mx-auto h-auto object-cover"
            />
            <Image
              src={heroImge2}
              alt=""
              className="absolute w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;