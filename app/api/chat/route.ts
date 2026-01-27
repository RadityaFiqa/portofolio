import { NextResponse } from "next/server";

type ChatRole = "user" | "assistant" | "system";
type ChatMessage = { role: ChatRole; content: string };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : null;

    if (!messages || messages.some((m) => !m || typeof m.content !== "string")) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Placeholder behavior (replace with your LLM call later).
    // For now, we respond based on the last user message to make the UI feel alive.
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const reply =
      `Aku belum terhubung ke LLM production kamu.\n` +
      `Tapi aku terima pesanmu:\n` +
      `${lastUser}\n\n` +
      `Jika kamu sudah siap, ganti implementasi endpoint ini untuk call model kamu.`;

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }
}

