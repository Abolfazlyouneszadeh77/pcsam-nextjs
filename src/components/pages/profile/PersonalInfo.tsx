import React from "react";
import { HiPhone, HiUser } from "react-icons/hi";
import {
  HiCalendarDays,
  HiEnvelope,
  HiMapPin,
  HiBuildingOffice2,
} from "react-icons/hi2";
import { InfoItem } from "../../common/info/InfoItem";
import ChangePassword from "./ChangePassword";


const PersonalInfo = ({ userData }: any) => {
  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-gray-900 dark:text-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            اطلاعات شخصی
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoItem
              icon={<HiUser size={20} />}
              label="نام کامل"
              value={userData.name}
            />

            <InfoItem
              icon={<HiPhone size={20} />}
              label="موبایل"
              value={userData.mobile}
            />

            <InfoItem
              icon={<HiEnvelope size={20} />}
              label="ایمیل"
              value={userData.email}
            />

            <InfoItem
              icon={<HiCalendarDays size={20} />}
              label="تاریخ عضویت"
              value="1403/05/12"
            />

            <InfoItem
              icon={<HiMapPin size={20} />}
              label="استان"
              value={userData.province}
            />

            <InfoItem
              icon={<HiMapPin size={20} />}
              label="شهر"
              value={userData.city}
            />

            <InfoItem
              icon={<HiBuildingOffice2 size={20} />}
              label="کد پستی"
              value={userData.postalCode}
            />

            <InfoItem
              icon={<HiMapPin size={20} />}
              label="آدرس"
              value={userData.address}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-300 mb-4">
            امنیت حساب
          </h3>
          <ChangePassword />
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
