"use client";

import { useState } from "react";
import { FaUserGraduate, FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import useStudent from "@/hooks/useStudent";
import useAxios from "@/hooks/useAxios";
import ImageUploadField from "@/components/admin/ImageUploadField";

const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
const groups = ["Science", "Humanities", "Business Studies"];
const sections = ["A", "B", "C", "D"];

export default function ManageStudents() {
  const axios = useAxios();
  const [filterClass, setFilterClass] = useState("all");
  const [filterSection, setFilterSection] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { studentData, isLoading, addStudent, updateStudent, deleteStudent } = useStudent({
    class: filterClass !== "all" ? filterClass : undefined,
    section: filterSection !== "all" ? filterSection : undefined,
    searchTerm: searchTerm.trim() || undefined,
  });

  const students = studentData?.data || [];

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    roll: 1,
    class: "Class 6",
    section: "A",
    group: "",
    image: "",
    fatherName: "",
    motherName: "",
    contact: "",
    address: "",
    dob: "",
    gender: "male",
    admissionDate: new Date().toISOString().split("T")[0],
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      studentId: "",
      roll: (students.length % 50) + 1,
      class: "Class 6",
      section: "A",
      group: "",
      image: "",
      fatherName: "",
      motherName: "",
      contact: "",
      address: "",
      dob: "",
      gender: "male",
      admissionDate: new Date().toISOString().split("T")[0],
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student: any) => {
    setFormData({
      name: student.name || "",
      studentId: student.studentId || "",
      roll: student.roll || 1,
      class: student.class || "Class 6",
      section: student.section || "A",
      group: student.group || "",
      image: student.image || "",
      fatherName: student.fatherName || "",
      motherName: student.motherName || "",
      contact: student.contact || "",
      address: student.address || "",
      dob: student.dob || "",
      gender: student.gender || "male",
      admissionDate: student.admissionDate || new Date().toISOString().split("T")[0],
    });
    setIsEditing(true);
    setEditingId(student._id);
    setIsModalOpen(true);
  };

  // Image Upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await axios.post("/upload", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.data?.url) {
        setFormData((prev) => ({ ...prev, image: res.data.data.url }));
        Swal.fire({
          icon: "success",
          title: "ছবি আপলোড সম্পন্ন",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "আপলোড ব্যর্থ",
        text: "ছবি আপলোড করা যায়নি।",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Condition: If class is 6, 7, 8 -> clear group
    const payload = {
      ...formData,
      roll: Number(formData.roll),
      group: (formData.class === "Class 9" || formData.class === "Class 10") ? formData.group : "",
    };

    if (isEditing && editingId) {
      updateStudent.mutate(
        { id: editingId, payload },
        {
          onSuccess: () => {
            Swal.fire({
              icon: "success",
              title: "সফল",
              text: "শিক্ষার্থীর তথ্য সফলভাবে আপডেট করা হয়েছে।",
              confirmButtonColor: "#78A4CB",
            });
            setIsModalOpen(false);
            resetForm();
          },
          onError: (err: any) => {
            Swal.fire({
              icon: "error",
              title: "ত্রুটি",
              text: err?.response?.data?.message || "আপডেট ব্যর্থ হয়েছে।",
            });
          },
        }
      );
    } else {
      addStudent.mutate(payload, {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "সফল",
            text: "নতুন শিক্ষার্থী সফলভাবে যুক্ত করা হয়েছে।",
            confirmButtonColor: "#78A4CB",
          });
          setIsModalOpen(false);
          resetForm();
        },
        onError: (err: any) => {
          Swal.fire({
            icon: "error",
            title: "ত্রুটি",
            text: err?.response?.data?.message || "শিক্ষার্থী যুক্ত করা যায়নি।",
          });
        },
      });
    }
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `শিক্ষার্থী "${name}" এর তথ্য মুছে ফেলা হবে!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#78A4CB",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন",
      cancelButtonText: "বাতিল",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteStudent.mutate(id, {
          onSuccess: () => {
            Swal.fire("মুছে ফেলা হয়েছে!", "শিক্ষার্থীর তথ্য সফলভাবে ডিলিট হয়েছে।", "success");
          },
        });
      }
    });
  };

  // Important UI behavior: Show group only for Class 9 and Class 10
  const showGroupSelect = formData.class === "Class 9" || formData.class === "Class 10";

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Title & Add Button */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1e3a5f] flex items-center gap-2.5">
            <FaUserGraduate className="text-[#78A4CB]" />
            <span>শিক্ষার্থী ব্যবস্থাপনা (Student Management)</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            ৬ষ্ঠ থেকে ১০ম শ্রেণির সকল শিক্ষার্থীর তথ্য যুক্ত, সম্পাদন ও নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        >
          <FaPlus />
          <span>নতুন শিক্ষার্থী যোগ করুন</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#B4E1EB]/60 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            placeholder="শিক্ষার্থীর নাম / আইডি দিয়ে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
          />
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
        </div>

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
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
          >
            <option value="all">সকল শাখা</option>
            {sections.map((s) => (
              <option key={s} value={s}>
                শাখা {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#B4E1EB]/60 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-[#1e3a5f]">শিক্ষার্থী তালিকা ({students.length} জন)</h2>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium">লোড হচ্ছে...</div>
        ) : students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1e3a5f] text-white text-xs uppercase tracking-wider">
                  <th className="p-4">শিক্ষার্থী</th>
                  <th className="p-4 text-center">রোল</th>
                  <th className="p-4 text-center">শ্রেণি ও শাখা</th>
                  <th className="p-4 text-center">গ্রুপ (বিভাগ)</th>
                  <th className="p-4">পিতার নাম</th>
                  <th className="p-4">যোগাযোগ</th>
                  <th className="p-4 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student: any) => (
                  <tr key={student._id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#78A4CB] bg-gray-100 shrink-0">
                          <img
                            src={student.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"}
                            alt={student.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <strong className="text-[#1e3a5f] font-bold block">{student.name}</strong>
                          <span className="text-xs text-gray-400 font-mono">{student.studentId}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center font-bold text-gray-800">{student.roll}</td>
                    <td className="p-4 text-center text-gray-700">
                      {student.class} ({student.section || "A"})
                    </td>
                    <td className="p-4 text-center">
                      {student.group ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#B4E1EB]/40 text-[#1e3a5f] font-bold text-xs">
                          {student.group}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-600">{student.fatherName || "—"}</td>
                    <td className="p-4 text-gray-600">{student.contact || "—"}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer text-xs"
                          title="সম্পাদনা করুন"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(student._id, student.name)}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer text-xs"
                          title="মুছে ফেলুন"
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
          <div className="p-12 text-center text-gray-500 font-medium">কোনো শিক্ষার্থী পাওয়া যায়নি।</div>
        )}
      </div>

      {/* Add / Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl my-8">
            {/* Modal Header */}
            <div className="p-6 bg-[#1e3a5f] text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEditing ? "শিক্ষার্থীর তথ্য সম্পাদন করুন" : "নতুন শিক্ষার্থী যুক্ত করুন"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-300 hover:text-white"
              >
                <ImCross size={14} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">শিক্ষার্থীর পূর্ণ নাম *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="যেমন: আসিফ ইকবাল"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Roll */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">রোল নম্বর *</label>
                  <input
                    type="number"
                    value={formData.roll}
                    onChange={(e) => setFormData({ ...formData, roll: Number(e.target.value) })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">শ্রেণি (Class) *</label>
                  <select
                    value={formData.class}
                    onChange={(e) => {
                      const newClass = e.target.value;
                      setFormData({
                        ...formData,
                        class: newClass,
                        group: (newClass === "Class 9" || newClass === "Class 10") ? (formData.group || "Science") : "",
                      });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white font-medium"
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">শাখা (Section) *</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white font-medium"
                  >
                    {sections.map((s) => (
                      <option key={s} value={s}>
                        শাখা {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Conditional Group Field (ONLY for Class 9 and Class 10) */}
                {showGroupSelect && (
                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#F9E8A2]/30 border-2 border-amber-300">
                    <label className="block text-xs font-extrabold text-[#5c4300] mb-1">
                      বিভাগ / গ্রুপ নির্বাচন করুন (৯ম ও ১০ম শ্রেণির জন্য প্রযোজ্য) *
                    </label>
                    <select
                      value={formData.group || "Science"}
                      onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                      required={showGroupSelect}
                      className="w-full px-4 py-2.5 rounded-xl border border-amber-400 text-sm focus:outline-none bg-white font-bold text-[#1e3a5f]"
                    >
                      <option value="Science">বিজ্ঞান (Science)</option>
                      <option value="Humanities">মানবিক (Humanities)</option>
                      <option value="Business Studies">ব্যবসায় শিক্ষা (Business Studies)</option>
                    </select>
                  </div>
                )}

                {/* Student ID */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">শিক্ষার্থী আইডি (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="খালি রাখলে স্বয়ংক্রিয় তৈরি হবে"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">অভিভাবকের ফোন নম্বর</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="০১৭xxxxxxxx"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Father's Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">পিতার নাম</label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    placeholder="পিতার নাম"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Mother's Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">মাতার নাম</label>
                  <input
                    type="text"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    placeholder="মাতার নাম"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">জন্ম তারিখ</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">লিঙ্গ *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
                  >
                    <option value="male">ছাত্র (Male)</option>
                    <option value="female">ছাত্রী (Female)</option>
                    <option value="other">অন্যান্য (Other)</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">বর্তমান ঠিকানা</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="ঠিকানা"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                />
              </div>

              {/* Student Image Upload - Modern Field */}
              <ImageUploadField
                label="শিক্ষার্থীর ছবি"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                uploading={uploadingImage}
                onFileUpload={async (file) => {
                  setUploadingImage(true);
                  try {
                    const body = new FormData();
                    body.append("file", file);
                    body.append("folder", "school_students");
                    const res = await axios.post("/upload", body, {
                      headers: { "Content-Type": "multipart/form-data" },
                    });
                    if (res.data?.data?.url) {
                      setFormData((prev) => ({ ...prev, image: res.data.data.url }));
                    }
                  } catch {
                    /* handled by parent error */ 
                  } finally {
                    setUploadingImage(false);
                  }
                }}
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
