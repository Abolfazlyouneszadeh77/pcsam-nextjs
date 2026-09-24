import axios from "axios";
import { Products } from "@/src/core/constants/type";

// ساختار پاسخ API بر اساس دیتایی که فرستادی
interface ApiResponse {
  success: boolean;
  data: Products[];
}

export const getProductsApi = async (): Promise<Products[]> => {
  try {
    const response = await axios.get<ApiResponse>("/api/products");
    
    // اگر پاسخ موفقیت‌آمیز بود، فقط آرایه دیتای محصولات را برمی‌گردانیم
    if (response.data.success) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error("خطا در دریافت لیست محصولات:", error);
    // می‌توانی خطای دلخواه را throw کنی یا آرایه خالی برگردانی
    throw error;
  }
};
