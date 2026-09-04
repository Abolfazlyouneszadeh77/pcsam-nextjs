import { NextResponse } from "next/server";

export async function GET() {
  const sampleProducts = [
    {
      id: 1,
      title: "Dell Precision 7520",
      price: 95000000,
      discount: 10,
      viewCount: 452,
      inStock: true,
    },
    {
      id: 2,
      title: "HP ZBook G8",
      price: 110000000,
      discount: 0,
      viewCount: 123,
      inStock: true,
    },
  ];

  return NextResponse.json({
    success: true,
    data: sampleProducts,
  });
}
