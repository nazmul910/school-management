"use client";

import { handleLogout } from "@/app/providers/AuthContext";
import useAxios from "@/hooks/useAxios";
import DashboardTitle from "@/utils/DashboardTitle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuKeyRound, LuCheck, LuLoader } from "react-icons/lu";

interface IFormInput {
  oldPassword: string;
  password: string;
  confirm: string;
}

const ChangePassword = () => {
  const axiosSecure = useAxios();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onPasswordSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.password !== data.confirm) {
      setError(true);
      return;
    }

    setIsSubmitting(true);
    const updateData = {
      oldPassword: data.oldPassword,
      newPassword: data.confirm,
    };
    const token = localStorage.getItem("accessToken");

    try {
      const res = await axiosSecure.post("/auth/change-password", updateData, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      toast.success(res.data.message || "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
      reset();
      handleLogout(router);
      setTimeout(() => {
        toast.info("দয়া করে নতুন পাসওয়ার্ড দিয়ে লগইন করুন");
      }, 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "পাসওয়ার্ড পরিবর্তন করা সম্ভব হয়নি");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[85vh] flex flex-col justify-center items-center px-4 py-8">
      <DashboardTitle
        blackText="Change"
        greenText="Password"
        className="text-center mb-6"
      />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-[#1e3a5f]/5 border border-[#B4E1EB]/60 p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-100">
          <div className="w-10 h-10 rounded-2xl bg-[#B4E1EB]/30 text-[#78A4CB] flex items-center justify-center text-xl">
            <LuKeyRound />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#1e3a5f]">অ্যাকাউন্ট পাসওয়ার্ড পরিবর্তন</h3>
            <p className="text-xs text-gray-400">আপনার নিরাপত্তা নিশ্চিত করতে নিয়মিত পাসওয়ার্ড আপডেট করুন</p>
          </div>
        </div>

        <form
          onClick={() => setError(false)}
          className="space-y-4"
          onSubmit={handleSubmit(onPasswordSubmit)}
        >
          {/* Old Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              বর্তমান পাসওয়ার্ড (Old Password) <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("oldPassword", { required: true })}
              className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:border-[#78A4CB] transition-colors ${
                errors.oldPassword ? "border-red-500" : "border-gray-200"
              }`}
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              নতুন পাসওয়ার্ড (New Password) <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: true, minLength: 6 })}
              className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:border-[#78A4CB] transition-colors ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              পাসওয়ার্ড নিশ্চিত করুন (Confirm Password) <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("confirm", { required: true })}
              className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:border-[#78A4CB] transition-colors ${
                errors.confirm ? "border-red-500" : "border-gray-200"
              }`}
            />
          </div>

          {error && (
            <p className="text-xs font-bold text-red-500 bg-red-50 p-2.5 rounded-xl border border-red-200 text-center">
              পাসওয়ার্ড মিলছে না! অনুগ্রহ করে পুনরায় যাচাই করুন।
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-2 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#78A4CB] hover:bg-[#6894bb] hover:shadow-lg shadow-[#78A4CB]/30"
            }`}
          >
            {isSubmitting ? (
              <>
                <LuLoader className="animate-spin text-base" />
                <span>সংরক্ষণ হচ্ছে...</span>
              </>
            ) : (
              <>
                <LuCheck size={16} />
                <span>পাসওয়ার্ড পরিবর্তন করুন</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
