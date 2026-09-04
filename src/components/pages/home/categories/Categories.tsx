import React from "react";
import Image from "next/image";
import Link from "next/link";
import laptop from "@/public/products/3jYtBGH-xODCdXAXoUbULyIAAeY-kbp1AUb3QY-kYTQQxoJFSQ.png";
import cat1 from "@/public/products/nUFroQy67xDmdNK1zVTg73PHUHE-UVGwYPi6TQSyBve40-c_Gg.png";
import monitor from "@/public/products/2KhbUgH6TKhHZaJrLyfcHIvvXsU-2E29xu4xQa6vG-W7cBJ5ZA.png";

const categories = [
  { title: "لپتاپ", picture: laptop },
  { title: "لوازم جانبی", picture: cat1 },
  { title: "مانیتور", picture: monitor },
  { title: "لپتاپ", picture: cat1 },
  { title: "لپتاپ", picture: laptop },
];

const Categories = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-15  px-4 py-5 mb-5">
        {categories.map((item, index) => (
          <div key={index} className="p-2 text-center">
            <Link
              href="/"
              className="flex size-25 items-center justify-center overflow-hidden p-1 rounded-3xl transition-all duration-100 ease-in-out hover:shadow-[0_2px_10px_rgba(0,0,0,0.1)] shadow-blue-300"
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
