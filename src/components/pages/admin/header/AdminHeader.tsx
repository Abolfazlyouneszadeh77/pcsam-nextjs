"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Bell, Plus, ChevronDown } from "lucide-react";

interface AdminHeaderProps {
  adminName?: string;
  adminRole?: string;
  avatarUrl?: string;
}

const AdminHeader = ({
  adminName = "یونس ادمین",
  adminRole = "مدیر ارشد",
  avatarUrl,
}: AdminHeaderProps) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm/10">
      {/* سمت راست: نوار جستجوی هوشمند در پنل */}
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="جستجو در سفارش‌ها، محصولات و..."
            className="w-full bg-slate-50 text-slate-700 text-sm rounded-xl pr-10 pl-4 py-2.5 border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* سمت چپ: دکمه افزودن، نوتیفیکیشن و پروفایل */}
      <div className="flex items-center gap-4">
        {/* دکمه اکشن سریع برای رفتن به صفحه افزودن محصول */}
        <Link
          href="/admin/products/new"
          className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>محصول جدید</span>
        </Link>

        {/* دکمه زنگوله اعلان‌ها */}
        <button
          className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="اعلان‌ها"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
        </button>

        {/* خط جداکننده */}
        <div className="h-8 w-px bg-slate-200" />

        {/* اطلاعات پروفایل ادمین */}
        <div className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="relative">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={adminName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {adminName.slice(0, 2)}
              </div>
            )}
            {/* دات وضعیت آنلاین */}
            <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div className="text-right hidden md:block">
            <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
              {adminName}
            </h4>
            <p className="text-[11px] text-slate-400 font-medium">{adminRole}</p>
          </div>

          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:translate-y-0.5 hidden md:block" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
