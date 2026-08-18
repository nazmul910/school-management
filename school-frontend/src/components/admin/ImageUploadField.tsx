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
  helperText?: string;
}

export default function ImageUploadField({
  value,
  onChange,
  onFileUpload,
  label = "Upload Image",
  uploading = false,
  helperText = "PNG, JPG, WEBP formats (Max 10 MB)",
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
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden ${
          isDragging
            ? "border-[#78A4CB] bg-[#B4E1EB]/30 scale-[1.01] shadow-lg"
            : value
            ? "border-[#95BDD7] bg-[#F3F8FC]"
            : "border-gray-300 bg-gray-50/70 hover:border-[#78A4CB] hover:bg-[#B4E1EB]/10 cursor-pointer"
        }`}
      >
        {value ? (
          /* Image Preview inside Drop Zone */
          <div className="relative aspect-[16/9] max-h-56 group overflow-hidden bg-gray-950 flex items-center justify-center">
            <img
              src={value}
              alt="Uploaded Preview"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay with actions on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 backdrop-blur-[2px]">
              {/* Preview Button */}
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1e3a5f] flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
                title="View Full Image"
              >
                <LuEye size={18} />
              </button>
              {/* Re-upload button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#78A4CB] text-white flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
                title="Change Image"
              >
                <LuUpload size={18} />
              </button>
              {/* Remove button */}
              <button
                type="button"
                onClick={() => onChange("")}
                className="w-10 h-10 rounded-full bg-red-500/80 hover:bg-red-600 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
                title="Remove Image"
              >
                <LuX size={18} />
              </button>
            </div>

            {/* Click to change label at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity text-center">
              Click or drag to replace image
            </div>
          </div>
        ) : (
          /* Empty state — click or drag to upload */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-3 py-10 px-4 text-center cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#B4E1EB]/40 text-[#78A4CB] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-[#78A4CB] group-hover:text-white transition-all duration-300 shadow-sm">
              <LuImage />
            </div>
            <div>
              <p className="font-bold text-sm text-[#1e3a5f] group-hover:text-[#78A4CB] transition-colors">
                {uploading ? "Uploading to Cloudinary..." : "Click or drag to upload image"}
              </p>
              <p className="text-xs text-gray-400 mt-1">{helperText}</p>
            </div>
            {uploading ? (
              <div className="w-36 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-gradient-to-r from-[#78A4CB] to-[#B4E1EB] rounded-full animate-pulse w-full" />
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-600 shadow-sm group-hover:border-[#78A4CB] group-hover:text-[#1e3a5f] transition-all">
                <LuUpload size={13} />
                <span>Select File</span>
              </span>
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

      {/* Full-screen Preview Modal */}
      {isPreviewOpen && value && (
        <div
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate__animated animate__fadeIn"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#1e3a5f] text-white flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-2">
                <LuImage className="text-[#F9E8A2]" /> Full Image Preview
              </span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ImCross size={12} />
              </button>
            </div>

            {/* Full Image */}
            <div className="bg-gray-950 flex items-center justify-center max-h-[75vh] overflow-hidden p-2">
              <img
                src={value}
                alt="Image Preview"
                className="max-w-full max-h-[72vh] object-contain rounded-xl"
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 flex items-center justify-end gap-3 bg-white border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setIsPreviewOpen(false);
                  fileInputRef.current?.click();
                }}
                className="px-4 py-2 rounded-xl bg-[#78A4CB] text-white text-xs font-bold hover:bg-[#6894bb] transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <LuUpload size={13} /> Replace Image
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setIsPreviewOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-600 hover:text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer border border-red-200"
              >
                <LuX size={13} /> Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
