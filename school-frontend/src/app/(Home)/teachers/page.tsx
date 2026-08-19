"use client";

import { useEffect, useState } from "react";
import { LuSchool, LuPhone, LuSearch, LuBookOpen } from "react-icons/lu";
import useTeachers from "@/hooks/useTeachers";
import EmptyState from "@/components/common/EmptyState";
import TeacherModal from "@/components/home/teacher/TeacherModal";

export default function TeachersPage() {
  const { teachersData, isLoading } = useTeachers();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const teachers = teachersData?.data || [];

  const filteredTeachers = teachers.filter((t: any) => {
    const matchesSearch =
      t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject?.some((s: string) =>
        s.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesDept = selectedDept === "all" || t.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const totalPages = Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE);
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDept]);

  return (
    <div className="min-h-screen bg-[#F3F8FC] py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] p-8 md:p-12 rounded-3xl text-white shadow-xl mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 text-[#F9E8A2] rounded-full text-xs font-bold mb-3">
              <LuSchool />
              <span>Faculty Directory</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Distinguished Faculty & Instructors
            </h1>
            <p className="text-sm md:text-base text-gray-200 mt-2 max-w-2xl">
              Meet our team of experienced, highly educated, and dedicated
              teachers committed to guiding every student to academic
              excellence.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              placeholder="Search teacher by name or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-800 text-sm focus:outline-none shadow-md placeholder:text-gray-400"
            />
            <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Teachers Grid */}
        {isLoading ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm text-gray-500 font-medium">
            Loading faculty members...
          </div>
        ) : filteredTeachers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedTeachers.map((teacher: any, idx: number) => (
                <div
                  key={teacher._id || idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#B4E1EB]/60 flex flex-col justify-between group"
                >
                  <div>
                    {/* Photo & Designation */}
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img
                        src={
                          teacher.profileImage ||
                          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                        }
                        alt={teacher.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-[#1e3a5f]/95 text-[#F9E8A2] text-xs font-bold rounded-lg shadow-sm">
                        {teacher.designation}
                      </div>
                    </div>

                    {/* Teacher Content */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-bold text-lg text-[#1e3a5f] group-hover:text-[#78A4CB] transition-colors">
                          {teacher.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                          {teacher.department
                            ? `Department: ${teacher.department}`
                            : "General"}
                        </p>
                      </div>

                      <div className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                        <p className="font-semibold text-[#1e3a5f] mb-0.5">
                          Education & Qualifications:
                        </p>
                        <p className="line-clamp-2">{teacher.education}</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer contact */}
                  <div className="p-4 px-5 bg-[#F3F8FC] border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <LuPhone className="text-[#78A4CB]" /> {teacher.number}
                      </span>
                      <span className="font-semibold text-[#78A4CB]">
                        Exp: {teacher.experience || "Experienced"}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedTeacher(teacher)}
                      className="w-full py-2 rounded-xl bg-[#1e3a5f] text-white text-xs font-bold cursor-pointer transition-all duration-300 hover:bg-[#78A4CB] hover:shadow-md hover:-translate-y-0.5"
                    >
                      More Info
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl bg-white border border-[#B4E1EB] text-[#1e3a5f] text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-[#1e3a5f] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#1e3a5f]"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 ${
                      currentPage === page
                        ? "bg-[#1e3a5f] text-white shadow-md"
                        : "bg-white border border-[#B4E1EB] text-[#1e3a5f] hover:bg-[#B4E1EB]/40"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl bg-white border border-[#B4E1EB] text-[#1e3a5f] text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-[#1e3a5f] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#1e3a5f]"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon="users"
            title="No Teachers Found"
            description={
              searchTerm
                ? `No teachers found matching "${searchTerm}". Try another search keyword.`
                : "No teacher records are available right now."
            }
            actionLabel={searchTerm ? "Reset Search" : undefined}
            onAction={searchTerm ? () => setSearchTerm("") : undefined}
            size="lg"
          />
        )}
      </div>
      {selectedTeacher && (
        <TeacherModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
    </div>
  );
}