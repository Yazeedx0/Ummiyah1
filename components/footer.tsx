"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SparklesIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="py-16 px-6 md:px-10 border-t border-[#E5E9F0] bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 flex items-center rounded-full justify-center ring-2 shrink-0 ring-[#BFDBFE] shadow-sm bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF]">
                <SparklesIcon size={18} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-[#1E3A8A]">أُمية</span>
            </div>
            <p className="text-[#475569] leading-relaxed">
              المساعد التعليمي الذكي الذي يساعد الطلاب على فهم دروسهم وتطوير مهاراتهم بطريقة تفاعلية مبتكرة.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-[#1E3A8A] mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-[#334155] hover:text-[#4D79FF] transition-colors text-base flex items-center gap-2">
                  <span>المميزات</span>
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-[#334155] hover:text-[#4D79FF] transition-colors text-base flex items-center gap-2">
                  <span>كيف يعمل</span>
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-[#334155] hover:text-[#4D79FF] transition-colors text-base flex items-center gap-2">
                  <span>عن أُمية</span>
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-[#334155] hover:text-[#4D79FF] transition-colors text-base flex items-center gap-2">
                  <span>الأسئلة الشائعة</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-[#1E3A8A] mb-4">مصادر</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/resources/guides" className="text-[#334155] hover:text-[#4D79FF] transition-colors text-base">
                  أدلة الاستخدام
                </Link>
              </li>
              <li>
                <Link href="/resources/library" className="text-[#334155] hover:text-[#4D79FF] transition-colors text-base">
                  المكتبة التعليمية
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#334155] hover:text-[#4D79FF] transition-colors text-base">
                  المدونة
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact and Social Media */}
          <div>
            <h3 className="text-lg font-bold text-[#1E3A8A] mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@ummiyah.com" className="text-[#334155] hover:text-[#4D79FF] transition-colors text-base">
                  info@ummiyah.com
                </a>
              </li>
              <li>
                <div className="flex items-center gap-4 mt-3">
                  <a href="https://x.com/Ummiyahai" target="_blank" rel="noopener noreferrer" className="size-9 flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E5E9F0] rounded-full transition-colors hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155]">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a href="https://facebook.com/ummiyah" target="_blank" rel="noopener noreferrer" className="size-9 flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E5E9F0] rounded-full transition-colors hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155]">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="https://instagram.com/ummiyah.ai" target="_blank" rel="noopener noreferrer" className="size-9 flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E5E9F0] rounded-full transition-colors hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155]">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/ummiyah-ai" target="_blank" rel="noopener noreferrer" className="size-9 flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E5E9F0] rounded-full transition-colors hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155]">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#E5E9F0] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[#64748B]">
            © {new Date().getFullYear()} أُمية. جميع الحقوق محفوظة
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[#64748B] hover:text-[#4D79FF] transition-colors text-sm">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="text-[#64748B] hover:text-[#4D79FF] transition-colors text-sm">
              شروط الاستخدام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}