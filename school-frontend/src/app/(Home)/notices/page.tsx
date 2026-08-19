"use client";

import { useEffect, useState } from "react";
import {
  FaFilePdf,
  FaDownload,
  FaEye,
  FaSearch,
  FaCalendarAlt,
  FaBullhorn,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import useNotices from "@/hooks/useNotices";
import EmptyState from "@/components/common/EmptyState";

export default function NoticesPage() {
  const { noticesData, isLoading } = useNotices();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPdf, setSelectedPdf] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const notices = noticesData?.data || [];

  // Filter notices
  const filteredNotices = notices.filter((notice: any) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      notice.heading?.toLowerCase().includes(search) ||
      notice.body?.toLowerCase().includes(search) ||
      notice.publishDate?.toLowerCase?.().includes(search)
    );
  });

  // Pagination
  const totalPages = Math.ceil(
    filteredNotices.length / ITEMS_PER_PAGE
  );

  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset pagination when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPdf(null);
      }
    };

    if (selectedPdf) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPdf]);

  return (
    <div className="min-h-screen bg-[#F3F8FC] py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">

        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] p-6 md:p-10 lg:p-12 rounded-3xl text-white shadow-xl mb-8 md:mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 text-[#F9E8A2] rounded-full text-xs font-bold mb-3">
              <FaBullhorn />
              <span>Official Notice Board</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
              Academic Notices & Announcements
            </h1>

            <p className="text-sm md:text-base text-gray-200 mt-2 max-w-2xl leading-relaxed">
              Stay up-to-date with official announcements regarding exams,
              schedules, admissions, holidays, and campus events.
            </p>
          </div>

          {/* Search */}
          <div className="w-full md:w-80 relative shrink-0">
            <input
              type="text"
              placeholder="Search notices by keyword or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#F9E8A2]/50 shadow-md placeholder:text-gray-400"
            />

            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        {isLoading ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm text-gray-500 font-medium">
            Loading notices...
          </div>
        ) : filteredNotices.length > 0 ? (
          <>
            {/* Notices */}
            <div className="space-y-4">
              {paginatedNotices.map((notice: any, idx: number) => (
                <div
                  key={notice._id || idx}
                  className={`
                    p-5 md:p-6
                    bg-white
                    rounded-2xl
                    border
                    transition-all
                    duration-300
                    hover:shadow-lg
                    flex
                    flex-col
                    md:flex-row
                    items-start
                    md:items-center
                    justify-between
                    gap-5
                    ${
                      notice.isPinned
                        ? "border-l-4 border-l-[#78A4CB] border-gray-200 bg-blue-50/20"
                        : "border-gray-200"
                    }
                  `}
                >
                  {/* Notice Info */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">

                      {/* Important Badge */}
                      {notice.isPinned && (
                        <span className="px-2.5 py-0.5 bg-red-600 text-white font-bold text-xs rounded-md uppercase">
                          Important
                        </span>
                      )}

                      {/* Date */}
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold bg-gray-100 px-3 py-1 rounded-full">
                        <FaCalendarAlt className="text-[#78A4CB]" />
                        <span>
                          Published: {notice.publishDate || "N/A"}
                        </span>
                      </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-lg md:text-xl font-bold text-[#1e3a5f] break-words">
                      {notice.heading}
                    </h2>

                    {/* Body */}
                    <p className="text-gray-600 text-sm leading-relaxed max-w-4xl">
                      {notice.body}
                    </p>
                  </div>

                  {/* ================= PDF ACTIONS ================= */}
                  {notice.pdfUrl ? (
                    <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">

                      {/* View PDF */}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPdf({
                            url: notice.pdfUrl,
                            title: notice.heading,
                          })
                        }
                        className="
                          flex-1 md:flex-none
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          px-4
                          py-2.5
                          bg-[#B4E1EB]/50
                          text-[#1e3a5f]
                          font-semibold
                          text-xs md:text-sm
                          rounded-xl
                          hover:bg-[#78A4CB]
                          hover:text-white
                          transition-all
                          duration-300
                          border
                          border-[#95BDD7]
                          hover:shadow-md
                        "
                      >
                        <FaEye />
                        <span>View PDF</span>
                      </button>

                      {/* Download */}
                      <a
                        href={notice.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="
                          flex-1 md:flex-none
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          px-4
                          py-2.5
                          bg-[#78A4CB]
                          text-white
                          font-semibold
                          text-xs md:text-sm
                          rounded-xl
                          hover:bg-[#6894bb]
                          shadow-sm
                          hover:shadow-md
                          transition-all
                          duration-300
                        "
                      >
                        <FaDownload />
                        <span>Download</span>
                      </a>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic shrink-0">
                      No attachments
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* ================= PAGINATION ================= */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-10">

                {/* Previous */}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="
                    px-4 py-2
                    rounded-xl
                    bg-white
                    border border-[#B4E1EB]
                    text-[#1e3a5f]
                    text-sm
                    font-semibold
                    transition-all
                    duration-300
                    hover:bg-[#1e3a5f]
                    hover:text-white
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  Prev
                </button>

                {/* Page Numbers */}
                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`
                      w-9
                      h-9
                      rounded-xl
                      text-sm
                      font-semibold
                      transition-all
                      duration-300
                      ${
                        currentPage === page
                          ? "bg-[#1e3a5f] text-white shadow-md"
                          : "bg-white border border-[#B4E1EB] text-[#1e3a5f] hover:bg-[#B4E1EB]/40"
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(page + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="
                    px-4 py-2
                    rounded-xl
                    bg-white
                    border border-[#B4E1EB]
                    text-[#1e3a5f]
                    text-sm
                    font-semibold
                    transition-all
                    duration-300
                    hover:bg-[#1e3a5f]
                    hover:text-white
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon="file"
            title="No Notices Found"
            description={
              searchTerm
                ? `No announcements found matching "${searchTerm}". Try searching for another keyword.`
                : "There are currently no published announcements."
            }
            actionLabel={searchTerm ? "Clear Search" : undefined}
            onAction={searchTerm ? () => setSearchTerm("") : undefined}
            size="lg"
          />
        )}

        {/* ================= PDF MODAL ================= */}
        {selectedPdf && (
          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/70
              backdrop-blur-sm
              p-3
              sm:p-4
            "
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedPdf(null);
              }
            }}
          >
            <div
              className="
                bg-white
                w-full
                max-w-5xl
                h-[92vh]
                sm:h-[88vh]
                rounded-2xl
                md:rounded-3xl
                overflow-hidden
                shadow-2xl
                flex
                flex-col
              "
            >
              {/* Modal Header */}
              <div className="p-4 px-4 md:px-6 bg-[#1e3a5f] text-white flex items-center justify-between gap-3">

                {/* Title */}
                <div className="flex items-center gap-2 font-bold text-sm md:text-base min-w-0">
                  <FaFilePdf className="text-red-400 shrink-0" />

                  <span className="truncate">
                    {selectedPdf.title}
                  </span>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-2 shrink-0">

                  {/* Open New Tab */}
                  <a
                    href={selectedPdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      hidden
                      sm:inline-flex
                      px-3
                      py-2
                      bg-[#78A4CB]
                      text-white
                      text-xs
                      font-semibold
                      rounded-lg
                      hover:bg-[#6894bb]
                      transition-colors
                      items-center
                      gap-1.5
                    "
                  >
                    <FaDownload />
                    Open in New Tab
                  </a>

                  {/* Close */}
                  <button
                    type="button"
                    onClick={() => setSelectedPdf(null)}
                    aria-label="Close PDF viewer"
                    className="
                      w-9
                      h-9
                      flex
                      items-center
                      justify-center
                      rounded-lg
                      text-gray-300
                      hover:text-white
                      hover:bg-white/10
                      transition-all
                      duration-300
                      cursor-pointer
                    "
                  >
                    <ImCross
                      size={13}
                      className="transition-transform duration-300 hover:rotate-90"
                    />
                  </button>
                </div>
              </div>

              {/* PDF */}
              <div className="flex-1 bg-gray-100 p-1.5 md:p-2">
                <iframe
                  src={selectedPdf.url}
                  title={selectedPdf.title}
                  className="w-full h-full rounded-xl md:rounded-2xl border-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}