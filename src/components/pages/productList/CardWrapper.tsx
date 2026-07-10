"use client";
import grid from "@/public/list-size-icons/grid-view-stroke-rounded 1.svg";
import gridBlue from "@/public/list-size-icons/grid-view-stroke-blue-rounded 1.svg";
import layout from "@/public/list-size-icons/layout-3-row-stroke-rounded 1.svg";
import layoutBlue from "@/public/list-size-icons/layout-3-row-stroke-blue-rounded 1.svg";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ViewOne from "../../common/card/ViewOne";
import ViewTwo from "../../common/card/ViewTwo";
import Pagination from "./Pagination";
import { useProductStore } from "@/src/store/productStore";
import ProductTabs from "./ProductTabs";
import { Product } from "@/src/core/constants/types";
import { useRouter, useSearchParams } from "next/navigation";
import CardSkeleton from "../../common/skeleton/CardSkeleton";

const ITEMS_PER_PAGE = 16;

const CardWrapper = () => {
  const { productsList, isLoading } = useProductStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isViewOne, setIsViewOne] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const tab = searchParams.get("tab");

    switch (tab) {
      case "discount":
        setActive(1);
        break;
      case "popular":
        setActive(2);
        break;
      case "newest":
        setActive(3);
        break;
      default:
        setActive(0);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...productsList];

    switch (active) {
      case 1:
        result = result.filter((p) => !!p.discount && p.discount > 0);
        break;
      case 2:
        result = result.slice().sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 3:
        result = result
          .slice()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
        break;
      case 0:
      default:
        break;
    }
    return result;
  }, [productsList, active]);

  const handleChangeTab = (id: number) => {
    setActive(id);
    setCurrentPage(1);

    let tab = "";

    switch (id) {
      case 1:
        tab = "discount";
        break;
      case 2:
        tab = "popular";
        break;
      case 3:
        tab = "newest";
        break;
      default:
        tab = "";
    }

    if (tab) {
      router.replace(`/products?tab=${tab}`);
    } else {
      router.push(`/products`);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      <div className="w-full flex justify-between border-b border-gray-300 pb-2 px-10">
        <div className="flex gap-3">
          <button onClick={() => setIsViewOne(true)}>
            {isViewOne ? (
              <Image src={gridBlue} alt="" className="w-7 h-7" />
            ) : (
              <Image src={grid} alt="" className="w-5 h-5" />
            )}
          </button>
          <button onClick={() => setIsViewOne(false)}>
            {isViewOne ? (
              <Image src={layout} alt="" className="w-6 h-6" />
            ) : (
              <Image src={layoutBlue} alt="" className="w-7 h-7" />
            )}
          </button>
        </div>
        <ProductTabs active={active} setActive={handleChangeTab} />
      </div>
      <div className="w-full flex flex-col items-center">
        <div
          className={`w-full p-5 ${
            isViewOne
              ? "grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6"
              : "flex flex-col gap-3"
          }`}
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))
            : currentItems.map((item) => (
                <div key={item.id}>
                  {isViewOne ? (
                    <ViewOne product={item} />
                  ) : (
                    <ViewTwo product={item} />
                  )}
                </div>
              ))}
        </div>
        <Pagination
          products={filteredProducts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default CardWrapper;
