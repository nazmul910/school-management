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
        toast.error(error.response.data.message);
      });
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <DashboardTitle
        blackText="Change"
        greenText="Password"
        className="text-center"
      />

      <form
        onClick={() => setError(false)}
        className="max-xl mx-auto px-3 mt-10"
        onSubmit={handleSubmit(onPasswordSubmit)}
      >
        <section className="w-full">
          <label className="text-dark text-sm">
            Old Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            {...register("oldPassword", { required: true })}
            className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
              errors.oldPassword && "border border-red-500"
            }`}
          />
        </section>

        {/* New Password */}
        <section className="w-full">
          <label className="text-dark text-sm">
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
              errors.password && "border border-red-500"
            }`}
          />
        </section>

        {/* Confirm Password */}
        <section className="w-full">
          <label className="text-dark text-sm">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            {...register("confirm", { required: true })}
            className={`w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${
              errors.confirm && "border border-red-500"
            }`}
          />
        </section>

        {error && <p className="text-red-500">Password did not match</p>}

        {/* Submit */}
        <input
          className="mt-3 text-center px-3 md:px-5 py-1 md:py-3 bg-primary duration-300 rounded-lg text-white cursor-pointer"
          type="submit"
          value="Save Changes"
        />
      </form>
    </section>
  );
};

export default ChangePassword;
