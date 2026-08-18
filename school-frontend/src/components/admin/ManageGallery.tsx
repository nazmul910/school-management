"use client";

import { useState, useRef } from "react";
import {
  FaImages,
  FaPlus,
  FaTrash,
  FaEdit,
  FaEye,
  FaCloudUploadAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { LuImage, LuUpload, LuLoader, LuLayers } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import useGallery from "@/hooks/useGallery";
import useAxios from "@/hooks/useAxios";
import ImageUploadField from "./ImageUploadField";

const categories = [
  "Campus",
  "Sports",
  "Cultural",
  "Science Fair",
  "Prize Giving",
  "Other",
];

interface SelectedFilePreview {
  file: File;
  previewUrl: string;
}

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

  // Single Item form (for edit)
  const [singleFormData, setSingleFormData] = useState({
    title: "",
    caption: "",
    category: "Campus",
    imageUrl: "",
  });

  // Multi-upload state (for adding multiple images)
  const [batchCategory, setBatchCategory] = useState("Campus");
  const [batchTitle, setBatchTitle] = useState("");
  const [batchCaption, setBatchCaption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<SelectedFilePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Full Screen Preview Modal
  const [lightboxImage, setLightboxImage] = useState<any | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setSingleFormData({
      title: "",
      caption: "",
      category: "Campus",
      imageUrl: "",
    });
    setBatchCategory("Campus");
    setBatchTitle("");
    setBatchCaption("");
    // Revoke object URLs to avoid memory leaks
    selectedFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setSelectedFiles([]);
    setIsEditing(false);
    setEditingId(null);
    setUploadProgress(0);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setSingleFormData({
      title: item.title || "",
      caption: item.caption || "",
      category: item.category || "Campus",
      imageUrl: item.imageUrl || "",
    });
    setIsEditing(true);
    setEditingId(item._id);
    setIsModalOpen(true);
  };

  // Handle Multi-file selection
  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPreviews = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setSelectedFiles((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const handleRemoveSelectedFile = (index: number) => {
    setSelectedFiles((prev) => {
      const removed = prev[index];
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && editingId) {
      // Single edit submit
      if (!singleFormData.imageUrl) {
        Swal.fire("Warning", "Please select an image.", "warning");
        return;
      }

      updateGalleryItem.mutate(
        { id: editingId, payload: singleFormData },
        {
          onSuccess: () => {
            Swal.fire("Success", "Gallery item updated successfully.", "success");
            setIsModalOpen(false);
            resetForm();
          },
          onError: (err: any) => {
            Swal.fire("Error", err?.response?.data?.message || "Failed to update item.", "error");
          },
        }
      );
    } else {
      // Multi-image / Batch add submit
      if (selectedFiles.length === 0) {
        Swal.fire("Warning", "Please select at least one image.", "warning");
        return;
      }

      if (!batchTitle.trim()) {
        Swal.fire("Warning", "Please provide an image title.", "warning");
        return;
      }

      setIsUploading(true);
      setUploadProgress(10);

      try {
        // Upload all selected files to backend Cloudinary endpoint
        const formData = new FormData();
        selectedFiles.forEach((item) => {
          formData.append("files", item.file);
        });
        formData.append("folder", "school_gallery");

        setUploadProgress(30);

        const uploadRes = await axios.post("/upload/multiple", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setUploadProgress(70);

        const uploadedResults: any[] = uploadRes.data?.data || [];

        if (!uploadedResults.length) {
          throw new Error("No files uploaded successfully");
        }

        // Build array of gallery payloads
        const newGalleryItems = uploadedResults.map((uploadItem, idx) => ({
          title: selectedFiles.length > 1 ? `${batchTitle.trim()} (${idx + 1})` : batchTitle.trim(),
          caption: batchCaption.trim(),
          category: batchCategory,
          imageUrl: uploadItem.url,
          imagePublicId: uploadItem.publicId || "",
        }));

        setUploadProgress(90);

        // Save batch to MongoDB
        addGalleryItem.mutate(newGalleryItems, {
          onSuccess: () => {
            setUploadProgress(100);
            Swal.fire({
              icon: "success",
              title: "Upload Successful!",
              text: `${newGalleryItems.length} photos added to gallery.`,
              confirmButtonColor: "#78A4CB",
            });
            setIsModalOpen(false);
            resetForm();
          },
          onError: (err: any) => {
            Swal.fire("Error", err?.response?.data?.message || "Could not add photos to gallery.", "error");
          },
        });
      } catch (err: any) {
        console.error("Batch upload error:", err);
        Swal.fire("Upload Failed", err?.response?.data?.message || "Failed to upload images.", "error");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDelete = (id: string, title: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `"${title}" will be permanently removed from gallery!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#78A4CB",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteGalleryItem.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Photo removed successfully.", "success");
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
            <span>Gallery Management</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Upload, categorize, manage, and batch-publish school event photos and campus albums.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        >
          <FaPlus />
          <span>Upload Photos</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
            filterCategory === "all"
              ? "bg-[#78A4CB] text-white shadow-md shadow-[#78A4CB]/30"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          All Categories ({items.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap ${
              filterCategory === cat
                ? "bg-[#78A4CB] text-white shadow-md shadow-[#78A4CB]/30"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Items Grid */}
      {isLoading ? (
        <div className="bg-white p-16 rounded-3xl text-center shadow-sm text-gray-500 font-medium">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#78A4CB] border-t-transparent mb-3" />
          <p className="text-sm">Loading gallery photos...</p>
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item: any) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#B4E1EB]/60 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div
                  onClick={() => setLightboxImage(item)}
                  className="relative aspect-[4/3] bg-gray-950 overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm text-white flex items-center justify-center text-base shadow-lg">
                      <FaEye />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 px-3 py-1 bg-[#1e3a5f]/90 backdrop-blur-sm text-[#F9E8A2] text-xs font-bold rounded-lg shadow-sm">
                    {item.category || "Campus"}
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
                <span className="text-[11px] text-gray-400 font-mono">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-US") : ""}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer text-xs"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer text-xs"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-16 rounded-3xl text-center shadow-sm text-gray-500 font-medium border border-dashed border-gray-300">
          <div className="w-16 h-16 rounded-2xl bg-[#B4E1EB]/30 text-[#78A4CB] flex items-center justify-center text-3xl mx-auto mb-3">
            <LuImage />
          </div>
          <h3 className="text-lg font-bold text-[#1e3a5f]">No Photos Found</h3>
          <p className="text-xs text-gray-400 mt-1">Click the &quot;Upload Photos&quot; button above to add new media.</p>
        </div>
      )}

      {/* Add (Multi-Image) / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl my-8">
            {/* Modal Header */}
            <div className="p-6 bg-[#1e3a5f] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#F9E8A2]">
                  {isEditing ? <FaEdit /> : <LuLayers />}
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {isEditing ? "Edit Gallery Item" : "Upload Gallery Photos"}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {isEditing ? "Update photo title, category or replacement image" : "Select one or multiple images to batch upload directly"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <ImCross size={13} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
              {isEditing ? (
                /* EDIT MODE: Single Item */
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Image Title *</label>
                    <input
                      type="text"
                      value={singleFormData.title}
                      onChange={(e) => setSingleFormData({ ...singleFormData, title: e.target.value })}
                      required
                      placeholder="e.g. Annual Science Fair Exhibition"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                    <select
                      value={singleFormData.category}
                      onChange={(e) => setSingleFormData({ ...singleFormData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clean Image Upload */}
                  <ImageUploadField
                    label="Gallery Photo *"
                    value={singleFormData.imageUrl}
                    onChange={(url) => setSingleFormData({ ...singleFormData, imageUrl: url })}
                    onFileUpload={async (file) => {
                      const body = new FormData();
                      body.append("file", file);
                      body.append("folder", "school_gallery");
                      const res = await axios.post("/upload", body, {
                        headers: { "Content-Type": "multipart/form-data" },
                      });
                      if (res.data?.data?.url) {
                        setSingleFormData((prev) => ({ ...prev, imageUrl: res.data.data.url }));
                      }
                    }}
                  />

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Caption / Description</label>
                    <textarea
                      value={singleFormData.caption}
                      onChange={(e) => setSingleFormData({ ...singleFormData, caption: e.target.value })}
                      rows={2}
                      placeholder="Short description of the photo..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] transition-colors"
                    />
                  </div>
                </>
              ) : (
                /* ADD MODE: Multi-Image Batch Upload */
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Album / Photo Title *</label>
                    <input
                      type="text"
                      value={batchTitle}
                      onChange={(e) => setBatchTitle(e.target.value)}
                      required
                      placeholder="e.g. Annual Sports Day 2026"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                      <select
                        value={batchCategory}
                        onChange={(e) => setBatchCategory(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium cursor-pointer"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Caption (Optional)</label>
                      <input
                        type="text"
                        value={batchCaption}
                        onChange={(e) => setBatchCaption(e.target.value)}
                        placeholder="Caption applied to selected photos..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                      />
                    </div>
                  </div>

                  {/* Multi-File Upload Dropzone */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-700">
                        Select Photos (One or Multiple) *
                      </label>
                      {selectedFiles.length > 0 && (
                        <span className="text-xs font-bold text-[#78A4CB]">
                          {selectedFiles.length} photos selected
                        </span>
                      )}
                    </div>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#78A4CB]/60 bg-[#B4E1EB]/10 hover:bg-[#B4E1EB]/25 rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#78A4CB] text-white flex items-center justify-center text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform shadow-md">
                        <FaCloudUploadAlt />
                      </div>
                      <p className="font-bold text-sm text-[#1e3a5f]">
                        Click or drag files here to select photos
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Select multiple files simultaneously (PNG, JPG, WEBP)
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFilesSelected}
                        className="hidden"
                      />
                    </div>

                    {/* Previews Grid for Selected Files */}
                    {selectedFiles.length > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-bold text-gray-600">Selected Photo Previews:</p>
                          <button
                            type="button"
                            onClick={() => {
                              selectedFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
                              setSelectedFiles([]);
                            }}
                            className="text-xs text-red-500 hover:underline font-semibold cursor-pointer"
                          >
                            Clear All
                          </button>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-52 overflow-y-auto p-2 bg-gray-50 rounded-2xl border border-gray-200">
                          {selectedFiles.map((item, idx) => (
                            <div
                              key={idx}
                              className="relative aspect-square rounded-xl overflow-hidden group shadow-sm bg-gray-900 border border-gray-200"
                            >
                              <img
                                src={item.previewUrl}
                                alt="Selected preview"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                   e.stopPropagation();
                                   handleRemoveSelectedFile(idx);
                                }}
                                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 cursor-pointer shadow"
                                title="Remove"
                              >
                                <FaTimes size={10} />
                              </button>
                              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 text-white text-[10px] rounded font-mono">
                                #{idx + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upload Progress Bar */}
                  {isUploading && (
                    <div className="space-y-1.5 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                      <div className="flex items-center justify-between text-xs font-bold text-[#1e3a5f]">
                        <span className="flex items-center gap-1.5">
                          <LuLoader className="animate-spin text-[#78A4CB]" />
                          <span>Uploading to Cloudinary...</span>
                        </span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-blue-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#78A4CB] rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isUploading}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`px-7 py-2.5 rounded-xl text-white font-bold text-sm shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
                    isUploading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#78A4CB] hover:bg-[#6894bb] hover:shadow-lg shadow-[#78A4CB]/30"
                  }`}
                >
                  {isUploading ? (
                    <>
                      <LuLoader className="animate-spin text-base" />
                      <span>Uploading...</span>
                    </>
                  ) : isEditing ? (
                    <>
                      <FaCheck />
                      <span>Save Updates</span>
                    </>
                  ) : (
                    <>
                      <LuUpload size={16} />
                      <span>
                        {selectedFiles.length > 1
                          ? `Upload ${selectedFiles.length} Photos`
                          : "Upload Photo"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full Screen Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate__animated animate__fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
          >
            <div className="relative aspect-[16/10] bg-gray-950 flex items-center justify-center">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="max-w-full max-h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-sm"
              >
                <ImCross size={12} />
              </button>
            </div>
            <div className="p-6 bg-white flex items-center justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded bg-[#F9E8A2] text-[#5c4300] text-xs font-bold mb-1.5">
                  {lightboxImage.category || "Campus"}
                </span>
                <h3 className="text-lg font-bold text-[#1e3a5f]">{lightboxImage.title}</h3>
                {lightboxImage.caption && (
                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">{lightboxImage.caption}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  const toEdit = lightboxImage;
                  setLightboxImage(null);
                  handleOpenEdit(toEdit);
                }}
                className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <FaEdit /> Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
