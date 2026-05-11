import type { Metadata } from "next";
import { AppShell } from "./components/AppShell";
import { OrderStoreProvider } from "./context/order-store";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hoku Hana Drinks",
  description: "A tropical Hawaiian drink ordering experience"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OrderStoreProvider>
          <AppShell>{children}</AppShell>
        </OrderStoreProvider>
      </body>
    </html>
  );
}
