import type { Metadata } from "next";
import { Tajawal, Poppins } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { useEffect, useState, useId } from "react";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-arabic",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "أُمية - مساعدتك التعليمية",
  description: "منصة تعليمية تستخدم الذكاء الاصطناعي لمساعدة الطلاب في مراحلهم الدراسية المبكرة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate a unique ID for hydration stability
  const bodyId = useId();
  
  return (
    <html lang="ar" dir="rtl">
      <body 
        id={bodyId}
        className={`${notoSansArabic.variable} ${tajawal.variable} ${poppins.variable} font-noto-sans`}
        // Add the suppressHydrationWarning prop to ignore hydration mismatches
        suppressHydrationWarning={true}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
