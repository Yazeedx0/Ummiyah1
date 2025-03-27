import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

export default function HomePage() {
  const chatId = nanoid();
  redirect(`/chat/${chatId}`);
}
