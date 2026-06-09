import React from "react";
import Image from "next/image";
import productImage from "@/public/6cfa8dd07fc8d75e165ad8c2618128b545a1b55d_1777363056.webp";
import { Product } from "@/src/core/constants/types";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineEye } from "react-icons/hi";
import { FiCalendar, FiTag } from "react-icons/fi";
interface CardProps {
  product: Product;
}

const ViewOne = ({ product }: CardProps) => {
  return (
    <div className="w-65 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg overflow-hidden hover:shadow-blue-300 transition-shadow duration-200">
      <div className="relative">
        <Image src={productImage} alt={product.title} className="rounded-lg" />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold pt-2">
            {product.discount}%
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          {product.title}
        </h3>
        <div className="text-[14px] text-gray-500 flex items-center gap-3">
          <FiCalendar size={20} />
          {product.date.toLocaleString()}
        </div>
        <div className="text-[14px] text-gray-500 flex gap-2">
          <HiOutlineEye size={22} />
          {product.viewCount.toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
          <FiTag size={20} className="text-gray-500" />
          <div className="flex items-center">
            {product.discount ? (
              <>
                <span className="text-gray-400 line-through text-sm ml-2">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-red-500 font-bold">
                  {(
                    product.price *
                    (1 - product.discount / 100)
                  ).toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-gray-800 dark:text-gray-200 font-bold">
                {product.price.toLocaleString()}
              </span>
            )}
            <span className="text-xs text-gray-500 mr-1">تومان</span>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Link
            href={`/products/${product.id}`}
            className="text-blue-500 text-[13px] flex items-center gap-1"
          >
            نمایش محصول
            <IoIosArrowBack size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewOne;
