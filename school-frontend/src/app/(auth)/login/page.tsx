"use client";

import logo from "@/assets/logo1.jpeg";
import useAxios from "@/hooks/useAxios";
import { TLoginFormInputs } from "@/types/loginForm.type";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdError,
  MdVpnKey,
  MdLogin,
} from "react-icons/md";
import AuthSidebar from "@/components/layout/AuthSidebar";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormInputs>();
  const axiosSecure = useAxios();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<TLoginFormInputs> = (data) => {
    setIsLoading(true);

    axiosSecure
      .post("/auth/login", data)
      .then(({ data }) => {
        // console.log(res) ;
        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("accessToken", data.data.accessToken);
          data?.data.userRole === "student"
            ? router.push("student/student-dashboard")
            : router.push("admin/admin-home");
        }
      })
      .catch((error) => {
        toast.error(error.response.data?.message);
        // console.log(error);\
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-primary via-primary to-teal-600 flex flex-col md:flex-row items-center justify-center overflow-y-hidden">
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

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:px-8 lg:px-12 xl:px-16 rounded-2xl w-full z-10 bg-white bg-opacity-50 backdrop-blur-sm border border-white border-opacity-30 mx-4 md:mx-0"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-darker font-bold mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm">
              Please sign in to your account
            </p>
          </div>

          {/* Email Field */}
          <div className="mb-6 group">
            <label className="block mb-2 text-darker text-sm font-semibold">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl outline-none focus:border-primary transition-all duration-300 bg-white bg-opacity-80 hover:border-gray-300 group-hover:shadow-md"
                placeholder="Enter your email address"
                disabled={isLoading}
              />
              <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <MdError className="mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="group">
            <label className="block mb-2 text-darker text-sm font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl outline-none focus:border-primary transition-all duration-300 bg-white bg-opacity-80 hover:border-gray-300 group-hover:shadow-md"
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300"
                disabled={isLoading}
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <MdError className="mr-1" />
                {errors.password.message}
              </p>
            )}
          </div>
          <Link href="/forget-password" className="mb-8 flex justify-end">
            <p className="text-darker hover:text-primary transition-colors duration-300 flex items-center gap-2">
              <MdVpnKey className="text-sm" />
              Forgot Password?
            </p>
          </Link>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-white hover:shadow-xl transform hover:-translate-y-1"
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Signing In...
              </>
            ) : (
              <>
                <MdLogin className="group-hover:translate-x-1 transition-transform duration-300" />
                Sign In to Your Account
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
            Don't have an account?{" "}
            <Link href="/register" className="group">
              <span className="text-primary font-bold hover:text-primary transition-colors duration-300 relative">
                Create Account
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
