import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-gradient-to-r from-[#4D79FF] to-[#7C9CFF] shadow-sm z-10 flex items-center justify-center px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-full bg-white shadow-sm flex items-center justify-center">
          <span className="text-xl font-bold text-[#4D79FF]">أ</span>
        </div>
        <div className="flex flex-col">
          <Link href="/" className="text-white text-2xl font-bold leading-tight">
            أُمية
          </Link>
          <span className="text-[#EBF5FF]/90 text-[10px] font-medium -mt-1.5">
            صديقك التعليمي الذكي
          </span>
        </div>
      </div>
    </header>
  );
}
