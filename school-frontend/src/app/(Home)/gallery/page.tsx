"use client";

import { useState } from "react";
import { LuImage, LuEye } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import useGallery from "@/hooks/useGallery";

const categories = ["সকল", "ক্যাম্পাস", "ক্রীড়া", "সাংস্কৃতিক", "বিজ্ঞান মেলা", "পুরস্কার বিতরণী"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("সকল");
  const { galleryData, isLoading } = useGallery(selectedCategory);
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string; caption?: string } | null>(null);

  const images = galleryData?.data || [];

  return (
    <div className="min-h-screen bg-[#F3F8FC] py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] p-8 md:p-12 rounded-3xl text-white shadow-xl mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 text-[#F9E8A2] rounded-full text-xs font-bold mb-3">
            <LuImage />
            <span>স্কুল ফটো ও স্মৃতি অ্যালবাম</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            বিদ্যালয় ফটো গ্যালারি
          </h1>
          <p className="text-sm md:text-base text-gray-200 mt-2 max-w-2xl">
            বিদ্যালয়ের মনোরম ক্যাম্পাস, বার্ষিক ক্রীড়া, বিজ্ঞান মেলা, জাতীয় দিবস উদযাপন ও পুরস্কার বিতরণী অনুষ্ঠানের আলোকচিত্র।
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#78A4CB] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-[#B4E1EB]/30 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        {isLoading ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm text-gray-500 font-medium">
            গ্যালারির ছবি লোড হচ্ছে...
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((item: any, idx: number) => (
              <div
                key={item._id || idx}
                onClick={() => setPreviewImage({ url: item.imageUrl, title: item.title, caption: item.caption })}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-gray-100 cursor-pointer border border-[#B4E1EB]/60"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102033]/90 via-[#102033]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                {/* View Icon Overlay */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <LuEye size={18} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-[#F9E8A2] text-[#5c4300] text-xs font-bold mb-2">
                    {item.category || "ক্যাম্পাস"}
                  </span>
                  <h3 className="text-base font-bold leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm text-gray-500 font-medium">
            এই ক্যাটাগরিতে কোনো ছবি পাওয়া যায়নি।
          </div>
        )}

        {/* Lightbox Modal */}
        {previewImage && (
          <div
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={previewImage.url}
                  alt={previewImage.title}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black flex items-center justify-center transition-colors"
                >
                  <ImCross size={14} />
                </button>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-[#1e3a5f]">
                  {previewImage.title}
                </h3>
                {previewImage.caption && (
                  <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">
                    {previewImage.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
