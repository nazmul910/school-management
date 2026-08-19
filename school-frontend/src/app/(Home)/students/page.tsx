"use client";

import { useEffect, useState } from "react";
import { LuUsers, LuSearch, LuGraduationCap, LuFilter } from "react-icons/lu";
import useStudent from "@/hooks/useStudent";
import EmptyState from "@/components/common/EmptyState";

const classes = [
  { id: "all", label: "All Classes" },
  { id: "Class 6", label: "Class 6" },
  { id: "Class 7", label: "Class 7" },
  { id: "Class 8", label: "Class 8" },
  { id: "Class 9", label: "Class 9" },
  { id: "Class 10", label: "Class 10" },
];

const groups = [
  { id: "all", label: "All Groups" },
  { id: "Science", label: "Science" },
  { id: "Humanities", label: "Humanities" },
  { id: "Business Studies", label: "Business Studies" },
];

const sections = [
  { id: "all", label: "All Sections" },
  { id: "A", label: "Section A" },
  { id: "B", label: "Section B" },
  { id: "C", label: "Section C" },
];

export default function StudentsPage() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { studentData, isLoading } = useStudent({
    class: selectedClass !== "all" ? selectedClass : undefined,
    group:
      selectedGroup !== "all" &&
      (selectedClass === "Class 9" || selectedClass === "Class 10")
        ? selectedGroup
        : undefined,
    section: selectedSection !== "all" ? selectedSection : undefined,
    searchTerm: searchTerm.trim() || undefined,
  });

  const students = studentData?.data || [];
  const isGroupVisible =
    selectedClass === "Class 9" || selectedClass === "Class 10";

  const totalPages = Math.ceil(students.length / ITEMS_PER_PAGE);
  const paginatedStudents = students.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedClass, selectedGroup, selectedSection, searchTerm]);

  const handleResetFilters = () => {
    setSelectedClass("all");
    setSelectedGroup("all");
    setSelectedSection("all");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-[#F3F8FC] py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#78A4CB] to-[#1e3a5f] p-8 md:p-12 rounded-3xl text-white shadow-xl mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 text-[#F9E8A2] rounded-full text-xs font-bold mb-3">
            <LuGraduationCap />
            <span>Student Directory</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Student Directory (Classes 6 – 10)
          </h1>
          <p className="text-sm md:text-base text-gray-200 mt-2 max-w-2xl">
            Search and filter enrolled students across classes, sections,
            academic study groups, and rolls.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#B4E1EB]/60 mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#1e3a5f]">
            <LuFilter className="text-[#78A4CB]" />
            <span>Filter & Search Records</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search student by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
              />
              <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Class Filter */}
            <div>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  if (
                    e.target.value !== "Class 9" &&
                    e.target.value !== "Class 10"
                  ) {
                    setSelectedGroup("all");
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white font-medium"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Filter */}
            <div>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white font-medium"
              >
                {sections.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Group Filter */}
            {isGroupVisible ? (
              <div>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#78A4CB] text-sm focus:outline-none bg-[#B4E1EB]/20 text-[#1e3a5f] font-semibold"
                >
                  {groups.map((grp) => (
                    <option key={grp.id} value={grp.id}>
                      {grp.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="hidden lg:flex items-center text-xs text-gray-400 font-medium px-3">
                (Group selection applies to Classes 9 & 10)
              </div>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <p>
            Total Students Found:{" "}
            <strong className="text-[#1e3a5f]">{students.length}</strong>
          </p>
        </div>

        {/* Student Cards Grid */}
        {isLoading ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm text-gray-500 font-medium">
            Loading students...
          </div>
        ) : students.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
              {paginatedStudents.map((student: any, idx: number) => (
                <div
                  key={student._id || idx}
                  className="group relative overflow-hidden rounded-[24px] bg-white border border-[#B4E1EB]/70 shadow-[0_8px_30px_rgba(30,58,95,0.06)] hover:shadow-[0_18px_45px_rgba(30,58,95,0.12)] transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Top Gradient */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-[#78A4CB]/20 via-[#B4E1EB]/20 to-transparent" />

                  {/* Decorative Circle */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#78A4CB]/10 group-hover:scale-125 transition-transform duration-500" />

                  <div className="relative p-5">
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-[#F3F8FC] flex items-center justify-center text-[#78A4CB]">
                          <LuGraduationCap size={17} />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                            Student
                          </p>
                          <p className="text-xs font-bold text-[#1e3a5f]">
                            {student.studentId || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Roll */}
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#1e3a5f] text-[#F9E8A2] text-[11px] font-bold shadow-sm">
                        Roll: {student.roll}
                      </span>
                    </div>

                    {/* Student Image - large rounded-square */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F3F8FC] border border-[#B4E1EB]/50 shadow-sm mb-4">
                      <img
                        src={
                          student.image ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt={student.name || "Student"}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#1e3a5f]/70 to-transparent" />
                    </div>

                    {/* Student Name */}
                    <div className="text-center">
                      <h3 className="text-[17px] font-extrabold text-[#1e3a5f] truncate group-hover:text-[#78A4CB] transition-colors duration-300">
                        {student.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-400 font-medium">
                        Student ID:{" "}
                        <span className="text-gray-500 font-semibold">
                          {student.studentId || "N/A"}
                        </span>
                      </p>
                    </div>

                    {/* Academic Information */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-2">
                        {/* Class */}
                        <div className="rounded-xl bg-[#F7FAFC] px-3 text-center py-2.5">
                          <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">
                            Class
                          </p>

                          <p className="mt-0.5 text-xs font-bold text-[#1e3a5f] truncate">
                            {student.class || "N/A"}
                          </p>
                        </div>

                        {/* Section */}
                        <div className="rounded-xl bg-[#F7FAFC] px-3 text-center py-2.5">
                          <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">
                            Section
                          </p>

                          <p className="mt-0.5 text-xs font-bold text-[#1e3a5f]">
                            {student.section || "A"}
                          </p>
                        </div>
                      </div>

                      {/* Group */}
                      {student.group && (
                        <div className="mt-2 flex items-center justify-between rounded-xl bg-[#B4E1EB]/15 border border-[#B4E1EB]/40 px-3 py-2.5">
                          <span className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">
                            Group
                          </span>

                          <span className="text-[11px] font-bold text-[#1e3a5f]">
                            {student.group}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#78A4CB] via-[#95BDD7] to-[#B4E1EB] opacity-80" />
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
            title="No Students Found"
            description="No student records match the selected filter criteria or search keyword."
            actionLabel="Reset All Filters"
            onAction={handleResetFilters}
            size="lg"
          />
        )}
      </div>
    </div>
  );
}