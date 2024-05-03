import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const font = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Generated by softcode",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
