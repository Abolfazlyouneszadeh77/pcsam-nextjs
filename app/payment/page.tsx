'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { IoIosArrowForward } from "react-icons/io";
import { InputField } from "@/src/components/common/inputField/InputField";

const MapView = dynamic(() => import("@/src/components/pages/profile/MapView"), {
  ssr: false,
});
  
interface UserData {
  name: string;
  email: string;
  mobile: string;
  province: string;
  city: string;
  postalCode: string;
}

const PaymentProgress = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserData>();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("all-users") || "[]");
    const confirmedUser = localStorage.getItem("confirmed-user");
    const user = storedUsers.find((u: any) => u.name === confirmedUser);

    if (user) {
      // مقداردهی اولیه فرم با دیتای دریافتی
      reset(user);
    }
  }, [reset]);

  const onSubmit = (data: UserData) => {
    console.log("Form Submitted:", data);
    // اینجا لاجیک ذخیره‌سازی آدرس جدید رو بنویس
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-5 mb-10">
        {/* breadcrumb */}
        <div className="border-b border-gray-300 mb-10">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500 py-4">
            <Link href="/" className="hover:text-blue-500">خانه</Link>
            <IoIosArrowForward />
            <Link href="/basket" className="hover:text-blue-500">سبد خرید</Link>
            <IoIosArrowForward />
            <span className="text-gray-700 dark:text-gray-300">ادامه فرآیند خرید</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
                اطلاعات ارسال کالا
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* فیلدهای غیرقابل ویرایش */}
                <InputField label="نام کامل" {...register("name")} disabled />
                <InputField label="موبایل" {...register("mobile")} disabled />
                <InputField label="ایمیل" {...register("email")} disabled />

                {/* فیلدهای قابل ویرایش */}
                <InputField 
                    label="استان"
                    required= {true}
                    {...register("province", { required: "استان الزامی است" })} 
                    error={errors.province?.message} 
                />
                <InputField 
                    label="شهر"
                    required= {true}
                    {...register("city", { required: "شهر الزامی است" })} 
                    error={errors.city?.message} 
                />
                <InputField 
                    label="کد پستی"
                    required= {true}
                    {...register("postalCode", { required: "کد پستی الزامی است" })} 
                    error={errors.postalCode?.message} 
                />
              </div>
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm mt-10">
              <h3 className="text-lg text-gray-700 font-medium mb-5">موقعیت مکانی شما</h3>
              <MapView />
            </div>

              <div className="mt-8 flex justify-end">
                <button type="submit" className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
                    ثبت و ادامه خرید
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
};

export default PaymentProgress;
