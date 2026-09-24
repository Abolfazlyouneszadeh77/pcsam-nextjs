"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { Loader2 } from "lucide-react";
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

export interface FormInputs {
  title: string;
  slug: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  categoryId: number;
  brandId?: number | null;
  imageUrl?: string;
  specs: SpecInput[];
}

const EditProductForm = ({
  isOpen,
  setIsOpen,
  product,
  onSuccess,
}: EditProductFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
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
      imageUrl: "",
      specs: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specs",
  });

  // پر کردن فرم به محض تغییر یا انتخاب محصول
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
        imageUrl:
          product.pictures && product.pictures.length > 0
            ? product.pictures[0].url
            : "",
        specs:
          product.specs && product.specs.length > 0
            ? product.specs.map((s: any) => ({
                key: s.key || s.name || "",
                value: s.value || "",
              }))
            : [
                { key: "پردازنده", value: "" },
                { key: "رم", value: "" },
                { key: "حافظه", value: "" },
              ],
      });
    }
  }, [product, isOpen, reset]);

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
        pictures: data.imageUrl ? [{ url: data.imageUrl }] : [],
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
          error.response?.data?.error ||
          error.response?.data?.message ||
          "مشکلی در ویرایش محصول پیش آمد. لطفاً اطلاعات را بررسی کنید.",
      });
    }
  };

  const handleClose = () => {
    reset();
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

      {/* کشو از سمت چپ */}
      <aside
        className={`fixed top-0 left-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* هدر */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">ویرایش محصول</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              شناسه محصول: {product?.id}
            </p>
          </div>
          <button
            onClick={handleClose}
            type="button"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* بدنه فرم */}
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
                عنوان محصول
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
                قیمت (تومان)
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
                موجودی انبار
              </label>
              <input
                type="number"
                placeholder="8"
                {...register("stock", { required: "موجودی الزامی است", min: 0 })}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* انتخاب دسته‌بندی و برند */}
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
              <label className="block font-medium text-slate-700 mb-1">برند</label>
              <select
                {...register("brandId")}
                className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white transition"
              >
                <option value="">بدون برند</option>
                <option value={1}>ایسوس (ASUS)</option>
                <option value={2}>ال‌جی (LG)</option>
                <option value={3}>اپل (Apple)</option>
                <option value={4}>لنوو (Lenovo)</option>
              </select>
            </div>
          </div>

          {/* آدرس تصویر اصلی */}
          <div className="pt-2">
            <label className="block font-medium text-slate-700 mb-1">
              لینک تصویر اصلی (URL)
            </label>
            <input
              type="url"
              dir="ltr"
              placeholder="https://picsum.photos/seed/laptop1/800/600"
              {...register("imageUrl")}
              className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition text-left"
            />
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
              disabled={isSubmitting}
              className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold py-2.5 rounded-xl transition shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>در حال ذخیره...</span>
                </>
              ) : (
                "ذخیره تغییرات"
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
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

export default EditProductForm;
