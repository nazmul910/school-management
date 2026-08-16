"use client";

import Tooltip from "@/utils/Tooltip";
import useAxios from "@/hooks/useAxios";
import { TReview } from "@/types/review.type";
import { MdOutlineDelete, MdPending } from "react-icons/md";
import Swal from "sweetalert2";

interface IReviewBox {
  review: TReview;
  refetch: () => void;
}

const ReviewBox = ({ review, refetch }: IReviewBox) => {
  const axiosSecure = useAxios();

  const handleToggleStatus = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${
        review?.status === "pending" ? "approve" : "disapprove"
      } this review!`,
    }).then((result) => {
      if (result.isConfirmed && typeof window !== "undefined") {
        axiosSecure
          .patch(`/reviews/change-status/${review?._id}`, {
            status: review?.status === "pending" ? "approved" : "pending",
          })
          .then((res) => {
            if (res.status === 200) {
              refetch();
              Swal.fire({
                icon: "success",
                title: `Review ${
                  review?.status === "pending" ? "Approved" : "Disapproved"
                }!`,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  return (
    <section className="relative px-5 py-3 w-full rounded-lg hover:shadow-xl transition border border-primary h-fit">
      <div className="mt-2">
        <p className="mb-2">
          <span className="text-lg md:text-xl lg:text-2xl font-semibold">
            {review?.status == "approved" ? "✅" : "⚠️"} {review?.title}
          </span>
          <span className="text-sm font-medium ml-3">
            (This review is:{" "}
            <span
              className={`${
                review?.status === "approved"
                  ? "text-primary"
                  : "text-yellow-500"
              }`}
            >
              {review?.status}
            </span>
            )
          </span>
        </p>
        <p className="text-sm lg:text-lg text-gray-700">{review?.comment}</p>
        <p className="mt-2 text-sm md:text-md 2xl:text-lg font-medium flex flex-col">
          - {review?.name}
          <span className="text-xs sm:text-sm text-gray-500">
            {review?.designation}
          </span>
        </p>
      </div>
      <div className="absolute bottom-5 right-5 flex gap-1 md:gap-3">
        {review?.status != "approved" ? (
          <>
            <Tooltip
              text="Approve"
              styles={{
                left: "1/2",
                top: "-7",
                bottom: "auto",
                right: "auto",
              }}
            >
              <button
                onClick={handleToggleStatus}
                className="text-primary duration-300 border border-primary px-3 py-1 hover:text-white hover:bg-primary rounded-full"
              >
                Approve
              </button>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip
              text="Disapprove"
              styles={{
                left: "1/2",
                top: "-7",
                bottom: "auto",
                right: "auto",
              }}
            >
              <button
                onClick={handleToggleStatus}
                className="text-red-500 duration-300 border border-red-500 px-3 py-1 hover:text-white hover:bg-red-500 rounded-full"
              >
                Disapprove
              </button>
            </Tooltip>
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewBox;
