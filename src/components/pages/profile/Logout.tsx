"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

const Logout = () => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "authToken=; path=/; max-age=0";
    router.replace("/login");
  };
  return (
    <>
      <button
        onClick={() => setIsLogoutModalOpen(true)}
        className=" text-red-600 dark:text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950 transition flex items-center gap-2"
      >
        <HiArrowRightOnRectangle size={18} />
        خروج
      </button>
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              خروج از حساب
            </h2>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              آیا از خروج از حساب کاربری اطمینان دارید؟
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="rounded-xl border px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                انصراف
              </button>

              <button
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  handleLogout();
                }}
                className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                بله، خارج شو
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
