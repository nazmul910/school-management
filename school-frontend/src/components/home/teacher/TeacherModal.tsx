"use client";

import { useEffect } from "react";
import { LuX, LuPhone, LuBookOpen, LuGraduationCap, LuUsers } from "react-icons/lu";

interface TeacherModalProps {
  teacher: any;
  onClose: () => void;
}

export default function TeacherModal({ teacher, onClose }: TeacherModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!teacher) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl animate-[popIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-[#1e3a5f] shadow-md cursor-pointer transition-all duration-300 hover:bg-[#1e3a5f] hover:text-white hover:rotate-90 hover:scale-110"
        >
          <LuX size={18} />
        </button>

        {/* Header Image */}
        <div className="relative aspect-[16/9] bg-gray-100">
          <img
            src={
              teacher.profileImage ||
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
            }
            alt={teacher.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/90 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 text-white">
            <span className="inline-block px-3 py-1 bg-[#F9E8A2] text-[#1e3a5f] text-xs font-bold rounded-lg mb-2">
              {teacher.designation}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold">{teacher.name}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-5">
          {teacher.department && (
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <LuUsers className="text-[#78A4CB]" />
              Department: <span className="text-[#1e3a5f] font-semibold">{teacher.department}</span>
            </div>
          )}

          {teacher.education && (
            <div className="bg-[#F3F8FC] p-4 rounded-2xl border border-[#B4E1EB]/60">
              <p className="flex items-center gap-2 font-semibold text-[#1e3a5f] mb-1.5 text-sm">
                <LuGraduationCap className="text-[#78A4CB]" />
                Education & Qualifications
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{teacher.education}</p>
            </div>
          )}

          {teacher.subject?.length > 0 && (
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-[#1e3a5f] mb-2">
                <LuBookOpen className="text-[#78A4CB]" />
                Subjects Taught
              </p>
              <div className="flex flex-wrap gap-2">
                {teacher.subject.map((sub: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-[#B4E1EB]/40 text-[#1e3a5f] text-xs font-semibold"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}

          {teacher.classes?.length > 0 && (
            <div className="text-sm text-gray-600">
              <span className="text-gray-400">Classes: </span>
              <strong className="text-[#1e3a5f]">{teacher.classes.join(", ")}</strong>
            </div>
          )}

          {teacher.bio && (
            <p className="text-sm text-gray-500 italic border-t border-gray-100 pt-4">
              "{teacher.bio}"
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              <LuPhone className="text-[#78A4CB]" /> {teacher.number}
            </span>
            <span className="text-sm font-semibold text-[#78A4CB]">
              Exp: {teacher.experience || "Experienced"}
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}