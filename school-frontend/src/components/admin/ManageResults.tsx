"use client";

import { useState } from "react";
import { FaAward, FaPlus, FaEdit, FaTrash, FaTrophy, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import useResults from "@/hooks/useResults";
import useStudent from "@/hooks/useStudent";

const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
const examTypes = ["Final Examination", "Half Yearly", "First Term"];
const examYears = ["2025", "2026"];

const defaultSubjects = [
  { subject: "Bangla", marks: 85 },
  { subject: "English", marks: 80 },
  { subject: "General Mathematics", marks: 90 },
  { subject: "Science / Physics", marks: 88 },
  { subject: "ICT", marks: 45 },
];

export default function ManageResults() {
  const [filterClass, setFilterClass] = useState("all");
  const [filterExam, setFilterExam] = useState("all");

  const { resultsData, isLoading, addResult, updateResult, deleteResult } = useResults({
    class: filterClass !== "all" ? filterClass : undefined,
    examType: filterExam !== "all" ? filterExam : undefined,
  });

  const { studentData } = useStudent();
  const allStudents = studentData?.data || [];
  const results = resultsData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    studentRoll: 1,
    studentImage: "",
    class: "Class 10",
    section: "A",
    group: "Science",
    examType: "Final Examination",
    examYear: "2025",
    subjectMarks: defaultSubjects,
    isFinalExam: true,
    isTop10Eligible: true,
  });

  const resetForm = () => {
    setFormData({
      studentName: "",
      studentId: "",
      studentRoll: 1,
      studentImage: "",
      class: "Class 10",
      section: "A",
      group: "Science",
      examType: "Final Examination",
      examYear: "2025",
      subjectMarks: defaultSubjects,
      isFinalExam: true,
      isTop10Eligible: true,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (resItem: any) => {
    setFormData({
      studentName: resItem.studentName || "",
      studentId: resItem.studentId || "",
      studentRoll: resItem.studentRoll || 1,
      studentImage: resItem.studentImage || "",
      class: resItem.class || "Class 10",
      section: resItem.section || "A",
      group: resItem.group || "",
      examType: resItem.examType || "Final Examination",
      examYear: resItem.examYear || "2025",
      subjectMarks: Array.isArray(resItem.subjectMarks) && resItem.subjectMarks.length > 0
        ? resItem.subjectMarks
        : defaultSubjects,
      isFinalExam: Boolean(resItem.isFinalExam),
      isTop10Eligible: Boolean(resItem.isTop10Eligible),
    });
    setIsEditing(true);
    setEditingId(resItem._id);
    setIsModalOpen(true);
  };

  const handleSelectStudent = (studentId: string) => {
    const found = allStudents.find((s: any) => s._id === studentId);
    if (found) {
      setFormData((prev) => ({
        ...prev,
        studentName: found.name,
        studentId: found.studentId,
        studentRoll: found.roll,
        studentImage: found.image || "",
        class: found.class,
        section: found.section || "A",
        group: found.group || "",
      }));
    }
  };

  const handleSubjectMarkChange = (index: number, markVal: number) => {
    setFormData((prev) => {
      const nextSubjects = [...prev.subjectMarks];
      nextSubjects[index] = { ...nextSubjects[index], marks: markVal };
      return { ...prev, subjectMarks: nextSubjects };
    });
  };

  const handleAddSubjectRow = () => {
    setFormData((prev) => ({
      ...prev,
      subjectMarks: [...prev.subjectMarks, { subject: "New Subject", marks: 80 }],
    }));
  };

  const handleRemoveSubjectRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      subjectMarks: prev.subjectMarks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      studentRoll: Number(formData.studentRoll),
      subjectMarks: formData.subjectMarks.map((s) => ({
        ...s,
        marks: Number(s.marks),
      })),
    };

    if (isEditing && editingId) {
      updateResult.mutate(
        { id: editingId, payload },
        {
          onSuccess: () => {
            Swal.fire("Success", "Result updated successfully.", "success");
            setIsModalOpen(false);
            resetForm();
          },
          onError: (err: any) => {
            Swal.fire("Error", err?.response?.data?.message || "Update failed.", "error");
          },
        }
      );
    } else {
      addResult.mutate(payload, {
        onSuccess: () => {
          Swal.fire("Success", "Result saved successfully.", "success");
          setIsModalOpen(false);
          resetForm();
        },
        onError: (err: any) => {
          Swal.fire("Error", err?.response?.data?.message || "Could not save result.", "error");
        },
      });
    }
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Result for student "${name}" will be permanently deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#78A4CB",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteResult.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Result has been deleted successfully.", "success");
          },
        });
      }
    });
  };

  const handleToggleTop10 = (item: any) => {
    const updatedStatus = !item.isTop10Eligible;
    updateResult.mutate({
      id: item._id,
      payload: { isTop10Eligible: updatedStatus },
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1e3a5f] flex items-center gap-2.5">
            <FaAward className="text-[#78A4CB]" />
            <span>Results & Top 10 Management</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Enter exam results, calculate marks, and manage the Top 10 merit list.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        >
          <FaPlus />
          <span>Add New Result</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#B4E1EB]/60 flex flex-wrap items-center gap-4">
        <div>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
          >
            <option value="all">All Classes</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={filterExam}
            onChange={(e) => setFilterExam(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
          >
            <option value="all">All Exams</option>
            {examTypes.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#B4E1EB]/60 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-[#1e3a5f]">Results List ({results.length} total)</h2>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium">Loading...</div>
        ) : results.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1e3a5f] text-white text-xs uppercase tracking-wider">
                  <th className="p-4 text-center">Rank</th>
                  <th className="p-4">Student</th>
                  <th className="p-4 text-center">Class & Roll</th>
                  <th className="p-4 text-center">Exam & Year</th>
                  <th className="p-4 text-center">Total Marks</th>
                  <th className="p-4 text-center">GPA</th>
                  <th className="p-4 text-center">Grade</th>
                  <th className="p-4 text-center">Top 10 Flag</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((item: any) => (
                  <tr key={item._id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="p-4 text-center font-extrabold text-[#78A4CB]">
                      #{item.position}
                    </td>
                    <td className="p-4">
                      <strong className="text-[#1e3a5f] font-bold block">{item.studentName}</strong>
                      <span className="text-xs text-gray-400 font-mono">{item.studentId}</span>
                    </td>
                    <td className="p-4 text-center text-xs text-gray-700">
                      <strong>{item.class}</strong> (Roll: {item.studentRoll})
                    </td>
                    <td className="p-4 text-center text-xs text-gray-600">
                      {item.examType} ({item.examYear})
                    </td>
                    <td className="p-4 text-center font-bold text-[#1e3a5f] text-base">{item.totalMarks}</td>
                    <td className="p-4 text-center font-bold text-emerald-600 text-base">{item.gpa?.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-0.5 rounded bg-[#F9E8A2] text-[#5c4300] font-bold text-xs">
                        {item.grade}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleTop10(item)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                          item.isTop10Eligible
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {item.isTop10Eligible ? <FaCheckCircle /> : <FaTimesCircle />}
                        <span>{item.isTop10Eligible ? "Top 10 Active" : "Inactive"}</span>
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer text-xs"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, item.studentName)}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer text-xs"
                          title="Delete"
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
          <div className="p-12 text-center text-gray-500 font-medium">No results found.</div>
        )}
      </div>

      {/* Add / Edit Result Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl my-8">
            <div className="p-6 bg-[#1e3a5f] text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEditing ? "Edit Result" : "Add New Result Entry"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-300 hover:text-white cursor-pointer">
                <ImCross size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Quick Select Student */}
              {!isEditing && allStudents.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#B4E1EB]/30 border border-[#95BDD7]/50">
                  <label className="block text-xs font-bold text-[#1e3a5f] mb-1">
                    Select Student from List (Auto Fill):
                  </label>
                  <select
                    onChange={(e) => handleSelectStudent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
                  >
                    <option value="">-- Select a student --</option>
                    {allStudents.map((s: any) => (
                      <option key={s._id} value={s._id}>
                        {s.name} (Roll: {s.roll}, Class: {s.class})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Student Name *</label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    required
                    placeholder="Enter name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Roll */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Roll Number *</label>
                  <input
                    type="number"
                    value={formData.studentRoll}
                    onChange={(e) => setFormData({ ...formData, studentRoll: Number(e.target.value) })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Class *</label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
                  >
                    {classes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Section */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Section</label>
                  <input
                    type="text"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    placeholder="A"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Group */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Group / Division</label>
                  <input
                    type="text"
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    placeholder="Science / Humanities / Business"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Student ID */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Student ID</label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="STU-2025-001"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Exam Type */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Exam Type *</label>
                  <select
                    value={formData.examType}
                    onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
                  >
                    {examTypes.map((ext) => (
                      <option key={ext} value={ext}>
                        {ext}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Exam Year */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Exam Year *</label>
                  <select
                    value={formData.examYear}
                    onChange={(e) => setFormData({ ...formData, examYear: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
                  >
                    {examYears.map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject-Wise Marks Grid */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700">Subject-wise Marks *</label>
                  <button
                    type="button"
                    onClick={handleAddSubjectRow}
                    className="text-xs font-bold text-[#78A4CB] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <FaPlus size={10} /> Add Subject
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-2xl border border-gray-200">
                  {formData.subjectMarks.map((sm, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={sm.subject}
                        onChange={(e) => {
                          const n = [...formData.subjectMarks];
                          n[i].subject = e.target.value;
                          setFormData({ ...formData, subjectMarks: n });
                        }}
                        placeholder="Subject name"
                        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={sm.marks}
                        onChange={(e) => handleSubjectMarkChange(i, Number(e.target.value))}
                        placeholder="Marks"
                        className="w-24 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none text-center font-bold"
                      />
                      {formData.subjectMarks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSubjectRow(i)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg text-xs cursor-pointer"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Exam Top 10 Eligibility Flag */}
              <div className="p-4 rounded-2xl bg-[#F9E8A2]/30 border border-amber-300 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#5c4300] flex items-center gap-1.5">
                    <FaTrophy />
                    <span>Top 10 Eligibility Flag</span>
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    When active, this student will automatically appear in the class Top 10 merit list.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isTop10Eligible}
                  onChange={(e) => setFormData({ ...formData, isTop10Eligible: e.target.checked })}
                  className="w-5 h-5 text-[#78A4CB] rounded focus:ring-0 cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
