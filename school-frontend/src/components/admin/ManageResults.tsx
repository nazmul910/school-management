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
  { subject: "বাংলা", marks: 85 },
  { subject: "ইংরেজি", marks: 80 },
  { subject: "সাধারণ গণিত", marks: 90 },
  { subject: "বিজ্ঞান / পদার্থবিজ্ঞান", marks: 88 },
  { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", marks: 45 },
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

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
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

  // Select a student from database dropdown to auto-fill details
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
      subjectMarks: [...prev.subjectMarks, { subject: "নতুন বিষয়", marks: 80 }],
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
            Swal.fire("সফল", "ফলাফল সফলভাবে আপডেট হয়েছে।", "success");
            setIsModalOpen(false);
            resetForm();
          },
          onError: (err: any) => {
            Swal.fire("ত্রুটি", err?.response?.data?.message || "আপডেট ব্যর্থ হয়েছে।", "error");
          },
        }
      );
    } else {
      addResult.mutate(payload, {
        onSuccess: () => {
          Swal.fire("সফল", "ফলাফল সফলভাবে সংরক্ষণ করা হয়েছে।", "success");
          setIsModalOpen(false);
          resetForm();
        },
        onError: (err: any) => {
          Swal.fire("ত্রুটি", err?.response?.data?.message || "সংরক্ষণ করা সম্ভব হয়নি।", "error");
        },
      });
    }
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `শিক্ষার্থী "${name}" এর ফলাফল মুছে ফেলা হবে!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#78A4CB",
      confirmButtonText: "হ্যাঁ, মুছুন",
      cancelButtonText: "বাতিল",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteResult.mutate(id, {
          onSuccess: () => {
            Swal.fire("মুছে ফেলা হয়েছে!", "ফলাফল সফলভাবে ডিলিট হয়েছে।", "success");
          },
        });
      }
    });
  };

  // Toggle Top 10 flag directly from table
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
            <span>ফলাফল ও সেরা ১০ ব্যবস্থাপনা (Result & Top 10)</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            বার্ষিক ও অন্যান্য পরীক্ষার ফলাফল এন্ট্রি, নম্বর হিসাব এবং সেরা ১০ মেধা তালিকা নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all shrink-0"
        >
          <FaPlus />
          <span>নতুন ফলাফল যোগ করুন</span>
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
            <option value="all">সকল শ্রেণি</option>
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
            <option value="all">সকল পরীক্ষা</option>
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
          <h2 className="font-bold text-lg text-[#1e3a5f]">ফলাফল তালিকা ({results.length} টি)</h2>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium">লোড হচ্ছে...</div>
        ) : results.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1e3a5f] text-white text-xs uppercase tracking-wider">
                  <th className="p-4 text-center">মেধাক্রম</th>
                  <th className="p-4">শিক্ষার্থী</th>
                  <th className="p-4 text-center">শ্রেণি ও রোল</th>
                  <th className="p-4 text-center">পরীক্ষা ও সন</th>
                  <th className="p-4 text-center">মোট নম্বর</th>
                  <th className="p-4 text-center">জিপিএ</th>
                  <th className="p-4 text-center">গ্রেড</th>
                  <th className="p-4 text-center">টপ ১০ ফ্ল্যাগ</th>
                  <th className="p-4 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((item: any) => (
                  <tr key={item._id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="p-4 text-center font-extrabold text-[#78A4CB]">
                      {item.position}ম
                    </td>
                    <td className="p-4">
                      <strong className="text-[#1e3a5f] font-bold block">{item.studentName}</strong>
                      <span className="text-xs text-gray-400 font-mono">{item.studentId}</span>
                    </td>
                    <td className="p-4 text-center text-xs text-gray-700">
                      <strong>{item.class}</strong> (রোল: {item.studentRoll})
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
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          item.isTop10Eligible
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {item.isTop10Eligible ? <FaCheckCircle /> : <FaTimesCircle />}
                        <span>{item.isTop10Eligible ? "টপ ১০ সক্রিয়" : "নিষ্ক্রিয়"}</span>
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                          title="সম্পাদনা"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id, item.studentName)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                          title="মুছুন"
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
          <div className="p-12 text-center text-gray-500 font-medium">কোনো ফলাফল পাওয়া যায়নি।</div>
        )}
      </div>

      {/* Add / Edit Result Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl my-8">
            <div className="p-6 bg-[#1e3a5f] text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEditing ? "ফলাফল সম্পাদন করুন" : "নতুন ফলাফল এন্ট্রি করুন"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-300 hover:text-white">
                <ImCross size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Quick Select Student */}
              {!isEditing && allStudents.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#B4E1EB]/30 border border-[#95BDD7]/50">
                  <label className="block text-xs font-bold text-[#1e3a5f] mb-1">
                    শিক্ষার্থী তালিকা থেকে নির্বাচন করুন (Auto Fill):
                  </label>
                  <select
                    onChange={(e) => handleSelectStudent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
                  >
                    <option value="">-- শিক্ষার্থী নির্বাচন করুন --</option>
                    {allStudents.map((s: any) => (
                      <option key={s._id} value={s._id}>
                        {s.name} (রোল: {s.roll}, শ্রেণি: {s.class})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">শিক্ষার্থীর নাম *</label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    required
                    placeholder="নাম লিখুন"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Roll */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">রোল নম্বর *</label>
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">শ্রেণি *</label>
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">শাখা</label>
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">বিভাগ (গ্রুপ)</label>
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">শিক্ষার্থী আইডি</label>
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">পরীক্ষার ধরন *</label>
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">পরীক্ষার সন *</label>
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
                  <label className="text-xs font-bold text-gray-700">বিষয়ভিত্তিক প্রাপ্ত নম্বর *</label>
                  <button
                    type="button"
                    onClick={handleAddSubjectRow}
                    className="text-xs font-bold text-[#78A4CB] hover:underline flex items-center gap-1"
                  >
                    <FaPlus size={10} /> বিষয় যোগ করুন
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
                        placeholder="বিষয়ের নাম"
                        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={sm.marks}
                        onChange={(e) => handleSubjectMarkChange(i, Number(e.target.value))}
                        placeholder="নম্বর"
                        className="w-24 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none text-center font-bold"
                      />
                      {formData.subjectMarks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSubjectRow(i)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg text-xs"
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
                    <span>বার্ষিক পরীক্ষা সেরা ১০ ফ্ল্যাগ (Top 10 Flag)</span>
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    সক্রিয় থাকলে এই শিক্ষার্থী স্বয়ংক্রিয়ভাবে শ্রেণির টপ ১০ মেধা তালিকায় স্থান পাবে।
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
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md"
                >
                  {isEditing ? "আপডেট করুন" : "সংরক্ষণ করুন"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
