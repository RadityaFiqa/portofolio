"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { sendChat, type ChatMessage } from "@/lib/chatClient";

type UiMessage = ChatMessage & { id: string };

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const starterMessages: UiMessage[] = [
  {
    id: "m1",
    role: "assistant",
    content:
      "Welcome. Ketik pesan apa saja untuk ngobrol.\nCoba juga: /help atau /clear",
  },
];

const suggestedPrompts = [
  "Ceritakan singkat pengalaman kerjamu.",
  "Teknologi apa yang paling sering kamu pakai?",
  "Tunjukkan proyek yang paling kamu banggakan.",
];

export default function TerminalHero() {
  const [messages, setMessages] = useState<UiMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const apiMessages = useMemo<ChatMessage[]>(
    () => messages.map(({ role, content }) => ({ role, content })),
    [messages]
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isLoading, error]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");

    // Local commands (terminal-like).
    if (text === "/clear") {
      setMessages(starterMessages);
      return;
    }
    if (text === "/help") {
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: "user", content: text },
        {
          id: makeId(),
          role: "assistant",
          content:
            "Commands:\n- /help: tampilkan bantuan\n- /clear: bersihkan layar\n\nSelain itu akan dikirim ke LLM via /api/chat.",
        },
      ]);
      return;
    }

    const userMsg: UiMessage = { id: makeId(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    setIsLoading(true);
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const reply = await sendChat(
        [...apiMessages, { role: "user", content: text }],
        {
          signal: abortRef.current.signal,
        }
      );
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: "assistant", content: reply },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to chat";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden bg-gray-100/90 dark:bg-black/40 backdrop-blur">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-black/30">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="ml-2 text-xs font-mono text-gray-600 dark:text-gray-300 truncate">
            raditya@portfolio:~/chat
          </div>
        </div>

        <div className="h-[360px] md:h-[420px] flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed bg-gray-50/70 dark:bg-transparent">
            {messages.map((m) => (
              <div key={m.id} className="mb-3 whitespace-pre-wrap">
                <span
                  className={
                    m.role === "user"
                      ? "text-emerald-500"
                      : m.role === "assistant"
                      ? "text-cyan-400"
                      : "text-gray-500"
                  }
                >
                  {m.role === "user"
                    ? "you"
                    : m.role === "assistant"
                    ? "assistant"
                    : "system"}
                </span>
                <span className="text-gray-500">{" > "}</span>
                <span className="text-gray-900 dark:text-gray-100">
                  {m.content}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="mb-3">
                <span className="text-cyan-400">assistant</span>
                <span className="text-gray-500">{" > "}</span>
                <span className="text-gray-600 dark:text-gray-300">
                  typing…
                </span>
              </div>
            )}

            {error && (
              <div className="mb-3">
                <span className="text-red-500">error</span>
                <span className="text-gray-500">{" > "}</span>
                <span className="text-red-500">{error}</span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="px-4 pt-1 pb-2 flex flex-wrap gap-2 border-t border-gray-200/80 dark:border-white/10 bg-gray-100/80 dark:bg-black/20">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                disabled={isLoading}
                onClick={() => setInput(prompt)}
                className="text-[11px] md:text-xs rounded-full border border-gray-300 dark:border-white/15 px-3 py-1 bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-white/10 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 dark:border-white/10 px-4 py-3 flex items-center gap-2 bg-gray-100/90 dark:bg-black/40"
          >
            <span className="font-mono text-sm text-gray-500">{"$"}</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Type a message…"
              className="flex-1 bg-transparent outline-none font-mono text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
              aria-label="Terminal input"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="text-sm px-3 py-1.5 rounded-md bg-gradient-to-r from-green-400 to-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Laptop base */}
      <div className="mx-auto mt-3 h-3 w-[78%] rounded-b-2xl bg-black/10 dark:bg-white/10" />
    </div>
  );
}

