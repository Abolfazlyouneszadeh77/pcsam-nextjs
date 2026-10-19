import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "هیچ فایلی ارسال نشده است" },
        { status: 400 }
      );
    }

    // آپلود فایل در Vercel Blob با نام تصادفی ایمن
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true, // برای جلوگیری از هم‌نامی فایل‌ها
    });

    // بازگرداندن آبجکت شامل url عمومی
    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error("Blob Upload Error:", error);
    return NextResponse.json(
      { error: error.message || "خطا در آپلود فایل" },
      { status: 500 }
    );
  }
}

// متد DELETE در app/api/upload/route.ts
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const urlToDelete = searchParams.get("url");

    if (!urlToDelete) {
      return NextResponse.json(
        { error: "آدرس فایل برای حذف ارسال نشده است" },
        { status: 400 }
      );
    }

    // بررسی اینکه آدرس حتماً متعلق به ورسل بلاب باشد
    if (urlToDelete.includes("public.blob.vercel-storage.com")) {
      await del(urlToDelete, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    }

    return NextResponse.json({ message: "تصویر با موفقیت از سرور حذف شد" });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
