"use client";

import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaFilePdf, FaEye, FaCalendarAlt } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import useNotices from "@/hooks/useNotices";
import useAxios from "@/hooks/useAxios";

export default function ManageNotices() {
  const axios = useAxios();
  const { noticesData, isLoading, addNotice, updateNotice, deleteNotice } = useNotices();
  const notices = noticesData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    heading: "",
    body: "",
    pdfUrl: "",
    publishDate: new Date().toISOString().split("T")[0],
    isPinned: false,
  });

  const [uploadingPdf, setUploadingPdf] = useState(false);

  const resetForm = () => {
    setFormData({
      heading: "",
      body: "",
      pdfUrl: "",
      publishDate: new Date().toISOString().split("T")[0],
      isPinned: false,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (notice: any) => {
    setFormData({
      heading: notice.heading || "",
      body: notice.body || "",
      pdfUrl: notice.pdfUrl || "",
      publishDate: notice.publishDate || new Date().toISOString().split("T")[0],
      isPinned: Boolean(notice.isPinned),
    });
    setIsEditing(true);
    setEditingId(notice._id);
    setIsModalOpen(true);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await axios.post("/upload", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.data?.url) {
        setFormData((prev) => ({ ...prev, pdfUrl: res.data.data.url }));
        Swal.fire({
          icon: "success",
          title: "PDF Uploaded",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Could not upload PDF file.",
      });
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && editingId) {
      updateNotice.mutate(
        { id: editingId, payload: formData },
        {
          onSuccess: () => {
            Swal.fire("Success", "Notice updated successfully.", "success");
            setIsModalOpen(false);
            resetForm();
          },
          onError: (err: any) => {
            Swal.fire("Error", err?.response?.data?.message || "Update failed.", "error");
          },
        }
      );
    } else {
      addNotice.mutate(formData, {
        onSuccess: () => {
          Swal.fire("Success", "New notice published successfully.", "success");
          setIsModalOpen(false);
          resetForm();
        },
        onError: (err: any) => {
          Swal.fire("Error", err?.response?.data?.message || "Failed to publish notice.", "error");
        },
      });
    }
  };

  const handleDelete = (id: string, heading: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Notice "${heading}" will be permanently deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#78A4CB",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteNotice.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Notice has been deleted successfully.", "success");
          },
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Title & Add Button */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1e3a5f] flex items-center gap-2.5">
            <IoNotificationsSharp className="text-[#78A4CB]" />
            <span>Notice Management</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Create, upload PDF, and manage general and urgent school notices.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        >
          <FaPlus />
          <span>Add New Notice</span>
        </button>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#B4E1EB]/60 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-[#1e3a5f]">Published Notices ({notices.length} total)</h2>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium">Loading...</div>
        ) : notices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1e3a5f] text-white text-xs uppercase tracking-wider">
                  <th className="p-4">Date</th>
                  <th className="p-4">Notice Title & Description</th>
                  <th className="p-4 text-center">PDF File</th>
                  <th className="p-4 text-center">Priority Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {notices.map((notice: any) => (
                  <tr key={notice._id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="p-4 whitespace-nowrap text-xs font-semibold text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-[#78A4CB]" />
                        {notice.publishDate}
                      </span>
                    </td>
                    <td className="p-4">
                      <strong className="text-[#1e3a5f] font-bold block">{notice.heading}</strong>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{notice.body}</p>
                    </td>
                    <td className="p-4 text-center">
                      {notice.pdfUrl ? (
                        <a
                          href={notice.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                        >
                          <FaFilePdf />
                          <span>View PDF</span>
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {notice.isPinned ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-xs">
                          Urgent (Pinned)
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">General</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(notice)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer hover:scale-110 active:scale-95"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(notice._id, notice.heading)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer hover:scale-110 active:scale-95"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500 font-medium">No notices found.</div>
        )}
      </div>

      {/* Add / Edit Notice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl my-8">
            <div className="p-6 bg-[#1e3a5f] text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEditing ? "Edit Notice" : "Publish New Notice"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-300 hover:text-white cursor-pointer">
                <ImCross size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
              {/* Heading */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  required
                  placeholder="e.g. Annual Exam 2026 Schedule Notice"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                />
              </div>

              {/* Publish Date & Pinned */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Publish Date *</label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                <div className="pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.isPinned}
                      onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                      className="w-4 h-4 text-[#78A4CB] rounded focus:ring-0"
                    />
                    <span>Pin as Urgent Notice (Highlight)</span>
                  </label>
                </div>
              </div>

              {/* Notice Body */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Notice Details *</label>
                <textarea
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  rows={4}
                  required
                  placeholder="Write the full notice details here..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                ></textarea>
              </div>

              {/* PDF File Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  PDF Attachment (Optional)
                </label>

                {formData.pdfUrl ? (
                  <div className="flex items-center justify-between p-3.5 bg-red-50/70 border border-red-200 rounded-2xl">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl shrink-0">
                        <FaFilePdf />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-800 truncate">PDF file attached</p>
                        <a
                          href={formData.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-red-600 hover:underline font-semibold flex items-center gap-1 mt-0.5"
                        >
                          <FaEye size={10} /> Preview
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <label className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 text-xs font-bold rounded-xl cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-sm">
                        {uploadingPdf ? "Uploading..." : "Change"}
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={handlePdfUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, pdfUrl: "" })}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-all hover:scale-110 active:scale-95 cursor-pointer text-xs"
                        title="Remove file"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-gray-300 hover:border-[#78A4CB] bg-gray-50 hover:bg-[#B4E1EB]/10 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 group">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 group-hover:scale-110 transition-transform flex items-center justify-center text-xl">
                      <FaFilePdf />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-[#1e3a5f]">
                        {uploadingPdf ? "Uploading PDF..." : "Click to select a PDF file"}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Max 15 MB (.pdf)</p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingPdf}
                  className="px-6 py-2.5 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {isEditing ? "Update" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}