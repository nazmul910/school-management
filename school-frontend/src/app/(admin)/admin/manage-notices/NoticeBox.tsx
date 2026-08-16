"use client";

import Tooltip from "@/utils/Tooltip";
import useAxios from "@/hooks/useAxios";
import { TNotice } from "@/types/notice.type";
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";

interface INoticeBox {
  notice: TNotice;
  refetch: () => void;
  isAdmin?: boolean;
}

const NoticeBox = ({ notice, refetch, isAdmin = true }: INoticeBox) => {
  const axiosSecure = useAxios();
  const [expanded, setExpanded] = useState(false);

  // Helper function to get word count and truncate text
  const getWords = (text: string) => text?.trim().split(/\s+/) || [];
  const words = getWords(notice?.body || "");
  const shouldShowReadMore = words.length > 100;

  // Get first 100 words for preview
  const previewText = shouldShowReadMore
    ? words.slice(0, 100).join(" ") + "..."
    : notice?.body;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed && typeof window !== "undefined") {
        axiosSecure.delete(`/notices/${notice?._id}`).then((res) => {
          if (res.data.statusCode === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted Successfully!",
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <section className="relative px-5 py-3 w-full rounded-lg hover:shadow-xl transition border border-primary h-fit">
      <p className="text-xs text-gray-500 my-2">
        {notice?.createdAt &&
          new Date(notice.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
      </p>
      <p className="text-lg sm:text-2xl text-primary mb-2">{notice?.heading}</p>

      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
        {expanded ? notice?.body : previewText}
      </p>
      {shouldShowReadMore && (
        <button
          className="mt-2 text-sm text-green-600 hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "See more..."}
        </button>
      )}
      {isAdmin && (
        <div className="absolute bottom-4 right-2 flex gap-3">
          <Tooltip
            text="Delete"
            styles={{
              bottom: "0",
              top: "-7",
              right: "0",
              left: "0",
            }}
          >
            <MdOutlineDelete
              onClick={handleDelete}
              className="text-xl cursor-pointer text-red-500"
            />
          </Tooltip>
        </div>
      )}
    </section>
  );
};

export default NoticeBox;
