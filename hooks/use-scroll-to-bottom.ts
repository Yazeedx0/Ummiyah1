import { useEffect, useRef } from "react";

export function useScrollToBottom<T extends HTMLElement>(): [
  React.RefObject<T>,
  React.RefObject<T>,
] {
  const containerRef = useRef<T>(null);
  const bottomRef = useRef<T>(null);

  useEffect(() => {
    if (bottomRef.current) {
      const options = {
        behavior: "smooth" as ScrollBehavior,
        block: "end" as ScrollLogicalPosition,
      };

      // Use requestAnimationFrame to ensure DOM has been updated
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView(options);
      });
    }
  }, [bottomRef.current]);

  return [containerRef, bottomRef];
}
