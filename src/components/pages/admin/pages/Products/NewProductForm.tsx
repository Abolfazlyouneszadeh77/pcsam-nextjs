"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { Loader2, UploadCloud, Trash2, CheckCircle2 } from "lucide-react";
import axios from "axios";

interface NewProductFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export interface SpecInput {
  key: string;
  value: string;
}

export interface PictureInput {
  url: string;
}

export interface FormInputs {
  title: string;
  slug: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  categoryId: number;
  brandId?: number | null;
  pictures: PictureInput[];
  specs: SpecInput[];
}

const MAX_IMAGES = 5;

const NewProductForm = ({
  isOpen,
  setIsOpen,
  onSuccess,
}: NewProductFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      title: "",
      slug: "",
      price: 0,
      discount: 0,
      stock: 1,
      description: "",
      categoryId: 1, // آی‌دی پیش‌فرض
      brandId: 1,
      pictures: [],
      specs: [
        { key: "پردازنده", value: "" },
        { key: "رم", value: "" },
        { key: "حافظه", value: "" },
      ],
    },
  });

  const pictures = watch("pictures") || [];

  // مدیریت مشخصات فنی پویا (specs)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specs",
  });

  // هندلر آپلود چند عکس در Vercel Blob
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // بررسی سقف مجاز ۵ تصویر
    if (pictures.length + files.length > MAX_IMAGES) {
      setUploadError(`شما حداکثر می‌توانید ${MAX_IMAGES} تصویر اضافه کنید.`);
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);

      const uploadedUrls: string[] = [];

      for (const file of files) {
        if (file.size > 4.5 * 1024 * 1024) {
          setUploadError(`حجم فایل ${file.name} بیشتر از ۴.۵ مگابایت است.`);
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data?.url) {
          uploadedUrls.push(response.data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        const currentPics = watch("pictures") || [];
        const newPictures = [
          ...currentPics,
          ...uploadedUrls.map((url) => ({ url })),
        ];
        setValue("pictures", newPictures, { shouldValidate: true });
      }
    } catch (err: any) {
      console.error("خطا در آپلود عکس:", err);
      setUploadError(
        err.response?.data?.error || "آپلود تصویر با خطا مواجه شد."
      );
    } finally {
      setIsUploading(false);
      e.target.value = ""; // ریست اینپوت برای امکان انتخاب مجدد
    }
  };

  // حذف تک عکس از لیست و استوریج
  const handleRemoveImage = async (indexToRemove: number, urlToRemove: string) => {
    try {
      if (urlToRemove.includes("public.blob.vercel-storage.com")) {
        await axios.delete(`/api/upload?url=${encodeURIComponent(urlToRemove)}`);
      }
    } catch (err) {
      console.error("خطا در حذف فیزیکی عکس:", err);
    } finally {
      const updatedPictures = pictures.filter((_, idx) => idx !== indexToRemove);
      setValue("pictures", updatedPictures, { shouldValidate: true });
    }
  };

  // بستن سایدبار و پاکسازی عکس‌های آپلود شده ذخیره‌نشده
  const handleCloseSidebar = async () => {
    // اگر تصاویری آپلود شده بودند اما فرم ثبت نهایی نشد، همه را از Blob پاک می‌کنیم
    if (pictures.length > 0) {
      for (const pic of pictures) {
        if (pic.url.includes("public.blob.vercel-storage.com")) {
          try {
            await axios.delete(`/api/upload?url=${encodeURIComponent(pic.url)}`);
          } catch (err) {
            console.error("خطا در حذف عکس هنگام انصراف:", err);
          }
        }
      }
    }

    reset();
    setUploadError(null);
    setIsOpen(false);
  };

  // ارسال داده به API محصولات
  const onSubmit = async (data: FormInputs) => {
    try {
      const payload = {
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/\s+/g, "-"),
        price: Number(data.price),
        discount: Number(data.discount || 0),
        stock: Number(data.stock),
        description: data.description,
        categoryId: Number(data.categoryId),
        brandId: data.brandId ? Number(data.brandId) : null,
        pictures: data.pictures.map((pic) => ({ url: pic.url })),
        specs: data.specs.filter((s) => s.key.trim() && s.value.trim()),
      };

      const response = await axios.post("/api/products", payload);

      if (response.status === 200 || response.status === 201) {
        reset();
        setIsOpen(false);
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      console.error("خطا در ثبت محصول:", error);
      setError("root", {
        type: "manual",
        message:
          error.response?.data?.message ||
          "مشکلی در ثبت محصول به وجود آمد. لطفاً اطلاعات را بررسی کنید.",
      });
    }
  };

  return (
    <>
      {/* اوورلی پس‌زمینه */}
      <div
        onClick={handleCloseSidebar}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* کشو از سمت چپ */}
      <aside
        className={`fixed top-0 left-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* هدر */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              افزودن محصول جدید
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              ثبت محصول همراه با آپلود حداکثر ۵ تصویر در Vercel Blob
            </p>
          </div>
          <button
            onClick={handleCloseSidebar}
            type="button"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* فرم مشخصات */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-4 text-sm"
        >
          {errors.root && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
              {errors.root.message}
            </div>
          )}

          {/* عنوان و اسلاگ */}
          <div className="space-y-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                عنوان محصول <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="مثلاً لپ‌تاپ ایسوس ویووبوک 16X"
                {...register("title", { required: "عنوان محصول الزامی است" })}
                className={`w-full p-2.5 border rounded-xl focus:outline-none transition ${
                  errors.title
                    ? "border-red-500 ring-2 ring-red-100"
                    : "border-slate-200 focus:border-blue-500"
                }`}
              />
              {errors.title && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                نام انگلیسی / Slug (اختیاری)
              </label>
              <input
                type="text"
                placeholder="asus-vivobook-16x"
                dir="ltr"
                {...register("slug")}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition text-left"
              />
            </div>
          </div>

          {/* قیمت، تخفیف و موجودی */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                قیمت (تومان) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="58500000"
                {...register("price", { required: "قیمت الزامی است", min: 0 })}
                className={`w-full p-2.5 border rounded-xl focus:outline-none transition ${
                  errors.price
                    ? "border-red-500 ring-2 ring-red-100"
                    : "border-slate-200 focus:border-blue-500"
                }`}
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                تخفیف (%)
              </label>
              <input
                type="number"
                placeholder="10"
                {...register("discount", { min: 0, max: 100 })}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                موجودی <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="8"
                {...register("stock", {
                  required: "موجودی الزامی است",
                  min: 0,
                })}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* دسته‌بندی و برند */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                دسته‌بندی
              </label>
              <select
                {...register("categoryId", { required: true })}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white transition"
              >
                <option value={1}>لپ‌تاپ</option>
                <option value={2}>قطعات کامپیوتر</option>
                <option value={3}>مانیتور</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                برند
              </label>
              <select
                {...register("brandId")}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white transition"
              >
                <option value="">بدون برند</option>
                <option value={1}>ایسوس (ASUS)</option>
                <option value={2}>ال‌جی (LG)</option>
                <option value={3}>اپل (Apple)</option>
                <option value={4}>لنوو (Lenovo)</option>
                <option value={5}>اچ‌پی (HP)</option>
                <option value={6}>دل (Dell)</option>
              </select>
            </div>
          </div>

          {/* بخش آپلود تصاویر محصول (تا ۵ عکس) */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-medium text-slate-700">
                تصاویر محصول
              </label>
              <span className="text-xs text-slate-500 font-medium">
                {pictures.length} از {MAX_IMAGES} تصویر
              </span>
            </div>

            {uploadError && (
              <p className="text-xs text-red-500 mb-2 font-medium">
                {uploadError}
              </p>
            )}

            <div className="space-y-3">
              {/* باکس آپلودر */}
              {pictures.length < MAX_IMAGES && (
                <label
                  className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 transition cursor-pointer ${
                    isUploading
                      ? "border-blue-300 bg-blue-50/50 pointer-events-none"
                      : "border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/20"
                  }`}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2 text-blue-600 py-2">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="text-xs font-semibold">
                        در حال بارگذاری در Vercel Blob...
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-slate-600 py-1">
                      <UploadCloud className="w-7 h-7 text-blue-500 mb-1" />
                      <span className="text-xs font-semibold text-slate-700">
                        برای انتخاب و آپلود تصاویر کلیک کنید
                      </span>
                      <span className="text-[11px] text-slate-400">
                        PNG, JPG, WEBP (حداکثر ۵ تصویر، هر فایل زیر ۴.۵ مگابایت)
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              )}

              {/* پیش‌نمایش لیست تصاویر آپلود شده */}
              {pictures.length > 0 && (
                <div className="space-y-2">
                  {pictures.map((pic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-white">
                          <Image
                            src={pic.url}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="overflow-hidden">
                          <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                            <CheckCircle2 size={13} />
                            <span>
                              تصویر {index + 1} {index === 0 && "(تصویر شاخص)"}
                            </span>
                          </div>
                          <p
                            dir="ltr"
                            title={pic.url}
                            className="text-[11px] text-slate-400 truncate max-w-60 text-left mt-0.5"
                          >
                            {pic.url}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index, pic.url)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition shrink-0"
                        title="حذف تصویر"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* مشخصات فنی پویا (specs) */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-800">
                مشخصات فنی (Specs)
              </label>
              <button
                type="button"
                onClick={() => append({ key: "", value: "" })}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-2.5 py-1.5 rounded-lg transition"
              >
                <FaPlus size={10} /> افزودن ویژگی
              </button>
            </div>

            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="عنوان (مثلا: رم)"
                    {...register(`specs.${index}.key` as const)}
                    className="w-1/3 p-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="مقدار (مثلا: 16GB DDR5)"
                    {...register(`specs.${index}.value` as const)}
                    className="flex-1 p-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-slate-400 hover:text-red-500 transition"
                    >
                      <FaTrash size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* توضیحات */}
          <div className="pt-2">
            <label className="block font-medium text-slate-700 mb-1">
              توضیحات محصول
            </label>
            <textarea
              rows={3}
              placeholder="توضیحات کامل درباره محصول..."
              {...register("description")}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* دکمه‌ها */}
          <div className="pt-4 flex gap-3 sticky bottom-0 bg-white py-2 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2.5 rounded-xl transition shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>در حال ثبت...</span>
                </>
              ) : (
                "ثبت و ذخیره محصول"
              )}
            </button>
            <button
              type="button"
              onClick={handleCloseSidebar}
              disabled={isSubmitting || isUploading}
              className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition"
            >
              انصراف
            </button>
          </div>
        </form>
      </aside>
    </>
  );
};

export default NewProductForm;
