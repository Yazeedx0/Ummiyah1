"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { SparklesIcon, BookOpenIcon, UserIcon, QuestionMarkIcon } from "./icons";
import Header from "./header";

export function HomePage() {
  // Generate a static chat ID that remains consistent during SSR and CSR
  const [chatId, setChatId] = useState<string>("");
  
  // Generate the ID only once after component mounts on client
  useEffect(() => {
    setChatId(nanoid());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-white to-[#F0F7FF] font-noto-sans" dir="rtl">
      {/* Use the existing Header component */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-20 md:pb-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="flex flex-col text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3A8A] leading-tight">
              تعلم بسهولة مع <span className="text-[#4D79FF] relative">
                أُمية
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#E0EAFF] -z-10 transform -rotate-1"></span>
              </span> مساعدك التعليمي الذكي
            </h1>
            <p className="mt-6 text-[#475569] text-xl leading-relaxed">
              الرفيق التعليمي الذكي الذي يساعد الطلاب في المرحلة الابتدائية على فهم دروسهم وتطوير مهاراتهم بطريقة تفاعلية ومبتكرة.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {chatId ? (
                <Link 
                  href={`/chat/${chatId}`} 
                  className="px-6 py-3.5 bg-gradient-to-r from-[#4D79FF] to-[#5D89FF] hover:from-[#3B63CC] hover:to-[#4D79FF] text-white rounded-lg font-medium transition-all text-center text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
                >
                  ابدأ الآن
                </Link>
              ) : (
                <div className="px-6 py-3.5 bg-gradient-to-r from-[#4D79FF] to-[#5D89FF] text-white rounded-lg font-medium text-center text-lg shadow-md opacity-75">
                  ابدأ الآن
                </div>
              )}
              <Link 
                href="#how-it-works" 
                className="px-6 py-3.5 bg-white border-2 border-[#CBD5E1] hover:border-[#94A3B8] text-[#334155] rounded-lg font-medium transition-all text-center text-lg hover:shadow-md hover:-translate-y-0.5 duration-300"
              >
                تعرف على المزيد
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="relative h-96 md:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF] opacity-10 rounded-2xl"></div>
            <div className="absolute top-3 left-3 right-3 bottom-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/40 z-0"></div>
            <div className="absolute inset-0 p-5 md:p-6">
              <div className="bg-white h-full w-full rounded-xl shadow-lg overflow-hidden border border-[#E5E9F0] relative z-10">
                <div className="p-3 border-b border-[#E5E9F0] shrink-0 bg-gradient-to-r from-[#F0F8FF] to-[#F5F9FF]">
                  <h2 className="text-lg font-bold text-[#4D79FF] flex items-center gap-2">
                    <div className="flex space-x-2 ml-2">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></span>
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></span>
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#27C93F]"></span>
                    </div>
                    محادثتك مع أميّة
                  </h2>
                </div>
                <div className="p-4 h-[calc(100%-50px)] overflow-hidden">
                  {/* Assistant message preview */}
                  <div className="flex gap-4 px-3 py-2.5 mb-4">
                    <div className="size-10 flex items-center rounded-full justify-center ring-2 shrink-0 ring-[#BFDBFE] shadow-sm bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF]">
                      <SparklesIcon size={20} className="text-white" />
                    </div>
                    <div className="w-full p-5 rounded-2xl bg-[#EEF4FF] text-right shadow-sm border-l-4 border-[#4D79FF]">
                      <div className="flex justify-end mb-2">
                        <span className="text-sm font-medium text-[#4D79FF]">أُمية</span>
                      </div>
                      <p className="text-[#334155] leading-relaxed font-medium">
                        مرحبًا! أنا أُمية، مساعدتك التعليمية. كيف يمكنني مساعدتك اليوم؟
                      </p>
                    </div>
                  </div>
                  
                  {/* User message preview */}
                  <div className="flex flex-row-reverse gap-4 px-3 py-2.5">
                    <div className="size-10 flex items-center rounded-full justify-center ring-2 shrink-0 ring-[#D1FAE5] shadow-sm bg-gradient-to-br from-[#33B37B] to-[#7BDCB5]">
                      <UserIcon size={20} className="text-white" />
                    </div>
                    <div className="w-full p-5 rounded-2xl bg-[#F0FAF0] text-right shadow-sm border-r-4 border-[#33B37B]">
                      <div className="flex justify-end mb-2">
                        <span className="text-sm font-medium text-[#33B37B]">أنت</span>
                      </div>
                      <p className="text-[#334155] leading-relaxed font-medium">
                        هل يمكنك مساعدتي في فهم درس الرياضيات اليوم؟
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 blur-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 px-6 md:px-10 bg-gradient-to-b from-[#F8FAFC] to-[#EEF4FF]/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A]">مميزات أُمية</h2>
            <p className="mt-4 text-[#475569] text-xl max-w-2xl mx-auto">
              تقدم أُمية مجموعة من المميزات التي تساعد الطلاب على التعلم بطريقة فعالة ومرحة
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white rounded-xl p-7 shadow-md border border-[#E5E9F0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="size-16 flex items-center rounded-full justify-center ring-2 mb-6 ring-[#BFDBFE] shadow-sm bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF] group-hover:shadow-lg group-hover:ring-[#A1C4FD] transition-all duration-300">
                <BookOpenIcon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">محتوى تعليمي متكامل</h3>
              <p className="text-[#475569] leading-relaxed">
                يوفر محتوى المنهج الدراسي بشكل منظم وسهل الفهم مع شروحات تفصيلية للدروس
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-white rounded-xl p-7 shadow-md border border-[#E5E9F0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="size-16 flex items-center rounded-full justify-center ring-2 mb-6 ring-[#D1FAE5] shadow-sm bg-gradient-to-br from-[#33B37B] to-[#7BDCB5] group-hover:shadow-lg group-hover:ring-[#A7F3D0] transition-all duration-300">
                <QuestionMarkIcon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">مساعد ذكي للإجابة</h3>
              <p className="text-[#475569] leading-relaxed">
                مساعد ذكي يجيب على أسئلتك ويساعدك في فهم الدروس والواجبات المدرسية
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-white rounded-xl p-7 shadow-md border border-[#E5E9F0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="size-16 flex items-center rounded-full justify-center ring-2 mb-6 ring-[#C7D2FE] shadow-sm bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] group-hover:shadow-lg group-hover:ring-[#A5B4FC] transition-all duration-300">
                <UserIcon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">تعلم شخصي</h3>
              <p className="text-[#475569] leading-relaxed">
                يتكيف مع احتياجاتك التعليمية الفردية ويساعدك على التعلم بالسرعة التي تناسبك
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 px-6 md:px-10 bg-white relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full opacity-20 translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A]">كيف يعمل أُمية؟</h2>
            <p className="mt-4 text-[#475569] text-xl max-w-2xl mx-auto">
              بخطوات بسيطة، يمكنك البدء باستخدام أُمية لتحسين تجربتك التعليمية
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="absolute top-16 left-[calc(16.666%-8px)] right-[calc(16.666%-8px)] h-1 bg-gradient-to-r from-[#BFDBFE] via-[#93C5FD] to-[#BFDBFE] hidden md:block"></div>
            
            {/* Step 1 */}
            <motion.div 
              className="flex flex-col items-center text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="size-20 flex items-center justify-center rounded-full bg-[#EEF4FF] border-4 border-[#BFDBFE] mb-6 text-2xl font-bold text-[#4D79FF] shadow-md">
                1
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">ابدأ محادثة</h3>
              <p className="text-[#475569] leading-relaxed">
                انقر على زر "ابدأ الآن" لبدء محادثة جديدة مع مساعدك التعليمي أُمية
              </p>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div 
              className="flex flex-col items-center text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="size-20 flex items-center justify-center rounded-full bg-[#EEF4FF] border-4 border-[#BFDBFE] mb-6 text-2xl font-bold text-[#4D79FF] shadow-md">
                2
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">اختر الدرس</h3>
              <p className="text-[#475569] leading-relaxed">
                اختر الصف والمادة والوحدة الدراسية والدرس الذي تريد التعلم عنه
              </p>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div 
              className="flex flex-col items-center text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="size-20 flex items-center justify-center rounded-full bg-[#EEF4FF] border-4 border-[#BFDBFE] mb-6 text-2xl font-bold text-[#4D79FF] shadow-md">
                3
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">اسأل واتعلم</h3>
              <p className="text-[#475569] leading-relaxed">
                اطرح أسئلتك حول الدرس واحصل على شرح مفصل ومساعدة في فهم المفاهيم الصعبة
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-gradient-to-r from-[#EEF4FF] to-[#F0F9FF] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-200 to-indigo-200 opacity-50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100 to-purple-100 opacity-50 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-6">
              ابدأ رحلة التعلم مع أُمية اليوم
            </h2>
            <p className="text-xl text-[#475569] mb-12 max-w-3xl mx-auto leading-relaxed">
              انضم إلى آلاف الطلاب الذين يستخدمون أُمية لتحسين فهمهم للدروس وتطوير مهاراتهم الأكاديمية
            </p>
            {chatId ? (
              <Link 
                href={`/chat/${chatId}`} 
                className="px-10 py-5 bg-gradient-to-r from-[#4D79FF] to-[#5D89FF] hover:from-[#3B63CC] hover:to-[#4D79FF] text-white rounded-lg font-medium transition-all text-center text-xl shadow-lg hover:shadow-xl inline-block hover:-translate-y-1 duration-300"
              >
                ابدأ الآن مجاناً
              </Link>
            ) : (
              <div className="px-10 py-5 bg-gradient-to-r from-[#4D79FF] to-[#5D89FF] text-white rounded-lg font-medium text-center text-xl shadow-md inline-block opacity-75">
                ابدأ الآن مجاناً
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
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
                    <a href="https://twitter.com/ummiyah" target="_blank" rel="noopener noreferrer" className="size-9 flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E5E9F0] rounded-full transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155]">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a href="https://facebook.com/ummiyah" target="_blank" rel="noopener noreferrer" className="size-9 flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E5E9F0] rounded-full transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155]">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="https://instagram.com/ummiyah.ai" target="_blank" rel="noopener noreferrer" className="size-9 flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E5E9F0] rounded-full transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155]">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="https://linkedin.com/company/ummiyah" target="_blank" rel="noopener noreferrer" className="size-9 flex items-center justify-center bg-[#F1F5F9] hover:bg-[#E5E9F0] rounded-full transition-colors">
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
    </div>
  );
}