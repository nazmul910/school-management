"use client";

import { useState } from "react";
import { FaUserGraduate, FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
              title: "Success",
              text: "Student information updated successfully.",
              confirmButtonColor: "#78A4CB",
            });
            setIsModalOpen(false);
            resetForm();
          },
          onError: (err: any) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: err?.response?.data?.message || "Update failed.",
            });
          },
        }
      );
    } else {
      addStudent.mutate(payload, {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "New student added successfully.",
            confirmButtonColor: "#78A4CB",
          });
          setIsModalOpen(false);
          resetForm();
        },
        onError: (err: any) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err?.response?.data?.message || "Could not add student.",
          });
        },
      });
    }
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Student "${name}" will be permanently deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#78A4CB",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteStudent.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Student record has been deleted successfully.", "success");
          },
        });
      }
    });
  };

  const showGroupSelect = formData.class === "Class 9" || formData.class === "Class 10";

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Title & Add Button */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1e3a5f] flex items-center gap-2.5">
            <FaUserGraduate className="text-[#78A4CB]" />
            <span>Student Management</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Add, edit, and manage all student records from Class 6 to Class 10.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        >
          <FaPlus />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#B4E1EB]/60 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            placeholder="Search by student name or ID..."
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
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
          >
            <option value="all">All Sections</option>
            {sections.map((s) => (
              <option key={s} value={s}>
                Section {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#B4E1EB]/60 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-[#1e3a5f]">Student List ({students.length} total)</h2>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium">Loading...</div>
        ) : students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1e3a5f] text-white text-xs uppercase tracking-wider">
                  <th className="p-4">Student</th>
                  <th className="p-4 text-center">Roll</th>
                  <th className="p-4 text-center">Class & Section</th>
                  <th className="p-4 text-center">Group</th>
                  <th className="p-4">Father's Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4 text-center">Actions</th>
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
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(student._id, student.name)}
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
          <div className="p-12 text-center text-gray-500 font-medium">No students found.</div>
        )}
      </div>

      {/* Add / Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl my-8">
            <div className="p-6 bg-[#1e3a5f] text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEditing ? "Edit Student Information" : "Add New Student"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-300 hover:text-white"
              >
                <ImCross size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g. John Smith"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Roll */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Roll Number *</label>
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">Class *</label>
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">Section *</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB] bg-white font-medium"
                  >
                    {sections.map((s) => (
                      <option key={s} value={s}>
                        Section {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Conditional Group Field (ONLY for Class 9 and Class 10) */}
                {showGroupSelect && (
                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#F9E8A2]/30 border-2 border-amber-300">
                    <label className="block text-xs font-extrabold text-[#5c4300] mb-1">
                      Select Group / Division (Required for Class 9 & 10) *
                    </label>
                    <select
                      value={formData.group || "Science"}
                      onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                      required={showGroupSelect}
                      className="w-full px-4 py-2.5 rounded-xl border border-amber-400 text-sm focus:outline-none bg-white font-bold text-[#1e3a5f]"
                    >
                      <option value="Science">Science</option>
                      <option value="Humanities">Humanities</option>
                      <option value="Business Studies">Business Studies</option>
                    </select>
                  </div>
                )}

                {/* Student ID */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Student ID (Optional)</label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="Auto-generated if left blank"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Guardian Phone Number</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="017XXXXXXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Father's Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Father's Name</label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    placeholder="Father's name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Mother's Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mother's Name</label>
                  <input
                    type="text"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    placeholder="Mother's name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Current Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Address"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                />
              </div>

              {/* Student Image Upload */}
              <ImageUploadField
                label="Student Photo"
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
