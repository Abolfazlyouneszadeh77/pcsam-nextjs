'use client'
import { Products } from '@/src/core/constants/type'
import { Product } from '@/src/core/constants/types'
import React, { useState } from 'react'
import { IoFilter } from 'react-icons/io5'

interface FilterState {
  categories: string[]
  priceRange: number
  inStockOnly: boolean
  hasDiscount: boolean
}

interface SideFiltersProps {
  products?: Products[];
  onFilterChange?: (filteredProducts: Products[]) => void;
}

const CATEGORIES = [
  { id: 'laptop', label: 'لپ‌تاپ و تجهیزات جانبی' },
  { id: 'monitor', label: 'مانیتور' },
  { id: 'adaptor', label: 'آداپتور' },
  { id: 'speaker', label: 'هدفون و اسپیکر' },
  { id: 'mouse', label: 'ماوس و کیبورد' },
]

const SideFilters = ({ products = [], onFilterChange }: SideFiltersProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState<number>(5000000)
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)
  const [hasDiscount, setHasDiscount] = useState<boolean>(false)

  // مدیریت انتخاب/حذف دسته‌بندی‌ها
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  // پاک کردن همه فیلترها و بازگرداندن همه محصولات
  const handleResetFilters = () => {
    setSelectedCategories([])
    setMaxPrice(5000000)
    setInStockOnly(false)
    setHasDiscount(false)

    // بازگرداندن تمام محصولات بدون فیلتر
    if (onFilterChange) {
      onFilterChange(products)
    }
  }

  // اعمال فیلترها روی آرایه محصولات
  const handleApplyFilters = () => {
    const filters: FilterState = {
      categories: selectedCategories,
      priceRange: maxPrice,
      inStockOnly,
      hasDiscount,
    }
    console.log('Applied Filters:', filters)

    const filteredProducts = products.filter((product) => {
      // ۱. شرط دسته‌بندی
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes((product as any).category || (product as any).categoryId)

      // ۲. شرط قیمت (بررسی با قیمت تخفیف‌دار یا قیمت اصلی)
      const currentPrice = (product as any).discountPrice ?? product.price
      const matchPrice = Number(currentPrice) <= maxPrice

      // ۳. شرط فقط کالاهای موجود
      const matchStock = inStockOnly
        ? Boolean((product as any).inStock || (product as any).stock > 0 || (product as any).countInStock > 0)
        : true

      // ۴. شرط کالاهای تخفیف‌دار
      const matchDiscount = hasDiscount
        ? Boolean((product as any).discount || (product as any).discountPrice || (product as any).hasDiscount)
        : true

      return matchCategory && matchPrice && matchStock && matchDiscount
    })

    console.log('Filtered Results:', filteredProducts)

    // فرستادن لیست فیلتر شده به کامپوننت والد
    if (onFilterChange) {
      onFilterChange(filteredProducts)
    }
  }

  return (
    <aside className="w-72 bg-white border border-gray-100 rounded-3xl p-5 shadow-md space-y-6 select-none sticky top-4">
      {/* هدر فیلتر */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-3">
          <span><IoFilter size={25} /></span> فیلترها
        </h2>
        {(selectedCategories.length > 0 || inStockOnly || hasDiscount || maxPrice < 5000000) && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer"
          >
            حذف همه
          </button>
        )}
      </div>

      {/* بخش ۱: دسته‌بندی‌ها */}
      <div className="space-y-3">
        <span className="text-sm font-semibold text-gray-700 block">دسته‌بندی‌ها</span>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center justify-between text-sm text-gray-600 hover:text-gray-900 cursor-pointer group"
            >
              <span className="group-hover:translate-x-0.5 transition-transform">
                {cat.label}
              </span>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => handleCategoryChange(cat.id)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
            </label>
          ))}
        </div>
      </div>

      {/* بخش ۲: محدوده قیمت */}
      <div className="space-y-3 pt-2 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-gray-700">حداکثر قیمت:</span>
          <span className="font-bold text-blue-600">
            {maxPrice.toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
          </span>
        </div>
        <input
          type="range"
          min={100000}
          max={5000000}
          step={50000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[11px] text-gray-400">
          <span>۱ میلیون</span>
          <span>۵۰ میلیون</span>
        </div>
      </div>

      {/* بخش ۳: سوییچ‌ها (Toggle Switches) */}
      <div className="space-y-3 pt-2 border-t border-gray-100">
        {/* فقط کالاهای موجود */}
        <label className="flex items-center justify-between cursor-pointer py-1">
          <span className="text-sm text-gray-700">فقط کالاهای موجود</span>
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </div>
        </label>

        {/* فقط تخفیف‌دارها */}
        <label className="flex items-center justify-between cursor-pointer py-1">
          <span className="text-sm text-gray-700">فقط کالاهای تخفیف‌دار</span>
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={hasDiscount}
              onChange={(e) => setHasDiscount(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </div>
        </label>
      </div>

      {/* بخش ۴: دکمه اعمال فیلتر */}
      <button
        onClick={handleApplyFilters}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer"
      >
        اعمال فیلترها
      </button>
    </aside>
  )
}

export default SideFilters
