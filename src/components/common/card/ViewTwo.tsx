import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { TbEditCircle } from "react-icons/tb";
import { HiOutlineEye } from "react-icons/hi";
import { FiCalendar, FiTag } from "react-icons/fi";
import img from "@/public/6cfa8dd07fc8d75e165ad8c2618128b545a1b55d_1777363056.webp";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

const ViewTwo = ({ product, onEdit, onDelete }: any) => {
  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="w-full h-24 rounded-lg bg-white dark:bg-blue-950 shadow-[0px_1px_10px_0_rgba(0,0,0,0.2)] p-5 flex items-center justify-between hover:shadow-blue-300 transition-shadow duration-200">
      <div className="flex gap-10 items-center text-gray-700 dark:text-white">
        <div className="w-20 h-20 relative">
          <Image
            src={img}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {product.discount && (
            <div className="absolute -top-2 -right-5 pt-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
              {product.discount}%
            </div>
          )}
        </div>

        {product.title}

        <div className="text-[14px] text-gray-500 flex items-center gap-3">
          <FiCalendar size={20} />
          {product.date}
        </div>

        <div className="text-[14px] text-gray-500 flex items-center gap-3">
          <HiOutlineEye size={20} />
          {product.viewCount.toLocaleString()}
        </div>

        <div className="flex items-center gap-2 ">
          <FiTag size={20} className="text-gray-500" />

          {product.discount ? (
            <div className="flex items-center gap-2">
              <span className="line-through text-gray-400 text-sm">
                {product.price.toLocaleString()}
              </span>

              <span className="text-red-500 font-bold">
                {finalPrice.toLocaleString()}
              </span>

              <span className="text-xs text-gray-500">تومان</span>
            </div>
          ) : (
            <span className="font-bold">
              {product.price.toLocaleString()} تومان
            </span>
          )}
        </div>
      </div>

      <div className="flex">
        <Link
          href={`/products/${product.id}`}
          className="text-blue-500 text-[13px] flex items-center gap-1"
        >
          نمایش محصول
          <IoIosArrowBack size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ViewTwo;
