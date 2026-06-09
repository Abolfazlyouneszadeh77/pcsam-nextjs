import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultProducts as initialProducts } from "@/src/core/constants/defaultProducts";
import { Product } from "../core/constants/types";

type ProductStore = {
  productsList: Product[];
};

export const useProductStore = create<ProductStore>()(
  persist(
    () => ({
      productsList: initialProducts,
    }),
    {
      name: "product-storage",
    },
  ),
);
