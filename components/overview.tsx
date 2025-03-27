import { motion } from "framer-motion";
import { SparklesIcon, UserIcon } from "./icons";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="w-full px-3 space-y-4"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      {/* First Bubble (Assistant Message) */}
      <div className="flex gap-3">
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-[#DADDE1] bg-[#3B82F6]">
          <SparklesIcon size={16} className="text-white" />
        </div>
        <div 
          className="w-full md:w-[85%] p-4 rounded-lg bg-[#E6F0FA] text-right"
        >
          مرحبًا! أنا أُمية، مساعدتك التعليمية. يمكنني مساعدتك في فهم دروسك وحل الواجبات. ما الذي تحتاج إليه اليوم؟
        </div>
      </div>

      {/* Second Bubble (User Message) */}
      <div className="flex flex-row-reverse gap-3">
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-[#DADDE1] bg-[#3B82F6]">
          <UserIcon size={16} className="text-white" />
        </div>
        <div 
          className="w-full md:w-[85%] p-4 rounded-lg bg-[#E6F0FA] text-right"
        >
          أحتاج مساعدة في فهم درس اليوم عن تصديق الكتاب. هل يمكنك شرح النقاط الرئيسية؟
        </div>
      </div>
    </motion.div>
  );
}
