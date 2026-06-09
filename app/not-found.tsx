"use client";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* دایره‌های تزیینی برای زیبایی پس‌زمینه */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="z-10 text-center px-4">
        {/* شماره 404 با استایل گلس‌مورفیسم */}
        <h1 className="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 leading-none select-none drop-shadow-sm">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-4">
          اوپس! گم شدی؟
        </h2>

        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          انگار این صفحه ناپدید شده یا آدرس رو اشتباه اومدی. بیا برگردیم به جای
          امن!
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            dir="ltr"
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-700 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
          >
            بازگشت به خانه
            <span className="ml-2 transition-transform group-hover:translate-x-1 font-black text-2xl">
              →
            </span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 font-medium text-gray-700 dark:text-gray-300 transition-all hover:text-blue-600"
          >
            صفحه قبلی
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
