"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTimes, FaTrash } from "react-icons/fa";
import { Loader2, UploadCloud, Trash2, Images } from "lucide-react";
import axios from "axios";
import { Products } from "@/src/core/constants/type";

interface EditProductFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  product: Products | null;
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

const EditProductForm = ({
  isOpen,
  setIsOpen,
  product,
  onSuccess,
}: EditProductFormProps) => {
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
      categoryId: 1,
      brandId: null,
      pictures: [],
      specs: [],
    },
  });

  const pictures = watch("pictures") || [];

  const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
    control,
    name: "specs",
  });

  // پر کردن فرم به محض باز شدن یا تغییر محصول دریافتی
  useEffect(() => {
    if (product && isOpen) {
      reset({
        title: product.title || "",
        slug: product.slug || "",
        price: Number(product.price) || 0,
        discount: Number(product.discount) || 0,
        stock: Number(product.stock) || 0,
        description: product.description || "",
        categoryId: Number(product.categoryId) || 1,
        brandId: product.brandId ? Number(product.brandId) : null,
        pictures:
          product.pictures && product.pictures.length > 0
            ? product.pictures.map((pic: any) => ({ url: pic.url }))
            : [],
        specs:
          product.specs && product.specs.length > 0
            ? product.specs.map((s: any) => ({
                key: s.key || "",
                value: s.value || "",
              }))
            : [{ key: "پردازنده", value: "" }, { key: "رم", value: "" }],
      });
    }
  }, [product, isOpen, reset]);

  // مدیریت آپلود چند تصویر در Vercel Blob
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
          setUploadError(`فایل ${file.name} بیشتر از ۴.۵ مگابایت است.`);
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
      setUploadError("خطایی در آپلود تصویر رخ داد.");
    } finally {
      setIsUploading(false);
      e.target.value = ""; // ریست اینپوت برای امکان انتخاب مجدد
    }
  };

  // حذف عکس از لیست فرم (و استوریج در صورت تمایل)
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

  const onSubmit = async (data: FormInputs) => {
    if (!product?.id) return;

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

      const response = await axios.put(`/api/products/${product.id}`, payload);

      if (response.status === 200) {
        setIsOpen(false);
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      console.error("خطا در ویرایش محصول:", error);
      setError("root", {
        type: "manual",
        message:
          error.response?.data?.message || "مشکلی در ویرایش محصول پیش آمد.",
      });
    }
  };

  const handleClose = () => {
    reset();
    setUploadError(null);
    setIsOpen(false);
  };

  return (
    <>
      {/* اوورلی پس‌زمینه */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* کشوی ویرایش */}
      <aside
        className={`fixed top-0 left-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* هدر */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">ویرایش محصول</h3>
            <p className="text-xs text-slate-500 mt-0.5">شناسه محصول: {product?.id}</p>
          </div>
          <button
            onClick={handleClose}
            type="button"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* فرم */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-4 text-sm"
        >
          {errors.root && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
              {errors.root.message}
            </div>
          )}

          {/* عنوان */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">عنوان محصول</label>
            <input
              type="text"
              {...register("title", { required: "عنوان الزامی است" })}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* قیمت، تخفیف، موجودی */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">قیمت (تومان)</label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="w-full p-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">تخفیف</label>
              <input
                type="number"
                {...register("discount")}
                className="w-full p-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">موجودی</label>
              <input
                type="number"
                {...register("stock", { required: true })}
                className="w-full p-2.5 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* آپلودر تصاویر (تا ۵ عکس) */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-medium text-slate-700">تصاویر محصول</label>
              <span className="text-xs text-slate-500 font-medium">
                {pictures.length} از {MAX_IMAGES} تصویر
              </span>
            </div>

            {uploadError && (
              <p className="text-xs text-red-500 mb-2">{uploadError}</p>
            )}

            {/* دراپ‌زون فقط در صورتی فعال است که کمتر از ۵ عکس داشته باشیم */}
            {pictures.length < MAX_IMAGES && (
              <label
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 cursor-pointer transition ${
                  isUploading
                    ? "border-blue-300 bg-blue-50"
                    : "border-slate-300 hover:border-blue-500 bg-slate-50"
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-1.5">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    <span className="text-xs text-blue-600">در حال آپلود...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5">
                    <UploadCloud className="w-6 h-6 text-slate-400" />
                    <span className="text-xs text-slate-600 font-medium">
                      کلیک کنید یا عکس‌ها را بکشید اینجا
                    </span>
                    <span className="text-[11px] text-slate-400">
                      (فرمت‌های مجاز JPG, PNG, WEBP - حداکثر ۵ تصویر)
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

            {/* گالری لیست تصاویر آپلود شده */}
            {pictures.length > 0 && (
              <div className="mt-3 space-y-2">
                {pictures.map((pic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-white">
                        <Image
                          src={pic.url}
                          alt={`product-img-${index}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-semibold text-slate-700 block">
                          تصویر {index + 1} {index === 0 && "(تصویر اصلی)"}
                        </span>
                        <p
                          dir="ltr"
                          title={pic.url}
                          className="text-[11px] text-slate-400 truncate max-w-52 text-left mt-0.5"
                        >
                          {pic.url}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, pic.url)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition shrink-0"
                      title="حذف تصویر"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* مشخصات فنی */}
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-800">مشخصات فنی</label>
              <button
                type="button"
                onClick={() => appendSpec({ key: "", value: "" })}
                className="text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 font-medium px-2.5 py-1 rounded-lg transition"
              >
                + افزودن مشخصه
              </button>
            </div>
            {specFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <input
                  {...register(`specs.${index}.key` as const)}
                  placeholder="عنوان (مثلاً پردازنده)"
                  className="w-1/3 p-2 border rounded-lg text-xs"
                />
                <input
                  {...register(`specs.${index}.value` as const)}
                  placeholder="مقدار (مثلاً Core i7)"
                  className="flex-1 p-2 border rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(index)}
                  className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* توضیحات */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">توضیحات محصول</label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full p-2.5 border border-slate-200 rounded-xl"
            />
          </div>

          {/* دکمه‌های پایین فرم */}
          <div className="pt-4 flex gap-3 sticky bottom-0 bg-white py-2 border-t">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-2.5 rounded-xl transition shadow-sm"
            >
              {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 border rounded-xl hover:bg-slate-50 text-slate-700"
            >
              انصراف
            </button>
          </div>
        </form>
      </aside>
    </>
  );
};

export default EditProductForm;
