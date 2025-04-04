import type { Metadata } from "next";
import { Tajawal, Poppins } from "next/font/google";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { SelectionProvider } from "@/context/selection-context";
import { SelectionPopup } from "@/components/selection-popup";
import { AuthProvider } from "@/components/AuthProvider";

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
  return (
    <html lang="ar" dir="rtl">
      <body
        className={cn(
          notoSansArabic.variable,
          tajawal.variable,
          poppins.variable,
          "font-noto-sans"
        )}
        suppressHydrationWarning
      >
        <AuthProvider>
          <SelectionProvider>
            {children}
            <SelectionPopup data-selection-popup />
          </SelectionProvider>
        </AuthProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
