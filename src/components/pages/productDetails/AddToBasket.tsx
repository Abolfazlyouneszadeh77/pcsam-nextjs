"use client";

import React from "react";
import { useBasketStore } from "@/src/store/basketStore";
import { Products } from "@/src/core/constants/type";
import { FiPlus, FiMinus, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

interface Props {
  // پشتیبانی از تایپ جدید دیتابیس و تایپ‌های دیگر
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: Products | any;
}

const AddToBasket = ({ product }: Props) => {
  const { basket, addToBasket, removeFromBasket } = useBasketStore();

  const item = basket.find((i) => i.id === product.id);
  const quantity = item?.quantity || 0;

  // بررسی وضعیت موجودی کالا
  const isOutOfStock = product.inStock === false || (typeof product.stock === "number" && product.stock <= 0);

  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-4">
      <div className="w-full">
        {isOutOfStock ? (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed font-medium text-sm"
          >
            ناموجود در انبار
          </button>
        ) : quantity === 0 ? (
          <button
            type="button"
            onClick={() => addToBasket(product)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all active:scale-[0.98] shadow-blue-200 dark:shadow-blue-950 shadow-lg cursor-pointer"
          >
            <FiShoppingBag size={18} />
            <span className="font-medium text-sm">افزودن به سبد</span>
          </button>
        ) : (
          <div className="w-full max-w-50 mx-auto flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-xl p-1.5 bg-gray-50 dark:bg-gray-800/50">
            <button
              type="button"
              onClick={() => addToBasket(product)}
              disabled={typeof product.stock === "number" && quantity >= product.stock}
              className="p-2 text-green-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="افزایش تعداد"
            >
              <FiPlus size={18} />
            </button>

            <span className="font-bold text-gray-700 dark:text-gray-200 tabular-nums">
              {quantity.toLocaleString("fa-IR")}
            </span>

            <button
              type="button"
              onClick={() => removeFromBasket(product.id)}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="کاهش تعداد"
            >
              <FiMinus size={18} />
            </button>
          </div>
        )}
      </div>

      <Link
        href="/basket"
        className="w-full border border-gray-200 dark:border-gray-700 dark:text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium text-sm"
      >
        <FiShoppingCart size={18} />
        مشاهده سبد خرید
      </Link>
    </div>
  );
};

export default AddToBasket;
