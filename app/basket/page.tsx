"use client";
import BasketProductsList from "@/src/components/pages/basket/ProductsList";
import { useBasketStore } from "@/src/store/basketStore";
import Link from "next/link";
import { FiCreditCard, FiTruck, FiShield } from "react-icons/fi";
import { HiShoppingBag } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";

const BasketPage = () => {
  const { basket } = useBasketStore();

  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = basket.reduce((sum, item) => {
    const finalPrice = item.discount
      ? item.price * (1 - item.discount / 100)
      : item.price;

    return sum + item.quantity * finalPrice;
  }, 0);

  const totalOriginalPrice = basket.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  const totalDiscount = totalOriginalPrice - totalPrice;

  const freeShippingLimit = 2_000_000;
  const shippingPrice =
    totalPrice >= freeShippingLimit || basket.length === 0 ? 0 : 69000;

  const finalPayablePrice = totalPrice + shippingPrice;

  const freeShippingProgress =
    basket.length === 0
      ? 0
      : Math.min((totalPrice / freeShippingLimit) * 100, 100);

  const remainingForFreeShipping = Math.max(freeShippingLimit - totalPrice, 0);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-5 mb-10">
        {/* breadcrumb */}
        <div className="border-b border-gray-300 mb-10">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500 py-4 ">
            <Link href="/" className="hover:text-blue-500">
              خانه
            </Link>
            <IoIosArrowForward />
            <span className="text-gray-700 dark:text-gray-300">سبد خرید</span>
          </div>
        </div>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">
                سبد خرید شما
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {totalItems > 0
                  ? `${totalItems.toLocaleString("fa-IR")} کالا در سبد خرید شما قرار دارد.`
                  : "سبد خرید شما در حال حاضر خالی است."}
              </p>
            </div>

            {totalItems > 0 && (
              <div className="hidden sm:flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-2xl text-sm font-semibold">
                <HiShoppingBag size={20} />
                {totalItems.toLocaleString("fa-IR")} کالا
              </div>
            )}
          </div>
        </div>

        {basket.length === 0 ? (
          <EmptyBasket />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Products */}
            <section className="lg:col-span-2 space-y-4">
              {/* Free shipping progress - mobile/top */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                    <FiTruck size={22} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="font-bold text-gray-900 dark:text-white text-sm">
                        ارسال رایگان
                      </h2>

                      {totalPrice >= freeShippingLimit ? (
                        <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
                          فعال شد
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          تا ارسال رایگان
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {totalPrice >= freeShippingLimit
                        ? "تبریک! سفارش شما شامل ارسال رایگان شده است."
                        : `با خرید ${remainingForFreeShipping.toLocaleString(
                            "fa-IR",
                          )} تومان دیگر، ارسال رایگان می‌شود.`}
                    </p>

                    <div className="mt-4 h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${freeShippingProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Products list */}
              <BasketProductsList />
            </section>

            {/* Summary */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-extrabold text-gray-900 dark:text-white mb-5">
                    خلاصه سفارش
                  </h3>

                  <div className="space-y-4">
                    <SummaryRow
                      label="تعداد کالا"
                      value={`${totalItems.toLocaleString("fa-IR")} عدد`}
                    />

                    <SummaryRow
                      label="قیمت کالاها"
                      value={`${totalOriginalPrice.toLocaleString("fa-IR")} تومان`}
                    />

                    {totalDiscount > 0 && (
                      <SummaryRow
                        label="تخفیف کالاها"
                        value={`${totalDiscount.toLocaleString("fa-IR")} تومان`}
                        danger
                      />
                    )}

                    <SummaryRow
                      label="هزینه ارسال"
                      value={
                        shippingPrice === 0
                          ? "رایگان"
                          : `${shippingPrice.toLocaleString("fa-IR")} تومان`
                      }
                      success={shippingPrice === 0}
                    />

                    <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          مبلغ قابل پرداخت
                        </span>

                        <span className="text-xl font-black text-green-600 dark:text-green-400">
                          {finalPayablePrice.toLocaleString("fa-IR")}
                          <span className="text-xs font-medium mr-1">
                            تومان
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/payment"
                    className="mt-6 w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2 rounded-lg font-semibold transition shadow-lg shadow-blue-500/20"
                  >
                    <FiCreditCard size={20} />
                    ادامه فرایند خرید
                  </Link>

                  <p className="text-[11px] leading-6 text-gray-500 dark:text-gray-400 mt-4 text-center">
                    با ثبت سفارش، قوانین خرید و حریم خصوصی فروشگاه را می‌پذیرید.
                  </p>
                </div>

                {/* Trust info */}
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-5">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
                      <FiShield size={20} />
                    </div>

                    <div>
                      <h4 className="font-bold text-blue-900 dark:text-blue-200 text-sm">
                        پرداخت امن و مطمئن
                      </h4>

                      <p className="text-xs leading-6 text-blue-700/80 dark:text-blue-300/80 mt-1">
                        اطلاعات پرداخت شما به‌صورت امن پردازش می‌شود و سفارش پس
                        از تأیید، آماده ارسال خواهد شد.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default BasketPage;

const SummaryRow = ({
  label,
  value,
  danger,
  success,
}: {
  label: string;
  value: string;
  danger?: boolean;
  success?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>

      <span
        className={[
          "font-bold",
          danger
            ? "text-red-500"
            : success
              ? "text-green-600 dark:text-green-400"
              : "text-gray-900 dark:text-white",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
};

const EmptyBasket = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 lg:p-14 text-center shadow-sm">
      <div className="mx-auto w-24 h-24 rounded-3xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 flex items-center justify-center mb-6">
        <HiShoppingBag size={46} />
      </div>

      <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
        سبد خریدت خالیه
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 max-w-md mx-auto leading-7">
        هنوز محصولی به سبد خرید اضافه نکردی. می‌تونی از فروشگاه محصولات موردنظرت
        رو انتخاب کنی و بعد برای ثبت سفارش برگردی اینجا.
      </p>

      <a
        href="/"
        className="inline-flex items-center justify-center mt-7 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-bold transition shadow-lg shadow-blue-500/20"
      >
        رفتن به فروشگاه
      </a>
    </div>
  );
};
