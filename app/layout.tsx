import type { Metadata } from "next";
import { Tajawal, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} ${poppins.variable} font-tajawal`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
