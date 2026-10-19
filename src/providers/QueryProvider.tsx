"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // دیتا تا ۵ دقیقه fresh می‌مونه و ریکوئست اضافه زده نمیشه
            gcTime: 1000 * 60 * 10,    // ۱۰ دقیقه در حافظه موقت (کش) باقی می‌مونه
            refetchOnWindowFocus: false, // جلوگیری از فچ مجدد با تغییر تب مرورگر
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
