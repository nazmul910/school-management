"use client";

import Link from "next/link";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaFilePdf } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import useNotices from "@/hooks/useNotices";

export default function NoticeTicker() {
  const { noticesData, isLoading } = useNotices();
  const notices = noticesData?.data || [];
  const latestNotice = notices[0];

  return (
    <div className="bg-[#1e3a5f] text-white border-y border-[#78A4CB]/30 py-2.5">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-md animate-pulse uppercase tracking-wider">
            <HiOutlineSpeakerphone size={16} />
            <span>Latest Notice</span>
          </div>
        </div>

        {/* Center: Latest Notice Text */}
        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <p className="text-xs text-gray-300">Loading notices...</p>
          ) : latestNotice ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#F9E8A2] font-semibold hidden sm:inline">[{latestNotice.publishDate}]:</span>
              <Link
                href="/notices"
                className="text-gray-100 hover:text-[#F9E8A2] transition-colors truncate block max-w-[500px] lg:max-w-[700px] font-medium"
              >
                {latestNotice.heading}
              </Link>
              {latestNotice.pdfUrl && (
                <a
                  href={latestNotice.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-300 border border-red-400/40 rounded text-xs hover:bg-red-500 hover:text-white transition-colors shrink-0"
                >
                  <FaFilePdf size={11} />
                  <span>View PDF</span>
                </a>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-300">No active notices at this moment.</p>
          )}
        </div>

        {/* Right: View All Link */}
        <Link
          href="/notices"
          className="text-xs text-[#F9E8A2] hover:text-white font-semibold flex items-center gap-1 shrink-0 transition-colors"
        >
          <span>All Notices ({notices.length})</span>
          <BsArrowRight />
        </Link>
      </div>
    </div>
  );
}
