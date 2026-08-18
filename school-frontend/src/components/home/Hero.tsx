"use client";
import hero from "@/assets/hero_lottie.json";
import { Button1, Button2 } from "@/utils/Button";
import Lottie from "lottie-react";

const Hero = () => {
  return (
    <section className="bg-hero relative pt-20 md:pt-32 w-screen px-8 flex justify-center items-center">
      <section className="container flex flex-col md:flex-row justify-between items-center z-10 gap-5">
        <Lottie
          className="max-w-80 sm:max-w-sm md:max-w-xl duration-300 -z-50"
          animationData={hero}
        />
        <section className="mb-10 md:mb-0 text-white">
          <article className="text-sm lg:text-base text-white">
            &quot;Education is the passport to the future, for tomorrow belongs to those who prepare for it today.&quot;
          </article>
          <article className="text-white text-2xl lg:text-4xl 2xl:text-6xl font-bold my-3 lg:my-5 2xl:my-7 duration-300">
            Empowering Minds, <br />
            Inspiring Excellence!
          </article>
          <ul className="ml-3 md:ml-5 text-base lg:text-lg">
            <li className="lg:mb-2 lg:text-xl">✅ Digital Multimedia Classrooms</li>
            <li className="lg:mb-2 lg:text-xl">✅ State-of-the-Art Science & Computer Labs</li>
            <li className="lg:mb-2 lg:text-xl">
              ✅ Comprehensive Holistic Student Development
            </li>
          </ul>
          <div className="ml-3 md:ml-5 flex items-center gap-5 mt-5">
            <Button2 text="Contact Us" to="/contact" />
            <Button1
              text="Admissions"
              to="/contact"
            />
          </div>
        </section>
      </section>
    </section>
  );
};

export default Hero;
