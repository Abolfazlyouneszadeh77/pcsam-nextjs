import { ReactNode } from "react";
import ToastProvider from "../components/toast-provider/ToastProvider";
import QueryProvider from "../providers/QueryProvider";

export const ClientRoot = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ToastProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </ToastProvider>
    </>
  );
};

export default ClientRoot;
