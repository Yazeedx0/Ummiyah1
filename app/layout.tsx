import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { Noto_Sans_Arabic } from 'next/font/google';
import { useEffect, useState } from "react";

const notoSansArabic = Noto_Sans_Arabic({ 
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-arabic',
});

export const metadata = {
  title: "أُمية - المساعد الرقمي",
  description: "أُمية - مساعدك الرقمي الذكي",
  openGraph: {
    images: [
      {
        url: "/og?title=أُمية - المساعد الرقمي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/og?title=أُمية - المساعد الرقمي",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className="h-full">
      <head></head>
      <body className={cn(notoSansArabic.className, "antialiased bg-white h-full")} suppressHydrationWarning>
        <Toaster position="top-center" richColors />
        <main className="flex flex-col w-full h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
