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
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white font-noto-sans" dir="rtl">
      {/* Use the existing Header component */}
      <Header />
      
      {/* Additional Start Button - positioned below the header */}
      <div className="flex justify-end px-6 py-4 mt-14">
        {chatId ? (
          <Link 
            href={`/chat/${chatId}`} 
            className="px-4 py-2 bg-[#4D79FF] hover:bg-[#3B63CC] text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            ابدأ الآن
          </Link>
        ) : (
          <div className="px-4 py-2 bg-[#4D79FF] text-white rounded-lg font-medium shadow-sm opacity-75">
            ابدأ الآن
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-20 md:pt-12 md:pb-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="flex flex-col text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3A8A] leading-tight">
              تعلم بسهولة مع <span className="text-[#4D79FF]">أُمية</span> مساعدك التعليمي الذكي
            </h1>
            <p className="mt-6 text-[#475569] text-xl leading-relaxed">
              الرفيق التعليمي الذكي الذي يساعد الطلاب في المرحلة الابتدائية على فهم دروسهم وتطوير مهاراتهم بطريقة تفاعلية ومبتكرة.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {chatId ? (
                <Link 
                  href={`/chat/${chatId}`} 
                  className="px-6 py-3 bg-[#4D79FF] hover:bg-[#3B63CC] text-white rounded-lg font-medium transition-colors text-center text-lg shadow-md"
                >
                  ابدأ الآن
                </Link>
              ) : (
                <div className="px-6 py-3 bg-[#4D79FF] text-white rounded-lg font-medium text-center text-lg shadow-md opacity-75">
                  ابدأ الآن
                </div>
              )}
              <Link 
                href="#how-it-works" 
                className="px-6 py-3 bg-white border-2 border-[#CBD5E1] hover:border-[#94A3B8] text-[#334155] rounded-lg font-medium transition-colors text-center text-lg"
              >
                تعرف على المزيد
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF] opacity-10 rounded-2xl"></div>
            <div className="absolute inset-0 p-4 md:p-6">
              <div className="bg-white h-full w-full rounded-xl shadow-lg overflow-hidden border border-[#E5E9F0]">
                <div className="p-2.5 border-b border-[#E5E9F0] shrink-0 bg-gradient-to-r from-[#F0F8FF] to-[#F5F9FF]">
                  <h2 className="text-lg font-bold text-[#4D79FF] flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#4D79FF]"></span>
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
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-6 md:px-10 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A]">مميزات أُمية</h2>
            <p className="mt-4 text-[#475569] text-xl max-w-2xl mx-auto">
              تقدم أُمية مجموعة من المميزات التي تساعد الطلاب على التعلم بطريقة فعالة ومرحة
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E9F0] hover:shadow-md transition-shadow">
              <div className="size-14 flex items-center rounded-full justify-center ring-2 mb-5 ring-[#BFDBFE] shadow-sm bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF]">
                <BookOpenIcon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">محتوى تعليمي متكامل</h3>
              <p className="text-[#475569]">
                يوفر محتوى المنهج الدراسي بشكل منظم وسهل الفهم مع شروحات تفصيلية للدروس
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E9F0] hover:shadow-md transition-shadow">
              <div className="size-14 flex items-center rounded-full justify-center ring-2 mb-5 ring-[#D1FAE5] shadow-sm bg-gradient-to-br from-[#33B37B] to-[#7BDCB5]">
                <QuestionMarkIcon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">مساعد ذكي للإجابة</h3>
              <p className="text-[#475569]">
                مساعد ذكي يجيب على أسئلتك ويساعدك في فهم الدروس والواجبات المدرسية
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E9F0] hover:shadow-md transition-shadow">
              <div className="size-14 flex items-center rounded-full justify-center ring-2 mb-5 ring-[#C7D2FE] shadow-sm bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA]">
                <UserIcon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">تعلم شخصي</h3>
              <p className="text-[#475569]">
                يتكيف مع احتياجاتك التعليمية الفردية ويساعدك على التعلم بالسرعة التي تناسبك
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A]">كيف يعمل أُمية؟</h2>
            <p className="mt-4 text-[#475569] text-xl max-w-2xl mx-auto">
              بخطوات بسيطة، يمكنك البدء باستخدام أُمية لتحسين تجربتك التعليمية
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="size-16 flex items-center justify-center rounded-full bg-[#EEF4FF] border-2 border-[#BFDBFE] mb-6 text-2xl font-bold text-[#4D79FF]">
                1
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">ابدأ محادثة</h3>
              <p className="text-[#475569]">
                انقر على زر "ابدأ الآن" لبدء محادثة جديدة مع مساعدك التعليمي أُمية
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="size-16 flex items-center justify-center rounded-full bg-[#EEF4FF] border-2 border-[#BFDBFE] mb-6 text-2xl font-bold text-[#4D79FF]">
                2
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">اختر الدرس</h3>
              <p className="text-[#475569]">
                اختر الصف والمادة والوحدة الدراسية والدرس الذي تريد التعلم عنه
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="size-16 flex items-center justify-center rounded-full bg-[#EEF4FF] border-2 border-[#BFDBFE] mb-6 text-2xl font-bold text-[#4D79FF]">
                3
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">اسأل واتعلم</h3>
              <p className="text-[#475569]">
                اطرح أسئلتك حول الدرس واحصل على شرح مفصل ومساعدة في فهم المفاهيم الصعبة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 md:px-10 bg-gradient-to-r from-[#EEF4FF] to-[#F0F9FF]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-6">
            ابدأ رحلة التعلم مع أُمية اليوم
          </h2>
          <p className="text-xl text-[#475569] mb-10 max-w-3xl mx-auto">
            انضم إلى آلاف الطلاب الذين يستخدمون أُمية لتحسين فهمهم للدروس وتطوير مهاراتهم الأكاديمية
          </p>
          {chatId ? (
            <Link 
              href={`/chat/${chatId}`} 
              className="px-8 py-4 bg-[#4D79FF] hover:bg-[#3B63CC] text-white rounded-lg font-medium transition-colors text-center text-xl shadow-md inline-block"
            >
              ابدأ الآن مجاناً
            </Link>
          ) : (
            <div className="px-8 py-4 bg-[#4D79FF] text-white rounded-lg font-medium text-center text-xl shadow-md inline-block opacity-75">
              ابدأ الآن مجاناً
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-10 border-t border-[#E5E9F0]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-8 flex items-center rounded-full justify-center ring-2 shrink-0 ring-[#BFDBFE] shadow-sm bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF]">
              <SparklesIcon size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold text-[#1E3A8A]">أُمية</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#features" className="text-[#334155] hover:text-[#4D79FF] transition-colors">
              المميزات
            </Link>
            <Link href="#how-it-works" className="text-[#334155] hover:text-[#4D79FF] transition-colors">
              كيف يعمل
            </Link>
            <Link href="#about" className="text-[#334155] hover:text-[#4D79FF] transition-colors">
              عن أُمية
            </Link>
          </div>
          <div className="text-[#64748B] text-sm">
            © {new Date().getFullYear()} أُمية. جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
    </div>
  );
}
