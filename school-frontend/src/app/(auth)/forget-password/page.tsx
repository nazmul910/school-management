"use client";

import logo from "@/assets/logo1.jpeg";
import useAxios from "@/hooks/useAxios";
import { TLoginFormInputs } from "@/types/loginForm.type";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MdEmail, MdError, MdVpnKey, MdArrowBack } from "react-icons/md";
import AuthSidebar from "@/components/layout/AuthSidebar";

export default function ForgetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormInputs>();
  const axiosSecure = useAxios();
  const router = useRouter();

  const onSubmit: SubmitHandler<TLoginFormInputs> = (data) => {
    axiosSecure
      .patch("/auth/forget-password", data)
      .then(({ data }) => {
        // console.log(res) ;
        if (data.statusCode === 200) {
          toast.success(data.message);
          router.push("/login");
        }
      })
      .catch((error) => {
        toast.error(error.response.data?.message);
        // console.log(error);
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

        {/* Forget Password Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:px-8 lg:px-12 xl:px-16 rounded-2xl w-full z-10 bg-white bg-opacity-50 backdrop-blur-sm border border-white border-opacity-30 mx-4 md:mx-0"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-darker font-bold mb-2">
              Password Recovery
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your email address to reset your password
            </p>
          </div>

          {/* Email Field */}
          <div className="mb-8 group">
            <label className="block mb-2 text-darker text-sm font-semibold">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl outline-none focus:border-primary transition-all duration-300 bg-white bg-opacity-80 hover:border-gray-300 group-hover:shadow-md"
                placeholder="Enter your email address"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary hover:to-primary text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group mb-6"
          >
            <MdVpnKey className="group-hover:rotate-12 transition-transform duration-300" />
            Reset Password
          </button>

          {/* Back to Login Link */}
          <Link className="flex justify-center" href="/login">
            <span className="text-primary font-bold cursor-pointer">
              Go to Login
            </span>
          </Link>
        </form>

        {/* Footer Links */}
        <div className="flex flex-col items-center gap-4 px-6 md:px-8 lg:px-12 xl:px-16 w-full z-10">
          <p className="text-sm text-darker text-center">
            Don't have an account?{" "}
            <Link href="/register" className="group">
              <span className="text-primary font-bold hover:text-emerald-600 transition-colors duration-300 relative">
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
