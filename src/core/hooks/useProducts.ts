import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "@/src/core/services/api/getProductList";
import { Products } from "@/src/core/constants/type";

export const PRODUCT_KEYS = {
  all: ["products"] as const,
  lists: () => [...PRODUCT_KEYS.all, "list"] as const,
  detail: (id: number | string) => [...PRODUCT_KEYS.all, "detail", id] as const,
};

export const useGetProducts = () => {
  return useQuery<Products[]>({
    queryKey: PRODUCT_KEYS.lists(),
    queryFn: getProductsApi,
  });
};
