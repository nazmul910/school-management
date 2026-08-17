"use client";

import { FaQuoteRight } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import useReviews from "@/hooks/useReviews";
import ReviewBox from "@/app/(admin)/admin/manage-reviews/ReviewBox";

export default function ManageReviews() {
  const { reviewsData, isLoading, refetch } = useReviews();
  const reviews = reviewsData?.data || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1e3a5f] flex items-center gap-2.5">
            <MdOutlineRateReview className="text-[#78A4CB]" />
            <span>মতামত ও রিভিউ ব্যবস্থাপনা (Reviews & Feedback)</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            অভিভাবক ও শিক্ষার্থীদের জমাকৃত মতামত অনুমোদন, স্ট্যাটাস পরিবর্তন ও নিয়ন্ত্রণ করুন।
          </p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="p-12 bg-white rounded-3xl text-center text-gray-500 font-medium">
            মতামত লোড হচ্ছে...
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review: any) => (
            <ReviewBox key={review._id} review={review} refetch={refetch} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-[#B4E1EB]/30 p-6 rounded-full mb-4">
              <FaQuoteRight className="text-4xl text-[#78A4CB]" />
            </div>
            <h3 className="text-xl font-bold text-[#1e3a5f] mb-1">কোনো রিভিউ পাওয়া যায়নি</h3>
            <p className="text-gray-500 text-sm">ওয়েবসাইট থেকে মতামত জমা হলে এখানে দেখা যাবে।</p>
          </div>
        )}
      </div>
    </div>
  );
}