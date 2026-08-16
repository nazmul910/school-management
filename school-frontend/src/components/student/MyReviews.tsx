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
        toast.success("Review Submitted Successfully!");
        reset();
        myReviewsRefetch();
        setIsReviewModalOpen(false);
      } else {
        toast.error("Failed to submit review");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmittingReview(false);
    }
  };
  if (myReviewsLoading) return <LoadingSpinner />;

  return (
    <section>
      <div className="sm:flex justify-between items-center mt-10">
        <DashboardTitle blackText="My" greenText="Reviews" />
        <button
          className="bg-primary hover:bg-[#1d3d7c] duration-300 text-white px-4 py-2 rounded-md flex items-center gap-2 my-3 sm:my-0"
          onClick={() => setIsReviewModalOpen(true)}
        >
          <AiOutlinePlus /> Add Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="my-5 space-y-5">
        {myReviewsData.data &&
          myReviewsData.data?.map((review: TReview) => (
            <div
              key={review._id}
              className="px-5 py-3 w-full rounded-lg hover:shadow-xl transition border border-primary h-fit"
            >
              <div className="flex items-center justify-between gap-5">
                <p className="text-xs text-gray-500 my-2">
                  {review?.createdAt &&
                    new Date(review.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </p>
                <p
                  className={`inline-block px-3 py-1 rounded text-xs font-semibold mt-2 ${
                    review.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-[#395b9b]"
                  }`}
                >
                  {review.status}
                </p>
              </div>
              <h4 className="text-lg sm:text-2xl text-primary mb-2">
                {review.title}
              </h4>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
      </div>

      {/* Review Form */}
      {isReviewModalOpen && (
        <CustomModal
          isModalOpen={isReviewModalOpen}
          setIsModalOpen={setIsReviewModalOpen}
        >
          <form onSubmit={handleSubmit(onReviewDataSubmit)}>
            <h3 className="font-bold text-xl mb-2">Add a Review</h3>
            <p className="border-t border-dark mb-5"></p>

            {/* Review Title */}
            <div className="w-full">
              <label className="text-dark text-sm">
                Review Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                  errors.title && "border-red-500"
                }`}
              />
            </div>

            {/* Review Comment */}
            <div className="w-full">
              <label className="text-dark text-sm">
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("comment", { required: true })}
                placeholder="৩-৪ লাইনের ভিতর রাখুন"
                rows={4}
                className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary ${
                  errors.comment && "border-red-500"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingReview}
              className={`text-center px-3 md:px-5 py-1 md:py-3 duration-300 rounded-lg text-white cursor-pointer mt-5 flex items-center justify-center gap-2 w-auto ${
                isSubmittingReview
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-[#1d3d7c]"
              }`}
            >
              {isSubmittingReview ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                "Add Review"
              )}
            </button>
          </form>
        </CustomModal>
      )}
    </section>
  );
}
