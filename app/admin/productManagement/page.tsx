"use client";

import React, { useEffect, useState } from "react";
import NewProductForm from "@/src/components/pages/admin/pages/Products/NewProductForm";
import { Products } from "@/src/core/constants/type";
import { getProductsApi } from "@/src/core/services/api/getProductList";
// import { useForm } from 'react-hook-form';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import axios from "axios";
import EditProductForm from "@/src/components/pages/admin/pages/Products/EditProductForm";

const initialProducts = [
  {
    id: 1,
    name: "لپ‌تاپ ایسوس Vivobook",
    brand: "Asus",
    ram: "16GB",
    storage: "512GB SSD",
    price: "۳۵,۰۰۰,۰۰۰",
  },
  {
    id: 2,
    name: "لپ‌تاپ لنوو Ideapad",
    brand: "Lenovo",
    ram: "8GB",
    storage: "256GB SSD",
    price: "۲۲,۰۰۰,۰۰۰",
  },
];

const ProductManagement = () => {
  // const [products, setProducts] = useState(initialProducts);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productData, setproductData] = useState<Products[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProductsApi();
      setproductData(data);
      console.log("products data: ", data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      // ۲. اضافه کردن finally برای اینکه در هر صورت لودینگ متوقف شود
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    const isConfirmed = window.confirm("آیا از حذف این محصول مطمئن هستید؟");

    if (!isConfirmed) return;

    try {
      setDeletingId(id);

      const response = await axios.delete(`/api/products/${id}`);

      if (response.data.success) {
        // حذف محصول از جدول بدون رفرش صفحه
        setproductData((previousProducts) =>
          previousProducts.filter((product) => product.id !== id),
        );
      }
    } catch (error: any) {
      console.error("خطا در حذف محصول:", error);
      console.log("Full Error Object:", error);
      console.log("Error Response Data:", error.response?.data);

      const errorMessage =
        error.response?.data?.error || "حذف محصول با خطا مواجه شد";

      alert(errorMessage);
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenEdit = (product: Products) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  return (
    <div className="relative px-6 py-10 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* هدر صفحه */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">مدیریت محصولات</h2>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm active:scale-95"
        >
          <FaPlus /> افزودن محصول جدید
        </button>
      </div>

      {/* جستجو و فیلتر */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="جستجوی محصول..."
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          />
          <FaSearch className="absolute left-3 top-4 text-gray-400" />
        </div>
      </div>

      {/* جدول محصولات */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
        <table className="w-full text-right border-collapse">
          <thead className="bg-gray-100 border-b text-gray-700 text-sm font-semibold">
            <tr>
              <th className="p-4">نام محصول</th>
              <th className="p-4">شناسه</th>
              <th className="p-4">تعداد</th>
              <th className="p-4">تخفیف%</th>
              <th className="p-4">قیمت (تومان)</th>
              <th className="p-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {productData.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-900">
                  {product.title}
                </td>
                <td className="p-4 text-gray-600">{product.id}</td>
                <td className="p-4 text-gray-600">{product.id}</td>
                <td className="p-4 text-gray-600">{product.discount}</td>
                <td className="p-4 text-blue-600 font-bold">{product.price}</td>
                <td className="p-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="text-blue-500 hover:text-blue-700 p-1.5 hover:bg-blue-50 rounded transition"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    disabled={deletingId === product.id}
                    title="حذف محصول"
                    className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === product.id ? (
                      <span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaTrash size={16} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewProductForm setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
      <EditProductForm
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        product={selectedProduct}
        onSuccess={() => fetchProducts()}
      />
    </div>
  );
};

export default ProductManagement;
