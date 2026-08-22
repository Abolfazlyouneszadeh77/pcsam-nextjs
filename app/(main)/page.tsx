import ScrollToTop from "@/src/components/common/scrollToTop";
import BannerSlider from "@/src/components/pages/home/banner/BannerSlider";
import Categories from "@/src/components/pages/home/categories/Categories";
import MiniSlider from "@/src/components/pages/home/miniSlider/MiniSlider";
import { defaultProducts } from "@/src/core/constants/defaultProducts";


export default function Home() {
  const saledProducts = defaultProducts.filter((u) => u.discount !== 0);
  const lastProducts = defaultProducts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const mostViewedProducts = defaultProducts.sort(
    (a, b) => b.viewCount - a.viewCount,
  );

  return (
    <div className="bg-white dark:bg-gray-900 text-black min-h-screen relative">
      <div className="mx-auto mb-2">
        <BannerSlider />
      </div>
      <Categories />
      <div className="max-w-340 mx-auto px-10">
        <MiniSlider
          title="محصولات تخفیف دار"
          tab={"discount"}
          products={saledProducts}
        />
        <MiniSlider
          title="جدیدترین محصولات"
          tab={"newest"}
          products={lastProducts}
        />
        <MiniSlider
          title="محصولات پربازدید"
          tab={"popular"}
          products={mostViewedProducts}
        />
      </div>
      <ScrollToTop />
    </div>
  );
}
