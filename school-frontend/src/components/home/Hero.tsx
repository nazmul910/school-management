"use client";
import hero from "@/assets/hero_lottie.json";
import { Button1, Button2 } from "@/utils/Button";
import Lottie from "lottie-react";

const Hero = () => {
  return (
    <section className="bg-hero relative pt-20 md:pt-32 w-screen px-8 flex justify-center items-center ">
      <section className="container flex flex-col md:flex-row justify-between items-center z-10 gap-5">
        <Lottie
          className="max-w-80 sm:max-w-sm md:max-w-xl duration-300 -z-50"
          animationData={hero}
        ></Lottie>
        {/* <Image src={heroBg} className="max-w-80 sm:max-w-sm md:max-w-xl" /> */}
        <section className="mb-10 md:mb-0 text-white">
          <article className="text-sm lg:text-base text-white">
            &quot;তোমাদের মধ্যে সর্বোত্তম সেই ব্যক্তি, যে নিজে কুরআন শিখে এবং
            অন্যকে শেখায়।&quot; (সহিহ বুখারি)
          </article>
          <article className="text-white text-2xl lg:text-4xl 2xl:text-6xl font-bold my-3 lg:my-5 2xl:my-7 duration-300">
            জীবনের প্রকৃত সফলতা কুরআনের পথে।
            <br /> আজই শুরু করুন!
          </article>
          <ul className="ml-3 md:ml-5 text-base lg:text-lg">
            <li className="lg:mb-2 lg:text-xl">✅ তাজবিদসহ কুরআন শিক্ষা</li>
            <li className="lg:mb-2 lg:text-xl">✅ লাইভ ইন্টারেকটিভ ক্লাস</li>
            <li className="lg:mb-2 lg:text-xl">
              ✅ শিশু ও বয়স্কদের জন্য বিশেষ কোর্স
            </li>
          </ul>
          <div className="ml-3 md:ml-5 flex items-center gap-5 mt-5">
            <Button2 text="যোগাযোগ" to="/contact" />
            <Button1
              text="এডমিশন"
              to="https://docs.google.com/forms/d/e/1FAIpQLSd-SCNJ6ay9vvFIGfSPQizD5YKd0GJqZljXSDTKy9oLeBks5g/viewform"
              target="_blank"
            />
          </div>
        </section>
      </section>
    </section>
  );
};

export default Hero;
