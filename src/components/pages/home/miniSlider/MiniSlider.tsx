"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { defaultProducts } from "@/src/core/constants/defaultProducts";
import ViewOne from "@/src/components/common/card/ViewOne";
import { Product } from "@/src/core/constants/types";
interface MiniSliderProps {
  products?: Product[];
  title?: string;
  tab: string
}

export default function MiniSlider({
  products = defaultProducts,
  title = "محصولات ویژه",
  tab,
}: MiniSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between border-b border-gray-300">
          {title && (
            <h2 className="text-xl font-semibold mb-4 text-right dark:text-white">
              {title}
            </h2>
          )}
          <Link
            href={`/products?tab=${tab}`}
            className="text-blue-700 flex items-center gap-2"
          >
            مشاهده همه
            <IoIosArrowBack size={18} />
          </Link>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4.5,
              spaceBetween: 30,
            },
          }}
          className="mini-slider"
        >
          {products.slice(0, 10).map((product) => (
            <SwiperSlide key={product.id} className="my-5">
              <ViewOne product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaChevronLeft size={20} className="mr-1" />
        </button>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
