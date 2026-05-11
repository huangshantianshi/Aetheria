"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBoxProps {
  memorialId: string;
  memorialName: string;
}

export default function ChatBox({ memorialId, memorialName }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMessage: Message = { role: "user", content: text };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput("");
    setIsStreaming(true);

    // Add empty assistant message to stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memorialId,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Stream failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === "assistant") {
            updated[updated.length - 1] = {
              ...last,
              content: last.content + chunk,
            };
          }
          return updated;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-[480px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-aether-mist/15">
        <MessageCircle className="w-4 h-4 text-aether-glow" />
        <h2 className="font-display text-lg font-medium text-aether-ghost">
          Speak with {memorialName}
        </h2>
        <span className="text-xs font-mono text-aether-whisper/40 ml-auto">
          AI · Powered by Claude
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {messages.length === 0 && (
          <motion.p
            className="text-aether-whisper/40 text-sm text-center mt-8 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Say something — {memorialName} is listening.
          </motion.p>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-aether-glow/20 border border-aether-glow/30 text-aether-spirit rounded-br-sm"
                    : "bg-aether-dusk/60 border border-aether-mist/20 text-aether-whisper rounded-bl-sm"
                }`}
              >
                {msg.content || (
                  <span className="flex items-center gap-1.5 text-aether-whisper/40">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span className="text-xs">thinking…</span>
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2 items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message… (Enter to send)"
          rows={1}
          disabled={isStreaming}
          className="flex-1 resize-none bg-aether-dusk/40 border border-aether-mist/25 rounded-xl px-4 py-2.5 text-sm text-aether-ghost placeholder:text-aether-whisper/30 focus:outline-none focus:border-aether-glow/50 transition-colors duration-200 disabled:opacity-50"
          style={{ maxHeight: "120px", overflowY: "auto" }}
        />
        <button
          onClick={send}
          disabled={isStreaming || !input.trim()}
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-aether-glow/20 border border-aether-glow/40 text-aether-spirit flex items-center justify-center hover:bg-aether-glow/30 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isStreaming ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
