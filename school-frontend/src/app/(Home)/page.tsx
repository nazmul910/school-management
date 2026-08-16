"use client";

import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StudentStatus from "@/components/home/StudentStatus";
import AdmissionProcess from "@/components/home/AdmissionProcess";
import Testimonial from "@/components/home/Testimonial";
import GetInTouch from "@/utils/GetInTouch";
import FeatureCourses from "@/components/home/FeatureCourses";
import HeroNew from "@/components/home/Hero-New";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <>
      {/* <Hero /> */}
      <HeroNew/>
      <WhyChooseUs />
      <FeatureCourses />
      <StudentStatus />
      <AdmissionProcess />
      {/* <Testimonial /> */}
      <FAQ/>
      <GetInTouch />
    </>
  );
}
