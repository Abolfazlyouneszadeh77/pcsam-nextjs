"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

const navBarData = [
  { title: "خانه", path: "/" },
  { title: "محصولات", path: "/products" },
  { title: "درباره ما", path: "/about" },
  { title: "تماس با ما", path: "/contact" },
];

const VerticalNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      {/* دکمه منو */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 dark:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={38} />}
      </button>

      {/* بک‌دراپ (پشت مودال منو) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* منوی عمودی */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* هدر منو */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
            منو
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* لینک‌ها */}
        <nav className="flex flex-col gap-2 p-4">
          {navBarData.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={index}
                href={item.path}
                onClick={() => setIsOpen(false)} // بستن منو بعد از کلیک
                className={`block px-4 py-2.5 rounded-lg font-semibold text-sm transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-800/40"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default VerticalNavbar;
