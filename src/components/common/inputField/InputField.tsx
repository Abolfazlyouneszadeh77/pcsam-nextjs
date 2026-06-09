import React from "react";

export const InputField = React.forwardRef(({ icon, label, required=false, error, ...props }: any, ref: any) => (
  <div className="space-y-1.5">
    <label className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
      {icon}
      {label}
      {required ? <span className="text-red-500 text-md">*</span> : null}
    </label>

    <input
      ref={ref}
      {...props}
      className={`w-full px-4 py-2 bg-slate-50 dark:bg-gray-800 border ${
        error ? "border-red-500" : "border-slate-200 dark:border-gray-700"
      } rounded-lg text-slate-800 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none transition`}
    />

    {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}
  </div>
));