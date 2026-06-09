'use client';
import { useState } from 'react';

const tabs = [
    { id: 0, label: 'همه' },
    { id: 1, label: 'تخفیفات', content: 'یونس عزیز، خوش اومدی! اینجا اطلاعاتت نمایش داده میشه.' },
    { id: 2, label: 'پربازدیدترین', content: 'تو این بخش می‌تونی زبان، تم و اعلان‌ها رو تغییر بدی.' },
    { id: 3, label: 'جدیدترین', content: 'اینجا می‌تونی رمز عبورت رو عوض کنی یا ورود دومرحله‌ای فعال کنی.' },
];

const ProductTabs = ({active, setActive}: any) => {

  return (
    <div  className="w-full max-w-md ">
      {/* Nav */}
      <div  className="relative flex rounded-xl p-1">
        {/* Glider */}
        <span
          className="absolute top-1 bottom-1 w-1/4 bg-indigo-500 rounded-lg transition-transform duration-300"
          style={{ transform: `translateX(calc(${-active * 100}%))` }}
        ></span>

        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative z-10 flex-1 py-2 text-sm font-semibold transition-colors
              ${active === tab.id ? 'text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

    </div>
  );
}

export default ProductTabs