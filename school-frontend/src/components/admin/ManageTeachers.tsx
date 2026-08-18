"use client";

import { useState } from "react";
import { FaChalkboardTeacher, FaPlus, FaEdit, FaTrash, FaPhone } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import useTeachers from "@/hooks/useTeachers";
import useAxios from "@/hooks/useAxios";

import ImageUploadField from "./ImageUploadField";

const availableSubjects = [
  "Bangla 1st Paper",
  "Bangla 2nd Paper",
  "English 1st Paper",
  "English 2nd Paper",
  "General Mathematics",
  "Higher Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "General Science",
  "Bangladesh & Global Studies",
  "Information & Communication Technology (ICT)",
  "Accounting",
  "Business Entrepreneurship",
  "Finance & Banking",
  "Islam & Moral Education",
  "Physical Education & Health",
  "Arts & Crafts",
];

const availableClasses = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

export default function ManageTeachers() {
  const axios = useAxios();
  const { teachersData, isLoading, addTeacher, updateTeacher, deleteTeacher } = useTeachers();
  const teachers = teachersData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    teacherId: "",
    email: "",
    number: "",
    designation: "Assistant Teacher",
    department: "General",
    education: "",
    experience: "3+ years",
    subject: ["General Mathematics"],
    classes: ["Class 8", "Class 9", "Class 10"],
    gender: "male",
    profileImage: "",
    joiningDate: "",
    bio: "",
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      teacherId: "",
      email: "",
      number: "",
      designation: "Assistant Teacher",
      department: "General",
      education: "",
      experience: "3+ years",
      subject: ["General Mathematics"],
      classes: ["Class 8", "Class 9", "Class 10"],
      gender: "male",
      profileImage: "",
      joiningDate: "",
      bio: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (teacher: any) => {
    setFormData({
      name: teacher.name || "",
      teacherId: teacher.teacherId || "",
      email: teacher.email || "",
      number: teacher.number || "",
      designation: teacher.designation || "Assistant Teacher",
      department: teacher.department || "General",
      education: teacher.education || "",
      experience: teacher.experience || "3+ years",
      subject: Array.isArray(teacher.subject) ? teacher.subject : [],
      classes: Array.isArray(teacher.classes) ? teacher.classes : ["Class 8", "Class 9", "Class 10"],
      gender: teacher.gender || "male",
      profileImage: teacher.profileImage || "",
      joiningDate: teacher.joiningDate || "",
      bio: teacher.bio || "",
    });
    setIsEditing(true);
    setEditingId(teacher._id);
    setIsModalOpen(true);
  };

  const handleToggleSubject = (sub: string) => {
    setFormData((prev) => {
      const exists = prev.subject.includes(sub);
      const nextSubjects = exists
        ? prev.subject.filter((s) => s !== sub)
        : [...prev.subject, sub];
      return { ...prev, subject: nextSubjects };
    });
  };

  const handleToggleClass = (cls: string) => {
    setFormData((prev) => {
      const exists = prev.classes.includes(cls);
      const nextClasses = exists
        ? prev.classes.filter((c) => c !== cls)
        : [...prev.classes, cls];
      return { ...prev, classes: nextClasses };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.subject.length === 0) {
      Swal.fire("Warning", "Please select at least one teaching subject.", "warning");
      return;
    }

    if (isEditing && editingId) {
      updateTeacher.mutate(
        { id: editingId, payload: formData },
        {
          onSuccess: () => {
            Swal.fire("Success", "Teacher information updated successfully.", "success");
            setIsModalOpen(false);
            resetForm();
          },
          onError: (err: any) => {
            Swal.fire("Error", err?.response?.data?.message || "Update failed.", "error");
          },
        }
      );
    } else {
      addTeacher.mutate(formData, {
        onSuccess: () => {
          Swal.fire("Success", "New teacher added successfully.", "success");
          setIsModalOpen(false);
          resetForm();
        },
        onError: (err: any) => {
          Swal.fire("Error", err?.response?.data?.message || "Could not add teacher.", "error");
        },
      });
    }
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Teacher "${name}" will be permanently deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#78A4CB",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteTeacher.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Teacher record has been deleted successfully.", "success");
          },
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1e3a5f] flex items-center gap-2.5">
            <FaChalkboardTeacher className="text-[#78A4CB]" />
            <span>Teacher Management</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Manage all teachers, their designations, subjects, and assigned classes.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        >
          <FaPlus />
          <span>Add New Teacher</span>
        </button>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#B4E1EB]/60 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-[#1e3a5f]">Teacher List ({teachers.length} total)</h2>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium">Loading...</div>
        ) : teachers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1e3a5f] text-white text-xs uppercase tracking-wider">
                  <th className="p-4">Teacher</th>
                  <th className="p-4">Designation & Department</th>
                  <th className="p-4">Education</th>
                  <th className="p-4">Subjects</th>
                  <th className="p-4">Classes</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {teachers.map((teacher: any) => (
                  <tr key={teacher._id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#78A4CB] bg-gray-100 shrink-0">
                          <img
                            src={teacher.profileImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80"}
                            alt={teacher.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <strong className="text-[#1e3a5f] font-bold block">{teacher.name}</strong>
                          <span className="text-xs text-gray-400 font-mono">{teacher.teacherId}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#B4E1EB]/40 text-[#1e3a5f] font-bold text-xs">
                        {teacher.designation}
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">{teacher.department || "General"}</p>
                    </td>
                    <td className="p-4 text-gray-600 text-xs max-w-[180px] truncate">{teacher.education}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {(teacher.subject || []).map((sub: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-[11px] font-medium text-gray-700">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-xs font-semibold text-gray-700">
                      {teacher.classes?.join(", ") || "—"}
                    </td>
                    <td className="p-4 text-xs text-gray-600">
                      <p className="flex items-center gap-1"><FaPhone className="text-[#78A4CB]" /> {teacher.number}</p>
                      <p className="text-gray-400 font-mono text-[11px]">{teacher.email}</p>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(teacher)}
                          className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer text-xs"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(teacher._id, teacher.name)}
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
          <div className="p-12 text-center text-gray-500 font-medium">No teachers found.</div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl my-8">
            <div className="p-6 bg-[#1e3a5f] text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEditing ? "Edit Teacher Information" : "Add New Teacher"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-300 hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <ImCross size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Teacher Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Muhammad Shafiqur Rahman"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Designation *</label>
                  <select
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium cursor-pointer"
                  >
                    <option value="Principal">Principal</option>
                    <option value="Assistant Head Teacher">Assistant Head Teacher</option>
                    <option value="Assistant Teacher">Assistant Teacher</option>
                    <option value="Senior Teacher">Senior Teacher</option>
                    <option value="Junior Teacher">Junior Teacher</option>
                    <option value="Guest Teacher">Guest Teacher</option>
                  </select>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium cursor-pointer"
                  >
                    <option value="Science Department">Science Department</option>
                    <option value="Arts Department">Arts Department</option>
                    <option value="Business Studies Department">Business Studies Department</option>
                    <option value="Language & Literature">Language & Literature</option>
                    <option value="General">General</option>
                  </select>
                </div>

                {/* Teacher ID */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Teacher ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="TCH-2025-01"
                    value={formData.teacherId}
                    onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="017XXXXXXXX"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="teacher@school.edu.bd"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Education */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Educational Qualification *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. M.Sc (Mathematics), B.Ed"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    placeholder="e.g. 5+ years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>
              </div>

              {/* Subject Selection (Multi-select) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Select Teaching Subjects *
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-200 max-h-36 overflow-y-auto">
                  {availableSubjects.map((sub) => {
                    const selected = formData.subject.includes(sub);
                    return (
                      <button
                        type="button"
                        key={sub}
                        onClick={() => handleToggleSubject(sub)}
                        className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                          selected
                            ? "bg-[#78A4CB] text-white shadow-sm font-bold"
                            : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
                        }`}
                      >
                        {selected ? "✓ " : "+ "} {sub}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Classes Selection (Multi-select) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Select Teaching Classes *
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-200">
                  {availableClasses.map((cls) => {
                    const selected = formData.classes.includes(cls);
                    return (
                      <button
                        type="button"
                        key={cls}
                        onClick={() => handleToggleClass(cls)}
                        className={`px-4 py-2 text-xs rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                          selected
                            ? "bg-[#1e3a5f] text-white font-bold shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                        }`}
                      >
                        {selected ? "✓ " : ""} {cls}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Teacher Image Upload */}
              <ImageUploadField
                label="Teacher Photo"
                value={formData.profileImage}
                onChange={(url) => setFormData({ ...formData, profileImage: url })}
                uploading={uploadingImage}
                onFileUpload={async (file) => {
                  setUploadingImage(true);
                  try {
                    const body = new FormData();
                    body.append("file", file);
                    body.append("folder", "school_teachers");
                    const res = await axios.post("/upload", body, {
                      headers: { "Content-Type": "multipart/form-data" },
                    });
                    if (res.data?.data?.url) {
                      setFormData((prev) => ({ ...prev, profileImage: res.data.data.url }));
                    }
                  } catch {
                    /* handled */
                  } finally {
                    setUploadingImage(false);
                  }
                }}
              />

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Short Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={2}
                  placeholder="Write a short introduction about the teacher..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                ></textarea>
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