import { FiSearch } from "react-icons/fi";

const HeroSection = () => {
  return (
    <div className="w-full bg-linear-to-r from-indigo-500 to-purple-600 py-12 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">لیست محصولات</h1>

        <p className="text-sm md:text-base text-indigo-100 max-w-md">
          در این بخش می‌توانید تمام محصولات را مشاهده کنید، قیمت‌ها را مقایسه
          کنید و بهترین گزینه را انتخاب کنید.
        </p>

        {/* Search / Filter */}
        <div className="mt-6 max-w-md">
          <div className="relative">
            <FiSearch
              className="absolute right-3 top-3 text-gray-300"
              size={18}
            />
            <input
              type="text"
              placeholder="جستجوی محصول..."
              className="w-full py-2.5 pr-10 rounded-lg text-gray-800 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
