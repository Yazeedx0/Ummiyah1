"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }

    if (password.length < 8) {
      setError("يجب أن تتكون كلمة المرور من 8 أحرف على الأقل");
      return;
    }

    setIsLoading(true);

    try {
      // Create a new user with email and password using Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's profile with their display name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      // If registration is successful, redirect to the login page
      router.push('/login');
    } catch (err: any) {
      console.error("Firebase registration error:", err);
      
      // Handle different Firebase error codes with appropriate Arabic messages
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("البريد الإلكتروني مستخدم بالفعل. يرجى تسجيل الدخول أو استخدام بريد إلكتروني آخر.");
          break;
        case "auth/invalid-email":
          setError("البريد الإلكتروني غير صحيح");
          break;
        case "auth/weak-password":
          setError("كلمة المرور ضعيفة جدًا. يرجى استخدام كلمة مرور أقوى.");
          break;
        default:
          setError("حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (provider: "google" | "facebook" | "twitter") => {
    setIsLoading(true);
    setError("");

    try {
      let authProvider;
      switch (provider) {
        case "google":
          authProvider = new GoogleAuthProvider();
          break;
        case "facebook":
          authProvider = new FacebookAuthProvider();
          break;
        case "twitter":
          authProvider = new TwitterAuthProvider();
          break;
      }

      await signInWithPopup(auth, authProvider);
      router.push('/');
    } catch (err: any) {
      console.error(`${provider} registration error:`, err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError("تم إغلاق نافذة التسجيل قبل إكمال العملية");
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        setError("هناك حساب موجود بالفعل بنفس البريد الإلكتروني ولكن بطريقة تسجيل مختلفة");
      } else {
        setError(`حدث خطأ أثناء التسجيل باستخدام ${provider === 'google' ? 'جوجل' : provider === 'facebook' ? 'فيسبوك' : 'تويتر'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-white to-[#F0F7FF] font-noto-sans pt-14" dir="rtl">
      {/* Header */}
      <Header />
      
      {/* Register Form Section */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-40 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        
        <div className="flex justify-center items-center">
          <motion.div 
            className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-[#E5E9F0] relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#1E3A8A]">إنشاء حساب جديد</h1>
              <p className="mt-2 text-[#475569]">انضم إلينا اليوم وابدأ رحلة التعلم مع أُمية</p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-r-4 border-red-500 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className="block text-[#334155] font-medium mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4D79FF] focus:border-transparent transition-all"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="email" className="block text-[#334155] font-medium mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4D79FF] focus:border-transparent transition-all"
                  placeholder="أدخل بريدك الإلكتروني"
                  dir="ltr"
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="password" className="block text-[#334155] font-medium mb-2">كلمة المرور</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4D79FF] focus:border-transparent transition-all"
                  placeholder="أدخل كلمة المرور (8 أحرف على الأقل)"
                  dir="ltr"
                />
              </div>
              
              <div className="mb-8">
                <label htmlFor="confirmPassword" className="block text-[#334155] font-medium mb-2">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4D79FF] focus:border-transparent transition-all"
                  placeholder="أعد إدخال كلمة المرور"
                  dir="ltr"
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#4D79FF] to-[#5D89FF] hover:from-[#3B63CC] hover:to-[#4D79FF] text-white rounded-lg font-medium transition-all text-center text-lg shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isLoading ? (
                  <LoadingSpinner size={24} color="#FFFFFF" thickness={2} />
                ) : (
                  "إنشاء حساب"
                )}
              </motion.button>
              
              <div className="mt-6 text-center">
                <p className="text-[#475569]">
                  لديك حساب بالفعل؟{" "}
                  <Link href="/login" className="text-[#4D79FF] font-medium hover:underline">
                    تسجيل الدخول
                  </Link>
                </p>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-[#E5E9F0]">
              <p className="text-center text-[#64748B] mb-4">أو إنشاء حساب باستخدام</p>
              <div className="flex justify-center gap-4">
                <button 
                  className="flex items-center justify-center size-12 rounded-full border border-[#CBD5E1] hover:border-[#94A3B8] hover:bg-gray-50 transition-all"
                  onClick={() => handleSocialRegister('google')}
                  disabled={isLoading}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                    <path d="M3.15283 7.3455L6.43833 9.755C7.32733 7.554 9.48033 6 11.9998 6C13.5293 6 14.9208 6.577 15.9803 7.5195L18.8088 4.691C17.0228 3.0265 14.6338 2 11.9998 2C8.15883 2 4.82783 4.1685 3.15283 7.3455Z" fill="#FF3D00"/>
                    <path d="M12.0002 22C14.5832 22 16.9302 21.0115 18.7047 19.404L15.6097 16.785C14.5719 17.5742 13.3039 18.0011 12.0002 18C9.39916 18 7.19066 16.3415 6.35866 14.027L3.09766 16.5395C4.75266 19.778 8.11366 22 12.0002 22Z" fill="#4CAF50"/>
                    <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                  </svg>
                </button>
                <button 
                  className="flex items-center justify-center size-12 rounded-full border border-[#CBD5E1] hover:border-[#94A3B8] hover:bg-gray-50 transition-all"
                  onClick={() => handleSocialRegister('facebook')}
                  disabled={isLoading}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 21.879V14.89H7.898V12H10.438V9.797C10.438 7.291 11.93 5.907 14.215 5.907C15.309 5.907 16.453 6.102 16.453 6.102V8.562H15.193C13.95 8.562 13.563 9.333 13.563 10.124V12H16.336L15.893 14.89H13.563V21.879C18.343 21.129 22 16.99 22 12C22 6.477 17.523 2 12 2Z" fill="#1877F2"/>
                  </svg>
                </button>
                <button 
                  className="flex items-center justify-center size-12 rounded-full border border-[#CBD5E1] hover:border-[#94A3B8] hover:bg-gray-50 transition-all"
                  onClick={() => handleSocialRegister('twitter')}
                  disabled={isLoading}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99 21.75H1.68L9.41 12.915L1.254 2.25H8.044L12.793 8.481L18.244 2.25ZM17.083 19.77H18.916L7.084 4.126H5.117L17.083 19.77Z" fill="#000000"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
