"use client";
import React, { useEffect, useState } from "react";
import { HiLockClosed } from "react-icons/hi";
import { toast } from "react-toastify";

const ChangePassword = ({ userData }: any) => {
  const [showInput, setShowInput] = useState(false);
  const [password, setPassword] = useState("");

  const handleChangePass = () => {
    const storedUsers = JSON.parse(localStorage.getItem("all-users") || "[]");
    const confirmedUser = localStorage.getItem("confirmed-user");

    const updatedUsers = storedUsers.map((u: any) => {
      if (u.name === confirmedUser) {
        return { ...u, password: password };
      }
      return u;
    });
    localStorage.setItem("all-users", JSON.stringify(updatedUsers));

    setPassword("");
    setShowInput(false);
    toast.success('تغییر رمز با موفقیت انجام شد.')
  };

  return (
    <div className="flex flex-col gap-2 transition-all ease-in-out duration-300">
      <div className="border border-slate-200 rounded-xl px-4 py-3">
        <div
          onClick={() => setShowInput(!showInput)}
          className="flex items-center text-blue-800 gap-3  dark:text-slate-400 cursor-pointer"
        >
          <HiLockClosed size={20} />
          <span>تغییر رمز عبور</span>
        </div>

        {showInput && (
          <div className="mt-4 flex gap-4">
            <input
              type="password"
              placeholder="رمز جدید را وارد کنید"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleChangePass()}
              className="px-4 py-2 bg-blue-600 text-sm text-white rounded-xl font-medium hover:underline flex items-center gap-2"
            >
              تغییر
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
