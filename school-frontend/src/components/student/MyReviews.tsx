"use client";

import { useAuth } from "@/app/providers/AuthContext";
import CustomModal from "@/utils/CustomModal";
import useAxios from "@/hooks/useAxios";
import { TReview } from "@/types/review.type";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import useMyReviews from "@/hooks/useMyReviews";
import { FaQuoteRight, FaStar } from "react-icons/fa";

type TReviewForm = {
  title: string;
  comment: string;
};

export default function MyReviews() {
  const axiosSecure = useAxios();
  const { myReviewsData, myReviewsLoading, myReviewsRefetch } = useMyReviews();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TReviewForm>();

  // Handle form submit
  const onReviewDataSubmit = async (data: TReviewForm) => {
    setIsSubmittingReview(true);
    try {
      const payload = {
        title: data.title,
        comment: data.comment,
        name: user?.name,
        designation: user?.role,
      };
      const res = await axiosSecure.post("/reviews", payload);
      if (res.data.success) {
        toast.success("মতামত সফলভাবে জমা দেওয়া হয়েছে!");
        reset();
        myReviewsRefetch();
        setIsReviewModalOpen(false);
      } else {
        toast.error("মতামত জমা দিতে ব্যর্থ হয়েছে");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "মতামত জমা দিতে ব্যর্থ হয়েছে");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (myReviewsLoading) return <LoadingSpinner />;

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="sm:flex justify-between items-center bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60">
        <div>
          <DashboardTitle blackText="My" greenText="Reviews" />
          <p className="text-xs text-gray-500 mt-1">বিদ্যালয় সম্পর্কিত আপনার মূল্যবান মতামত ও অভিজ্ঞতা শেয়ার করুন</p>
        </div>
        <button
          className="bg-[#78A4CB] hover:bg-[#6894bb] text-white px-5 py-3 rounded-2xl flex items-center gap-2 my-3 sm:my-0 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer font-bold text-sm"
          onClick={() => setIsReviewModalOpen(true)}
        >
          <AiOutlinePlus /> নতুন মতামত লিখুন
        </button>
      </div>

      {/* Reviews List */}
      <div className="my-5 space-y-4">
        {myReviewsData?.data && myReviewsData.data?.length > 0 ? (
          myReviewsData.data?.map((review: TReview) => (
            <div
              key={review._id}
              className="p-6 bg-white rounded-3xl border border-[#B4E1EB]/60 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-5 mb-2">
                <p className="text-xs text-gray-400 font-mono">
                  {review?.createdAt &&
                    new Date(review.createdAt).toLocaleDateString("bn-BD", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    review.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {review.status === "pending" ? "অপেক্ষমাণ (Pending)" : "অনুমোদিত (Approved)"}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#1e3a5f] mb-2">
                {review.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line italic">
                "{review.comment}"
              </p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-[#B4E1EB]/30 p-6 rounded-full mb-4">
              <FaQuoteRight className="text-4xl text-[#78A4CB]" />
            </div>
            <h3 className="text-xl font-bold text-[#1e3a5f] mb-1">কোনো মতামত জমা দেওয়া হয়নি</h3>
            <p className="text-gray-400 text-xs">আপনার কোনো মতামত এখনো যোগ করেননি। উপরের বাটনে ক্লিক করে যুক্ত করুন।</p>
          </div>
        )}
      </div>

      {/* Review Form Modal */}
      {isReviewModalOpen && (
        <CustomModal
          isModalOpen={isReviewModalOpen}
          setIsModalOpen={setIsReviewModalOpen}
        >
          <form onSubmit={handleSubmit(onReviewDataSubmit)} className="space-y-4">
            <h3 className="font-bold text-lg text-[#1e3a5f]">আপনার মতামত যুক্ত করুন</h3>
            <p className="border-t border-gray-100 mb-4"></p>

            {/* Review Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                মতামতের শিরোনাম (Title) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="যেমন: অসাধারণ শিক্ষাদান পদ্ধতি"
                {...register("title", { required: true })}
                className={`w-full border bg-white border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-[#78A4CB] transition-colors ${
                  errors.title && "border-red-500"
                }`}
              />
            </div>

            {/* Review Comment */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                বিস্তারিত মতামত (Comment) <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("comment", { required: true })}
                placeholder="আপনার অভিজ্ঞতা ৩-৪ লাইনের ভিতর লিখুন..."
                rows={4}
                className={`w-full border bg-white border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-[#78A4CB] transition-colors ${
                  errors.comment && "border-red-500"
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={isSubmittingReview}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
                  isSubmittingReview
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#78A4CB] hover:bg-[#6894bb] shadow-[#78A4CB]/30"
                }`}
              >
                {isSubmittingReview ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>জমা হচ্ছে...</span>
                  </>
                ) : (
                  "মতামত জমা দিন"
                )}
              </button>
            </div>
          </form>
        </CustomModal>
      )}
    </section>
  );
}
