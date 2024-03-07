import { ModalContextProvider } from "@/contexts/ModalContext";
import { QueryProvider } from "@/providers/QueryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalContextProvider>{children}</ModalContextProvider>
      </QueryProvider>
    </ClerkProvider>
  );
}
