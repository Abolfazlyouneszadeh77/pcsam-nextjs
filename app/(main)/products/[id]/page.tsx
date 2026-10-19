"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import { HiOutlineEye } from "react-icons/hi";
import { FiCalendar, FiTag } from "react-icons/fi";
import AddToBasket from "@/src/components/pages/productDetails/AddToBasket";
import ProductGallery from "@/src/components/pages/productDetails/ProductGallery";
import { useGetProducts } from "@/src/core/hooks/useProducts";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = ({ params }: PageProps) => {
  // ۱. باز کردن params طبق استاندارد Next.js 15/16
  const { id } = use(params);

  // ۲. خواندن از دیتای کش‌شده React Query
  const { data: products = [], isLoading } = useGetProducts();

  // ۳. وضعیت لودینگ
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // ۴. پیدا کردن محصول بر اساس id
  const product = products.find((p) => p.id === Number(id));

  // ۵. اگر محصول پس از اتمام لودینگ پیدا نشد
  if (!product) {
    return notFound();
  }

  const discount = product.discount ?? 0;
  const hasDiscount = discount > 0;

  const finalPrice = hasDiscount
    ? product.price * (1 - discount / 100)
    : product.price;

  // قالب‌بندی تاریخ ایجاد محصول
  const formattedDate = product.createdAt
    ? new Date(product.createdAt).toLocaleDateString("fa-IR")
    : "نامشخص";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-15">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* ستون گالری و تصاویر */}
          <ProductGallery
            product={product}
            hasDiscount={hasDiscount}
            discount={discount}
          />

          {/* اطلاعات محصول */}
          <div className="p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {product.title}
              </h1>

              {/* آمار */}
              <div className="flex flex-wrap gap-6 text-gray-500 dark:text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <FiCalendar size={18} className="text-blue-500" />
                  <span>{formattedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <HiOutlineEye size={18} className="text-blue-500" />
                  <span>
                    {(product.viewCount ?? 0).toLocaleString("fa-IR")} بازدید
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FiTag size={18} className="text-blue-500" />
                  <span>{product.category?.name || "محصولات دیجیتال"}</span>
                </div>
              </div>

              {/* قیمت */}
              <div className="border-y border-gray-100 dark:border-gray-700 py-6">
                <div className="text-gray-500 text-sm mb-2">قیمت محصول</div>

                <div className="flex items-end gap-3">
                  {hasDiscount ? (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        {product.price.toLocaleString("fa-IR")}
                      </span>

                      <span className="text-3xl md:text-4xl font-black text-red-500">
                        {finalPrice.toLocaleString("fa-IR")}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white">
                      {product.price.toLocaleString("fa-IR")}
                    </span>
                  )}

                  <span className="text-gray-500 mb-1 text-sm">تومان</span>
                </div>
              </div>

              {/* ویژگی‌ها */}
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>وضعیت انبار</span>
                  {product.inStock ? (
                    <span className="text-green-500 font-semibold">
                      موجود در انبار ({product.stock} عدد)
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">ناموجود</span>
                  )}
                </div>

                {product.brand?.name && (
                  <div className="flex justify-between">
                    <span>برند</span>
                    <span className="font-semibold">{product.brand.name}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>دسته‌بندی</span>
                  <span>{product.category?.name || "دیجیتال"}</span>
                </div>

                <div className="flex justify-between">
                  <span>شناسه محصول</span>
                  <span className="font-mono">{product.id}</span>
                </div>
              </div>
            </div>

            {/* دکمه خرید */}
            <div className="pt-6">
              <AddToBasket product={product} />
            </div>
          </div>
        </div>

        {/* مشخصات فنی داینامیک */}
        {product.specs && product.specs.length > 0 && (
          <div className="mt-8 p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-r-4 border-blue-500 pr-3">
              مشخصات فنی
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm"
                >
                  <span className="text-gray-500 dark:text-gray-400 font-medium">
                    {spec.key}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 font-semibold">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* توضیحات محصول */}
        <div className="mt-8 p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-r-4 border-blue-500 pr-3">
            توضیحات محصول
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-8 text-justify whitespace-pre-line">
            {product.description || "توضیحاتی برای این محصول ثبت نشده است."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
