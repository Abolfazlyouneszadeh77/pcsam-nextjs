import Footer from "@/src/layout/Footer";
import Header from "@/src/layout/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
        <main>{children}</main>
      <Footer />
    </>
  );
}
