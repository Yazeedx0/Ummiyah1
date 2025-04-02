"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 h-14 bg-gradient-to-r from-[#4D79FF]/80 to-[#7C9CFF]/80 backdrop-blur-md shadow-md z-50 px-4 sm:px-6 flex items-center justify-center"
    >
      <div className="flex items-center gap-2">
        {/* لوجو "أ" */}
        <div className="size-8 rounded-full bg-white shadow-md border border-[#D1D5DB] flex items-center justify-center">
          <span className="text-xl font-bold text-[#4D79FF] dark:text-white">أ</span>
        </div>

        {/* اسم المنصة */}
        <div className="flex flex-col leading-tight">
          <Link href="/" className="text-white text-2xl font-bold cursor-pointer dark:text-white">
            أُمية
          </Link>
          <span className="text-[#EBF5FF]/90 text-[10px] font-medium -mt-1.5 dark:text-gray-300">
            صديقك التعليمي الذكي
          </span>
        </div>
      </div>
    </motion.header>
  );
}
