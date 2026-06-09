"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();

  const onSubmit = (data: any) => {
    setIsLoading(true);

    const storedUsers = JSON.parse(localStorage.getItem("all-users") || "[]");
    const confirmedUser = storedUsers.find(
      (u: any) => u.name === data.name && u.password === data.password,
    );

    if (confirmedUser) {
      localStorage.setItem("confirmed-user", confirmedUser.name);
      document.cookie = "authToken=loggedin; path=/";
      toast.success("ورود با موفقیت انجام شد ✅");
      router.replace("/");
    } else {
      toast.error("نام کاربری یا رمز عبور استباه است!");
    }
    setIsLoading(false);
    reset();
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <div className="w-120 py-5 px-10">
          <h2 className="mb-5 pb-3 text-2xl font-semibold text-gray-700 dark:text-white text-center block border-b border-gray-300">
            ورود به سیستم
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                نام کاربری
                <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "نام کاربری الزامی است!" })}
                className="w-full h-10 py-3 px-5 mt-1 rounded-lg outline-blue-500 border-2 border-gray-300 hover:border-blue-400 dark:text-gray-300 placeholder:text-[14px]"
                placeholder="نام کاربری خود را وارد کنید."
              />
              {errors?.name && (
                <span className="text-red-500 mr-5 text-[14px]">
                  {String(errors.name.message)}
                </span>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                رمز عبور
                <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "رمز عبور الزامی است!",
                  minLength: { value: 6, message: "at least 6 charactors!!" },
                })}
                className="w-full h-10 py-3 px-5 mt-1 rounded-lg outline-blue-500 border-2 border-gray-300 hover:border-blue-400 dark:text-gray-300 placeholder:text-[14px]"
                placeholder="رمز عبور خود را وارد کنید."
              />
              {errors?.password && (
                <span className="text-red-500 mr-5 text-[14px]">
                  {String(errors.password.message)}
                </span>
              )}
            </div>

            <div className="flex justify-center gap-5">
              <div
                onClick={() => router.replace("/signup")}
                className="w-full h-10 rounded-lg text-[14px] border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white cursor-pointer flex justify-center items-center gap-3"
              >
                <FaUserPlus size={20} />
                ایجاد حساب
              </div>
              <button
                className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[14px] cursor-pointer flex justify-center items-center gap-3"
                disabled={isLoading}
              >
                <FaSignInAlt size={20} className="scale-x-[-1]" />
                {isLoading ? "در حال ورود..." : "ورود به حساب"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
