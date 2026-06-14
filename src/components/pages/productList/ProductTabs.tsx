"use client";

const tabs = [
  { id: 0, label: "همه" },
  { id: 1, label: "تخفیفات" },
  { id: 2, label: "پربازدیدترین" },
  { id: 3, label: "جدیدترین" },
];

const ProductTabs = ({ active, setActive }: any) => {
  return (
    <div className="sm:w-100" dir="rtl">
      {/* موبایل: دراپ‌داون */}
      <select
        defaultValue={active}
        onChange={(e) => setActive(Number(e.target.value))}
        className="select sm:hidden rounded-xl"
      >
        {tabs.map((item, index) => (
          <option key={index} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>

      {/* دسکتاپ: تب‌های معمولی */}
      <div  className="hidden sm:block">
        <div  className="relative flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
          {/* Glider */}
          <span
            className="absolute top-1 bottom-1 bg-indigo-500 rounded-lg transition-transform duration-300"
            style={{
              width: `${100 / tabs.length}%`,
              transform: `translateX(calc(-${active * 97}%))`,
            }}
          />

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative z-10 flex-1 py-2 px-1 text-sm font-semibold transition-colors whitespace-nowrap
                ${
                  active === tab.id
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
