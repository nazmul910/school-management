"use client";

import logo1 from "@/assets/school-logo.png";
import useAxios from "@/hooks/useAxios";
import { TRegisterFormValues } from "@/types/registerForm.type";
import AuthSidebar from "@/components/layout/AuthSidebar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdErrorOutline,
  MdPersonAdd,
  MdVisibility,
  MdVisibilityOff,
  MdArrowForward,
  MdCheckCircle,
} from "react-icons/md";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormValues>();

  const axiosSecure = useAxios();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<TRegisterFormValues> = (data) => {
    setIsLoading(true);

    axiosSecure
      .post("/users/create-user", {
        ...data,
        role: "student",
      })
      .then((res) => {
        if (res?.data.statusCode == "201") {
          toast.success(res.data.message);

          setTimeout(() => {
            toast.success("Please login to continue!");
          }, 2000);

          router.push("/login");
        }
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "Something went wrong!"
        );
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="min-h-screen bg-[#f5f8fa] flex items-center justify-center p-0 md:p-5 lg:p-8">
      <div className="w-full max-w-[1450px] min-h-screen md:min-h-[calc(100vh-40px)] lg:min-h-[calc(100vh-64px)] bg-white md:rounded-[32px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.10)] flex flex-col lg:flex-row">

        {/* ================= LEFT SIDE ================= */}
        <section className="hidden lg:block lg:w-[48%] xl:w-[52%] relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[#087f78]">
          <AuthSidebar />
        </section>

        {/* ================= RIGHT SIDE ================= */}
        <section className="relative flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#fdfefe] to-[#f3f8f9] px-5 py-8 sm:px-8 md:px-12 lg:px-10 xl:px-16">

          {/* Decorative Background */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-teal-200/20 blur-3xl" />

          <div className="absolute top-8 right-8 w-20 h-20 border border-primary/10 rounded-full" />
          <div className="absolute top-14 right-14 w-8 h-8 bg-primary/5 rounded-full" />
          <div className="absolute bottom-10 left-8 w-24 h-24 border border-primary/10 rounded-full" />

          <div className="relative z-10 w-full max-w-[560px]">

            {/* Mobile Brand */}
            <div className="lg:hidden flex flex-col items-center text-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm">
                <Image
                  src={logo1}
                  alt="School Logo"
                  width={70}
                  height={70}
                  className="object-contain rounded-full"
                />
              </div>

              <div>
                <h1 className="text-lg font-extrabold text-darker leading-tight">
                  Uttar Betdoba Fatema Halim High School
                </h1>
                <p className="text-xs text-gray-500">
                  Learn • Grow • Succeed
                </p>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                  <MdPersonAdd />
                  Student Registration
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-darker tracking-tight">
                  Create your account
                </h2>

                <p className="mt-2 text-gray-500 text-sm sm:text-base">
                  Join our learning community and start your journey today.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-darker mb-2">
                    Full Name
                  </label>

                  <div className="relative">
                    <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                    <input
                      type="text"
                      {...register("name", {
                        required: "Name is required",
                      })}
                      placeholder="Enter your full name"
                      disabled={isLoading}
                      className={`w-full h-14 rounded-2xl border bg-gray-50/70 pl-12 pr-4 text-sm text-darker outline-none transition-all duration-200 placeholder:text-gray-400
                        ${
                          errors.name
                            ? "border-red-400 focus:ring-4 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
                        }`}
                    />
                  </div>

                  {errors.name && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
                      <MdErrorOutline />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-darker mb-2">
                    Email Address
                  </label>

                  <div className="relative">
                    <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      placeholder="Enter your email address"
                      disabled={isLoading}
                      className={`w-full h-14 rounded-2xl border bg-gray-50/70 pl-12 pr-4 text-sm text-darker outline-none transition-all duration-200 placeholder:text-gray-400
                        ${
                          errors.email
                            ? "border-red-400 focus:ring-4 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
                        }`}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
                      <MdErrorOutline />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-bold text-darker mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      placeholder="Create a strong password"
                      disabled={isLoading}
                      className={`w-full h-14 rounded-2xl border bg-gray-50/70 pl-12 pr-12 text-sm text-darker outline-none transition-all duration-200 placeholder:text-gray-400
                        ${
                          errors.password
                            ? "border-red-400 focus:ring-4 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300"
                        }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                    >
                      {showPassword ? (
                        <MdVisibilityOff className="text-xl" />
                      ) : (
                        <MdVisibility className="text-xl" />
                      )}
                    </button>
                  </div>

                  {errors.password ? (
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
                      <MdErrorOutline />
                      {errors.password.message}
                    </p>
                  ) : (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                      <MdCheckCircle className="text-green-500" />
                      Password must contain at least 6 characters
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-white text-base transition-all duration-300
                    ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-primary to-[#07877f] hover:shadow-[0_12px_30px_rgba(0,150,136,0.25)] hover:-translate-y-0.5 active:translate-y-0"
                    }`}
                >
                  {isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <MdArrowForward className="text-xl transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {/* Continue */}
                <Link
                  href="/"
                  className="flex justify-center text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
                >
                  Continue without Login
                </Link>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-primary hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>

            {/* Bottom Trust */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
              <MdCheckCircle className="text-green-500" />
              Secure registration • Your information is protected
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}