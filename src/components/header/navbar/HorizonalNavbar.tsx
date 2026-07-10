"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const navBarData = [
  { title: "خانه", path: "/" },
  { title: "محصولات", path: "/products" },
];

const HorizonalNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    e.preventDefault();

    startTransition(() => {
      router.push(path);
    });
  };

  return (
    <>
      <div className="flex gap-2 sm:gap-5 overflow-x-auto sm:overflow-visible">
        {navBarData.map((item, index) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={index}
              href={item.path}
              onClick={(e) => handleClick(e, item.path)}
              className={`
                            px-4 sm:px-5 py-2 text-gray-600 text-xs sm:text-[16px] font-semibold dark:text-white
                            ${
                              isActive
                                ? "border-b-2 border-blue-800"
                                : "rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950"
                            }
                        `}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      )}
    </>
  );
};

export default HorizonalNavBar;
