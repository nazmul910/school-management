"use client";

import { useRef, useState } from "react";
import { LuUpload, LuX, LuEye, LuImage } from "react-icons/lu";
import { ImCross } from "react-icons/im";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  onFileUpload?: (file: File) => Promise<string | void>;
  label?: string;
  uploading?: boolean;
  placeholder?: string;
}

export default function ImageUploadField({
  value,
  onChange,
  onFileUpload,
  label = "ছবি আপলোড করুন",
  uploading = false,
  placeholder = "ছবির লিংক (URL) লিখুন অথবা ফাইল নির্বাচন করুন",
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (file: File) => {
    if (!file) return;
    if (onFileUpload) {
      await onFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-bold text-gray-700">{label}</label>
      )}

      {/* Drop Zone / Click to Upload Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden ${
          isDragging
            ? "border-[#78A4CB] bg-[#B4E1EB]/20 scale-[1.01]"
            : value
            ? "border-[#95BDD7] bg-[#F3F8FC]"
            : "border-gray-300 bg-gray-50 hover:border-[#78A4CB] hover:bg-[#B4E1EB]/10"
        }`}
      >
        {value ? (
          /* Show image preview thumbnail inside the drop zone */
          <div className="relative aspect-[16/9] max-h-52 group">
            <img
              src={value}
              alt="আপলোড করা ছবি"
              className="w-full h-full object-cover"
            />
            {/* Overlay with actions on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              {/* Preview Button */}
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                title="বড় করে দেখুন"
              >
                <LuEye size={18} />
              </button>
              {/* Re-upload button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#78A4CB] text-white flex items-center justify-center backdrop-blur-sm transition-all"
                title="পরিবর্তন করুন"
              >
                <LuUpload size={18} />
              </button>
              {/* Remove button */}
              <button
                type="button"
                onClick={() => onChange("")}
                className="w-10 h-10 rounded-full bg-red-500/70 hover:bg-red-600 text-white flex items-center justify-center transition-all"
                title="মুছে ফেলুন"
              >
                <LuX size={18} />
              </button>
            </div>

            {/* "Click to change" label at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity text-center">
              পরিবর্তন করতে এখানে ক্লিক করুন অথবা ছবি টেনে আনুন
            </div>
          </div>
        ) : (
          /* Empty state — click or drag to upload */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-3 py-10 px-4 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#B4E1EB]/40 text-[#78A4CB] flex items-center justify-center text-3xl">
              <LuImage />
            </div>
            <div>
              <p className="font-bold text-sm text-[#1e3a5f]">
                {uploading ? "আপলোড হচ্ছে..." : "ছবি আপলোড করতে ক্লিক করুন"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">অথবা এখানে ড্র্যাগ করে আনুন (PNG, JPG, WEBP)</p>
            </div>
            {uploading && (
              <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#78A4CB] rounded-full animate-pulse w-3/4" />
              </div>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileChange(file);
            e.target.value = "";
          }}
        />
      </div>

      {/* URL input below the dropzone */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#78A4CB] bg-white"
        />
        {value && (
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-[#B4E1EB]/40 text-[#1e3a5f] text-xs font-bold hover:bg-[#78A4CB] hover:text-white transition-colors flex items-center gap-1.5 shrink-0 border border-[#95BDD7]"
          >
            <LuEye size={14} />
            <span>প্রিভিউ</span>
          </button>
        )}
      </div>

      {/* Full-screen Preview Modal */}
      {isPreviewOpen && value && (
        <div
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#1e3a5f] text-white flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-2">
                <LuImage /> ছবির পূর্ণ প্রিভিউ
              </span>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <ImCross size={12} />
              </button>
            </div>

            {/* Full Image */}
            <div className="bg-gray-100 flex items-center justify-center max-h-[75vh] overflow-hidden">
              <img
                src={value}
                alt="ছবির প্রিভিউ"
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 flex items-center justify-between gap-3 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-400 truncate flex-1">{value}</p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsPreviewOpen(false);
                    fileInputRef.current?.click();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#78A4CB] text-white text-xs font-bold hover:bg-[#6894bb] transition-colors flex items-center gap-1.5"
                >
                  <LuUpload size={13} /> পরিবর্তন করুন
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    setIsPreviewOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-600 hover:text-white transition-colors border border-red-200"
                >
                  মুছে ফেলুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
