"use client";

import { Chat } from "@/components/chat";
import { useEffect, useState } from "react";

export default function ClientPage() {
  // Use state to track if the component is mounted on the client
  const [isMounted, setIsMounted] = useState(false);
  
  // Set isMounted to true when the component mounts on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render the chat component when mounted on the client
  if (!isMounted) {
    return <div className="min-h-screen w-full flex items-center justify-center">
      <div className="animate-pulse">جاري التحميل...</div>
    </div>;
  }

  return <div className="w-full h-full"><Chat /></div>;
}
