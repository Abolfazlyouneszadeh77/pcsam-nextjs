"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { HiUser, HiPhone, HiEnvelope, HiMapPin } from "react-icons/hi2";
import { toast } from "react-toastify";
import { InputField } from "../../common/inputField/InputField";

interface UserFormValues {
  name: string;
  mobile: string;
  email: string;
  province?: string;
  city?: string;
  postalCode?: string;
}

const EditUserInfo = ({ userData, setUserData, setIsEditInfo }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      name: userData.name,
      mobile: userData.mobile,
      email: userData.email,
      province: userData.province || "",
      city: userData.city || "",
      postalCode: userData.postalCode || "",
    },
  });

  const onSubmit = (data: UserFormValues) => {
    const confirmed = window.confirm("آیا از ذخیره تغییرات اطمینان دارید؟");
    if (!confirmed) return;
    
    const storedUsers = JSON.parse(localStorage.getItem("all-users") || "[]");
    const confirmedUser = localStorage.getItem("confirmed-user");

    const updatedUsers = storedUsers.map((u: any) => {
      if (u.name === confirmedUser) {
        return { ...u, ...data };
      }
      return u;
    });

    localStorage.setItem("all-users", JSON.stringify(updatedUsers));

    if (data.name !== confirmedUser) {
      localStorage.setItem("confirmed-user", data.name);
    }

    setUserData({ ...userData, ...data });
    setIsEditInfo(false);
    toast.success("ویرایش اطلاعات کاربری با موفقیت انجام شد.");
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-900 border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">
          ویرایش اطلاعات شخصی
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            icon={<HiUser size={20} />}
            label="نام کامل"
            {...register("name", { required: "وارد کردن نام الزامی است" })}
            error={errors.name?.message}
          />

          <InputField
            icon={<HiPhone size={20} />}
            label="موبایل"
            {...register("mobile", { required: "وارد کردن موبایل الزامی است" })}
            error={errors.mobile?.message}
          />

          <InputField
            icon={<HiEnvelope size={20} />}
            label="ایمیل"
            {...register("email", {
              required: "وارد کردن ایمیل الزامی است",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "ایمیل معتبر نیست",
              },
            })}
            error={errors.email?.message}
          />

          <InputField
            icon={<HiMapPin size={20} />}
            label="استان"
            {...register("province")}
          />

          <InputField
            icon={<HiMapPin size={20} />}
            label="شهر"
            {...register("city")}
          />

          <InputField
            icon={<HiMapPin size={20} />}
            label="کد پستی"
            {...register("postalCode")}
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsEditInfo(false)}
            className="px-6 py-2.5 text-sm text-slate-600 dark:text-slate-300 border border-gray-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            انصراف
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition"
          >
            ذخیره تغییرات
          </button>
        </div>
      </form>
    </div>
  );
};

InputField.displayName = "InputField";

export default EditUserInfo;
