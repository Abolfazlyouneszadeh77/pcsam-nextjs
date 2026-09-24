import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ---------- برندها ----------
  const brands = [
    { name: "ایسوس", slug: "asus" },
    { name: "لنوو", slug: "lenovo" },
    { name: "ای‌سر", slug: "acer" },
    { name: "الجی", slug: "lg" },
  ];

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: brand,
    });
  }

  console.log("✅ برندها اضافه شدند");

  // ---------- دسته‌بندی‌ها ----------
  const categories = [
    { name: "لپ‌تاپ", slug: "laptop" },
    { name: "لوازم جانبی", slug: "accessory" },
    { name: "مانیتور", slug: "monitor" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log("✅ دسته‌بندی‌ها اضافه شدند");

  // ---------- دریافت شناسه‌ها ----------
  const asus = await prisma.brand.findUnique({ where: { slug: "asus" } });
  const lenovo = await prisma.brand.findUnique({ where: { slug: "lenovo" } });
  const laptopCat = await prisma.category.findUnique({ where: { slug: "laptop" } });
  const monitorCat = await prisma.category.findUnique({ where: { slug: "monitor" } });

  if (!asus || !lenovo || !laptopCat || !monitorCat) {
    throw new Error("برند یا دسته‌بندی پیدا نشد");
  }

  // ---------- محصول: لپ‌تاپ ----------
  await prisma.product.upsert({
    where: { slug: "asus-vivobook-16x" },
    update: {},
    create: {
      title: "لپ‌تاپ ایسوس ویووبوک 16X",
      slug: "asus-vivobook-16x",
      price: 58_500_000,
      discount: 10,
      description:
        "لپ‌تاپ اقتصادی و سبک ایسوس با پردازنده Core i5 نسل ۱۲ مناسب کارهای روزمره و برنامه‌نویسی.",
      brandId: asus.id,
      categoryId: laptopCat.id,
      stock: 8,
      inStock: true,
      pictures: {
        create: [
          { url: "https://picsum.photos/seed/laptop1/800/600" },
          { url: "https://picsum.photos/seed/laptop2/800/600" },
        ],
      },
      specs: {
        create: [
          { key: "پردازنده", value: "Intel Core i5-1335U" },
          { key: "رم", value: "16GB DDR5" },
          { key: "حافظه", value: "512GB NVMe SSD" },
          { key: "گرافیک", value: "Intel Iris Xe" },
          { key: "صفحه نمایش", value: "16 اینچ WUXGA" },
        ],
      },
    },
  });

  // ---------- محصول: مانیتور ----------
  await prisma.product.upsert({
    where: { slug: "lg-27-ultragear" },
    update: {},
    create: {
      title: "مانیتور گیمینگ LG UltraGear 27 اینچ",
      slug: "lg-27-ultragear",
      price: 18_900_000,
      discount: 5,
      description: "مانیتور گیمینگ با رفرش‌ریت 144Hz مناسب گیمرهای حرفه‌ای.",
      stock: 15,
      inStock: true,
      categoryId: monitorCat.id,
      pictures: {
        create: [{ url: "https://picsum.photos/seed/monitor1/800/600" }],
      },
      specs: {
        create: [
          { key: "سایز", value: "27 اینچ" },
          { key: "نرخ تازه‌سازی", value: "144Hz" },
          { key: "رزولوشن", value: "2560x1440 (QHD)" },
        ],
      },
    },
  });

  console.log("✅ محصولات اضافه شدند");
  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
