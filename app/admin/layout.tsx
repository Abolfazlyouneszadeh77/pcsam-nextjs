import AdminHeader from "@/src/components/pages/admin/header/AdminHeader";
import AdminSidebar from "@/src/components/pages/admin/sidebar/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex">
        <AdminSidebar />
        <div className="w-full">
          <AdminHeader />
          {children}
        </div>
      </main>
    </>
  );
}
