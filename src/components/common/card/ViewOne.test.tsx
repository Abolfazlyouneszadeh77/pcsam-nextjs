import { render, screen } from "@testing-library/react";
import ViewOne from "./ViewOne";
import { Product } from "@/src/core/constants/types";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("ViewOne Component", () => {
  const mockProduct: Product = {
    id: 1,
    title: "لپ‌تاپ گیمینگ",
    price: 1000000,
    discount: 20,
    viewCount: 1500,
    date: new Date("2023-10-01"),
  } as any;

  test("renders product details correctly", () => {
    render(<ViewOne product={mockProduct} />);

    expect(screen.getByText("لپ‌تاپ گیمینگ")).toBeInTheDocument();
    
    const link = screen.getByRole("link", { name: /نمایش محصول/i });
    expect(link).toHaveAttribute("href", "/products/1");
  });

  test("shows discount badge and calculated price when discount exists", () => {
    render(<ViewOne product={mockProduct} />);

    expect(screen.getByText("20%")).toBeInTheDocument();

    expect(screen.getByText("1,000,000")).toHaveClass("line-through");

    expect(screen.getByText("800,000")).toBeInTheDocument();
  });

  test("shows only regular price when no discount exists", () => {
    const noDiscountProduct = { ...mockProduct, discount: 0 };
    render(<ViewOne product={noDiscountProduct as Product} />);

    const price = screen.getByText("1,000,000");
    expect(price).not.toHaveClass("line-through");
    expect(screen.queryByText("20%")).not.toBeInTheDocument();
  });
});
