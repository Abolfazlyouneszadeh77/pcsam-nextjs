"use client";
import { useProductStore } from "@/src/store/productStore";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import productImage from "@/public/6cfa8dd07fc8d75e165ad8c2618128b545a1b55d_1777363056.webp";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const ProductSearch = () => {
  const { productsList, isLoading } = useProductStore();
  const [searched, setSearched] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searched.trim()) return [];

    return productsList.filter((product) =>
      product.title.toLowerCase().includes(searched.toLowerCase()),
    );
  }, [productsList, searched]);

  return (
    <>
      <div className="mt-6 max-w-md">
        <div className="relative">
          <FiSearch
            className="absolute right-3 top-3 text-gray-300"
            size={18}
          />
          <input
            type="text"
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
            placeholder="جستجوی محصول..."
            className="
            w-full rounded-xl border border-transparent border-b-gray-200
            py-2.5 pr-10 text-white outline-none
            transition-colors duration-200 ease-in-out
            focus:border-white
          "
          />
        </div>
      </div>

      {searched.trim() && filteredProducts.length === 0 ? (
        <div>
          <div className="rounded-xl p-4">
            <p className="text-sm text-white">
              محصولی با عنوان "<span className="font-semibold">{searched}</span>
              " پیدا نشد.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-100">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="shrink-0 w-50 h-20 rounded-lg bg-gray-100 p-2 flex items-center gap-4 hover:border-blue-500 transition"
            >
              <Image
                src={productImage}
                alt={product.title}
                width={56}
                height={56}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div className="space-y-2">
                <h2 className="text-sm text-gray-700 line-clamp-2">
                  {product.title}
                </h2>
                <Link
                  href={`/products/${product.id}`}
                  className="text-blue-500 text-xs flex gap-2"
                >
                  نمایش محصول <IoIosArrowBack />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductSearch;
