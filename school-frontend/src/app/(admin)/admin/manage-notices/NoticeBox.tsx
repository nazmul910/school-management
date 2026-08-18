"use client";

import useAxios from "@/hooks/useAxios";
import { TNotice } from "@/types/notice.type";
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaFilePdf, FaCalendarAlt, FaThumbtack } from "react-icons/fa";
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
  const shouldShowReadMore = words.length > 80;

  const previewText = shouldShowReadMore
    ? words.slice(0, 80).join(" ") + "..."
    : notice?.body;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This notice will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#78A4CB",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/notices/${notice?._id}`).then((res) => {
          if (res.data.statusCode === 200 || res.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted successfully!",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };

  return (
    <div
      className={`relative p-6 rounded-3xl transition-all duration-300 border bg-white shadow-sm hover:shadow-xl hover:-translate-y-0.5 ${
        notice.isPinned
          ? "border-red-300 bg-gradient-to-br from-red-50/30 via-white to-white"
          : "border-[#B4E1EB]/60 hover:border-[#78A4CB]"
      }`}
    >
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {notice.isPinned && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold shadow-sm">
              <FaThumbtack size={10} />
              <span>Urgent Notice</span>
            </span>
          )}
          <span className="flex items-center gap-1 text-xs font-semibold text-gray-500 font-mono">
            <FaCalendarAlt className="text-[#78A4CB]" size={11} />
            {notice?.publishDate ||
              (notice?.createdAt &&
                new Date(notice.createdAt).toLocaleDateString("en-US"))}
          </span>
        </div>

        {isAdmin && (
          <button
            onClick={handleDelete}
            className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all hover:scale-110 active:scale-95 cursor-pointer text-base"
            title="Delete"
          >
            <MdOutlineDelete />
          </button>
        )}
      </div>

      {/* Heading */}
      <h3 className="text-lg sm:text-xl font-bold text-[#1e3a5f] mb-2 leading-snug">
        {notice?.heading}
      </h3>

      {/* Body */}
      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
        {expanded ? notice?.body : previewText}
      </p>

      {shouldShowReadMore && (
        <button
          className="mt-2 text-xs font-bold text-[#78A4CB] hover:underline cursor-pointer transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less ▲" : "Read More ▼"}
        </button>
      )}

      {/* PDF Attachment Badge */}
      {notice?.pdfUrl && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <a
            href={notice.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl text-xs font-bold border border-red-200 hover:border-red-600 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          >
            <FaFilePdf size={14} />
            <span>View / Download PDF</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default NoticeBox;
