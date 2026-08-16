"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "একাডেমিতে কীভাবে ভর্তি হওয়া যাবে?",
    answer:
      "আমাদের একাডেমিতে ভর্তির জন্য আপনাকে আমাদের ওয়েবসাইটে নিবন্ধন ফর্ম পূরণ করতে হবে অথবা সরাসরি আমাদের সাথে যোগাযোগ করতে পারেন। ভর্তির পর একজন অভিজ্ঞ শিক্ষক আপনার সাথে যোগাযোগ করবেন।",
  },
  {
    question: "ক্লাসগুলো কখন ও কীভাবে পরিচালিত হয়?",
    answer:
      "আমাদের ক্লাসগুলো সম্পূর্ণ অনলাইনে পরিচালিত হয়। শিক্ষার্থীদের সুবিধামতো সময়সূচি নির্ধারণ করা হয় এবং সপ্তাহে নির্দিষ্ট দিনে লাইভ সেশন অনুষ্ঠিত হয়।",
  },
  {
    question: "শিশুদের জন্য কি আলাদা কোর্স রয়েছে?",
    answer:
      "হ্যাঁ, আমাদের কাছে শিশু ও কিশোর-কিশোরীদের জন্য বিশেষভাবে তৈরি কোর্স রয়েছে। অভিজ্ঞ ও দক্ষ শিক্ষকমণ্ডলী শিশুদের বয়স ও মেধা অনুযায়ী পাঠদান করে থাকেন।",
  },
  {
    question: "কোর্সের মেয়াদ ও ফি কত?",
    answer:
      "কোর্সের মেয়াদ ও ফি কোর্সের ধরন অনুযায়ী ভিন্ন হয়। বিস্তারিত জানতে আমাদের সাথে সরাসরি যোগাযোগ করুন। আমরা সাশ্রয়ী মূল্যে মানসম্পন্ন শিক্ষা প্রদান করে থাকি।",
  },
  {
    question: "বিদেশ থেকে কি ক্লাস করা সম্ভব?",
    answer:
      "অবশ্যই। আমাদের একাডেমি বিশ্বের যেকোনো প্রান্ত থেকে অংশগ্রহণের সুবিধা দেয়। আমেরিকা, কানাডা, অস্ট্রেলিয়াসহ বিশ্বের বিভিন্ন দেশে আমাদের শিক্ষার্থীরা সফলভাবে ক্লাস করছেন।",
  },
];

const toBanglaNum = (n: number) =>
  n.toString().replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-[#f0f0f5] py-20 lg:py-28">
      <div className="container1 px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 items-start">

          {/* Left */}
          <div className="pt-2">
            <p className="flex items-center gap-2 text-[16px] uppercase tracking-[2px] text-gray-400 mb-4">
              <span>🕌</span> সাধারণ জিজ্ঞাসা
            </p>
            <h2 className="text-xl lg:text-3xl font-extrabold text-primary leading-snug">
              আমাদের প্রোগ্রাম সম্পর্কে প্রায়শই জিজ্ঞাসিত প্রশ্নসমূহ
            </h2>
            <p className="mt-5 text-sm text-gray-500 leading-7">
              কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন। আমরা সর্বদা আপনাকে
              সাহায্য করতে প্রস্তুত।
            </p>
          </div>

          {/* Right — FAQ accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center lg:gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-[20px] font-bold text-primary min-w-[24px]">
                      {toBanglaNum(i + 1)}.
                    </span>
                    <span className="flex-1 text-[16px] lg:text-[20px] font-semibold text-primary leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
                    </span>
                  </button>

                  {isOpen && (
                    <>
                      <div className="mx-6 mb-0 h-px bg-gray-100" />
                      <p className="px-6 pl-[52px] py-4 text-sm text-gray-500 leading-7">
                        {faq.answer}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;