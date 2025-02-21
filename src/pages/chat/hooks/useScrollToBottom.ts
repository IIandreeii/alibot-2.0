import { useEffect, useRef } from "react";

export default function useScrollToBottom(
  shouldScrollToBottom?: boolean,
  chatId?: string
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldScrollToBottom && containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [shouldScrollToBottom, chatId]);

  return { containerRef, lastMessageRef };
}
