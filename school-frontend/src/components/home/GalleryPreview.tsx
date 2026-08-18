"use client";

import Link from "next/link";
import { LuImage, LuArrowRight } from "react-icons/lu";
import useGallery from "@/hooks/useGallery";
import EmptyState from "@/components/common/EmptyState";

export default function GalleryPreview() {
  const { galleryData, isLoading } = useGallery();
  const galleryItems = (galleryData?.data || []).slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F9E8A2]/60 text-[#5c4300] text-xs font-bold mb-2">
              <LuImage />
              <span>Campus Album</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a5f]">
              School Photo Gallery
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              Capturing memorable academic activities, cultural festivals, and student life
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#78A4CB] text-white font-semibold text-sm hover:bg-[#6894bb] transition-all shadow-sm shrink-0"
          >
            <span>View Full Gallery</span>
            <LuArrowRight />
          </Link>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="py-12 text-center text-gray-500 font-medium">
            Loading photo gallery...
          </div>
        ) : galleryItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item: any, idx: number) => (
              <div
                key={item._id || idx}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-gray-100"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102033]/90 via-[#102033]/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-[#F9E8A2] text-[#5c4300] text-xs font-bold mb-2">
                    {item.category || "Campus"}
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
          <EmptyState
            icon="image"
            title="No Gallery Photos Found"
            description="Our photo moments are currently being updated. Please visit again soon!"
            size="md"
          />
        )}
      </div>
    </section>
  );
}
