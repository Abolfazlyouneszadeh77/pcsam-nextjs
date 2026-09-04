import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultProducts as initialProducts } from "@/src/core/constants/defaultProducts";
import { Product } from "../core/constants/types";

type ProductStore = {
  productsList: Product[];
  isLoading: boolean;
  setProductsList: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
};

// export const useProductStore = create<ProductStore>()(
//   persist(
//     (set) => ({
//       productsList: initialProducts,
//       isLoading: true,
//       setProductsList: (products) => set({ productsList: products }),
//       setLoading: (loading) => set({ isLoading: loading }),
//     }),
//     {
//       name: "product-storage",
//       onRehydrateStorage: () => (state, error) => {
//         if (error) {
//           console.log("Failed to rehydrate product store:", error);
//         }
//         state?.setLoading(false);
//       },
//     },
//   ),
// );
export const useProductStore = create<ProductStore>((set) => ({
  productsList: initialProducts,
  isLoading: false, // چون دیگه نیازی به rehydration از لوکال استوریج نیست، پیش‌فرض false می‌گذاریم
  setProductsList: (products) => set({ productsList: products }),
  setLoading: (loading) => set({ isLoading: loading }),
}));