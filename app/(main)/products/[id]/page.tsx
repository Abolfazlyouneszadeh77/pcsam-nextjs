import React from "react";
import { notFound } from "next/navigation";
import { HiOutlineEye } from "react-icons/hi";
import { FiCalendar, FiTag } from "react-icons/fi";
import { defaultProducts } from "@/src/core/constants/defaultProducts";
import AddToBasket from "@/src/components/pages/productDetails/AddToBasket";
import ProductGallery from "@/src/components/pages/productDetails/ProductGallery";

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
                  <span>{product.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <HiOutlineEye size={18} className="text-blue-500" />
                  <span>
                    {product.viewCount.toLocaleString("fa-IR")} بازدید
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <FiTag size={18} className="text-blue-500" />
                  <span>دیجیتال</span>
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
            <div className="pt-6">
              <AddToBasket product={product} />
            </div>
          </div>
        </div>

        {/* توضیحات */}
        <div className="mt-10 p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
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
