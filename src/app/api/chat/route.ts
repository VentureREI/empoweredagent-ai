// app/api/chat/route.ts
import { NextRequest } from "next/server"
import { OpenAI } from "openai"
import { agents } from "@/lib/agents"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  const { slug, messages } = await req.json() as {
    slug: string,
    messages: { role: "user" | "assistant"; content: string }[]
  }

  const agent = agents.find(a => a.slug === slug)
  if (!agent) {
    return new Response("Unknown agent", { status: 400 })
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      { role: "system", content: agent.systemPrompt },
      // optional: inject a short “site policy” wrapper for Phoenix time and no em dash
      { role: "system", content: "Use America/Phoenix time. Never use the em dash character." },
      ...messages
    ],
    temperature: 0.3
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const part of stream) {
        const token = part.choices?.[0]?.delta?.content ?? ""
        if (token) controller.enqueue(encoder.encode(token))
      }
      controller.close()
    }
  })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache"
    }
  })
}