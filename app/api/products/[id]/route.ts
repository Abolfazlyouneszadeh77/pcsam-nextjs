import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

const getProductId = async (params: RouteContext['params']) => {
  const { id: idParam } = await params;
  const id = Number(idParam.trim());
  return { idParam, id };
};

// 1. GET - دریافت یک محصول مشخص
export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { idParam, id } = await getProductId(params);

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        { success: false, error: 'شناسه محصول نامعتبر است', receivedId: idParam },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        pictures: true,
        specs: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'محصول پیدا نشد' },
        { status: 404 }
      );
    }

    // اصلاح شده:
    return NextResponse.json({
      success: true,
      data: product,
    });
    
  } catch (error) {
    console.error('GET Product Error:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در دریافت محصول' },
      { status: 500 }
    );
  }
}

// 2. PUT - ویرایش محصول
export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { idParam, id } = await getProductId(params);

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        { success: false, error: 'شناسه محصول نامعتبر است', receivedId: idParam },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, slug, price, discount, stock, description, categoryId, brandId, pictures, specs } = body;

    const existingProduct = await prisma.product.findUnique({ where: { id } });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'محصولی برای ویرایش پیدا نشد' },
        { status: 404 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        slug: slug || title?.toString().toLowerCase().replace(/\s+/g, '-'),
        price: Number(price),
        discount: Number(discount || 0),
        stock: Number(stock),
        inStock: Number(stock) > 0,
        description,
        categoryId: Number(categoryId),
        brandId: brandId ? Number(brandId) : null,
        pictures: { deleteMany: {}, create: Array.isArray(pictures) ? pictures : [] },
        specs: { deleteMany: {}, create: Array.isArray(specs) ? specs : [] },
      },
      include: { category: true, brand: true, pictures: true, specs: true },
    });

    return NextResponse.json({
      success: true,
      message: 'محصول با موفقیت ویرایش شد',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('PUT Product Error:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در ویرایش محصول' },
      { status: 500 }
    );
  }
}

// 3. DELETE - حذف محصول
export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { idParam, id } = await getProductId(params);

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        { success: false, error: 'شناسه محصول نامعتبر است', receivedId: idParam },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({ where: { id } });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'محصولی برای حذف پیدا نشد' },
        { status: 404 }
      );
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'محصول با موفقیت حذف شد',
    });
  } catch (error) {
    console.error('DELETE Product Error:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در حذف محصول' },
      { status: 500 }
    );
  }
}
