import { motion } from "framer-motion";
import { SparklesIcon, UserIcon } from "./icons";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="w-full px-3 space-y-6"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.3 }}
    >
      <div className="py-4 px-3 rounded-lg bg-[#EBF8FF] border border-[#BEE3F8] text-center mb-8">
        <p className="text-[#2B6CB0] font-medium">مرحباً بك في محادثة جديدة مع أُمية! أنا هنا لمساعدتك في رحلتك التعليمية.</p>
      </div>
      
      {/* First Bubble (Assistant Message) */}
      <div className="flex gap-4 px-3 py-2.5">
        <div className="size-10 flex items-center rounded-full justify-center ring-2 shrink-0 ring-[#BFDBFE] shadow-sm bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF]">
          <SparklesIcon size={20} className="text-white" />
        </div>
        <div 
          className="w-full md:w-[85%] p-5 rounded-2xl bg-[#EEF4FF] text-right shadow-sm border-l-4 border-[#4D79FF]"
        >
          <div className="flex justify-end mb-2">
            <span className="text-sm font-medium text-[#4D79FF]">أُمية</span>
          </div>
          
          <p className="text-[#334155] leading-relaxed font-medium">مرحبًا! أنا أُمية، مساعدتك التعليمية في المرحلة الابتدائية. يمكنني مساعدتك في:</p>
          <ul className="mt-2 space-y-1 pr-6 list-disc">
            <li className="text-[#334155]">فهم الدروس والواجبات</li>
            <li className="text-[#334155]">شرح المفاهيم الصعبة بطريقة سهلة</li>
            <li className="text-[#334155]">المساعدة في التحضير للاختبارات</li>
          </ul>
          <p className="mt-3 text-[#334155]">كيف يمكنني مساعدتك اليوم؟</p>
        </div>
      </div>

      {/* Second Bubble (User Message) */}
      <div className="flex flex-row-reverse gap-4 px-3 py-2.5">
        <div className="size-10 flex items-center rounded-full justify-center ring-2 shrink-0 ring-[#D1FAE5] shadow-sm bg-gradient-to-br from-[#33B37B] to-[#7BDCB5]">
          <UserIcon size={20} className="text-white" />
        </div>
        <div 
          className="w-full md:w-[85%] p-5 rounded-2xl bg-[#F0FAF0] text-right shadow-sm border-r-4 border-[#33B37B]"
        >
          <div className="flex justify-end mb-2">
            <span className="text-sm font-medium text-[#33B37B]">أنت</span>
          </div>
          
          <p className="text-[#334155] leading-relaxed font-medium">أحتاج مساعدة في فهم درس اليوم عن أُصَدِّقُ كِتابي. هل يمكنك شرح الأفكار الرئيسية؟</p>
        </div>
      </div>
    </motion.div>
  );
}
