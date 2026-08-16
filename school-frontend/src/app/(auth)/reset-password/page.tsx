"use client";
export const dynamic = "force-dynamic";

import logo from "@/assets/removedBgLogo.png";
import useAxios from "@/hooks/useAxios";
import { TForgetPasswordFormInput } from "@/types/forget-password.type";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MdLock, MdError, MdLockReset } from "react-icons/md";
import AuthSidebar from "@/components/layout/AuthSidebar";

function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgetPasswordFormInput>();
  const router = useRouter();
  const axiosSecure = useAxios();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const onSubmit: SubmitHandler<TForgetPasswordFormInput> = (data) => {
    setIsLoading(true);

    axiosSecure
      .post(
        "/auth/reset-password",
        { ...data, id },
        {
          headers: {
            Authorization: token as string,
            "Content-Type": "application/json",
          },
        }
      )
      .then(({ data }) => {
        if (data.statusCode === 200) {
          toast.success(data.message);
          setTimeout(() => {
            router.push("/login");
            toast.success("Please login with your new password");
          }, 5000);
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage === "jwt expired") {
          router.push("/forget-password");
          toast.error("Token expired, please request a new reset link.");
        } else toast.error(errorMessage || "Reset failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-primary via-emerald-600 to-teal-600 flex flex-col md:flex-row items-center justify-center overflow-y-hidden">
      {/* Left Panel - Auth Sidebar */}
      <AuthSidebar />

      {/* Right Panel */}
      <div className="flex-1 w-full flex flex-col items-center justify-evenly md:justify-center bg-gradient-to-br from-white to-gray-50 h-screen max-w-[38rem] md:rounded-l-3xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 border border-gray-300 rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 border border-gray-300 rounded-full"></div>
        </div>

        {/* Mobile Logo */}
        <div className="flex md:hidden items-center gap-3 z-10 transform hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
            <Image className="w-8 h-8" src={logo} alt="Logo" />
          </div>
          <h1 className="text-darker font-bold text-2xl">
            Dawah Quran Academy
          </h1>
        </div>

        {/* Reset Password Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:px-8 lg:px-12 xl:px-16 rounded-2xl w-full z-10 bg-white bg-opacity-50 backdrop-blur-sm border border-white border-opacity-30 mx-4 md:mx-0"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-darker font-bold mb-2">
              Reset Password
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your new password to secure your account
            </p>
          </div>

          {/* New Password Field */}
          <div className="mb-8 group">
            <label className="block mb-2 text-darker text-sm font-semibold">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl outline-none focus:border-primary transition-all duration-300 bg-white bg-opacity-80 hover:border-gray-300 group-hover:shadow-md"
                placeholder="Enter your new password"
                disabled={isLoading}
              />
              <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <MdError className="mr-1" />
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-primary to-emerald-600 hover:from-primary hover:to-primary text-white hover:shadow-xl transform hover:-translate-y-1"
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Resetting Password...
              </>
            ) : (
              <>
                <MdLockReset className="group-hover:translate-x-1 transition-transform duration-300" />
                Reset Password
              </>
            )}
          </button>

          {/* Continue without Login Link */}
          <Link className="flex justify-center mt-8" href="/">
            <span className="text-primary font-semibold text-sm cursor-pointer">
              Continue without Login
            </span>
          </Link>
        </form>

        {/* Footer Links */}
        <div className="flex flex-col items-center gap-4 px-6 md:px-8 lg:px-12 xl:px-16 w-full z-10">
          <p className="text-sm text-darker text-center">
            Remember your password?{" "}
            <Link href="/login" className="group">
              <span className="text-primary font-bold hover:text-emerald-600 transition-colors duration-300 relative">
                Sign In
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-gradient-to-br from-primary via-emerald-600 to-teal-600 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
