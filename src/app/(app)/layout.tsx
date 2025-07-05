import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marketly",
  description: "Marketly is a multi tenant ecommerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body className={`${dmSans.className} antialiased`}>{children}</body>
      </html>
    </TRPCReactProvider>
  );
}
