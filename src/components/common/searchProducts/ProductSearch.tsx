"use client";
import { useProductStore } from "@/src/store/productStore";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import productImage from "@/public/6cfa8dd07fc8d75e165ad8c2618128b545a1b55d_1777363056.webp";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import Link from "next/link";

const ProductSearch = () => {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
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
      {!searchIsOpen ? (
        <div
          className="p-1.5 rounded-lg hover:shadow-[0px_2px_5px_0_rgba(0,0,0,0.2)] dark:hover:bg-gray-800 transition-all ease-in-out duration-200"
          onClick={() => setSearchIsOpen(true)}
        >
          <FiSearch className="text-gray-700 size-10 lg:size-7" size={25} />
        </div>
      ) : (
        <div className="relative">
          <FiSearch className="absolute right-3 top-3" size={18} />
          <input
            type="text"
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
            placeholder="جستجوی محصول..."
            className="w-full rounded-xl border border-gray-300 py-2.5 pr-10 outline-blue-400"
          />
          <div
            className="rounded-full absolute left-3 top-2.5 cursor-pointer hover:bg-gray-200"
            onClick={() => setSearchIsOpen(false)}
          >
            <IoIosClose size={25} />
          </div>
          <div className="absolute top-12 z-220 w-full overflow-hidden ">
            {searched.trim() && filteredProducts.length === 0 ? (
              <>
                <div className="rounded-xl p-4 bg-white">
                  <p className="text-sm">
                    محصولی با عنوان "
                    <span className="font-semibold">{searched}</span>" پیدا نشد.
                  </p>
                </div>
              </>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-100 bg-white rounded-xl">
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
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSearch;
