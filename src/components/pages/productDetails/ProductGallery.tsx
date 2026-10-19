"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { Products } from "@/src/core/constants/type";

interface ProductGalleryProps {
  // پشتیبانی همزمان از دیتای دیتابیس (Products) و دیتای ماک قبلی
  product:
    | Products
    | {
        title: string;
        picture?: (StaticImageData | string)[];
        pictures?: { id?: number; url: string }[];
      };
  hasDiscount?: boolean;
  discount?: number;
}

const ProductGallery = ({
  product,
  hasDiscount,
  discount,
}: ProductGalleryProps) => {
  // نگهداری ایندکس تصویر انتخاب شده (پیش‌فرض اولین تصویر)
  const [selectedPicIndex, setSelectedPicIndex] = useState<number>(0);

  // استخراج آرایه تصاویر (چه از دیتابیس Prisma و چه از دیتای ماک)
  const images: (string | StaticImageData)[] = React.useMemo(() => {
    if ("pictures" in product && product.pictures && product.pictures.length > 0) {
      return product.pictures.map((p) => p.url);
    }
    if ("picture" in product && Array.isArray(product.picture) && product.picture.length > 0) {
      return product.picture;
    }
    // تصویر جایگزین در صورت نبود هیچ عکسی
    return ["https://picsum.photos/600/600?grayscale"];
  }, [product]);

  // دریافت عکس انتخابی فعلی
  const activeImage = images[selectedPicIndex] || images[0];

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-700/50 flex flex-col items-center justify-between gap-6">
      {/* تصویر اصلی محصول */}
      <div className="relative w-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
        <div className="relative w-full h-80 sm:h-96 flex items-center justify-center rounded-xl overflow-hidden hover:scale-105 transition duration-300">
          <Image
            src={activeImage}
            alt={product.title}
            fill
            className="object-contain"
            priority
          />
        </div>

        {hasDiscount && Boolean(discount) && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3.5 py-1.5 rounded-full text-xs md:text-sm font-bold shadow">
            {discount}% تخفیف
          </div>
        )}

        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="absolute top-4 left-4 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm dark:text-white p-2.5 rounded-full shadow hover:text-red-500 transition"
        >
          <FiHeart size={20} />
        </button>
      </div>

      {/* گالری تصاویر کوچک زیر عکس اصلی (فقط اگر بیش از یک تصویر وجود داشت) */}
      {images.length > 1 && (
        <div className="w-full flex items-center justify-center gap-3 overflow-x-auto pb-2">
          {images.map((imgSrc, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedPicIndex(index)}
              className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white dark:bg-gray-800 ${
                selectedPicIndex === index
                  ? "border-blue-500 shadow-md ring-2 ring-blue-500/20"
                  : "border-gray-200 dark:border-gray-600 hover:border-blue-400 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={imgSrc}
                alt={`${product.title} - تصویر ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
