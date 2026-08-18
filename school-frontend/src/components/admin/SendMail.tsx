"use client";
import MailBox from "@/app/(admin)/admin/send-mail/mailBox";
import CustomModal from "@/utils/CustomModal";
import useAxios from "@/hooks/useAxios";
import useMails from "@/hooks/useMails";
import { TMail } from "@/types/mail.type";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import Swal from "sweetalert2";
import DashboardTitle from "@/utils/DashboardTitle";
import { toast } from "react-toastify";
import LoadingSpinner from "@/utils/LoadingSpinner";

interface IFormInput {
  subject: string;
  message: string;
}

export default function SendMail() {
  const axiosSecure = useAxios();
  const { mailsData, mailsRefetch, mailsLoading } = useMails();
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onMailSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Came here");
    setIsLoading(true);
    try {
      const updateData = {
        subject: data?.subject,
        message: data?.message,
      };
      const response = await axiosSecure.post("/mails", updateData);
      if (response.data?.statusCode === 200) {
        Swal.fire({
          title: response.data?.message || "Mails send successfully",
          showClass: { popup: "animate__animated animate__fadeInDown" },
          hideClass: { popup: "animate__animated animate__fadeOutUp" },
        });
        setIsMailModalOpen(false);
        reset();
        mailsRefetch();
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Could not send mail");
    } finally {
      setIsLoading(false);
    }
  };

  if (mailsLoading) return <LoadingSpinner />;
  return (
    <section className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="sm:flex justify-between items-center bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#B4E1EB]/60">
        <div>
          <DashboardTitle blackText="Send" greenText="Mail" />
          <p className="text-xs text-gray-500 mt-1">Send important notices or messages to students via email</p>
        </div>
        <button
          className="bg-[#78A4CB] hover:bg-[#6894bb] text-white px-5 py-3 rounded-2xl flex items-center gap-2 my-3 sm:my-0 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer font-bold text-sm"
          onClick={() => setIsMailModalOpen(true)}
        >
          <AiOutlinePlus /> Send Mail
        </button>
      </div>

      <div className="my-5 space-y-4">
        {mailsData.data && mailsData.data.length > 0 ? (
          mailsData.data.map((mail: TMail) => (
            <MailBox key={mail?._id} mail={mail} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-[#B4E1EB]/30 p-6 rounded-full mb-4">
              <MdOutlineMailOutline className="text-5xl text-[#78A4CB]" />
            </div>

            <h3 className="text-xl font-bold text-[#1e3a5f] mb-1">
              No mails found
            </h3>

            <p className="text-gray-500 text-xs max-w-md">
              No mails have been sent yet. Click the &quot;Send Mail&quot; button above to send a new email to students.
            </p>
          </div>
        )}
      </div>

      {isMailModalOpen && (
        <CustomModal
          isModalOpen={isMailModalOpen}
          setIsModalOpen={setIsMailModalOpen}
        >
          <form onSubmit={handleSubmit(onMailSubmit)} className="space-y-4">
            <h3 className="font-bold text-lg text-[#1e3a5f]">
              Send Email to All Students
            </h3>
            <p className="border-t border-gray-100 mb-4"></p>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Email subject..."
                {...register("subject", { required: true })}
                className={`w-full border bg-white border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-[#78A4CB] transition-colors ${
                  errors.subject && "border-red-500"
                }`}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Write the message details..."
                {...register("message", { required: true })}
                className={`w-full border bg-white border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-[#78A4CB] transition-colors ${
                  errors.message && "border-red-500"
                }`}
                rows={5}
                disabled={isLoading}
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsMailModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#78A4CB] hover:bg-[#6894bb] shadow-[#78A4CB]/30"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Mail</span>
                )}
              </button>
            </div>
          </form>
        </CustomModal>
      )}
    </section>
  );
}