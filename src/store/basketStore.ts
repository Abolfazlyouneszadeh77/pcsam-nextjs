import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../core/constants/types";

interface BasketItem extends Product {
  quantity: number;
}

interface BasketState {
  basket: BasketItem[];
  addToBasket: (product: Product) => void;
  removeFromBasket: (id: number) => void;
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set) => ({
      basket: [],

      addToBasket: (product) =>
        set((state) => {
          const existing = state.basket.find(
            (item) => item.id === product.id
          );

          if (existing) {
            return {
              basket: state.basket.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            basket: [...state.basket, { ...product, quantity: 1 }],
          };
        }),

      removeFromBasket: (id) =>
        set((state) => ({
          basket: state.basket
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
    }),
    {
      name: "basket-storage",
    }
  )
);
