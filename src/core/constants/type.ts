// src/core/constants/types.ts

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
}

export interface Picture {
  id: number;
  url: string;
  productId: number;
}

export interface Spec {
  id: number;
  key: string;
  value: string;
  productId: number;
}

export interface Products {
  id: number;
  title: string;
  slug: string;
  price: number;
  discount: number;
  viewCount: number;
  stock: number;
  inStock: boolean;
  description: string;
  categoryId: number;
  brandId: number | null;
  createdAt: string;
  updatedAt: string;
  category: Category;
  brand: Brand | null;
  pictures: Picture[];
  specs: Spec[];
  // date: string;
}
