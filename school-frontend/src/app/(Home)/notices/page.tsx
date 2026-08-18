"use client";

import { useState } from "react";
import { FaFilePdf, FaDownload, FaEye, FaSearch, FaCalendarAlt, FaBullhorn } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import useNotices from "@/hooks/useNotices";
import EmptyState from "@/components/common/EmptyState";

export default function NoticesPage() {
  const { noticesData, isLoading } = useNotices();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);

  const notices = noticesData?.data || [];

  const filteredNotices = notices.filter((n: any) =>
    n.heading?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.body?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.publishDate?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#F3F8FC] py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] p-8 md:p-12 rounded-3xl text-white shadow-xl mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 text-[#F9E8A2] rounded-full text-xs font-bold mb-3">
              <FaBullhorn />
              <span>Official Notice Board</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Academic Notices & Announcements
            </h1>
            <p className="text-sm md:text-base text-gray-200 mt-2 max-w-2xl">
              Stay up-to-date with official announcements regarding exams, schedules, admissions, holidays, and campus events.
            </p>
          </div>

          {/* Search Input in Header */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              placeholder="Search notices by keyword or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-800 text-sm focus:outline-none shadow-md placeholder:text-gray-400"
            />
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Notices Content */}
        {isLoading ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm text-gray-500 font-medium">
            Loading notices...
          </div>
        ) : filteredNotices.length > 0 ? (
          <div className="space-y-4">
            {filteredNotices.map((notice: any, idx: number) => (
              <div
                key={notice._id || idx}
                className={`p-6 bg-white rounded-2xl border transition-all duration-300 hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                  notice.isPinned
                    ? "border-l-8 border-l-[#78A4CB] border-gray-200 bg-blue-50/20"
                    : "border-gray-200"
                }`}
              >
                {/* Notice Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {notice.isPinned && (
                      <span className="px-2.5 py-0.5 bg-red-600 text-white font-bold text-xs rounded-md uppercase">
                        Important
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold bg-gray-100 px-3 py-1 rounded-full">
                      <FaCalendarAlt className="text-[#78A4CB]" />
                      <span>Published: {notice.publishDate}</span>
                    </span>
                  </div>

                  <h2 className="text-lg md:text-xl font-bold text-[#1e3a5f]">
                    {notice.heading}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed max-w-4xl">
                    {notice.body}
                  </p>
                </div>

                {/* PDF Action Buttons */}
                {notice.pdfUrl ? (
                  <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
                    <button
                      onClick={() => setSelectedPdf({ url: notice.pdfUrl, title: notice.heading })}
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#B4E1EB]/50 text-[#1e3a5f] font-semibold text-xs md:text-sm rounded-xl hover:bg-[#78A4CB] hover:text-white transition-colors border border-[#95BDD7]"
                    >
                      <FaEye />
                      <span>View PDF</span>
                    </button>
                    <a
                      href={notice.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#78A4CB] text-white font-semibold text-xs md:text-sm rounded-xl hover:bg-[#6894bb] shadow-sm transition-colors"
                    >
                      <FaDownload />
                      <span>Download</span>
                    </a>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 italic">No attachments</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="file"
            title="No Notices Found"
            description={searchTerm ? `No announcements found matching "${searchTerm}". Try searching for another keyword.` : "There are currently no published announcements."}
            actionLabel={searchTerm ? "Clear Search" : undefined}
            onAction={searchTerm ? () => setSearchTerm("") : undefined}
            size="lg"
          />
        )}

        {/* PDF Modal Viewer */}
        {selectedPdf && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-4xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              {/* Modal Header */}
              <div className="p-4 px-6 bg-[#1e3a5f] text-white flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm md:text-base truncate max-w-lg">
                  <FaFilePdf className="text-red-400 shrink-0" />
                  <span className="truncate">{selectedPdf.title}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={selectedPdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[#78A4CB] text-white text-xs font-semibold rounded hover:bg-[#6894bb] flex items-center gap-1"
                  >
                    <FaDownload /> Open in New Tab
                  </a>
                  <button
                    onClick={() => setSelectedPdf(null)}
                    className="p-1.5 text-gray-300 hover:text-white"
                  >
                    <ImCross size={14} />
                  </button>
                </div>
              </div>

              {/* Modal PDF Embed */}
              <div className="flex-1 bg-gray-100 p-2">
                <iframe
                  src={selectedPdf.url}
                  title={selectedPdf.title}
                  className="w-full h-full rounded-2xl border-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
