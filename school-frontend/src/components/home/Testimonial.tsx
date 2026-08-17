"use client";

import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import useReviews from "@/hooks/useReviews";

export default function Testimonial() {
  const { reviewsData, isLoading } = useReviews("approved");
  const reviews = reviewsData?.data || [];

  return (
    <section className="py-20 bg-[#F3F8FC]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B4E1EB]/50 text-[#1e3a5f] text-xs font-bold">
            <LuMessageSquare />
            <span>অভিভাবক ও শিক্ষার্থীদের মতামত</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a5f]">
            আমাদের সম্পর্কে শুভাকাঙ্ক্ষীদের মূল্যায়ন
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            বিদ্যালয়ের মানসম্মত শিক্ষা, সুশৃঙ্খল পরিবেশ ও সার্বিক ব্যবস্থাপনায় সন্তুষ্ট অভিভাবক ও শিক্ষার্থীদের মূল্যবান মতামত।
          </p>
        </div>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="py-12 text-center text-gray-500 font-medium">
            মতামত লোড হচ্ছে...
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review: any, idx: number) => (
              <div
                key={review._id || idx}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#B4E1EB]/50 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top: Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400 text-sm">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <FaQuoteLeft className="text-[#B4E1EB] text-2xl" />
                  </div>

                  {/* Title & Comment */}
                  {review.title && (
                    <h3 className="font-bold text-base text-[#1e3a5f] mb-2">
                      {review.title}
                    </h3>
                  )}
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#78A4CB] text-white font-bold flex items-center justify-center text-base">
                    {review.name?.charAt(0) || "অ"}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1e3a5f]">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.designation || "অভিভাবক"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            কোনো মতামত পাওয়া যায়নি।
          </div>
        )}
      </div>
    </section>
  );
}
