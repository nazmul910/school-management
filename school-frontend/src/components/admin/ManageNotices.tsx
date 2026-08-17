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
          title: "PDF আপলোড সম্পন্ন",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "আপলোড ব্যর্থ",
        text: "PDF ফাইল আপলোড করা যায়নি।",
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
            Swal.fire("সফল", "নোটিশ সফলভাবে আপডেট হয়েছে।", "success");
            setIsModalOpen(false);
            resetForm();
          },
          onError: (err: any) => {
            Swal.fire("ত্রুটি", err?.response?.data?.message || "আপডেট ব্যর্থ হয়েছে।", "error");
          },
        }
      );
    } else {
      addNotice.mutate(formData, {
        onSuccess: () => {
          Swal.fire("সফল", "নতুন নোটিশ সফলভাবে প্রকাশ করা হয়েছে।", "success");
          setIsModalOpen(false);
          resetForm();
        },
        onError: (err: any) => {
          Swal.fire("ত্রুটি", err?.response?.data?.message || "নোটিশ প্রকাশ ব্যর্থ হয়েছে।", "error");
        },
      });
    }
  };

  const handleDelete = (id: string, heading: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `"${heading}" নোটিশটি মুছে ফেলা হবে!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#78A4CB",
      confirmButtonText: "হ্যাঁ, মুছুন",
      cancelButtonText: "বাতিল",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteNotice.mutate(id, {
          onSuccess: () => {
            Swal.fire("মুছে ফেলা হয়েছে!", "নোটিশ সফলভাবে ডিলিট হয়েছে।", "success");
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
            <span>নোটিশ ব্যবস্থাপনা (Notice Management)</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            বিদ্যালয়ের সাধারণ ও জরুরি নোটিশ তৈরি, পিডিএফ আপলোড ও সম্পাদনা করুন।
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all shrink-0"
        >
          <FaPlus />
          <span>নতুন নোটিশ যোগ করুন</span>
        </button>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#B4E1EB]/60 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-[#1e3a5f]">প্রকাশিত নোটিশ তালিকা ({notices.length} টি)</h2>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium">লোড হচ্ছে...</div>
        ) : notices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1e3a5f] text-white text-xs uppercase tracking-wider">
                  <th className="p-4">তারিখ</th>
                  <th className="p-4">নোটিশ শিরোনাম ও বিবরণ</th>
                  <th className="p-4 text-center">পিডিএফ ফাইল</th>
                  <th className="p-4 text-center">জরুরি স্ট্যাটাস</th>
                  <th className="p-4 text-center">অ্যাকশন</th>
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
                          className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <FaFilePdf />
                          <span>PDF দেখুন</span>
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {notice.isPinned ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-xs">
                          জরুরি (Pinned)
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">সাধারণ</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(notice)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                          title="সম্পাদনা"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(notice._id, notice.heading)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                          title="মুছুন"
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
          <div className="p-12 text-center text-gray-500 font-medium">কোনো নোটিশ পাওয়া যায়নি।</div>
        )}
      </div>

      {/* Add / Edit Notice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl my-8">
            <div className="p-6 bg-[#1e3a5f] text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEditing ? "নোটিশ সম্পাদন করুন" : "নতুন নোটিশ প্রকাশ করুন"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-300 hover:text-white">
                <ImCross size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
              {/* Heading */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">নোটিশ শিরোনাম *</label>
                <input
                  type="text"
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  required
                  placeholder="যেমন: বার্ষিক পরীক্ষা ২০২৬ এর রুটিন সংক্রান্ত বিজ্ঞপ্তি"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                />
              </div>

              {/* Publish Date & Pinned */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">প্রকাশের তারিখ *</label>
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
                    <span>জরুরি নোটিশ হিসেবে পিন করুন (Highlight)</span>
                  </label>
                </div>
              </div>

              {/* Notice Body */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">নোটিশের বিস্তারিত বিবরণ *</label>
                <textarea
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  rows={4}
                  required
                  placeholder="নোটিশের বিস্তারিত তথ্য লিখুন..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                ></textarea>
              </div>

              {/* PDF URL / File Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">পিডিএফ সংযুক্তি (PDF File / URL)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formData.pdfUrl}
                    onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                    placeholder="পিডিএফ লিংক লিখুন অথবা ফাইল আপলোড করুন"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                  <label className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl cursor-pointer shrink-0 flex items-center gap-1.5 border border-red-200">
                    <FaFilePdf />
                    <span>{uploadingPdf ? "আপলোড হচ্ছে..." : "PDF আপলোড"}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md"
                >
                  {isEditing ? "আপডেট করুন" : "প্রকাশ করুন"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}