import { StaticImageData } from "next/image";

export interface Product {
  id: number;
  title: string;
  price: number;
  discount?: number;
  viewCount: number;
  date: string;
  picture: StaticImageData[];
}
