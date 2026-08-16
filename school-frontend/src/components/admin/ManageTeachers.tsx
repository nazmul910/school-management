"use client";

import TeacherBox from "@/app/(admin)/admin/manage-teachers/TeacherBox";
import CustomModal from "@/utils/CustomModal";
import useAxios from "@/hooks/useAxios";
import useTeachers from "@/hooks/useTeachers";
import { TTeacher } from "@/types/teacher.type";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { FiUpload, FiX } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { toast } from "react-toastify";
import Image from "next/image";

interface IFormInput {
  name: string;
  email: string;
  number: string;
  education: string;
  gender: string;
}

const ManageTeachers = () => {
  const axiosSecure = useAxios();
  const { teachersData, teachersRefetch, teachersLoading } = useTeachers();
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [subjectList, setSubjectList] = useState<string[]>([]);
  const [subjectInput, setSubjectInput] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubject = () => {
    const trimmed = subjectInput.trim();
    if (trimmed && !subjectList.includes(trimmed)) {
      setSubjectList((prev) => [...prev, trimmed]);
      setSubjectInput("");
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setSubjectList((prev) => prev.filter((s) => s !== subject));
  };

  const handleSubjectKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSubject();
    }
  };

  const resetForm = () => {
    reset();
    setSubjectList([]);
    setSubjectInput("");
    setImageFile(null);
    setImagePreview(null);
  };

  const onTeacherDataSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (subjectList.length === 0) {
      toast.error("Please add at least one subject");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("number", data.number);
      formData.append("education", data.education);
      formData.append("gender", data.gender);
      formData.append("subject", JSON.stringify(subjectList));

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const res = await axiosSecure.post("/teachers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.statusCode === 201) {
        Swal.fire({
          title: "Teacher added successfully",
          icon: "success",
          showClass: { popup: "animate__animated animate__fadeInDown" },
          hideClass: { popup: "animate__animated animate__fadeOutUp" },
        });
        setIsTeacherModalOpen(false);
        resetForm();
        teachersRefetch();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Could not add teacher");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (teachersLoading) return <LoadingSpinner />;

  return (
    <section>
      <div className="sm:flex justify-between items-center mt-10">
        <DashboardTitle blackText="Manage" greenText="Teachers" />
        <button
          className="bg-primary hover:bg-lightduration-300 text-white px-4 py-2 rounded-md flex items-center gap-2 my-3 sm:my-0"
          onClick={() => setIsTeacherModalOpen(true)}
        >
          <AiOutlinePlus /> Add Teacher
        </button>
      </div>

      <div className="flex flex-wrap gap-5 my-5">
        {teachersData.data && teachersData.data.length > 0 ? (
          teachersData.data.map((teacher: TTeacher) => (
            <TeacherBox
              key={teacher?._id}
              teacher={teacher}
              refetch={teachersRefetch}
            />
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <FiUpload className="text-5xl text-primary" />
            </div>

            <h3 className="text-2xl font-bold text-primary mb-2">
              কোনো শিক্ষক পাওয়া যায়নি
            </h3>

            <p className="text-gray-500 max-w-md leading-7">
              এখনো কোনো শিক্ষক যোগ করা হয়নি। উপরের &quot;Add Teacher&quot;
              বাটনে ক্লিক করে নতুন শিক্ষক যোগ করুন।
            </p>
          </div>
        )}
      </div>

      {isTeacherModalOpen && (
        <CustomModal
          isModalOpen={isTeacherModalOpen}
          setIsModalOpen={setIsTeacherModalOpen}
        >
          <form
            onSubmit={handleSubmit(onTeacherDataSubmit)}
            className="max-h-[85vh] overflow-y-auto pr-1"
          >
            <h3 className="font-bold text-xl mb-2">Add Teacher Information</h3>
            <p className="border-t border-dark mb-5"></p>

            <div className="flex justify-center mb-5">
              <label
                htmlFor="teacherImage"
                className="relative cursor-pointer group"
              >
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center overflow-hidden bg-primary/5 group-hover:border-primary transition">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="preview"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUpload className="text-2xl text-primary/60 group-hover:text-primary transition" />
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1.5 shadow-md">
                  <FiUpload size={12} />
                </span>
                <input
                  id="teacherImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="sm:flex gap-3">
              <div className="w-full">
                <label className="text-dark text-sm">
                  Teacher&apos;s Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                    errors.name && "border border-red-500"
                  }`}
                />
              </div>
            </div>
            <div className="sm:flex gap-3">
              <div className="w-full">
                <label className="text-dark text-sm">
                  Teacher&apos;s Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                    errors.email && "border border-red-500"
                  }`}
                />
              </div>
            </div>
            <div className="sm:flex gap-3">
              <div className="w-full">
                <label className="text-dark text-sm">
                  Teacher&apos;s Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("number", { required: true })}
                  className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                    errors.number && "border border-red-500"
                  }`}
                />
              </div>
            </div>

            <div className="w-full">
              <label className="text-dark text-sm">
                Teacher&apos;s Education <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. জামিয়া আরাবিয়া"
                {...register("education", { required: true })}
                className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                  errors.education && "border border-red-500"
                }`}
              />
            </div>

            <div className="w-full">
              <label className="text-dark text-sm">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                {...register("gender", { required: true })}
                className={`w-full cursor-pointer border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                  errors.gender && "border border-red-500"
                }`}
                defaultValue=""
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="w-full">
              <label className="text-dark text-sm">
                Subjects Taken <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={subjectInput}
                  onChange={(e) => setSubjectInput(e.target.value)}
                  onKeyDown={handleSubjectKeyDown}
                  placeholder="e.g. আরবী শিক্ষা কোর্স - লিখে Enter চাপুন"
                  className="w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="shrink-0 bg-primary text-white px-3 rounded-md flex items-center justify-center hover:bg-primary/90 transition"
                >
                  <IoAddCircleOutline size={22} />
                </button>
              </div>

              {subjectList.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {subjectList.map((subject, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1.5 bg-primary/10 text-primary text-sm px-3 py-1.5 rounded-full border border-primary/30"
                    >
                      {subject}
                      <FiX
                        onClick={() => handleRemoveSubject(subject)}
                        className="cursor-pointer hover:text-red-500 transition"
                        size={14}
                      />
                    </span>
                  ))}
                </div>
              )}

              {subjectList.length === 0 && (
                <p className="text-xs text-gray-400 mb-3">
                  এখনো কোনো subject যোগ করা হয়নি
                </p>
              )}
            </div>

            {/* Submit */}
            <input
              className={`text-center px-3 md:px-5 py-1 md:py-3 duration-300 rounded-lg text-white cursor-pointer mt-3 w-full ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-green-800"
              }`}
              type="submit"
              value={isSubmitting ? "Adding Teacher..." : "Add Teacher"}
              disabled={isSubmitting}
            />
          </form>
        </CustomModal>
      )}
    </section>
  );
};

export default ManageTeachers;