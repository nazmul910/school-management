"use client";

import { useState } from "react";
import { FaImages, FaPlus, FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import useGallery from "@/hooks/useGallery";
import useAxios from "@/hooks/useAxios";

const categories = ["ক্যাম্পাস", "ক্রীড়া", "সাংস্কৃতিক", "বিজ্ঞান মেলা", "পুরস্কার বিতরণী", "অন্যান্য"];

export default function ManageGallery() {
  const axios = useAxios();
  const [filterCategory, setFilterCategory] = useState("all");
  const { galleryData, isLoading, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useGallery(
    filterCategory !== "all" ? filterCategory : undefined
  );
  const items = galleryData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    category: "ক্যাম্পাস",
    imageUrl: "",
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const resetForm = () => {
    setFormData({
      title: "",
      caption: "",
      category: "ক্যাম্পাস",
      imageUrl: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setFormData({
      title: item.title || "",
      caption: item.caption || "",
      category: item.category || "ক্যাম্পাস",
      imageUrl: item.imageUrl || "",
    });
    setIsEditing(true);
    setEditingId(item._id);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await axios.post("/upload", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.data?.url) {
        setFormData((prev) => ({ ...prev, imageUrl: res.data.data.url }));
        Swal.fire({
          icon: "success",
          title: "ছবি আপলোড সম্পন্ন",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "আপলোড ব্যর্থ",
        text: "ছবি আপলোড করা যায়নি।",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      Swal.fire("সতর্কতা", "ছবির লিংক বা ফাইল আপলোড করুন।", "warning");
      return;
    }

    if (isEditing && editingId) {
      updateGalleryItem.mutate(
        { id: editingId, payload: formData },
        {
          onSuccess: () => {
            Swal.fire("সফল", "গ্যালারির ছবি সফলভাবে আপডেট হয়েছে।", "success");
            setIsModalOpen(false);
            resetForm();
          },
          onError: (err: any) => {
            Swal.fire("ত্রুটি", err?.response?.data?.message || "আপডেট ব্যর্থ হয়েছে।", "error");
          },
        }
      );
    } else {
      addGalleryItem.mutate(formData, {
        onSuccess: () => {
          Swal.fire("সফল", "নতুন ছবি সফলভাবে গ্যালারিতে যোগ করা হয়েছে।", "success");
          setIsModalOpen(false);
          resetForm();
        },
        onError: (err: any) => {
          Swal.fire("ত্রুটি", err?.response?.data?.message || "যোগ করা সম্ভব হয়নি।", "error");
        },
      });
    }
  };

  const handleDelete = (id: string, title: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `"${title}" ছবিটি গ্যালারি থেকে মুছে ফেলা হবে!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#78A4CB",
      confirmButtonText: "হ্যাঁ, মুছুন",
      cancelButtonText: "বাতিল",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteGalleryItem.mutate(id, {
          onSuccess: () => {
            Swal.fire("মুছে ফেলা হয়েছে!", "ছবি সফলভাবে ডিলিট হয়েছে।", "success");
          },
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1e3a5f] flex items-center gap-2.5">
            <FaImages className="text-[#78A4CB]" />
            <span>গ্যালারি ব্যবস্থাপনা (Gallery Management)</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            বিদ্যালয়ের ক্যাম্পাস ও বিভিন্ন অনুষ্ঠানের ছবি আপলোড, সম্পাদনা ও নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all shrink-0"
        >
          <FaPlus />
          <span>নতুন ছবি যোগ করুন</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterCategory === "all"
              ? "bg-[#78A4CB] text-white shadow-sm"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          সকল ক্যাটাগরি
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterCategory === cat
                ? "bg-[#78A4CB] text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Items Grid */}
      {isLoading ? (
        <div className="bg-white p-12 rounded-3xl text-center shadow-sm text-gray-500 font-medium">
          লোড হচ্ছে...
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item: any) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#B4E1EB]/60 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 bg-[#1e3a5f]/90 text-[#F9E8A2] text-[11px] font-bold rounded-md">
                    {item.category || "ক্যাম্পাস"}
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="font-bold text-sm text-[#1e3a5f] line-clamp-1">{item.title}</h3>
                  {item.caption && (
                    <p className="text-xs text-gray-500 line-clamp-2">{item.caption}</p>
                  )}
                </div>
              </div>

              <div className="p-3 px-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString("bn-BD") : ""}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors text-xs"
                    title="সম্পাদনা"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors text-xs"
                    title="মুছুন"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl text-center shadow-sm text-gray-500 font-medium">
          কোনো ছবি পাওয়া যায়নি।
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl my-8">
            <div className="p-6 bg-[#1e3a5f] text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEditing ? "ছবির তথ্য সম্পাদন করুন" : "নতুন ছবি আপলোড করুন"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-300 hover:text-white">
                <ImCross size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ছবির শিরোনাম *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="যেমন: বার্ষিক বিজ্ঞান মেলা ও উদ্ভাবনী প্রজেক্ট"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ক্যাটাগরি নির্বাচন করুন *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ছবির লিংক বা আপলোড *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    required
                    placeholder="ছবির লিংক (URL) অথবা ফাইল আপলোড করুন"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                  <label className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer shrink-0">
                    {uploadingImage ? "আপলোড হচ্ছে..." : "ছবি আপলোড"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">সংক্ষিপ্ত ক্যাপশন বা বিবরণ</label>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  rows={3}
                  placeholder="ছবির সংক্ষিপ্ত বিবরণ লিখুন..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                ></textarea>
              </div>

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
                  {isEditing ? "আপডেট করুন" : "যোগ করুন"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
