import { ReactNode } from "react";
import ToastProvider from "../components/toast-provider/ToastProvider";

export const ClientRoot = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ToastProvider>{children}</ToastProvider>
    </>
  );
};

export default ClientRoot;
