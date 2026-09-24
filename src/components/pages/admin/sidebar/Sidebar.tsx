"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Layers,
  Settings,
  LogOut,
  Store,
} from "lucide-react"; // برای آیکون‌ها از lucide-react استفاده شده است

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: number | string;
}

const navItems: NavItem[] = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "محصولات",
    href: "/admin/productManagement",
    icon: Package,
  },
  {
    title: "سفارش‌ها",
    href: "/admin/orders",
    icon: ShoppingBag,
    badge: "جدید",
  },
  {
    title: "دسته‌بندی‌ها",
    href: "/admin/categories",
    icon: Layers,
  },
  {
    title: "کاربران",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "تنظیمات",
    href: "/admin/settings",
    icon: Settings,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col justify-between border-l border-slate-800 select-none">
      {/* بخش هدر سایدبار و لوگو */}
      <div>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/30">
              PC
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-wide">
                PCSAM
              </h1>
              <p className="text-xs text-slate-400">پنل مدیریت فروشگاه</p>
            </div>
          </div>
        </div>

        {/* لیست منوها */}
        <nav className="p-4 space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-500 px-3 py-2">
            منوی اصلی
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />
                  <span>{item.title}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* بخش پایین: مشاهده فروشگاه و خروج */}
      <div className="p-4 border-t border-slate-800/80 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 transition-colors"
        >
          <Store className="w-5 h-5 text-slate-400" />
          <span>مشاهده سایت</span>
        </Link>

        <button
          onClick={() => {
            // عملکرد خروج
            console.log("خروج از حساب");
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
