"use client";

import { useState } from "react";
import { FaChalkboardTeacher, FaPlus, FaEdit, FaTrash, FaPhone, FaBookOpen } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import useTeachers from "@/hooks/useTeachers";
import useAxios from "@/hooks/useAxios";

const availableSubjects = [
  "বাংলা ১ম পত্র",
  "বাংলা ২য় পত্র",
  "English 1st Paper",
  "English 2nd Paper",
  "সাধারণ গণিত",
  "উচ্চতর গণিত",
  "পদার্থবিজ্ঞান",
  "রসায়ন",
  "জীববিজ্ঞান",
  "সাধারণ বিজ্ঞান",
  "বাংলাদেশ ও বিশ্বপরিচয়",
  "তথ্য ও যোগাযোগ প্রযুক্তি (ICT)",
  "হিসাববিজ্ঞান",
  "ব্যবসায় উদ্যোগ",
  "ফিন্যান্স ও ব্যাংকিং",
  "ইসলাম ও নৈতিক শিক্ষা",
  "শারীরিক শিক্ষা ও স্বাস্থ্য",
  "চারু ও কারুকলা",
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
    designation: "সহকারী শিক্ষক",
    department: "সাধারণ",
    education: "",
    experience: "৩+ বছর",
    subject: ["সাধারণ গণিত"],
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
      designation: "সহকারী শিক্ষক",
      department: "সাধারণ",
      education: "",
      experience: "৩+ বছর",
      subject: ["সাধারণ গণিত"],
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
      designation: teacher.designation || "সহকারী শিক্ষক",
      department: teacher.department || "সাধারণ",
      education: teacher.education || "",
      experience: teacher.experience || "৩+ বছর",
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
        setFormData((prev) => ({ ...prev, profileImage: res.data.data.url }));
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
    if (formData.subject.length === 0) {
      Swal.fire("সতর্কতা", "কমপক্ষে একটি বিষয় নির্বাচন করুন।", "warning");
      return;
    }

    if (isEditing && editingId) {
      updateTeacher.mutate(
        { id: editingId, payload: formData },
        {
          onSuccess: () => {
            Swal.fire("সফল", "শিক্ষকের তথ্য সফলভাবে আপডেট হয়েছে।", "success");
            setIsModalOpen(false);
            resetForm();
          },
          onError: (err: any) => {
            Swal.fire("ত্রুটি", err?.response?.data?.message || "আপডেট ব্যর্থ হয়েছে।", "error");
          },
        }
      );
    } else {
      addTeacher.mutate(formData, {
        onSuccess: () => {
          Swal.fire("সফল", "নতুন শিক্ষক সফলভাবে যুক্ত করা হয়েছে।", "success");
          setIsModalOpen(false);
          resetForm();
        },
        onError: (err: any) => {
          Swal.fire("ত্রুটি", err?.response?.data?.message || "শিক্ষক যুক্ত করা যায়নি।", "error");
        },
      });
    }
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `শিক্ষক "${name}" এর তথ্য মুছে ফেলা হবে!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#78A4CB",
      confirmButtonText: "হ্যাঁ, মুছুন",
      cancelButtonText: "বাতিল",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteTeacher.mutate(id, {
          onSuccess: () => {
            Swal.fire("মুছে ফেলা হয়েছে!", "শিক্ষকের তথ্য সফলভাবে ডিলিট হয়েছে।", "success");
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
            <span>শিক্ষক ব্যবস্থাপনা (Teacher Management)</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            বিদ্যালয়ের সকল শিক্ষকবৃন্দের তথ্য, পদবি, পাঠদানের বিষয় ও শ্রেণি নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#78A4CB] text-white font-bold text-sm hover:bg-[#6894bb] shadow-md transition-all shrink-0"
        >
          <FaPlus />
          <span>নতুন শিক্ষক যোগ করুন</span>
        </button>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#B4E1EB]/60 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-[#1e3a5f]">শিক্ষকমণ্ডলী তালিকা ({teachers.length} জন)</h2>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium">লোড হচ্ছে...</div>
        ) : teachers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#1e3a5f] text-white text-xs uppercase tracking-wider">
                  <th className="p-4">শিক্ষক</th>
                  <th className="p-4">পদবি ও বিভাগ</th>
                  <th className="p-4">শিক্ষাগত যোগ্যতা</th>
                  <th className="p-4">পাঠদানের বিষয়সমূহ</th>
                  <th className="p-4">শ্রেণিসমূহ</th>
                  <th className="p-4">যোগাযোগ</th>
                  <th className="p-4 text-center">অ্যাকশন</th>
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
                      <p className="text-xs text-gray-500 mt-0.5">{teacher.department || "সাধারণ"}</p>
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
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(teacher)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                          title="সম্পাদনা"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(teacher._id, teacher.name)}
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
          <div className="p-12 text-center text-gray-500 font-medium">কোনো শিক্ষকের তথ্য পাওয়া যায়নি।</div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl my-8">
            <div className="p-6 bg-[#1e3a5f] text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {isEditing ? "শিক্ষকের তথ্য সম্পাদন করুন" : "নতুন শিক্ষক যুক্ত করুন"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-300 hover:text-white">
                <ImCross size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">শিক্ষকের পূর্ণ নাম *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="যেমন: ড. মোহাম্মাদ রফিকুল ইসলাম"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">পদবি (Designation) *</label>
                  <select
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white font-medium"
                  >
                    <option value="প্রধান শিক্ষক">প্রধান শিক্ষক</option>
                    <option value="সহকারী প্রধান শিক্ষক">সহকারী প্রধান শিক্ষক</option>
                    <option value="সিনিয়র শিক্ষক">সিনিয়র শিক্ষক</option>
                    <option value="সহকারী শিক্ষক">সহকারী শিক্ষক</option>
                    <option value="আইসিটি শিক্ষক">আইসিটি শিক্ষক</option>
                    <option value="শারীরিক শিক্ষা শিক্ষক">শারীরিক শিক্ষা শিক্ষক</option>
                  </select>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">বিভাগ (Department)</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="যেমন: গণিত / পদার্থবিজ্ঞান / বাংলা"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Teacher ID */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">শিক্ষক আইডি</label>
                  <input
                    type="text"
                    value={formData.teacherId}
                    onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                    placeholder="যেমন: TCH-001"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ফোন নম্বর *</label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    required
                    placeholder="০১৭xxxxxxxx"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ইমেইল ঠিকানা *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="teacher@school.edu.bd"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Education */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">শিক্ষাগত যোগ্যতা *</label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    required
                    placeholder="যেমন: এম.এসসি (গণিত, ঢাবি)"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">অভিজ্ঞতা</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="যেমন: ৫ বছর"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                </div>
              </div>

              {/* Multiple Subjects Multi-Select */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  পাঠদানের বিষয়সমূহ নির্বাচন করুন (Multiple Subjects) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-200 max-h-40 overflow-y-auto">
                  {availableSubjects.map((sub) => {
                    const selected = formData.subject.includes(sub);
                    return (
                      <button
                        type="button"
                        key={sub}
                        onClick={() => handleToggleSubject(sub)}
                        className={`p-2 text-xs rounded-xl text-left font-medium transition-all ${
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

              {/* Multiple Classes Multi-Select */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  পাঠদানের শ্রেণিসমূহ (Multiple Classes)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableClasses.map((cls) => {
                    const selected = formData.classes.includes(cls);
                    return (
                      <button
                        type="button"
                        key={cls}
                        onClick={() => handleToggleClass(cls)}
                        className={`px-4 py-2 text-xs rounded-xl font-semibold transition-all ${
                          selected
                            ? "bg-[#1e3a5f] text-white font-bold"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                        }`}
                      >
                        {selected ? "✓ " : ""} {cls}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">শিক্ষকের ছবি</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formData.profileImage}
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    placeholder="ছবির লিংক অথবা ফাইল আপলোড করুন"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                  />
                  <label className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer shrink-0">
                    {uploadingImage ? "আপলোড হচ্ছে..." : "ছবি আপলোড"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">সংক্ষিপ্ত পরিচিতি (Bio)</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={2}
                  placeholder="শিক্ষকের সংক্ষিপ্ত পরিচিতি লিখুন..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#78A4CB]"
                ></textarea>
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