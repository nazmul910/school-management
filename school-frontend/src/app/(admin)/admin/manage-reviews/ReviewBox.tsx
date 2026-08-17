"use client";

import { FaTrash, FaCheck, FaTimes, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "@/hooks/useAxios";

interface IReviewBox {
  review: any;
  refetch: () => void;
}

export default function ReviewBox({ review, refetch }: IReviewBox) {
  const axios = useAxios();

  const handleToggleStatus = (newStatus: "approved" | "pending") => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `এই মতামতটি ${newStatus === "approved" ? "অনুমোদন" : "অননুমোদিত"} করা হবে।`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#78A4CB",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "হ্যাঁ, পরিবর্তন করুন",
      cancelButtonText: "বাতিল",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`/reviews/change-status/${review._id}`, {
            status: newStatus,
          });
          refetch();
          Swal.fire({
            icon: "success",
            title: "স্ট্যাটাস পরিবর্তিত হয়েছে!",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (err: any) {
          Swal.fire("ত্রুটি", "স্ট্যাটাস পরিবর্তন করা যায়নি।", "error");
        }
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "মুছে ফেলতে চান?",
      text: "এই রিভিউটি স্থায়ীভাবে ডিলিট হয়ে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#78A4CB",
      confirmButtonText: "হ্যাঁ, মুছুন",
      cancelButtonText: "বাতিল",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/reviews/${review._id}`);
          refetch();
          Swal.fire("ডিলিট হয়েছে!", "রিভিউ সফলভাবে মুছে ফেলা হয়েছে।", "success");
        } catch (err: any) {
          Swal.fire("ত্রুটি", "রিভিউ মুছে ফেলা যায়নি।", "error");
        }
      }
    });
  };

  const isApproved = review.status === "approved";

  return (
    <div className="p-6 bg-white rounded-2xl border border-[#B4E1EB]/60 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Review Content */}
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-2.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isApproved
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {isApproved ? "অনুমোদিত (Approved)" : "অপেক্ষমাণ (Pending)"}
          </span>
          <div className="flex items-center gap-1 text-amber-400 text-xs">
            {[...Array(review.rating || 5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>

        {review.title && (
          <h3 className="font-bold text-base text-[#1e3a5f]">
            {review.title}
          </h3>
        )}

        <p className="text-gray-600 text-sm leading-relaxed italic">
          "{review.comment}"
        </p>

        <p className="text-xs font-bold text-[#78A4CB] pt-1">
          — {review.name} <span className="text-gray-400 font-normal">({review.designation || "অভিভাবক"})</span>
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 shrink-0">
        {!isApproved ? (
          <button
            onClick={() => handleToggleStatus("approved")}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            <FaCheck /> অনুমোদন করুন
          </button>
        ) : (
          <button
            onClick={() => handleToggleStatus("pending")}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            <FaTimes /> অননুমোদিত করুন
          </button>
        )}

        <button
          onClick={handleDelete}
          className="p-2.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl transition-colors text-xs"
          title="মুছে ফেলুন"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
