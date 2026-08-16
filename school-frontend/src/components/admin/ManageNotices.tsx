"use client";

import NoticeBox from "../../app/(admin)/admin/manage-notices/NoticeBox";
import CustomModal from "@/utils/CustomModal";
import useAxios from "@/hooks/useAxios";
import useNotices from "@/hooks/useNotices";
import { TNotice } from "@/types/notice.type";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFileEarmarkText } from "react-icons/bs";
import Swal from "sweetalert2";
import DashboardTitle from "@/utils/DashboardTitle";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { toast } from "react-toastify";

interface IFormInput {
  heading: string;
  body: string;
}

export default function ManageNotices() {
  const axiosSecure = useAxios();
  const { noticesData, noticesRefetch, noticesLoading } = useNotices();
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onNoticeSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);
    try {
      const updateData = {
        heading: data?.heading,
        body: data?.body,
      };
      const res = await axiosSecure.post("/notices", updateData);
      if (res.data?.statusCode === 201) {
        Swal.fire({
          title: "Notice added successfully",
          showClass: { popup: "animate__animated animate__fadeInDown" },
          hideClass: { popup: "animate__animated animate__fadeOutUp" },
        });
        setIsNoticeModalOpen(false);
        reset();
        noticesRefetch();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Could not add notice");
      console.error("Error Adding notice:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (noticesLoading) return <LoadingSpinner />;
  return (
    <section>
      <div className="sm:flex justify-between items-center mt-10">
        <DashboardTitle blackText="Manage" greenText="Notice" />
        <button
          className="bg-primary hover:bg-lightduration-300 text-white px-4 py-2 rounded-md flex items-center gap-2 my-3 sm:my-0"
          onClick={() => setIsNoticeModalOpen(true)}
        >
          <AiOutlinePlus /> Add Notice
        </button>
      </div>
      <div className="my-5 space-y-5">
        {noticesData.data && noticesData.data.length > 0 ? (
          noticesData.data.map((notice: TNotice) => (
            <NoticeBox
              key={notice?._id}
              notice={notice}
              refetch={noticesRefetch}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <BsFileEarmarkText className="text-5xl text-primary" />
            </div>

            <h3 className="text-2xl font-bold text-primary mb-2">
              কোনো নোটিশ পাওয়া যায়নি
            </h3>

            <p className="text-gray-500 max-w-md leading-7">
              এখনো কোনো নোটিশ যোগ করা হয়নি। উপরের &quot;Add Notice&quot; বাটনে
              ক্লিক করে নতুন নোটিশ যোগ করুন।
            </p>
          </div>
        )}
      </div>

      {isNoticeModalOpen && (
        <CustomModal
          isModalOpen={isNoticeModalOpen}
          setIsModalOpen={setIsNoticeModalOpen}
        >
          <form onSubmit={handleSubmit(onNoticeSubmit)}>
            <h3 className="font-bold text-xl mb-2">Add Notice</h3>
            <p className="border-t border-dark mb-5"></p>
            <div className="sm:flex gap-3">
              {/* heading */}
              <div className="w-full">
                <label className="text-dark text-sm">
                  Heading <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("heading", { required: true })}
                  className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                    errors.heading && "border border-red-500"
                  }`}
                />
              </div>
            </div>

            <div className="sm:flex gap-3">
              {/* Body*/}
              <div className="w-full">
                <label className="text-dark text-sm">
                  Body <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="type here..."
                  {...register("body", { required: true })}
                  className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                    errors.body && "border border-red-500"
                  }`}
                  rows={4}
                />
              </div>
            </div>

            {/* Submit */}
            <input
              className={`text-center px-3 md:px-5 py-1 md:py-3 duration-300 rounded-lg text-white cursor-pointer mt-3 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-green-800"
              }`}
              type="submit"
              value={isSubmitting ? "Adding Notice..." : "Add Notice"}
              disabled={isSubmitting}
            />
          </form>
        </CustomModal>
      )}
    </section>
  );
}