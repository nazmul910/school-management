import img_01 from "@/assets/Admission/01.png";
import img_02 from "@/assets/Admission/02.png";
import img_03 from "@/assets/Admission/03.jpg";
import img_04 from "@/assets/Admission/04.png";
import img_05 from "@/assets/Admission/05.png";
import student_bg from "@/assets/student-bg.png";

import cardImg from "@/assets/Home-Hero/addmission/img-ab1.png";
import bgImg from "@/assets/Home-Hero/addmission/img-bg1.png";

import Image from "next/image";

const AdmissionProcess = () => {
  return (
    <>
      {/* <section className="relative  my-20 lg:my-32">
        <Image
          className="absolute w-full h-min -z-10 -mt-5"
          src={student_bg}
          alt="Logo"
        />
        <section className="container mx-auto">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl duration-200 text-center text-darker font-bold mt-12 mb-6 lg:mt-20 lg:mb-10">
            <span className="text-primary">এডমিশন</span> প্রক্রিয়া
          </h2>
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-10">
            <section className="flex flex-col justify-center gap-5">
              <div className="h-full flex justify-center items-center">
                <Image
                  src={img_01}
                  alt="Course Choice"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <p className="flex justify-center items-center px-2 bg-primary rounded-full text-white">
                  1
                </p>
                <p className="text-center">কোর্স পছন্দ করুন</p>
              </div>
            </section>
            <section className="flex flex-col justify-center gap-5">
              <div className="h-full flex justify-center items-center">
                <Image
                  src={img_02}
                  alt="Click Admission"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <p className="flex justify-center items-center px-2 bg-primary rounded-full text-white">
                  2
                </p>
                <p className="text-center">এডমিশন বাটনে ক্লিক করুন</p>
              </div>
            </section>
            <section className="flex flex-col justify-center gap-5">
              <div className="h-full flex justify-center items-center">
                <Image
                  src={img_03}
                  alt="Fill up form"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <p className="flex justify-center items-center px-2 bg-primary rounded-full text-white">
                  3
                </p>
                <p className="text-center">ফর্ম পূরন করুণ</p>
              </div>
            </section>
            <section className="flex flex-col justify-center gap-5">
              <div className="h-full flex justify-center items-center">
                <Image
                  src={img_04}
                  alt="Finalize schedule"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <p className="flex justify-center items-center px-2 bg-primary rounded-full text-white">
                  4
                </p>
                <p className="text-center">ক্লাস স্ক্যাজিউল ফাইনাল করুন</p>
              </div>
            </section>
            <section className="flex flex-col justify-center gap-5">
              <div className="h-full flex justify-center items-center">
                <Image
                  src={img_05}
                  alt="Start class"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
              </div>
              <div className="flex justify-center items-center gap-3">
                <p className="flex justify-center items-center px-2 bg-primary rounded-full text-white">
                  5
                </p>
                <p className="text-center">ক্লাস শুরু করুন</p>
              </div>
            </section>
          </section>
        </section>
      </section> */}

      <section className="container1 py-14 lg:py-20">
        <div>
          <div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl duration-200 text-darker font-bold mb-6  lg:mb-10">
              <span className="text-primary">এডমিশন</span> প্রক্রিয়া
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-5 gap-5">
            <div className="bg-primary hover:bg-[#ffd54f] lg:col-span-2 xl:col-span-1 duration-300 transition-all ease-in-out hover:text-primary text-[#fff] relative p-10 rounded-2xl flex flex-col justify-center items-center gap-4">
              <Image src={bgImg} alt="bg-img" className=" absolute " />
              <div className="w-20 h-20  relative flex justify-center items-center">
                <Image src={cardImg} alt="bg" className="" />
              </div>
              <div className="flex relative z-10 flex-col gap-1">
                <h4 className="font-semibold text-lg text-center transition-all duration-500 ease-in-out  lg:text-3xl">
                  ধাপ ০১
                </h4>
                <p className=" text-sm md:text-lg text-center">
                  কোর্স পছন্দ করুন
                </p>
              </div>
            </div>
            <div className="bg-primary hover:bg-[#ffd54f] lg:col-span-2 xl:col-span-1 duration-300 transition-all ease-in-out hover:text-primary text-[#fff] relative p-10 rounded-2xl flex flex-col justify-center items-center gap-4">
              <Image src={bgImg} alt="bg-img" className=" absolute " />
              <div className="w-20 h-20  relative flex justify-center items-center">
                <Image src={cardImg} alt="bg" className="" />
              </div>
              <div className="flex relative z-10 flex-col gap-1">
                <h4 className="font-semibold text-lg text-center transition-all duration-500 ease-in-out  lg:text-3xl">
                  ধাপ ০২
                </h4>
                <p className=" text-sm md:text-lg text-center">
                  এডমিশন বাটনে ক্লিক করুন
                </p>
              </div>
            </div>
            <div className="bg-primary hover:bg-[#ffd54f] lg:col-span-2 xl:col-span-1 duration-300 transition-all ease-in-out hover:text-primary text-[#fff] relative p-10 rounded-2xl flex flex-col justify-center items-center gap-4">
              <Image src={bgImg} alt="bg-img" className=" absolute " />
              <div className="w-20 h-20  relative flex justify-center items-center">
                <Image src={cardImg} alt="bg" className="" />
              </div>
              <div className="flex relative z-10 flex-col gap-1">
                <h4 className="font-semibold text-lg text-center transition-all duration-500 ease-in-out  lg:text-3xl">
                  ধাপ ০৩
                </h4>
                <p className=" text-sm md:text-lg text-center">
                  ফর্ম পূরন করুণ
                </p>
              </div>
            </div>
            <div className="bg-primary hover:bg-[#ffd54f] lg:col-span-3 xl:col-span-1 duration-300 transition-all ease-in-out hover:text-primary text-[#fff] relative p-10 rounded-2xl flex flex-col justify-center items-center gap-4">
              <Image src={bgImg} alt="bg-img" className=" absolute " />
              <div className="w-20 h-20  relative flex justify-center items-center">
                <Image src={cardImg} alt="bg" className="" />
              </div>
              <div className="flex relative z-10 flex-col gap-1">
                <h4 className="font-semibold text-lg text-center transition-all duration-500 ease-in-out  lg:text-3xl">
                  ধাপ ০৪
                </h4>
                <p className=" text-sm md:text-lg text-center">
                  ক্লাস স্ক্যাজিউল ফাইনাল করুন
                </p>
              </div>
            </div>
            <div className="bg-primary hover:bg-[#ffd54f] md:col-span-2 lg:col-span-3 xl:col-span-1 duration-300 transition-all ease-in-out hover:text-primary text-[#fff] relative p-10 rounded-2xl flex flex-col justify-center items-center gap-4">
              <Image src={bgImg} alt="bg-img" className=" absolute " />
              <div className="w-20 h-20  relative flex justify-center items-center">
                <Image src={cardImg} alt="bg" className="" />
              </div>
              <div className="flex relative z-10 flex-col gap-1">
                <h4 className="font-semibold text-lg text-center transition-all duration-500 ease-in-out  lg:text-3xl">
                  ধাপ ০৫
                </h4>
                <p className=" text-sm md:text-lg text-center">
                  ক্লাস শুরু করুন
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdmissionProcess;
