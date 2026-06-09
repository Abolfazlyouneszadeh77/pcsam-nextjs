import BannerSlider from "@/src/components/pages/home/banner/BannerSlider";
import MiniSlider from "@/src/components/pages/home/miniSlider/MiniSlider";

export default function Home() {
  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="mx-auto mb-8">
        <BannerSlider />
      </div>
      <div className="px-15">
        <MiniSlider title="محصولات تخفیف دار" tab={"discount"}/>
        <MiniSlider title="جدیدترین محصولات" tab={"popular"}/>
        <MiniSlider title="محصولات پربازدید" tab={"newest"}/>
      </div>
    </div>
  );
}
