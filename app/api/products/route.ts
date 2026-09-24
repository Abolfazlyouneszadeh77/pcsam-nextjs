import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. دریافت لیست محصولات (GET)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        pictures: true,
        specs: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت محصولات!' },
      { status: 500 }
    );
  }
}

// 2. ثبت محصول جدید (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, price, discount, stock, description, categoryId, brandId, pictures, specs } = body;

    // ثبت محصول جدید با استفاده از Nested Writes در Prisma
    // این کار باعث میشه همزمان محصول، عکس‌ها و مشخصات فنی ذخیره بشن
    const newProduct = await prisma.product.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        price: Number(price),
        discount: Number(discount || 0),
        stock: Number(stock),
        inStock: Number(stock) > 0, // محاسبه خودکار وضعیت موجودی
        description,
        categoryId: Number(categoryId),
        brandId: brandId ? Number(brandId) : null,
        pictures: {
          create: pictures || [], // آرایه‌ای از آبجکت‌های {url: '...'}
        },
        specs: {
          create: specs || [], // آرایه‌ای از آبجکت‌های {key: '...', value: '...'}
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: newProduct,
    }, { status: 201 });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در ثبت محصول در دیتابیس' },
      { status: 500 }
    );
  }
}
