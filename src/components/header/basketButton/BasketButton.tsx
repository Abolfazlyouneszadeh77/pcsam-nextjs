'use client'
import { useBasketStore } from "@/src/store/basketStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { MdShoppingCart } from "react-icons/md";

const BasketButton = () => {
  const { basket } = useBasketStore();
  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    startTransition(() => {
      router.push("/basket");
    });
  };

  return (
    <>
      <Link
        href="/basket"
        onClick={handleClick}
        className="relative p-2 rounded-lg hover:shadow-[0px_2px_5px_0_rgba(0,0,0,0.2)] text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-all ease-in-out duration-200 cursor-pointer"
      >
        <MdShoppingCart size={26} />

        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] px-2 py-0.5 pt-1 rounded-full">
            {totalItems}
          </span>
        )}
      </Link>
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      )}
    </>
  );
};

export default BasketButton;
