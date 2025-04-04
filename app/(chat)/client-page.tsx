"use client";
import dynamic from "next/dynamic";
const Chat = dynamic(() => import("@/components/chat"), { ssr: false });

export default function ClientPage() {
  return <Chat />;
}
