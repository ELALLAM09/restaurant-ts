import type { Metadata } from "next";
import "../(site)/globals.css";
import { Space_Mono } from "next/font/google";
import Link from "next/link";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

const font = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Generated by softcode",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={font.className}>
        <main className="flex h-screen w-screen flex-col py-24">
          <Link
            href="/"
            className="mx-auto flex w-[400px] items-center sm:w-[500px]"
          >
            <ChevronLeftIcon className="w-6 text-stone-700" />
            <span className="font-mono text-base  uppercase text-stone-500">
              Home
            </span>
          </Link>
          <div className="flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
