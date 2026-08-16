"use client";

import { handleLogout } from "@/app/providers/AuthContext";
import useAxios from "@/hooks/useAxios";
import DashboardTitle from "@/utils/DashboardTitle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IFormInput {
  oldPassword: string;
  password: string;
  confirm: string;
}

const ChangePassword = () => {
  const axiosSecure = useAxios();
  const router = useRouter();
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  // Password Submit Function
  const onPasswordSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data.password !== data.confirm) {
      setError(true);
      reset();
      return;
    }
    const updateData = {
      oldPassword: data.oldPassword,
      newPassword: data.confirm,
    };

    const token = localStorage.getItem("accessToken");
    axiosSecure
      .post("/auth/change-password", updateData, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        toast.success(data.message);
        reset();
        handleLogout(router);
        setTimeout(() => {
          toast.success("Please login to continue!");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <DashboardTitle blackText="Change" greenText="Password" className="text-center" />

        <form
          onClick={() => setError(false)}
          onSubmit={handleSubmit(onPasswordSubmit)}
          className="mt-6 space-y-4"
        >
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Old Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...register("oldPassword", { required: true })}
              className={`mt-1 block w-full border ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              } rounded-md bg-white p-2 text-gray-900 focus:border-primary focus:outline-none`}
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className={`mt-1 block w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md bg-white p-2 text-gray-900 focus:border-primary focus:outline-none`}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...register("confirm", { required: true })}
              className={`mt-1 block w-full border ${
                errors.confirm ? "border-red-500" : "border-gray-300"
              } rounded-md bg-white p-2 text-gray-900 focus:border-primary focus:outline-none`}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">
              Password did not match
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-primary text-white rounded-md hover:bg-[#1d3d7c] transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
