import { ClerkProvider } from "@clerk/nextjs";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
