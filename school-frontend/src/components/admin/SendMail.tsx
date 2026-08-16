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
    <section>
      <div className="sm:flex justify-between items-center mt-10">
        <DashboardTitle blackText="Send" greenText="Mail" />
        <button
          className="bg-primary hover:bg-lightduration-300 text-white px-4 py-2 rounded-md flex items-center gap-2 my-3 sm:my-0"
          onClick={() => setIsMailModalOpen(true)}
        >
          <AiOutlinePlus /> Send Mail
        </button>
      </div>
      <div className="my-5 space-y-5">
        {mailsData.data && mailsData.data.length > 0 ? (
          mailsData.data.map((mail: TMail) => (
            <MailBox key={mail?._id} mail={mail} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <MdOutlineMailOutline className="text-5xl text-primary" />
            </div>

            <h3 className="text-2xl font-bold text-primary mb-2">
              কোনো মেইল পাওয়া যায়নি
            </h3>

            <p className="text-gray-500 max-w-md leading-7">
              এখনো কোনো মেইল পাঠানো হয়নি। উপরের &quot;Send Mail&quot; বাটনে
              ক্লিক করে নতুন মেইল পাঠান।
            </p>
          </div>
        )}
      </div>

      {isMailModalOpen && (
        <CustomModal
          isModalOpen={isMailModalOpen}
          setIsModalOpen={setIsMailModalOpen}
        >
          <form onSubmit={handleSubmit(onMailSubmit)}>
            <h3 className="font-bold text-xl mb-2">
              Send mail to all students
            </h3>
            <p className="border-t border-dark mb-5"></p>
            <div className="sm:flex gap-3">
              {/* Subject */}
              <div className="w-full">
                <label className="text-dark text-sm">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("subject", { required: true })}
                  className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md  focus:outline-none focus:border-primary mb-3 ${
                    errors.subject && "border border-red-500"
                  }`}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="sm:flex gap-3">
              {/* Message*/}
              <div className="w-full">
                <label className="text-dark text-sm">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="type here..."
                  {...register("message", { required: true })}
                  className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
                    errors.message && "border border-red-500"
                  }`}
                  rows={4}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`text-center px-3 md:px-5 py-1 md:py-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-primary hover:bg-lighttext-white"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <p className="text-white">Send Mail</p>
              )}
            </button>
          </form>
        </CustomModal>
      )}
    </section>
  );
}