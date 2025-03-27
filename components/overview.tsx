import { motion } from "framer-motion";
import { SparklesIcon, UserIcon } from "./icons";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="w-full px-3"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      {/* First Bubble (Assistant Message) - on the right */}
      <div className="flex gap-4 mb-10">
        <div className="size-6 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-[#4A90E2]">
          <SparklesIcon size={14} className="text-white" />
        </div>
        <div 
          className="w-full md:w-[90%] p-4 rounded-[10px] bg-[#E6F0FA] text-right"
        >
          مرحبًا! أنا أُمية، مساعدتك التعليمية. يمكنني مساعدتك في فهم دروسك وحل الواجبات. ما الذي تحتاج إليه اليوم؟
        </div>
      </div>

      {/* Second Bubble (User Message) - on the left */}
      <div className="flex flex-row-reverse gap-4">
        <div className="size-6 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-[#4A90E2]">
          <UserIcon size={14} className="text-white" />
        </div>
        <div 
          className="w-full md:w-[90%] p-4 rounded-[10px] bg-[#E6F0FA] text-right"
        >
          مرحبًا! أحتاج مساعدة في فهم درس اليوم.
        </div>
      </div>
    </motion.div>
  );
};
