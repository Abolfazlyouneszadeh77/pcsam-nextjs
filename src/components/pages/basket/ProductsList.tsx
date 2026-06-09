import React from 'react'
import { useBasketStore } from '@/src/store/basketStore';
import { HiMinus, HiPlus, HiShoppingBag, HiTrash } from 'react-icons/hi';

const BasketProductsList = () => {
const { basket, removeFromBasket, addToBasket } = useBasketStore();

  return (
    <>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <h2 className="font-extrabold text-gray-900 dark:text-white">
                    کالاهای سبد خرید
                  </h2>

                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {basket.length.toLocaleString("fa-IR")} محصول متفاوت
                  </span>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {basket.map((item) => {
                    const itemFinalPrice = item.discount
                      ? item.price * (1 - item.discount / 100)
                      : item.price;

                    const itemTotalPrice = itemFinalPrice * item.quantity;
                    const itemOriginalTotalPrice = item.price * item.quantity;
                    const itemDiscountAmount =
                      itemOriginalTotalPrice - itemTotalPrice;

                    return (
                      <article
                        key={item.id}
                        className="p-4 lg:p-5 hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition"
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Product image / fallback */}
                          <div className="w-full sm:w-32 h-32 shrink-0 rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center">
                            {"image" in item && item.image ? (
                              <img
                                src={item.image as string}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <HiShoppingBag
                                size={42}
                                className="text-gray-400 dark:text-gray-500"
                              />
                            )}
                          </div>

                          {/* Product content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  {item.discount ? (
                                    <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                      {item.discount.toLocaleString("fa-IR")}٪
                                      تخفیف
                                    </span>
                                  ) : (
                                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium px-2.5 py-1 rounded-full">
                                      بدون تخفیف
                                    </span>
                                  )}

                                  <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 px-2.5 py-1 rounded-full">
                                    موجود در انبار
                                  </span>
                                </div>

                                <h3 className="text-sm lg:text-base font-bold text-gray-900 dark:text-white leading-7 line-clamp-2">
                                  {item.title}
                                </h3>

                                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                    ضمانت اصالت کالا
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                                    ارسال از انبار فروشگاه
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                                    بسته‌بندی ایمن
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                    امکان پرداخت امن
                                  </div>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="lg:text-left shrink-0">
                                <div className="flex lg:flex-col items-center lg:items-end gap-2">
                                  {item.discount ? (
                                    <span className="text-xs text-gray-400 line-through">
                                      {item.price.toLocaleString("fa-IR")} تومان
                                    </span>
                                  ) : null}

                                  <span className="text-base lg:text-lg font-extrabold text-gray-900 dark:text-white">
                                    {itemFinalPrice.toLocaleString("fa-IR")}
                                    <span className="text-xs font-medium mr-1 text-gray-500">
                                      تومان
                                    </span>
                                  </span>
                                </div>

                                {item.discount ? (
                                  <p className="text-xs text-red-500 mt-2">
                                    سود شما:{" "}
                                    {itemDiscountAmount.toLocaleString("fa-IR")}{" "}
                                    تومان
                                  </p>
                                ) : null}
                              </div>
                            </div>

                            {/* Bottom actions */}
                            <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              {/* Quantity */}
                              <div className="flex items-center gap-3">
                                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
                                  <button
                                    onClick={() => addToBasket(item)}
                                    className="w-10 h-10 flex items-center justify-center text-green-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                    aria-label="افزایش تعداد"
                                  >
                                    <HiPlus size={17} />
                                  </button>

                                  <span className="w-11 text-center text-sm font-bold text-gray-900 dark:text-white">
                                    {item.quantity.toLocaleString("fa-IR")}
                                  </span>

                                  <button
                                    onClick={() => removeFromBasket(item.id)}
                                    className="w-10 h-10 flex items-center justify-center text-red-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                    aria-label="کاهش تعداد"
                                  >
                                    <HiMinus size={17} />
                                  </button>
                                </div>

                                <button
                                  onClick={() => removeFromBasket(item.id)}
                                  className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 px-3 py-2 rounded-xl transition"
                                >
                                  <HiTrash size={17} />
                                  حذف یکی
                                </button>
                              </div>

                              {/* Total item price */}
                              <div className="flex items-center justify-between sm:justify-end gap-3 bg-gray-50 dark:bg-gray-800/70 rounded-2xl px-4 py-3">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  جمع این کالا:
                                </span>

                                <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                                  {itemTotalPrice.toLocaleString("fa-IR")} تومان
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
    </>
  )
}

export default BasketProductsList