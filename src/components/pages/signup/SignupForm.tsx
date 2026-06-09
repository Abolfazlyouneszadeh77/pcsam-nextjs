"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
interface authUserType {
  id: number;
  name: string;
  password: string;
  email: string;
  mobile: string;
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<authUserType>();
  const router = useRouter();

  const onSubmit = (data: authUserType) => {
    // گرفتن کاربران قبلی
    const existingUsers = JSON.parse(
      localStorage.getItem("all-users") || "[]",
    );

    // بررسی تکراری نبودن نام کاربری
    const userExists = existingUsers.find(
      (u: authUserType) => u.name === data.name,
    );

    if (userExists) {
      toast.error("این نام کاربری قبلا ثبت شده است!");
      return;
    }

    // اضافه کردن کاربر جدید
    const updatedUsers = [...existingUsers, data];

    localStorage.setItem("all-users", JSON.stringify(updatedUsers));

    toast.success("ثبت‌نام با موفقیت انجام شد ✅");
    reset();
    router.replace("/login");
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white mb-6 border-b border-gray-300 pb-3">
          ایجاد حساب کاربری
        </h2>

        {/* name */}
        <div className="mb-4 relative">
          <label className="block mb-1">
            نام کاربری
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name", { required: "نام کاربری اجباری است!" })}
            className="w-full h-10 py-3 px-5 mt-1 rounded-lg outline-blue-500 border-2 border-gray-300 hover:border-blue-400 dark:text-gray-300 placeholder:text-[14px]"
            placeholder="نام کاربری را وارد کنید."
          />
          {errors?.name && (
            <span className="text-red-500 mr-5 text-[14px]">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* email */}
        <div className="mb-4">
          <label className="block mb-1">
            ایمیل
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email", {
              required: "ایمیل اجباری است!",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "ایمیل معتبر نیست!",
              },
            })}
            className="w-full h-10 py-3 px-5 mt-1 rounded-lg outline-blue-500 border-2 border-gray-300 hover:border-blue-400 dark:text-gray-300 placeholder:text-[14px]"
            placeholder="example@email.com"
          />
          {errors?.email && (
            <span className="text-red-500 mr-5 text-[14px]">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* mobile */}
        <div className="mb-4">
          <label className="block mb-1">
            شماره موبایل
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register("mobile", {
              required: "شماره موبایل اجباری است!",
              pattern: {
                value: /^09\d{9}$/,
                message: "شماره موبایل معتبر نیست!",
              },
            })}
            className="w-full h-10 py-3 px-5 mt-1 rounded-lg placeholder:text-[14px] outline-blue-500 border-2 border-gray-300 hover:border-blue-400 dark:text-gray-300"
            placeholder="09123456789"
          />
          {errors?.mobile && (
            <span className="text-red-500 mr-5 text-[14px]">
              {errors.mobile.message}
            </span>
          )}
        </div>

        {/* password */}
        <div className="mb-4 text-black dark:text-white">
          <label className="block mb-1">
            رمز عبور
            <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            {...register("password", {
              required: "رمز عبور اجباری است!",
              minLength: {
                value: 6,
                message: "رمز باید حداقل ۶ کاراکتر باشد!",
              },
            })}
            className="w-full h-10 py-3 px-5  mt-1 rounded-lg placeholder:text-[14px] outline-blue-500 border-2 border-gray-300 hover:border-blue-400 dark:text-gray-300"
            placeholder="رمز عبور خود را وارد کنید."
          />
          {errors?.password && (
            <span className="text-red-500 mr-5 text-[14px]">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex justify-center gap-5 mt-5">
          <div
            onClick={() => router.replace("/login")}
            className="w-full h-10 rounded-lg text-[14px] border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white cursor-pointer flex justify-center items-center gap-4"
          >
            <FaSignInAlt size={20} className="scale-x-[-1]" />
            ورود به حساب
          </div>
          <button className="w-full h-10 pb-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-[14px] text-white cursor-pointer flex justify-center items-center gap-4">
            <FaUserPlus size={20} />
            <span className="mt-1">ثبت‌ نام</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
