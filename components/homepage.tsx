"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { SparklesIcon, BookOpenIcon, UserIcon, QuestionMarkIcon } from "./icons";
import Header from "./header";
import Footer from "./footer";
import { LoadingSpinner } from "./LoadingSpinner";
import { useRouter } from "next/navigation";

export function HomePage() {
  const router = useRouter();
  const [chatId, setChatId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    setChatId(nanoid());
    // Add smooth scrolling behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  const handleStartNow = () => {
    if (chatId) {
      setIsLoading(true);
      // Navigate after a short delay to show the loading spinner
      setTimeout(() => {
        router.push(`/chat/${chatId}`);
      }, 1500);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-white to-[#F0F7FF] font-noto-sans flex items-center justify-center" dir="rtl">
        <div className="flex flex-col items-center gap-6">
          <LoadingSpinner size={60} color="#4D79FF" thickness={3} text="جارٍ تحميل المحادثة..." textColor="#4D79FF" />
          <p className="text-[#475569] text-lg mt-2">يرجى الانتظار قليلاً</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-white to-[#F0F7FF] font-noto-sans pt-14" dir="rtl">
      {/* Use the existing Header component */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-20 md:pb-32 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-60 -right-20 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-60 w-72 h-72 bg-green-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            className="flex flex-col text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3A8A] leading-tight">
              تعلم بسهولة مع <span className="text-[#4D79FF] relative inline-block">
                أُمية
                <motion.span 
                  className="absolute bottom-1 left-0 right-0 h-3 bg-[#E0EAFF] -z-10 transform -rotate-1"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.span>
              </span> مساعدك التعليمي الذكي
            </h1>
            <p className="mt-6 text-[#475569] text-xl leading-relaxed">
              الرفيق التعليمي الذكي الذي يساعد الطلاب في المرحلة الابتدائية على فهم دروسهم وتطوير مهاراتهم بطريقة تفاعلية ومبتكرة.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {chatId ? (
                <motion.button 
                  onClick={handleStartNow}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#4D79FF] to-[#5D89FF] hover:from-[#3B63CC] hover:to-[#4D79FF] text-white rounded-lg font-medium transition-all text-center text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  ابدأ الآن
                </motion.button>
              ) : (
                <div className="px-6 py-3.5 bg-gradient-to-r from-[#4D79FF] to-[#5D89FF] text-white rounded-lg font-medium text-center text-lg shadow-md opacity-75">
                  ابدأ الآن
                </div>
              )}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link 
                  href="#how-it-works" 
                  className="px-6 py-3.5 bg-white border-2 border-[#CBD5E1] hover:border-[#94A3B8] text-[#334155] rounded-lg font-medium transition-all text-center text-lg hover:shadow-md hover:-translate-y-0.5 duration-300 block"
                >
                  تعرف على المزيد
                </Link>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="relative h-96 md:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF] opacity-10 rounded-2xl"></div>
            <div className="absolute top-3 left-3 right-3 bottom-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/40 z-0"></div>
            <div className="absolute inset-0 p-5 md:p-6">
              <div className="bg-white h-full w-full rounded-xl shadow-lg overflow-hidden border border-[#E5E9F0] relative z-10">
                <div className="p-3 border-b border-[#E5E9F0] shrink-0 bg-gradient-to-r from-[#F0F8FF] to-[#F5F9FF]">
                  <h2 className="text-lg font-bold text-[#4D79FF] flex items-center gap-2">
                    <div className="flex gap-2 me-2">
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
                    <motion.div 
                      className="w-full p-5 rounded-2xl bg-[#EEF4FF] text-right shadow-sm border-l-4 border-[#4D79FF]"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <div className="flex justify-end mb-2">
                        <span className="text-sm font-medium text-[#4D79FF]">أُمية</span>
                      </div>
                      <p className="text-[#334155] leading-relaxed font-medium">
                        مرحبًا! أنا أُمية، مساعدتك التعليمية. كيف يمكنني مساعدتك اليوم؟
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* User message preview */}
                  <div className="flex flex-row-reverse gap-4 px-3 py-2.5">
                    <div className="size-10 flex items-center rounded-full justify-center ring-2 shrink-0 ring-[#D1FAE5] shadow-sm bg-gradient-to-br from-[#33B37B] to-[#7BDCB5]">
                      <UserIcon size={20} className="text-white" />
                    </div>
                    <motion.div 
                      className="w-full p-5 rounded-2xl bg-[#F0FAF0] text-right shadow-sm border-r-4 border-[#33B37B]"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <div className="flex justify-end mb-2">
                        <span className="text-sm font-medium text-[#33B37B]">أنت</span>
                      </div>
                      <p className="text-[#334155] leading-relaxed font-medium">
                        هل يمكنك مساعدتي في فهم درس الرياضيات اليوم؟
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 blur-2xl animate-pulse animation-delay-2000"></div>
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
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold text-[#4D79FF] bg-[#EEF4FF] px-4 py-1.5 rounded-full mb-4 inline-block">مميزات أُمية</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mt-3">تجربة تعليمية متكاملة</h2>
            <p className="mt-4 text-[#475569] text-xl max-w-2xl mx-auto">
              تقدم أُمية مجموعة من المميزات التي تساعد الطلاب على التعلم بطريقة فعالة ومرحة
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white rounded-xl p-7 shadow-md border border-[#E5E9F0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#EEF4FF] rounded-full opacity-30 -mr-8 -mt-8"></div>
              <div className="size-16 flex items-center rounded-full justify-center ring-2 mb-6 ring-[#BFDBFE] shadow-sm bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF] group-hover:shadow-lg group-hover:ring-[#A1C4FD] transition-all duration-300 relative z-10">
                <BookOpenIcon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3 relative z-10">محتوى تعليمي متكامل</h3>
              <p className="text-[#475569] leading-relaxed relative z-10">
                يوفر محتوى المنهج الدراسي بشكل منظم وسهل الفهم مع شروحات تفصيلية للدروس
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-white rounded-xl p-7 shadow-md border border-[#E5E9F0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F0FAF0] rounded-full opacity-30 -mr-8 -mt-8"></div>
              <div className="size-16 flex items-center rounded-full justify-center ring-2 mb-6 ring-[#D1FAE5] shadow-sm bg-gradient-to-br from-[#33B37B] to-[#7BDCB5] group-hover:shadow-lg group-hover:ring-[#A7F3D0] transition-all duration-300 relative z-10">
                <QuestionMarkIcon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3 relative z-10">مساعد ذكي للإجابة</h3>
              <p className="text-[#475569] leading-relaxed relative z-10">
                مساعد ذكي يجيب على أسئلتك ويساعدك في فهم الدروس والواجبات المدرسية
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-white rounded-xl p-7 shadow-md border border-[#E5E9F0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5F0FF] rounded-full opacity-30 -mr-8 -mt-8"></div>
              <div className="size-16 flex items-center rounded-full justify-center ring-2 mb-6 ring-[#C7D2FE] shadow-sm bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] group-hover:shadow-lg group-hover:ring-[#A5B4FC] transition-all duration-300 relative z-10">
                <UserIcon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A8A] mb-3 relative z-10">تعلم شخصي</h3>
              <p className="text-[#475569] leading-relaxed relative z-10">
                يتكيف مع احتياجاتك التعليمية الفردية ويساعدك على التعلم بالسرعة التي تناسبك
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New Addition */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold text-[#4D79FF] bg-[#EEF4FF] px-4 py-1.5 rounded-full mb-4 inline-block">آراء مستخدمينا</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mt-3">ماذا يقول الطلاب والمعلمون عن أُمية</h2>
            <p className="mt-4 text-[#475569] text-xl max-w-2xl mx-auto">
              تجارب حقيقية من طلاب ومعلمين استفادوا من استخدام أُمية في رحلتهم التعليمية
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-gradient-to-br from-white to-[#F8FAFC] p-8 rounded-xl shadow-md border border-[#E5E9F0]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="flex text-[#FBBF24]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-[#334155] leading-relaxed text-lg mb-6">
                "ساعدني أُمية كثيرًا في فهم دروس الرياضيات. أحب كيف يشرح بطريقة بسيطة وسهلة المتابعة."
              </p>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-[#E5E9F0] flex items-center justify-center font-bold text-[#4D79FF]">
                  ف
                </div>
                <div>
                  <h4 className="font-bold text-[#1E3A8A]">فيصل أحمد</h4>
                  <p className="text-[#64748B] text-sm">طالب في الصف الخامس</p>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div 
              className="bg-gradient-to-br from-white to-[#F8FAFC] p-8 rounded-xl shadow-md border border-[#E5E9F0]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="flex text-[#FBBF24]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-[#334155] leading-relaxed text-lg mb-6">
                "كمعلمة، أرى تحسنًا كبيرًا في مستوى الطلاب الذين يستخدمون أُمية. إنه أداة رائعة مكملة للتعليم في الفصل."
              </p>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-[#E5E9F0] flex items-center justify-center font-bold text-[#4D79FF]">
                  س
                </div>
                <div>
                  <h4 className="font-bold text-[#1E3A8A]">سارة المطيري</h4>
                  <p className="text-[#64748B] text-sm">معلمة رياضيات</p>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial 3 */}
            <motion.div 
              className="bg-gradient-to-br from-white to-[#F8FAFC] p-8 rounded-xl shadow-md border border-[#E5E9F0]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="flex text-[#FBBF24]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-[#334155] leading-relaxed text-lg mb-6">
                "أصبحت دروس العلوم أكثر متعة مع أُمية. أحب أنني أستطيع السؤال في أي وقت وأحصل على إجابات مفصلة."
              </p>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-[#E5E9F0] flex items-center justify-center font-bold text-[#4D79FF]">
                  ن
                </div>
                <div>
                  <h4 className="font-bold text-[#1E3A8A]">نورة خالد</h4>
                  <p className="text-[#64748B] text-sm">طالبة في الصف الرابع</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-28 px-6 md:px-10 bg-[#F8FAFC] relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full opacity-30 translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold text-[#4D79FF] bg-[#EEF4FF] px-4 py-1.5 rounded-full mb-4 inline-block">كيف يعمل أُمية</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mt-3">ثلاث خطوات بسيطة للبدء</h2>
            <p className="mt-4 text-[#475569] text-xl max-w-2xl mx-auto">
              بخطوات بسيطة، يمكنك البدء باستخدام أُمية لتحسين تجربتك التعليمية
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="absolute top-16 left-[calc(16.666%-8px)] right-[calc(16.666%-8px)] h-1.5 bg-gradient-to-r from-[#BFDBFE] via-[#93C5FD] to-[#BFDBFE] hidden md:block rounded-full"></div>
            
            {/* Step 1 */}
            <motion.div 
              className="flex flex-col items-center text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              viewport={{ once: true }}
            >
              <div className="size-20 flex items-center justify-center rounded-full bg-[#EEF4FF] border-4 border-[#BFDBFE] mb-6 text-2xl font-bold text-[#4D79FF] shadow-md relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#4D79FF]/10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0, 0.7] 
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
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
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="size-20 flex items-center justify-center rounded-full bg-[#EEF4FF] border-4 border-[#BFDBFE] mb-6 text-2xl font-bold text-[#4D79FF] shadow-md relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#4D79FF]/10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0, 0.7] 
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.3
                  }}
                />
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
              transition={{ duration: 0.4, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <div className="size-20 flex items-center justify-center rounded-full bg-[#EEF4FF] border-4 border-[#BFDBFE] mb-6 text-2xl font-bold text-[#4D79FF] shadow-md relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#4D79FF]/10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0, 0.7] 
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.6
                  }}
                />
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
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-6">
              ابدأ رحلة التعلم مع أُمية اليوم
            </h2>
            <p className="text-xl text-[#475569] mb-12 max-w-3xl mx-auto leading-relaxed">
              انضم إلى آلاف الطلاب الذين يستخدمون أُمية لتحسين فهمهم للدروس وتطوير مهاراتهم الأكاديمية
            </p>
            {chatId ? (
              <motion.button 
                onClick={handleStartNow}
                className="px-10 py-5 bg-gradient-to-r from-[#4D79FF] to-[#5D89FF] hover:from-[#3B63CC] hover:to-[#4D79FF] text-white rounded-lg font-medium transition-all text-center text-xl shadow-lg hover:shadow-xl inline-block hover:-translate-y-1 duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                ابدأ الآن مجاناً
              </motion.button>
            ) : (
              <div className="px-10 py-5 bg-gradient-to-r from-[#4D79FF] to-[#5D89FF] text-white rounded-lg font-medium text-center text-xl shadow-md inline-block opacity-75">
                ابدأ الآن مجاناً
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}