"use client";
import EditUserInfo from "@/src/components/pages/profile/EditUserInfo";
import PersonalInfo from "@/src/components/pages/profile/PersonalInfo";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiPencil, HiArrowRightOnRectangle } from "react-icons/hi2";
interface UserData {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditInfo, setIsEditInfo] = useState<boolean>(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("all-users") || "[]");
    const confirmedUser = localStorage.getItem("confirmed-user");

    const user = storedUsers.find((u: any) => u.name === confirmedUser);

    if (user) {
      setUserData(user);
    }
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        در حال بارگذاری اطلاعات...
      </div>
    );
  }

  const handleLogout = () => {
    document.cookie = "authToken=; path=/; max-age=0";
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 dark:bg-gray-900 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            پروفایل کاربری
          </h1>
          <p className="mt-2 text-sm text-slate-500 ">
            مدیریت اطلاعات و امنیت حساب کاربری
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-900 border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="h-28 bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
            <div className="px-6 pb-6 relative top-2">
              <div className="-mt-14 flex items-center gap-6">
                <div className="h-24 w-24 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex items-center justify-center text-3xl font-bold text-slate-700 border-2 border-white ">
                  {userData.name.charAt(0)}
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white dark:text-gray-200">
                    {userData.name}
                  </h2>
                  <p className="text-sm text-slate-500">{userData.email}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <StatusBadge label="وضعیت حساب" value="فعال" />
                <StatusBadge label="نوع حساب" value="کاربر عادی" />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setIsEditInfo(true)}
                  className="flex-1 text-blue-600 dark:text-white border py-3 rounded-xl text-sm font-medium hover:bg-blue-100 transition flex items-center justify-center gap-2"
                >
                  <HiPencil size={18} />
                  {isEditInfo ? "در حال ویرایش" : "ویرایش"}
                </button>
                <button
                  onClick={() => handleLogout()}
                  className="border border-red-200 text-red-600 py-3 px-4 rounded-xl text-sm font-medium hover:bg-red-50 transition flex items-center gap-2"
                >
                  <HiArrowRightOnRectangle size={18} />
                  خروج
                </button>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          {isEditInfo ? (
            <EditUserInfo
              userData={userData}
              setUserData={setUserData}
              setIsEditInfo={setIsEditInfo}
            />
          ) : (
            <PersonalInfo userData={userData} />
          )}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-slate-50 dark:bg-gray-800 border border-slate-200 rounded-xl p-3">
    <p className="text-xs text-slate-400">{label}</p>
    <p className="text-slate-800 dark:text-white font-semibold">{value}</p>
  </div>
);

export default ProfilePage;
