import ProductSearch from "../../common/searchProducts/ProductSearch";

const HeroSection = () => {
  return (
    <>
      {/* <div className="w-full bg-linear-to-r from-indigo-500 to-purple-600 py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">لیست محصولات</h1>

          <p className="text-sm md:text-base text-indigo-100 max-w-md">
            در این بخش می‌توانید تمام محصولات را مشاهده کنید، قیمت‌ها را مقایسه
            کنید و بهترین گزینه را انتخاب کنید.
          </p>
          <ProductSearch />
        </div>
      </div> */}
      <h1 className="h-25 grid place-items-center text-3xl text-center font-semibold text-gray-700">لیست محصولات</h1>
    </>
  );
};

export default HeroSection;
