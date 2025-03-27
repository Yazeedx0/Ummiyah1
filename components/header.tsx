import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-[#3B82F6] shadow-md z-10 flex items-center justify-center px-6">
      <div className="flex flex-col items-center">
        <Link href="/" className="text-white text-4xl font-bold">
          أُمية
        </Link>
        <span className="text-white text-sm font-medium">Ummiyyah</span>
      </div>
    </header>
  );
}
