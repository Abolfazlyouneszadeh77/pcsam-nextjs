import React from "react";
import { HiOutlineEye } from "react-icons/hi";
import { FiCalendar, FiTag } from "react-icons/fi";
import img from "@/public/6cfa8dd07fc8d75e165ad8c2618128b545a1b55d_1777363056.webp";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

const ViewTwo = ({ product }: any) => {
  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="w-full rounded-xl bg-white dark:bg-blue-950 shadow-[0px_1px_10px_0_rgba(0,0,0,0.2)] p-4 sm:p-5 transition-shadow duration-200 hover:shadow-blue-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 lg:gap-8 min-w-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
            <Image
              src={img}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
            />
            {product.discount && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-bold">
                {product.discount}%
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 dark:text-white truncate">
              {product.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-gray-500 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <FiCalendar size={18} />
                <span>{product.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <HiOutlineEye size={18} />
                <span>{product.viewCount.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiTag size={18} />
                {product.discount ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="line-through text-gray-400 text-xs sm:text-sm">
                      {product.price.toLocaleString()}
                    </span>
                    <span className="text-red-500 font-bold text-sm sm:text-base">
                      {finalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">تومان</span>
                  </div>
                ) : (
                  <span className="font-bold text-gray-700 dark:text-white">
                    {product.price.toLocaleString()} تومان
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-start lg:justify-end shrink-0">
          <Link
            href={`/products/${product.id}`}
            className="text-blue-500 text-sm flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            نمایش محصول
            <IoIosArrowBack size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewTwo;
