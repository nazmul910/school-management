"use client";

import CourseBox from "@/app/(admin)/admin/manage-courses/CourseBox";
import CustomModal from "@/utils/CustomModal";
import useAxios from "@/hooks/useAxios";
import useCourses from "@/hooks/useCourses";
import { TCourse } from "@/types/course.type";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import Swal from "sweetalert2";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { toast } from "react-toastify";

interface IFormInput {
  name: string;
  fee: number;
  method: string;
  duration: string;
  details: string;
}

const ManageCourses = () => {
  const axiosSecure = useAxios();
  const { coursesData, coursesRefetch, coursesLoading } = useCourses();
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File states
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  // Handle cover image selection
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setCoverFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setCoverPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Please select a valid image file");
      }
    }
  };

  // Cancel cover selection
  const cancelCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
  };

  // Reset all form data
  const resetForm = () => {
    reset();
    setCoverFile(null);
    setCoverPreview(null);
  };

  const onCourseDataSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!coverFile) {
      toast.error("Please upload a course cover image");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("fee", String(data.fee));
      formData.append("method", data.method);
      formData.append("duration", data.duration);

      // details ; দিয়ে আলাদা করা string থেকে array বানিয়ে JSON হিসেবে পাঠানো হচ্ছে
      const detailsArray = data.details
        .split(";")
        .map((item: string) => item.trim())
        .filter((item: string) => item.length > 0); // empty string bad
      formData.append("details", JSON.stringify(detailsArray));

      // Backend upload.single("cover")
      formData.append("cover", coverFile);

      const res = await axiosSecure.post("/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.statusCode === 201) {
        Swal.fire({
          title: "Course added successfully",
          showClass: { popup: "animate__animated animate__fadeInDown" },
          hideClass: { popup: "animate__animated animate__fadeOutUp" },
        });
        setIsCourseModalOpen(false);
        resetForm();
        coursesRefetch();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Could not add course");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (coursesLoading) return <LoadingSpinner />;

  return (
    <section className="mx-auto overflow-y-hidden">
      <div className="sm:flex justify-between items-center mt-10">
        <DashboardTitle blackText="Manage" greenText="Courses" />
        <button
          className="bg-primary hover:bg-lightduration-300 text-white px-4 py-2 rounded-md flex items-center gap-2 my-3 sm:my-0"
          onClick={() => setIsCourseModalOpen(true)}
        >
          <AiOutlinePlus /> Add Course
        </button>
      </div>

      <div className="flex flex-wrap gap-5 my-5">
        {coursesData.data && coursesData.data.length > 0 ? (
          coursesData.data.map((course: TCourse) => (
            <CourseBox
              key={course?._id}
              course={course}
              refetch={coursesRefetch}
            />
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <BsImage className="text-5xl text-primary" />
            </div>

            <h3 className="text-2xl font-bold text-primary mb-2">
              কোনো কোর্স পাওয়া যায়নি
            </h3>

            <p className="text-gray-500 max-w-md leading-7">
              এখনো কোনো কোর্স যোগ করা হয়নি। উপরের &quot;Add Course&quot; বাটনে
              ক্লিক করে নতুন কোর্স যোগ করুন।
            </p>
          </div>
        )}
      </div>

      {isCourseModalOpen && (
        <CustomModal
          isModalOpen={isCourseModalOpen}
          setIsModalOpen={setIsCourseModalOpen}
        >
          <form onSubmit={handleSubmit(onCourseDataSubmit)}>
            <h3 className="font-bold text-xl mb-2">Add Course Information</h3>
            <p className="border-t border-dark mb-5"></p>

            {/* Course Name */}
            <label className="text-dark text-sm">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="বাংলায়"
              className={`w-full border p-2 rounded-md mb-3 ${
                errors.name && "border-red-500"
              }`}
            />

            {/* Course Cover Image */}
            <div className="w-full mb-3">
              <label className="text-dark text-sm">
                Course Cover <span className="text-red-500">*</span>
              </label>

              {!coverFile ? (
                <div className="mt-2">
                  <label
                    htmlFor="course-cover-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-dark/40 rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <BsImage className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">
                          কোর্স কভার আপলোড করতে
                        </span>{" "}
                        এখানে ক্লিক করুন
                      </p>
                      <p className="text-xs text-gray-500">
                        পিএনজি, জেপিজি, জেপিইজি (সর্বোচ্চ ৫ এমবি)
                      </p>
                    </div>
                    <input
                      id="course-cover-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleCoverChange}
                    />
                  </label>
                </div>
              ) : (
                <div className="mt-2 relative">
                  <div className="relative w-full h-48 border border-dark/40 rounded-lg overflow-hidden">
                    <img
                      src={coverPreview!}
                      alt="Cover preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={cancelCover}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <AiOutlineClose size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {coverFile.name}
                  </p>
                </div>
              )}
            </div>

            {/* Course Fee */}
            <label className="text-dark text-sm">
              Fee <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("fee", { required: true })}
              placeholder="ডলার রেটে, ইংরেজিতে"
              className={`w-full border p-2 rounded-md mb-3 ${
                errors.fee && "border-red-500"
              }`}
            />

            {/* Course Method */}
            <label className="text-dark text-sm">
              Method <span className="text-red-500">*</span>
            </label>
            <select
              {...register("method", { required: true })}
              className={`w-full border p-2 rounded-md mb-3 ${
                errors.method && "border-red-500"
              }`}
            >
              <option value="One to One">One to One</option>
              <option value="Batch">Batch</option>
            </select>

            {/* Course Duration */}
            <label className="text-dark text-sm">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("duration", { required: true })}
              placeholder="e.g. ৬ মাস"
              className={`w-full border p-2 rounded-md mb-3 ${
                errors.duration && "border-red-500"
              }`}
            />

            {/* Course Details */}
            <label className="text-dark text-sm">
              Details (separate with ; ){" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("details", { required: true })}
              placeholder="বাংলায়। প্রতিটি পয়েন্ট সেমিকোলন(;) দিয়ে আলাদা থাকবে"
              className={`w-full border p-2 rounded-md mb-3 ${
                errors.details && "border-red-500"
              }`}
            ></textarea>

            {/* Submit */}
            <input
              className={`text-center px-3 md:px-5 py-1 md:py-3 duration-300 rounded-lg text-white cursor-pointer mt-3 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-green-800"
              }`}
              type="submit"
              value={isSubmitting ? "Adding Course..." : "Add Course"}
              disabled={isSubmitting}
            />
          </form>
        </CustomModal>
      )}
    </section>
  );
};

export default ManageCourses;