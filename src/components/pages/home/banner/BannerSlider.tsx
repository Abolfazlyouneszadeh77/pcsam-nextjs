"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: "تخفیف ویژه تابستانه",
      subtitle: "تا ۵۰٪ تخفیف برای محصولات منتخب",
      discount: "۵۰٪",
      type: "discount",
      buttonText: "مشاهده محصولات",
      buttonLink: "/products",
      color: "from-red-500 to-orange-500",
    },
    {
      id: 2,
      title: "جشنواره پاییزه",
      subtitle: "خرید با کمترین قیمت",
      discount: "۳۰٪",
      type: "discount",
      buttonText: "همین حالا بخرید",
      buttonLink: "/offers",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "خبر ویژه",
      subtitle: "رونمایی از محصولات جدید",
      description: "محصولات جدید هفته آینده عرضه می‌شوند",
      type: "news",
      buttonText: "بیشتر بدانید",
      buttonLink: "/news",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 4,
      title: "ارسال رایگان",
      subtitle: "برای خرید بالای ۱ میلیون تومان",
      discount: "ارسال رایگان",
      type: "offer",
      buttonText: "مشاهده شرایط",
      buttonLink: "/shipping",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // پخش خودکار
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentBanner = banners[currentSlide];

  return (
    <div
      dir="rtl"
      className="relative w-full overflow-hidden shadow-xl"
    >
      {/* اسلایدر */}
      <div className="relative h-100 md:h-125 lg:h-100">
        <div
          className={`relative h-full w-full bg-linear-to-r ${currentBanner.color} transition-all duration-700`}
        >
          {/* محتوا */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
            {/* برچسب */}
            <div className="animate-bounce rounded-full bg-white/20 px-4 py-1 text-sm font-semibold backdrop-blur-sm">
              {currentBanner.type === "discount" && "🔥 تخفیف ویژه"}
              {currentBanner.type === "news" && "📢 اخبار جدید"}
              {currentBanner.type === "offer" && "🎁 پیشنهاد شگفت‌انگیز"}
            </div>

            {/* عنوان */}
            <h2 className="mt-4 text-3xl font-bold md:text-4xl lg:text-6xl">
              {currentBanner.title}
            </h2>

            {/* تخفیف */}
            {currentBanner.discount && (
              <div className="my-4">
                <span className="inline-block rounded-full bg-white/20 px-6 py-3 text-2xl font-black backdrop-blur-sm md:text-3xl lg:text-5xl">
                  {currentBanner.discount} تخفیف
                </span>
              </div>
            )}

            {/* زیرنویس */}
            <p className="mb-6 text-lg md:text-xl lg:text-2xl">
              {currentBanner.subtitle}
            </p>

            {currentBanner.description && (
              <p className="mb-6 text-base md:text-lg">
                {currentBanner.description}
              </p>
            )}

            {/* دکمه */}
            <Link
              href={currentBanner.buttonLink}
              className="group relative overflow-hidden rounded-full bg-white px-6 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl md:px-8 md:py-3 md:text-base"
            >
              <span className="relative z-10">{currentBanner.buttonText}</span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>
      </div>

      {/* دکمه قبلی */}
      <button
        onClick={nextSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-200 rounded-full bg-black/30 p-2 text-white transition-all hover:bg-black/50 hover:scale-110 md:left-6 md:p-3 cursor-pointer"
      >
        <svg
          className="h-6 w-6 md:h-8 md:w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* دکمه بعدی */}
      <button
        onClick={prevSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-200 rounded-full bg-black/30 p-2 text-white transition-all hover:bg-black/50 hover:scale-110 md:right-6 md:p-3 cursor-pointer"
      >
        <svg
          className="h-6 w-6 md:h-8 md:w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* دات‌های ناوبری */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-201">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2  rounded-full transition-all duration-300  ${
              currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
