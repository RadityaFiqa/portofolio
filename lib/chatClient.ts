export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ChatResponse = {
  reply: string;
};

export async function sendChat(
  messages: ChatMessage[],
  opts?: { signal?: AbortSignal }
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal: opts?.signal,
  });

  if (!res.ok) {
    let details = "";
    try {
      details = await res.text();
    } catch {
      // ignore
    }
    throw new Error(details ? `Chat API error: ${details}` : "Chat API error");
  }

  const data = (await res.json()) as Partial<ChatResponse>;
  if (!data.reply || typeof data.reply !== "string") {
    throw new Error("Chat API returned invalid response");
  }
  return data.reply;
}

