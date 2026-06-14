import BannerSlider from "@/src/components/pages/home/banner/BannerSlider";
import MiniSlider from "@/src/components/pages/home/miniSlider/MiniSlider";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black min-h-screen">
      <div className="mx-auto mb-8">
        <BannerSlider />
      </div>
      <div className="max-w-340 mx-auto px-10">
        <MiniSlider title="محصولات تخفیف دار" tab={"discount"}/>
        <MiniSlider title="جدیدترین محصولات" tab={"popular"}/>
        <MiniSlider title="محصولات پربازدید" tab={"newest"}/>
      </div>
    </div>
  );
}
