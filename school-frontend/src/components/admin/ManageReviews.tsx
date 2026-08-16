"use client";

import ReviewBox from "@/app/(admin)/admin/manage-reviews/ReviewBox";
import useReviews from "@/hooks/useReviews";
import { TReview } from "@/types/review.type";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { FaQuoteRight } from "react-icons/fa";

const ManageReviews = () => {
  const { reviewsData, reviewsRefetch, reviewsLoading } = useReviews();
  if (reviewsLoading) return <LoadingSpinner />;
  return (
    <section className="mx-auto overflow-y-hidden">
      <DashboardTitle
        blackText="Manage"
        greenText="Reviews"
        className="mt-10"
      />
      <div className="my-5 space-y-5">
        {reviewsData.data && reviewsData.data.length > 0 ? (
          reviewsData.data.map((review: TReview) => (
            <ReviewBox
              key={review?._id}
              review={review}
              refetch={reviewsRefetch}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <FaQuoteRight className="text-5xl text-primary" />
            </div>

            <h3 className="text-2xl font-bold text-primary mb-2">
              কোনো রিভিউ পাওয়া যায়নি
            </h3>

            <p className="text-gray-500 max-w-md leading-7">
              এখনো কোনো রিভিউ যোগ হয়নি।
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageReviews;