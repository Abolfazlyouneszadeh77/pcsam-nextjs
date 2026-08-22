import React from "react";
import Image from "next/image";
import Link from "next/link";
import cat1 from "@/public/products/IdeaPad 1 15IJL7 با پردازنده Celeron N4500/5027d6613f904bf581d977a957a7ea2b8e78e960_1737450812.webp";

const categories = [
  { title: "لپتاپ", picture: cat1 },
  { title: "لوازم جانبی", picture: cat1 },
  { title: "مانیتور", picture: cat1 },
  { title: "لپتاپ", picture: cat1 },
  { title: "لپتاپ", picture: cat1 },
];

const Categories = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-15 border-b border-gray-300 px-4 py-5 mb-5">
        {categories.map((item, index) => (
          <div key={index} className="p-2 text-center">
            <Link
              href="/"
              className="flex size-30 items-center justify-center overflow-hidden rounded-3xl p-3 transition-all duration-100 ease-in-out hover:shadow-[0_2px_10px_rgba(0,0,0,0.1)] shadow-blue-300"
            >
              <Image
                src={item.picture}
                alt={item.title}
                className="size-full object-contain"
              />
            </Link>

            <h2 className="mt-2 font-semibold text-gray-700">{item.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
