"use client";

import HeroNew from "@/components/home/Hero-New";
import NoticeTicker from "@/components/home/NoticeTicker";
import TopStudentsPreview from "@/components/home/TopStudentsPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TeacherCard from "@/components/home/TeacherCard";
import GalleryPreview from "@/components/home/GalleryPreview";
import AdmissionProcess from "@/components/home/AdmissionProcess";
import Testimonial from "@/components/home/Testimonial";
import FAQ from "@/components/home/FAQ";
import GetInTouch from "@/utils/GetInTouch";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <NoticeTicker />
      <HeroNew />
      <TopStudentsPreview />
      <WhyChooseUs />
      <TeacherCard />
      <GalleryPreview />
      <AdmissionProcess />
      <Testimonial />
      <FAQ />
      <GetInTouch />
    </main>
  );
}
