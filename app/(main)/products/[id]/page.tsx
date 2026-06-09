import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineEye } from "react-icons/hi";
import { FiCalendar, FiTag, FiShoppingCart, FiHeart } from "react-icons/fi";
import { defaultProducts } from "@/src/core/constants/defaultProducts";
import productImage from "@/public/6cfa8dd07fc8d75e165ad8c2618128b545a1b55d_1777363056.webp";
import AddToBasket from "@/src/components/pages/productDetails/AddToBasket";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const product = defaultProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return notFound();
  }

  const discount = product.discount ?? 0;
  const hasDiscount = discount > 0;

  const finalPrice = hasDiscount
    ? product.price * (1 - discount / 100)
    : product.price;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-15">
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
          جزییات کالا
        </h1>
        <p className="mt-2 text-sm text-slate-500 ">
          جزییات و سفارش کالای انتخاب شده 
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto ">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* تصویر */}
          <div className="relative p-8 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <Image
              src={productImage}
              alt={product.title}
              className="rounded-xl shadow-md hover:scale-105 transition duration-300"
              priority
            />

            {hasDiscount && (
              <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow">
                {discount}% تخفیف
              </div>
            )}

            <button className="absolute top-6 left-6 bg-white dark:bg-gray-800 dark:text-white p-3 rounded-full shadow hover:text-red-500 transition">
              <FiHeart size={20} />
            </button>
          </div>

          {/* اطلاعات */}
          <div className="p-8 flex flex-col">
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {product.title}
              </h1>

              {/* آمار */}
              <div className="flex flex-wrap gap-6 text-gray-500 dark:text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <FiCalendar size={18} className="text-blue-500" />
                  <span>{product.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <HiOutlineEye size={18} className="text-blue-500" />
                  <span>{product.viewCount.toLocaleString()} بازدید</span>
                </div>

                <div className="flex items-center gap-2">
                  <FiTag size={18} className="text-blue-500" />
                  <span>دیجیتال</span>
                </div>
              </div>

              {/* قیمت */}
              <div className="border-y border-gray-100 dark:border-gray-700 py-6">
                <div className="text-gray-500 mb-2">قیمت محصول</div>

                <div className="flex items-end gap-3">
                  {hasDiscount ? (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        {product.price.toLocaleString("fa-IR")}
                      </span>

                      <span className="text-4xl font-black text-red-500">
                        {finalPrice.toLocaleString("fa-IR")}
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-black text-gray-800 dark:text-white">
                      {product.price.toLocaleString("fa-IR")}
                    </span>
                  )}

                  <span className="text-gray-500 mb-1">تومان</span>
                </div>
              </div>

              {/* ویژگی ها */}
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>وضعیت</span>
                  <span className="text-green-500 font-semibold">
                    موجود در انبار
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>دسته بندی</span>
                  <span>محصولات دیجیتال</span>
                </div>

                <div className="flex justify-between">
                  <span>شناسه محصول</span>
                  <span>{product.id}</span>
                </div>
              </div>
            </div>

            {/* دکمه خرید */}

            <AddToBasket product={product} />
          </div>
        </div>

        {/* توضیحات */}
        <div className="mt-10 p-8 bg-white dark:bg-gray-800 border border-gray-200 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-r-4 border-blue-500 pr-3">
            توضیحات محصول
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-8 text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
